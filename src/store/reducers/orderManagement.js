import types from "../types/index";
const initialState = {
    isLoading: false,
    orderList: [],
    pagination: {},
};

export const orderManagementReducer = (state = initialState, action) => {
    console.log(action?.result?.data?.list)
    switch (action.type) {

        // category list
        case types.Api_ORDER_LIST_INITIATE: return { ...state, isLoading: true };
      
        // Success
        case types.Api_ORDER_LIST_SUCCESS: return  { ...state, isLoading: false,orderList:action?.result?.data?.list };

        //Category management Failed Case

        //Default case
        default: return { ...state };
    }
};
