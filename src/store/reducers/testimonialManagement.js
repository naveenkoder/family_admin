import types from "../types/index";
const initialState = {
    isLoading: false,
    userList: [],
    pagination: {},
};

export const testimonialManagementReducer = (state = initialState, action) => {

    switch (action.type) {
        // User list
        case types.API_GET_TESTIMONIAL: return { ...state, isLoading: true };
        case types.API_GET_TESTIMONIAL_SUCCESS: return { ...state, isLoading: false, userList: action?.result?.data?.list, pagination: action.result.data.paginationData };
        case types.API_GET_TESTIMONIAL_FAILED: return { ...state, isLoading: false };

        //Default case
        default: return { ...state };
    }
};
