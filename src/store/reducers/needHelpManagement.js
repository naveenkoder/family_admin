import types from "../types/index";

const initialState = {
    isLoading: false,
    helpList: [],
    pagination: {}
};

export const needHelpManagementReducer = (state = initialState, action) => {

    switch (action.type) {
        // Need help list
        case types.API_NEED_HELP_LIST_INITIATE: return { ...state, isLoading: true };
        case types.API_NEED_HELP_LIST_SUCCESS: return { ...state, isLoading: false, helpList: action?.result?.data.data, pagination: action.result.data.paginationData };

        //User management Failed Case
        case types.API_NEED_HELP_MANAGEMENT_FAILED: return { ...state, isLoading: false };

        //Default case
        default: return { ...state };
    }
};
