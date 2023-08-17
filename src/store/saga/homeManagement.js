import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* homeUpdateSaga({ payload }) {

    try {

        let response = yield call(api.homeUpdateApi, payload);
        yield put({
            type: types.UPDATE_LOADER, payload: false
        })

        if (response?.status >= 200 && response?.status < 400) toast.success(response?.message);

        else {
            toast.error(response?.message, { toastId: "err" });
            // yield put({ type: types.API_CATEGORY_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {
        yield put({
            type: types.UPDATE_LOADER, payload: false
        })
        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        // yield put({ type: types.API_CATEGORY_MANAGEMENT_FAILED, });
    }
}
function* getHomeSaga() {

    try {

        let response = yield call(api.getHomeApi);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_GET_HOME_SUCCESS, result: response.data });

        else {
            toast.error(response?.message, { toastId: "err" });
            // yield put({ type: types.API_CATEGORY_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        // yield put({ type: types.API_CATEGORY_MANAGEMENT_FAILED, });
    }
}


export default function* rootHomeManagementSaga() {
    yield takeLatest(types.API_HOME_UPDATE, homeUpdateSaga);
    yield takeLatest(types.API_GET_HOME, getHomeSaga);


}
