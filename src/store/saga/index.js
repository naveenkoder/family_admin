import { all, fork } from "redux-saga/effects";
import rootAuthenticationSaga from "./authentication";
import rootUserManagementSaga from './userManagement'
import rootCategoryManagementSaga from './oderManagement'
import rootNeedHelpManagementSaga from './needHelpManagement'
import rootQuoteManagementSaga from './quoteManagement'
import rootContentManagementSaga from './contentManagement'
import rootDiscountManagementSaga from './discountManagement'
import rootHomeManagementSaga from './homeManagement'
import rootTestimonialManagementSaga from './testimonialManagement'
import rootFaqManagementSaga from './faqManagement'

export default function* rootSaga() {

    yield all([
        fork(rootAuthenticationSaga),
        fork(rootUserManagementSaga),
        fork(rootCategoryManagementSaga),
        fork(rootNeedHelpManagementSaga),
        fork(rootQuoteManagementSaga),
        fork(rootContentManagementSaga),
        fork(rootDiscountManagementSaga),
        fork(rootHomeManagementSaga),
        fork(rootTestimonialManagementSaga),
        fork(rootFaqManagementSaga)
    ]);
}
