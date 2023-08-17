import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* quoteListSaga({ payload }) {

    try {

        let response = yield call(api.quoteListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_QUOTE_LIST_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
    }
}

function* addQuoteSaga({ payload, history }) {

    try {

        let response = yield call(api.addQuoteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(response?.message)
            yield put({ type: types.API_ADD_QUOTE_SUCCESS });
            history.push('/Quotes-Mangement')
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
    }
}

function* editQuoteSaga({ payload, history }) {

    try {

        let response = yield call(api.editQuoteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(response?.message)
            yield put({ type: types.API_EDIT_QUOTE_SUCCESS });
            history.push('/Quotes-Mangement')
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
    }
}

function* deleteQuoteSaga({ payload }) {

    try {

        let response = yield call(api.deleteQuoteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {

            toast.success(response?.message)
            yield put({ type: types.API_EDIT_QUOTE_SUCCESS });
            yield put({ type: types.API_QUOTE_LIST_INITIATE, payload })
        }
        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_QUOTE_MANAGEMENT_FAILED, });
    }
}

export default function* rootQuoteManagementSaga() {
    yield takeLatest(types.API_QUOTE_LIST_INITIATE, quoteListSaga);
    yield takeLatest(types.API_ADD_QUOTE_INITIATE, addQuoteSaga);
    yield takeLatest(types.API_EDIT_QUOTE_INITIATE, editQuoteSaga);
    yield takeLatest(types.API_DELETE_QUOTE_INITIATE, deleteQuoteSaga);

}
