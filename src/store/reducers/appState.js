import type from '../types'
import cl from '../../utils/cl'

const initialState = {
    sidebarRouteIndex: 0,
    sidebarNestedRouteIndex: null,
    sidebarDrawerToggleState:true,
}

export const appState = (state = initialState, action) => {
    switch (action.type) {
        case type.CLEAR_STATE:
            cl("state and storage cleared",localStorage,state)
            localStorage.removeItem("sidebarNestedRouteIndex")
            localStorage.removeItem("sidebarRouteIndex")
            return {
                sidebarRouteIndex: 0,
                sidebarNestedRouteIndex: null,
            }
        // Sidebar navigation handler action case
        case type.HANDLE_SIDEBAR_NAVIGATION_STATE:
            cl('action inside ' + action.type , action )
            if (action.isNested) {
                localStorage.setItem("sidebarNestedRouteIndex",action.index)
                return {...state, sidebarNestedRouteIndex:action.index}
            } else {
                localStorage.removeItem("sidebarNestedRouteIndex",null)
                localStorage.setItem("sidebarRouteIndex",action.index)
                return {...state,sidebarRouteIndex:action.index,sidebarNestedRouteIndex:null}
            }

         // Sidebar navigation handler action case
        case type.HANDLE_SIDEBAR_DRAWER_TOGGLE_STATE:
            cl('action inside ' + action.type , action )
            return {...state,sidebarDrawerToggleState:action.toggler}
        
        default:
            return {...state}
    }
}