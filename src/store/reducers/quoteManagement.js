import types from "../types/index";
const initialState = {
    isLoading: false,
    quoteList: [],
    pagination: {},
    quoteDetail: {},
};

export const quoteManagementReducer = (state = initialState, action) => {

    switch (action.type) {

        // quote list
        case types.API_QUOTE_LIST_INITIATE: return { ...state, isLoading: true };
        case types.API_QUOTE_LIST_SUCCESS: return { ...state, isLoading: false, quoteList: action?.result?.data?.data, pagination: action.result.data.paginationData };

        // add quote
        case types.API_ADD_QUOTE_INITIATE: return { ...state, isLoading: true };
        case types.API_ADD_QUOTE_SUCCESS: return { ...state, isLoading: false };

        // edit quote
        case types.API_EDIT_QUOTE_INITIATE: return { ...state, isLoading: true };
        case types.API_EDIT_QUOTE_SUCCESS: return { ...state, isLoading: false };

        // delete quote
        case types.API_DELETE_QUOTE_INITIATE: return { ...state, isLoading: true };
        case types.API_DELETE_QUOTE_SUCCESS: return { ...state, isLoading: false };

        //quote management Failed Case
        case types.API_QUOTE_MANAGEMENT_FAILED: return { ...state, isLoading: false };

        //Default case
        default: return { ...state };
    }
};
