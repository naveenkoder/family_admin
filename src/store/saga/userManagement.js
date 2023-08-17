import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* userListSaga({ payload }) {

    try {

        let response = yield call(api.userListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_USER_LIST_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
    }
}

function* userBlockSaga({ payload }) {

    try {

        let response = yield call(api.userBlockApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(response.message);
            yield put({ type: types.API_USER_BLOCK_SUCCESS, payload });
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
    }
}

function* userDetailSaga({ payload }) {

    try {

        let response = yield call(api.userDetailApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_USER_DETAIL_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
    }
}


function* userUpdateSaga({ payload, history }) {

    try {

        console.log("payload", payload)
        let response = yield call(api.userDetailUpdateApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(response.message, { toastId: "success" });
            yield put({ type: types.API_USER_DETAIL_UPDATE_SUCCESS, payload });
            history.push('/users')
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_USER_MANAGEMENT_FAILED, });
    }
}

function* dashboardSaga() {

    try {

        let response = yield call(api.dashboardApi);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_DASHBOARD_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_DASHBOARD_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_DASHBOARD_FAILED, });
    }
}
export default function* rootUserManagementSaga() {
    yield takeLatest(types.API_USER_LIST_INITIATE, userListSaga);
    yield takeLatest(types.API_USER_BLOCK_INITIATE, userBlockSaga);
    yield takeLatest(types.API_USER_DETAIL_INITIATE, userDetailSaga);
    yield takeLatest(types.API_USER_DETAIL_UPDATE_INITIATE, userUpdateSaga);
    yield takeLatest(types.API_DASHBOARD_INITIATE, dashboardSaga);

}
