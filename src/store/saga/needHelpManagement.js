import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'

function* needHelpListSaga({ payload }) {

    try {

        let response = yield call(api.needHelpListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_NEED_HELP_LIST_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_NEED_HELP_MANAGEMENT_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_NEED_HELP_MANAGEMENT_FAILED, });
    }
}

export default function* rootNeedHelpManagementSaga() {
    yield takeLatest(types.API_NEED_HELP_LIST_INITIATE, needHelpListSaga);

}
