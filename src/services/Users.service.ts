import bcrypt from 'bcrypt';
import { dbRealTime as db, dbFirestore as normalDB } from '../configurations/firebaseAdmin';
import { getDataSession, informationUser, logIn, Photo, Pictures, Summary, Tags, UserNewInfo, UsersModel, } from '../types/Users';
import { Token } from './Token.service';
import { SALT_ROUNDS } from '../configurations/conf';

export class Users {
  private info_users: UsersModel = {};
  private TokenService: Token;

  constructor(usersInfo: UsersModel | null) {
    if (usersInfo) {
      const saltRounds: number = SALT_ROUNDS;
      let password: string = '';
      if (usersInfo.password) {
        password = bcrypt.hashSync(usersInfo.password, saltRounds);
      }

      this.info_users = {
        fullname: usersInfo.fullname,
        email: usersInfo.email,
        age: 0,
        password: password,
        emergency_contact: usersInfo.emergency_contact,
        avatar_path: usersInfo.avatar_path,
        tags: [],
        pictures: [],
        summary: '',
        rating: 0,
        Vibration_proximity: false,
        range: {
          min: '',
          max: '',
        },
        coordinates: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
      };
    }
    this.TokenService = new Token();
  }

  private validations(userInfo: UsersModel): boolean {
    const regex: string = '[a-zA-z]';

    if (!userInfo.fullname || !userInfo.fullname.trim())
      throw new Error('The name cannot be void');
    if (
      !userInfo.password ||
      !userInfo.password.trim() ||
      userInfo.password.length < 6
    )
      throw new Error(
        'The password cannot be void or have less than 6 characters'
      );
    if (!userInfo.email || !userInfo.email.trim())
      throw new Error('The email cannot be void');
    if (
      !userInfo.emergency_contact ||
      !userInfo.emergency_contact.trim() ||
      userInfo.emergency_contact.match(regex)
    )
      throw new Error(
        'The emergency contact cannot be void or contain letters'
      );

    return true;
  }

  public async createUser(): Promise<getDataSession> {
    if (this.info_users.email) {
      const userInfo = await this.getUser(this.info_users.email);
      if (typeof userInfo !== 'string') {
        return 'The user already exist';
      } //check if the user does not exist yet
      this.validations(this.info_users); //check if there's a problem with the data that was given

      try {
        const creationUser = db.ref('Users').push();
        await creationUser.set(this.info_users);
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      }

      if (!this.info_users.fullname || !this.info_users.email) {
        throw new Error('Error, one or some values were not provided');
      }

      return {
        userInformation: this.info_users,
        access_token: this.TokenService.generateToken({
          age: 0,
          email: this.info_users.email,
          fullname: this.info_users.fullname,
          duration: '1h',
        }),
        refreshToken: this.TokenService.generateToken({
          age: 0,
          email: this.info_users.email,
          fullname: this.info_users.fullname,
          duration: '7d',
        }),
      };
    }

    return 'Error, one or some values were not provided';
  }

  public async logIn(dataSession: logIn): Promise<getDataSession> {
    let userInfo: string | UsersModel;
    try {
      userInfo = await this.getUser(dataSession.email);
      if (typeof userInfo === 'string') return userInfo; //verify if the data was sent correctly or there was an error
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }

    try {
      if (typeof userInfo !== 'string') {
        if (!userInfo.password || !userInfo.email || !userInfo.fullname) return 'one or some values were not provided';

        const isPassCorrect: boolean = await bcrypt.compare(
          dataSession.password,
          userInfo.password
        );

        console.log('paso por aqui');

        if (isPassCorrect) {
          const { password: _, ...userInformation } = userInfo;

          return {
            userInformation,
            access_token: this.TokenService.generateToken({
              age: 0,
              email: userInfo.email,
              fullname: userInfo.fullname,
              duration: '1h',
            }),
            refreshToken: this.TokenService.generateToken({
              age: 0,
              email: userInfo.email,
              fullname: userInfo.fullname,
              duration: '7d',
            }),
          };
        }
      }

      return 'There was an error with the data that was given';
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  //
  public async addTags(tagsData: Tags): Promise<void> {
    const userID = this.getUserId(tagsData.email);

    try {
      await db.ref('Users/' + userID).update({ tags: tagsData.tags });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async addSummary(summaryData: Summary) {
    const userID = this.getUserId(summaryData.email);

    try {
      await db.ref('Users/' + userID).update({ summary: summaryData.summary });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async addPhoto(photo: Photo) {
    const userID = this.getUserId(photo.email);

    try {
      await db.ref('Users/' + userID).update({ avatar_path: photo.url });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async addPhotos(pictures: Pictures) {
    const userID = this.getUserId(pictures.email);

    try {
      await db.ref('Users/' + userID).update({ pictures: pictures.urls });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  //

  public async getUser(email: string): Promise<informationUser> {
    try {
      const response = await db.ref('Users').orderByChild('email').equalTo(email).once('value');

      if (!response.exists()) {
        return 'That user does not exist';
      } else {
        const users = response.val();
        const userId = Object.keys(users)[0];
        return users[userId];
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async getUserId(email: string) {
    try {
      const response = await db.ref('Users').orderByChild('email').equalTo(email).once('value');
      if (!response.exists()) {
        return 'That user does not exist';
      } else {
        const users = response.val();
        return Object.keys(users)[0];
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async updateInformation(newInformation: UserNewInfo): Promise<void> {
    const userID = this.getUserId(newInformation.email);

    try {
      await db.ref('Users/' + userID).update(newInformation.userNewInfo);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  public async deleteUser(email: string): Promise<void> {
    const userID = this.getUserId(email);

    try {
      await db.ref('Users/' + userID).remove();
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
