import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* faqListSaga({ payload }) {

    try {

        let response = yield call(api.faqListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_GET_FAQ_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_GET_FAQ_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_GET_FAQ_FAILED, });
    }
}

function* faqAddSaga({ payload, data }) {

    try {

        let response = yield call(api.faqAddApi, payload);

        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({
                type: types.API_GET_FAQ,
                payload: data
            })
        }

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_GET_FAQ_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_GET_FAQ_FAILED, });
    }
}

function* faqDeleteSaga({ payload, data }) {

    try {

        let response = yield call(api.faqDeleteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({
                type: types.API_GET_FAQ,
                payload: data
            })
        }

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_GET_FAQ_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_GET_FAQ_FAILED, });
    }
}

export default function* rootFaqManagementSaga() {
    yield takeLatest(types.API_GET_FAQ, faqListSaga);
    yield takeLatest(types.API_FAQ_ADD, faqAddSaga);
    yield takeLatest(types.API_FAQ_DELETE, faqDeleteSaga);

}
