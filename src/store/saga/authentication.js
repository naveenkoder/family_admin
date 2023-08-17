import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* loginSaga({ payload, history }) {

    try {

        let response = yield call(api.loginApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            yield put({ type: types.API_LOGIN_SUCCESS });
            localStorage.setItem('token', response?.data?.data?.token)
            history.push('/dashboard');
            toast.success(appConstants.authentication.loggedIn, { toastId: "success" });
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_AUTHENTICATION_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

function* logoutSaga({ history }) {

    try {

        let response = yield call(api.logoutApi);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(appConstants.authentication.loggedOut, { toastId: "success" });
            yield put({ type: types.API_LOGOUT_SUCCESS });
            localStorage.clear()
            history.push('/login');
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_AUTHENTICATION_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

function* ForgotPasswordSaga({ payload, history }) {

    try {

        let response = yield call(api.forgotPasswordApi, payload);
        if (response?.status >= 200 && response?.status < 400) {

            yield put({ type: types.API_FORGOT_PASSWORD_SUCCESS });
            history.push("/login")
            toast.success(response?.message, { toastId: "success" });

        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_AUTHENTICATION_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

function* changePasswordSaga({ payload, history }) {

    try {

        let response = yield call(api.changePasswordApi, payload);
        if (response?.status >= 200 && response?.status < 400) {

            localStorage.removeItem("token")
            yield put({ type: types.API_CHANGE_PASSWORD_SUCCESS });
            history.push("/login")
            toast.success(response?.message, { toastId: "success" });

        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_AUTHENTICATION_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

function* resetPasswordLinkSaga({ payload }) {

    try {

        let response = yield call(api.resetPasswordLinkApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_RESET_PASSWORD_LINK_SUCCESS })
        else yield put({ type: types.API_AUTHENTICATION_FAILED });
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

function* resetPasswordSaga({ payload, history }) {

    try {

        let response = yield call(api.resetPasswordApi, payload);
        if (response?.status >= 200 && response?.status < 400) {

            yield put({ type: types.API_RESET_PASSWORD_SUCCESS });
            history.push("/login")
            toast.success("Password has been changed successfully.", { toastId: "success" });
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_AUTHENTICATION_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_AUTHENTICATION_FAILED, });
    }
}

export default function* rootAuthenticationSaga() {
    yield takeLatest(types.API_LOGIN_INITIATE, loginSaga);
    yield takeLatest(types.API_LOGOUT_INITIATE, logoutSaga);
    yield takeLatest(types.API_FORGOT_PASSWORD_INITIATE, ForgotPasswordSaga);
    yield takeLatest(types.API_CHANGE_PASSWORD_INITIATE, changePasswordSaga);
    yield takeLatest(types.API_RESET_PASSWORD_LINK_INITIATE, resetPasswordLinkSaga);
    yield takeLatest(types.API_RESET_PASSWORD_INITIATE, resetPasswordSaga);


}
