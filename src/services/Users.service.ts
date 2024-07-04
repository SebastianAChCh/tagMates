import { dbRealTime as db } from '../configurations/firebaseAdmin';
import { Coordinates, UsersModel } from '../types/Users';

export class Users {
  private info_users: any = {};

  constructor(usersInfo: UsersModel | null) {
    if (usersInfo) {
      this.info_users = {
        fullname: usersInfo.fullname,
        email: usersInfo.email,
        age: usersInfo.age,
        emergency_contact: usersInfo.emergency_contact,
        avatar_path: usersInfo.avatar_path,
        tags: [],
        pictures: [],
        summary: '',
        rating: 0,
        Vibration_proximity: false,
        range: {
          min: '',
          max: ''
        },
        coordinates: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },
      };
    }
  }

  public async createUser() {
    try {
      const userInfo = await this.getUser(this.info_users.email);
      if (userInfo) return false;
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }

    try {
      const creationUser = db.ref('Users').push();
      await creationUser.set(this.info_users);
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }

    try {
      const userInfo = await this.getUser(this.info_users.email);
      return userInfo;
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  public async getUser(email: string) {
    try {
      const response = await db.ref('Users').orderByChild('email').equalTo(email).once('value')
      if (!response.exists()) {
        return 'That user does not exist'
      } else {
        const users = response.val();
        const userId = Object.keys(users)[0];
        return users[userId];
      }
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  private async getUserId(email: string) {
    try {
      const response = await db.ref('Users').orderByChild('email').equalTo(email).once('value')
      if (!response.exists()) {
        return 'That user does not exist'
      } else {
        const users = response.val();
        return Object.keys(users)[0];
      }
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }

  async updateCoordinates(coordinates: Coordinates, email: string) {
    let ID;
    try {
      ID = await this.getUserId(email);
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }

    try {
      const newCoordinates = { coordinates }
      await db.ref('Users/' + ID).update(newCoordinates);
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  }
}
