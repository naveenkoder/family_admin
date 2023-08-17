import types from '../types'

// Clear state
export const handleClearStateAction = () => {
    let action = {
        type: types.CLEAR_STATE,
    }
    return action;
}

// Action to handle navigatin route state
export const handleNavigationStateAction = (index, isNested) => {
    let action = {
        type: types.HANDLE_SIDEBAR_NAVIGATION_STATE,
        index,
        isNested,
    }

    return action;
}

// Action to handle 
export const handleSidebarDrawerToggleStateAction = (toggler) => {
    // cl('inside action', toggler)
    let action = {
        type: types.HANDLE_SIDEBAR_DRAWER_TOGGLE_STATE,
        toggler,
    }

    return action;
}

// Authentication actions

export const loginInitiate = (payload, history) => ({ type: types.API_LOGIN_INITIATE, payload, history })

export const logoutInitiate = (history) => ({ type: types.API_LOGOUT_INITIATE, history })

export const forgotPasswordInitiate = (payload, history) => ({ type: types.API_FORGOT_PASSWORD_INITIATE, payload, history })

export const changePasswordInitiate = (payload, history) => ({ type: types.API_CHANGE_PASSWORD_INITIATE, payload, history })

export const resetPasswordLinkInitiate = (payload) => ({ type: types.API_RESET_PASSWORD_LINK_INITIATE, payload })

export const resetPasswordInitiate = (payload, history) => ({ type: types.API_RESET_PASSWORD_INITIATE, payload, history })

export const userListInitiate = (payload) => ({ type: types.API_USER_LIST_INITIATE, payload })
export const testimonialListInitiate = (payload) => ({ type: types.API_GET_TESTIMONIAL, payload })
export const testimonialAddAction = (payload, data) => ({ type: types.API_TESTIMONIAL_ADD, payload, data })
export const testimonialDeleteAction = (payload, data) => ({ type: types.API_TESTIMONIAL_DELETE, payload, data })
export const faqListInitiate = (payload) => ({ type: types.API_GET_FAQ, payload })
export const faqAddAction = (payload, data) => ({ type: types.API_FAQ_ADD, payload, data })
export const faqDeleteAction = (payload, data) => ({ type: types.API_FAQ_DELETE, payload, data })
export const orderDeleteAction = (payload, data) => ({ type: types.Api_ORDER_DELETE, payload, data })

export const userBlockInitiate = (payload) => ({ type: types.API_USER_BLOCK_INITIATE, payload })
export const globalLoader = (payload) => ({ type: types.UPDATE_LOADER, payload })



export const userDetailUpdateInitiate = (payload, history) => ({ type: types.API_USER_DETAIL_UPDATE_INITIATE, payload, history })

export const dashboardInitiate = () => ({ type: types.API_DASHBOARD_INITIATE })

export const categoryListInitiate = (payload) => ({ type: types.API_CATEGORY_LIST_INITIATE, payload })
export const OrderListingAction = (payload) => ({ type: types.Api_ORDER_LIST_INITIATE, payload })
export const OrderStatusUpdateAction = (payload, data) => ({ type: types.Api_ORDER_STATUS_UPDATE, payload, data })
export const ContentUpdateAction = (payload) => ({ type: types.API_CONTENT_UPDATE, payload })
export const DiscountUpdateAction = (payload) => ({ type: types.API_DISCOUNT_UPDATE, payload })
export const HomeUpdateAction = (payload) => ({ type: types.API_HOME_UPDATE, payload })
export const getContentAction = () => ({ type: types.API_GET_CONTENT })
export const getDiscountAction = () => ({ type: types.API_GET_DISCOUNT })
export const getHomeAction = () => ({ type: types.API_GET_HOME })

