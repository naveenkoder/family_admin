import types from "../types/index";
const initialState = {
    isLoading: false,
};

export const globalReducer = (state = initialState, action) => {

    switch (action.type) {

        // category list
        case types.UPDATE_LOADER: return { ...state, isLoading: action.payload };
        //Default case
        default: return { ...state };
    }
};
