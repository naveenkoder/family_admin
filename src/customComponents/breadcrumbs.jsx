import React from "react";
import PropTypes from "prop-types";
// Styles
import {useStyles} from './styles'

import Typography from "@material-ui/core/Typography";
// Navigation
import { Route, MemoryRouter } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import {Breadcrumb} from 'antd'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import {Colors} from '../themes/colors'
import {AppImages} from '../themes/appImages'
import routeConfig from '../routes/routeConfig'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import {handleNavigationStateAction, handleSidebarDrawerToggleStateAction } from '../store/actions'
// Breadcrumb routes to dynamically generating breadcrumbs
// let breadcrumbNameMap = {
//     {
//         "/users": "User Management"
//     },
//     {
//         "/view-user-details/:id":"View User Details"
//     },
//     {
//         "/view-saved-locations/:id":"View Saved Locations"
//     },
//     {
//         "/edit-user/:id":"Edit User"
//     },
//     {
//         "/terminal-arear-list":"Terminal Area Listing"
//     },
//     {
//         "/edit-terminal-area/:id":"Edit Termiinal Area"
//     },
//     {
//         "/add-terminal-area":"Add Terminal Area"
//     },
//     {
//         "/import-terminal-area":"Import Terminal Area"
//     },
//     {
//         "/post/:id":"Report Post"
//     },
//     {
//         "/view-manage-post/:id":"View Report post"
//     },
//     {
//         "/terminals":"Terminal Listing"
//     },
//     {
//         "/add-terminal":"Add Terminal"
//     },
//     {
//         "/edit-terminal/:id":"Edit Terminal"
//     },
//     {
//         "/import-terminal":"Import Terminal"
//     },
//     {
//         "/report-list":"Report Post"
//     },
//     {
//         "/view-report-list/:id":"Report Post Details"
//     },
// }


const Breadcrumbs = (props) => {
    const {pathSnippets} = props
    // Hooks declarations
    const classes = useStyles();
    const history = useHistory();
     const dispatch = useDispatch()

    // To get path snippets from url dynamicaly
    // const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((breadcrumb, index) => {

        // To make url for the breadcrumb link dynamicaly
        // const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        
        return (breadcrumb.name=="dashboard"?true:(<React.Fragment key={index.toString()}>
        <div className={classes.separator}>
            <img src={AppImages.rightArrowSvg} className={classes.rightArrow} />
        </div>
        <Breadcrumb.Item key={breadcrumb.route} className={classes.breadcrumbItem}>
            {index == pathSnippets.length-1?
            <Typography variant="subtitle1" display="inline"> 
                {breadcrumb.name}
            </Typography>:
                <Typography variant="subtitle1"  onClick={()=>history.push(breadcrumb.route)} display="inline" className={classes.breadcrumbLink}>{breadcrumb.name}</Typography>
            }
        </Breadcrumb.Item>
        </React.Fragment>)
        );
    });

    // Home breadcrumb and concated extra breadcrumbs
    const breadcrumbItems = [
        <Breadcrumb.Item key="home" className={classes.breadcrumbItem}>
                <FontAwesomeIcon icon={faHome} color={Colors.primary} onClick={()=>{
                dispatch(handleNavigationStateAction(0, false))
                history.push("/dashboard")
                }} className={classes.breadcrumbIcon}  />
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    
    return (
        <MemoryRouter initialEntries={["/dashboard"]} initialIndex={0}>
                <Route>   
                    <Breadcrumb aria-label="breadcrumb" separator="" className={classes.breadcrumbs}>
                        {breadcrumbItems}
                    </Breadcrumb>
                </Route>
        </MemoryRouter>
    );
}
export default Breadcrumbs  