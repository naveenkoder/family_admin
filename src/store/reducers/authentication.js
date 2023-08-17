import types from "../types/index";
const initialState = {
    isLoading: false,
    resetPasswordLinkFetched: false,
    resetPasswordLinkExpired: false
};

export const authenticationReducer = (state = initialState, action) => {

    switch (action.type) {
        // Login
        case types.API_LOGIN_INITIATE: return { ...state, isLoading: true };
        case types.API_LOGIN_SUCCESS: return { ...state, isLoading: false };

        // Logout
        case types.API_LOGOUT_INITIATE: return { ...state, isLoading: true };
        case types.API_LOGOUT_SUCCESS: return { ...state, isLoading: false };

        // Forgot Password
        case types.API_FORGOT_PASSWORD_INITIATE: return { ...state, isLoading: true };
        case types.API_FORGOT_PASSWORD_SUCCESS: return { ...state, isLoading: false };

        // Change Password
        case types.API_CHANGE_PASSWORD_INITIATE: return { ...state, isLoading: true };
        case types.API_CHANGE_PASSWORD_SUCCESS: return { ...state, isLoading: false };

        // // Check Reset Password
        case types.API_RESET_PASSWORD_LINK_INITIATE: return { ...state, isLoading: true };
        case types.API_RESET_PASSWORD_LINK_SUCCESS: return { ...state, isLoading: false, resetPasswordLinkFetched: true };

        // // Reset Password
        case types.API_RESET_PASSWORD_INITIATE: return { ...state, isLoading: true };
        case types.API_RESET_PASSWORD_SUCCESS: return { ...state, isLoading: false, resetPasswordLinkFetched: false };

        //Authentication Failed Case
        case types.API_AUTHENTICATION_FAILED: return { ...state, isLoading: false, resetPasswordLinkFetched: false, resetPasswordLinkExpired: true };

        //Default case
        default: return { ...state };
    }
};
