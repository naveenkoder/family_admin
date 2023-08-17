import types from "../types/index";
const initialState = {
    isLoading: false,
    data: null
};

export const contentManagementReducer = (state = initialState, action) => {

    switch (action.type) {

        // category list
        case types.API_GET_CONTENT: return { ...state, isLoading: true };

        // Success
        case types.API_GET_CONTENT_SUCCESS: return { ...state, isLoading: false, data: action?.result?.data };

        //Category management Failed Case

        //Default case
        default: return { ...state };
    }
};
