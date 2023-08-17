import { takeLatest, call, put } from "redux-saga/effects";
import types from '../types/index'
import api from "../../apiKit/api";
import { toast } from "react-toastify";
import { appConstants } from '../../themes/constants'
import { uploadFile } from "../../utils/s3Bucket";

function* testimonialListSaga({ payload }) {

    try {

        let response = yield call(api.testimonialListApi, payload);

        if (response?.status >= 200 && response?.status < 400) yield put({ type: types.API_GET_TESTIMONIAL_SUCCESS, result: response.data });

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_GET_TESTIMONIAL_FAILED, });
        }
    }
    catch (error) {

        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_GET_TESTIMONIAL_FAILED, });
    }
}

function* testimonialAddSaga({ payload, data }) {

    try {
        yield put({ type: types.UPDATE_LOADER, payload: true })
        let dataUrl = yield call(uploadFile, payload.media);
        const temp = {
            "media": dataUrl,
            "text": payload.text
        }
        let response = yield call(api.testimonialAddApi, temp);
        yield put({ type: types.UPDATE_LOADER, payload: false })
        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({
                type: types.API_GET_TESTIMONIAL,
                payload: data
            })
        }

        else {

            toast.error(response?.message, { toastId: "err" });
            yield put({ type: types.API_GET_FAQ_FAILED, });
        }
    }
    catch (error) {
        yield put({ type: types.UPDATE_LOADER, payload: false })
        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
        yield put({ type: types.API_GET_FAQ_FAILED, });
    }
}

function* testimonialDeleteSaga({ payload, data }) {

    try {

        let response = yield call(api.testimonialDeleteApi, payload);

        if (response?.status >= 200 && response?.status < 400) {
            toast.success(response?.message);
            yield put({
                type: types.API_GET_TESTIMONIAL,
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

export default function* rootTestimonialManagementSaga() {
    yield takeLatest(types.API_GET_TESTIMONIAL, testimonialListSaga);
    yield takeLatest(types.API_TESTIMONIAL_ADD, testimonialAddSaga);
    yield takeLatest(types.API_TESTIMONIAL_DELETE, testimonialDeleteSaga);

}
