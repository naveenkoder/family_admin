import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* discountUpdateSaga({ payload }) {

    try {

        let response = yield call(api.discountUpdateApi, payload);

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
function* getDiscountSaga() {

    try {

        let response = yield call(api.getDiscountApi);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_GET_DISCOUNT_SUCCESS, result: response.data });

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


export default function* rootDiscountManagementSaga() {
    yield takeLatest(types.API_DISCOUNT_UPDATE, discountUpdateSaga);
    yield takeLatest(types.API_GET_DISCOUNT, getDiscountSaga);


}
