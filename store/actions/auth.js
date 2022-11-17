import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATION = 'AUTHENTICATION'
export const LOGOUT = 'LOGOUT'
export const TRY_AUTOLOGIN = 'TRY_AUTOLOGIN';

let timer;

export const tryAutoLogin = () => {
    return{
        type: TRY_AUTOLOGIN
    }
}

export const authentication = (userId, idToken, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime))
        dispatch({
            type: AUTHENTICATION,
            userId: userId,
            idToken: idToken
        })
    }
}

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA61wKACPcG3Mz3sKbsStRCnh2bpt1AIf4',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true

                })
            }
        );

        if (!response.ok) {
            // throw new Error('Something went wrong!');
            const resDataError = await response.json();
            const errorMsgId = resDataError.error.message;
            let message = 'Something Went Wrong!';
            if (errorMsgId === 'EMAIL_EXISTS') {
                message = " Email address is already in use by another account."
            }
            throw new Error(message);
        }

        const resData = await response.json();
        // console.log(resData)

        dispatch(authentication(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        const expirationTime = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        userDataDeviceStorage(resData.idToken, resData.localId, expirationTime)
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA61wKACPcG3Mz3sKbsStRCnh2bpt1AIf4',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true

                })
            }
        );

        if (!response.ok) {
            // throw new Error('Something went wrong!');
            const resDataError = await response.json();
            const errorMsgId = resDataError.error.message;
            let message = 'Something went wrong!';
            if (errorMsgId === 'EMAIL_NOT_FOUND') {
                message = "Your Email Didn't Exist In Database"
            } else if (errorMsgId === 'INVALID_PASSWORD') {
                message = "You Have Entered Wrong Password"
            }
            throw new Error(message);
        }

        const resData = await response.json();
        // console.log(resData)

        dispatch(authentication(resData.localId, resData.idToken,parseInt(resData.expiresIn) * 1000));

        const expirationTime = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        userDataDeviceStorage(resData.idToken, resData.localId, expirationTime)
    };
};

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

const userDataDeviceStorage = (tokenId, userId, expiryDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        tokenId: tokenId,
        userId: userId,
        expiryDate: expiryDate.toISOString()
    }))
}


