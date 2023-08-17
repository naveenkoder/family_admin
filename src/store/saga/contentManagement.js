import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* contentUpdateSaga({ payload }) {

    try {

        let response = yield call(api.contentUpdateApi, payload);

        if (response?.status >= 200 && response?.status < 400) toast.success(response?.message);

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
function* getContentSaga() {

    try {

        let response = yield call(api.getContentApi);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_GET_CONTENT_SUCCESS, result: response.data });

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


export default function* rootContentManagementSaga() {
    yield takeLatest(types.API_CONTENT_UPDATE, contentUpdateSaga);
    yield takeLatest(types.API_GET_CONTENT, getContentSaga);


}
