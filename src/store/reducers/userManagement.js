import types from "../types/index";
const initialState = {
    isLoading: false,
    userList:[],
    pagination:{},
    userDetail:{},
    dashboard:{}
};

export const userManagementReducer = (state = initialState, action) => {

    switch (action.type) {
        // User list
        case types.API_USER_LIST_INITIATE: return { ...state, isLoading: true };
        case types.API_USER_LIST_SUCCESS: return { ...state, isLoading: false,userList:action?.result?.data?.list,pagination:action.result.data.paginationData };

        // Block / Unblock
        case types.API_USER_BLOCK_INITIATE: return { ...state, isLoading: true };
        case types.API_USER_BLOCK_SUCCESS: return { 
            ...state,
             isLoading: false,
             userList:state.userList.map((item)=>{

                if(item._id===action.payload.id) item.block=!item.block
                return item
             })
            };

        // User detail
        case types.API_USER_DETAIL_INITIATE: return { ...state, isLoading: true };
        case types.API_USER_DETAIL_SUCCESS: return { ...state, isLoading: false,userDetail:action?.result?.data };

        // Dashboard
        case types.API_DASHBOARD_INITIATE: return { ...state, isLoading: true };
        case types.API_DASHBOARD_SUCCESS: return { ...state, isLoading: false,dashboard:action?.result?.data };

        //User management Failed Case
        case types.API_USER_MANAGEMENT_FAILED: return { ...state, isLoading: false};

        //Default case
        default: return { ...state };
    }
};
