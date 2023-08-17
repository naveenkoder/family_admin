import { combineReducers } from 'redux';
import { appState } from './appState'
import { authenticationReducer as authentication } from './authentication'
import { userManagementReducer as userManagement } from './userManagement'
import { orderManagementReducer as orderManagement } from './orderManagement'
import { needHelpManagementReducer as needHelpManagement } from './needHelpManagement'
import { quoteManagementReducer as quoteManagement } from './quoteManagement'
import { contentManagementReducer as contentManagement } from './contentManagement'
import { discountManagementReducer as discountManagement } from './discountManagement'
import { homeManagementReducer as homeManagement } from './homeManagement'
import { testimonialManagementReducer as testimonialManagement } from './testimonialManagement'
import { faqManagementReducer as faqManagement } from './faqManagement'
import { globalReducer } from './globalReducer'
const appReducer = combineReducers({
  appState,
  authentication,
  userManagement,
  orderManagement,
  needHelpManagement,
  quoteManagement,
  contentManagement,
  discountManagement,
  homeManagement,
  testimonialManagement,
  faqManagement,
  globalReducer
})

const rootReducer = (state, action) => {
  // if (action.type === types.API_ADMIN_LOGIN_START) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer;