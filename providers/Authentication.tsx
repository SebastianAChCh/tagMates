import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
// import Cookies from 'universal-cookie';
import * as secureStore from 'expo-secure-store';
import { LogInType, signUpTp } from '../types/Session';

type propsContext = {
    publicToken?: string | undefined
    logIn?: (data: LogInType) => Promise<any>;
    signUp?: (data: signUpTp) => Promise<any>;
    userInfo?: userData | undefined;
};

type PropsProvider = {
    children: any;
};

type userData = {
    age: number | string;
    email: string;
    fullname: string;
};

const Auth = createContext<propsContext>({});

export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }: PropsProvider) => {
    const [userInfo, setUserInfo] = useState<userData>();
    const [publicToken, setPublicToken] = useState<string | undefined>();
    const INITIAL_URL: string = String(process.env.URL_BACKEND);

    useEffect(() => {
        isAuth();
    }, []);


    //getting the refresh token from the storage
    const getToken = async (): Promise<string> => {
        if (Platform.OS === 'web') {
            // const cookie = new Cookies();
            // if (cookie.get('refresh_token')) return cookie.get('refresh_token');
        } else {
            const tokenResponse = await secureStore.getItemAsync('token');
            if (typeof tokenResponse === 'string') {
                return tokenResponse;
            }
        }

        return '';
    };

    //validates the token that the user has
    const isAuth = async (): Promise<void> => {
        //check if the access_token still available
        let token;
        try {
            token = await getToken();

            const isValid = await fetch(`${INITIAL_URL}/authAccessToken`, {
                method: 'POST',
            });

            const isValidRes: {
                status: number;
                information?: { age: number | string; fullname: string; email: string };
                error?: string;
            } = await isValid.json();

            if (isValidRes.status === 200 && isValidRes.information) {
                setUserInfo(isValidRes.information);
                setPublicToken(token);
                return;
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

        /**if the access_token is not available, then generate another one with the refresh token */
        try {
            const isValid = await fetch(`${INITIAL_URL}/refreshToken`, {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });

            const isValidData: { status: number, information?: { age: number | string; fullname: string; email: string } } = await isValid.json();

            if (isValidData.status === 200 && !userInfo && isValidData.information) {
                setUserInfo(isValidData.information);
                setPublicToken(token);
                return;
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const logIn = async (data: LogInType): Promise<any> => {
        try {
            const response = await fetch(`${INITIAL_URL}/logIn`, {
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const dataSession: { status: number; information?: { age: number | string; fullname: string; email: string }, refresh_token?: string, error?: string } = await response.json();

            if (dataSession.status !== 200) {
                console.error(dataSession.error);
            } else if (dataSession.information && dataSession.refresh_token) {
                setUserInfo(dataSession.information);
                storageToken(dataSession.refresh_token);
                return true;
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const signUp = async (data: signUpTp): Promise<any> => {
        try {
            const response = await fetch(`${INITIAL_URL}/signUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: data.fullname,
                    email: data.email,
                    age: data.age,
                    password: data.password,
                    emergency_contact: data.emergency_contact,
                    avatar_path: '',
                }),
            });

            const dataSession: { status: number; information?: { age: number | string; fullname: string; email: string }, refresh_token?: string, error?: string } = await response.json();

            if (dataSession.status !== 200) {
                console.error(dataSession.error);
            } else if (dataSession.information && dataSession.refresh_token) {
                setUserInfo(dataSession.information);
                storageToken(dataSession.refresh_token);
                setPublicToken(dataSession.refresh_token);
                return true;
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const storageToken = async (token: string): Promise<void> => {
        if (Platform.OS === 'web') {
            // const cookie = new Cookies();
            // const date = new Date();
            // cookie.set('refresh_token', token, {
            //     expires: new Date(date.setDate(date.getDate() + 7))
            // });
        } else {
            await secureStore.setItemAsync('token', token);
        }
    };

    return (
        <Auth.Provider value={{ publicToken, logIn, signUp, userInfo }}>
            {children}
        </Auth.Provider>
    );
};

export default AuthProvider;
