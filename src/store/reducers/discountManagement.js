import types from "../types/index";
const initialState = {
    isLoading: false,
    data: null
};

export const discountManagementReducer = (state = initialState, action) => {

    switch (action.type) {

        // category list
        case types.API_GET_DISCOUNT: return { ...state, isLoading: true };

        // Success
        case types.API_GET_DISCOUNT_SUCCESS: return { ...state, isLoading: false, data: action?.result?.data };

        //Category management Failed Case

        //Default case
        default: return { ...state };
    }
};
