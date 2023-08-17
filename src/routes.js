import React from 'react'
//React router navigation
import {
    Redirect,
} from 'react-router-dom'

import { ForgotPassword } from './pages/auth/forgotPassword'
import { Login } from './pages/auth/login'
import { Dashboard } from './pages/dashboard/dashboard'
import { UserManagement } from './pages/dashboard/userManagement'
import { UserDetails } from './pages/dashboard/userDetails'
import { EditUserDetails } from './pages/dashboard/editUserDetails'

import { TerminalListing } from './pages/dashboard/categoryListing'
import { EditTerminal } from './pages/dashboard/editCategory'



export default [
    { 
        path:"/",
        component:()=><Redirect to='/login' />,
        exact:true,
    },
    {
        path:"/login",
        component:Login,
    },
    {
        path:"/forgot-password",
        component:ForgotPassword,
    },
    {
        path:"/dashboard",
        component:Dashboard,
    },
    {
        path:"/users",
        component:UserManagement,
    },
    {
        path:"/view-user-details/:id",
        component:UserDetails,
    },
    {
        path:"/view-saved-locations/:id",
        component:UserDetails,
    },
    {
        path:"/edit-user/:id",
        component:EditUserDetails,
    },
    {
        path:"/Category-Mangement",
        component:TerminalListing,
    },

    {
        path:"/edit-terminal/:id",
        component:EditTerminal,
    },
    
]

