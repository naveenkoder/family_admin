import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* orderListSaga({ payload }) {

    try {

        let response = yield call(api.orderListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.Api_ORDER_LIST_SUCCESS, result: response.data });

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

function* orderStatusUpdateSaga({ payload, data }) {

    try {

        let response = yield call(api.orderStatusUpdateApi, payload);

        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({ type: types.Api_ORDER_LIST_SUCCESS, result: { data: { list: [] } } });
            yield put({ type: types.Api_ORDER_LIST_INITIATE, payload: data });
        }
        else {
            toast.error(response?.message, { toastId: "err" });
        }
    }
    catch (error) {
        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
    }
}


function* orderDeleteSaga({ payload, data }) {

    try {

        let response = yield call(api.orderDeleteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({ type: types.Api_ORDER_LIST_SUCCESS, result: { data: { list: [] } } });
            yield put({ type: types.Api_ORDER_LIST_INITIATE, payload: data });
        }
        else {
            toast.error(response?.message, { toastId: "err" });
        }
    }
    catch (error) {
        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
    }
}

export default function* rootCategoryManagementSaga() {
    yield takeLatest(types.Api_ORDER_LIST_INITIATE, orderListSaga);
    yield takeLatest(types.Api_ORDER_STATUS_UPDATE, orderStatusUpdateSaga);
    yield takeLatest(types.Api_ORDER_DELETE, orderDeleteSaga);


}
