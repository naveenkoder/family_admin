import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Navigation
import { useHistory, useLocation } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import { useStyles } from '../styles'
import './dashboardLayout.scss'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faTrophy, faLocationArrow, faSignOutAlt, faLock, faBook, faStore, faDollarSign, faLaptopHouse, faStreetView, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
// Mui Components
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, List, Typography, Divider, ListItem, Collapse, } from '@material-ui/core';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDown';
// Custom components

// Constants
import { AppImages } from '../../themes/appImages'
import { Colors } from '../../themes/colors'
// utils methods
import cl from '../../utils/cl'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { handleNavigationStateAction, handleSidebarDrawerToggleStateAction, handleClearStateAction, logoutInitiate } from '../../store/actions'
import { toast } from 'react-toastify';
import { appConstants } from '../../themes/constants';


const DashboardLayout = (props) => {

  cl('props', props)

  // Hooks declarations
  const matches = useMediaQuery('(min-hight:400px)')
  console.log('matches', matches)
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation()
  const tabItemRef = useRef(null)
  const dispatch = useDispatch()
  const { appState } = useSelector(state => state)
  // Global state initialization
  const { sidebarRouteIndex, sidebarNestedRouteIndex, sidebarDrawerToggleState } = appState

  // local state initialization
  const [toggleMenu, setToggleMenu] = useState(false)

  //Images destructuring
  const { logo } = AppImages

  // sidebar tabs for dashboard
  const tabs = [
    {
      icon: faHome,
      name: 'Dashboard',
      path: "/dashboard"
    },
    {
      icon: faUsers,
      name: 'User Management',
      path: "/users"
    },
    {
      icon: faStore,
      name: 'Order Management',
      path: "/Order-Listing"
    },
    {
      icon: faBook,
      name: 'Content Management',
      path: "/content"
    },
    {
      icon: faDollarSign,
      name: 'Discount & Offers Management',
      path: "/discount"
    },
    {
      icon: faLaptopHouse,
      name: 'Home Management',
      path: "/home"
    },
    {
      icon: faStreetView,
      name: 'Testimonial Management',
      path: "/testimonial"
    },
    {
      icon: faQuestion,
      name: 'FAQ Management',
      path: "/faq"
    },
    {
      icon: faLock,
      name: 'Change Password',
      path: '/Change-Password'
    },
    {
      icon: faSignOutAlt,
      name: 'Logout',
      path: '/login',
    },
  ]
  const nestedTabs = [
    {
      icon: faLocationArrow,
      name: 'Terminal Area Listing',
      path: "/terminal-area-list"
    }
  ]


  // Lifecycle Hooks
  useEffect(() => {
    if (isWidthUp('md', props.width)) {
      dispatch(handleSidebarDrawerToggleStateAction(true))
    } else if (isWidthDown('md', props.width)) {
      dispatch(handleSidebarDrawerToggleStateAction(false))
    }
  }, [props.width])

  useEffect(() => {
    // let callback = useCallback(()=>{
    const nestedRouteIndex = localStorage.getItem("sidebarNestedRouteIndex");
    const routeIndex = localStorage.getItem("sidebarRouteIndex");
    cl("rouete indices are ", routeIndex, nestedRouteIndex)
    if (nestedRouteIndex) {
      dispatch(handleNavigationStateAction(2, false))
      dispatch(handleNavigationStateAction(nestedRouteIndex, true))
    } else {
      dispatch(handleNavigationStateAction(routeIndex || 0, false))
    }
    // },[])

    //     callback()
  }, [])

  // Consoles 
  cl("state inside the dashboard", appState)


  const handleTabClick = (event, name, index, path, isTerminalTab) => {

    if (name == "Logout") {
      localStorage.removeItem("token")
      toast.success(appConstants.authentication.loggedOut, { toastId: "success" });
    }
    if (!isTerminalTab) {
      dispatch(handleNavigationStateAction(index, false))
      setToggleMenu(false)
      history.push(path)
    } else {
      // dispatch(handleNavigationStateAction(null, true))
      handleToggleMenuTab()
    }
  }


  //Callback methods
  const handleToggleMenuTab = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant={!isWidthUp('md', props.width) ? "temporary" : "persistent"}
        anchor="left"
        open={sidebarDrawerToggleState}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={!isWidthUp('md', props.width) ? "right" : "left"}
        onClose={() => sidebarDrawerToggleState ? dispatch(handleSidebarDrawerToggleStateAction(false)) : dispatch(handleSidebarDrawerToggleStateAction(true))}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <div className={classes.drawerLogo}>
          <img src={logo} alt="logo-image" className={classes.logo} onClick={() => {
            dispatch(handleNavigationStateAction(0, false))
            history.push("/dashboard")
          }} />
          <Typography variant="h6" className={classes.title} classes={{ root: classes.typographyRoot }} id="title">ADMIN</Typography>
        </div>
        <Divider variant="middle" />
        <List classes={{ padding: classes.listPadding }}>
          <div className={classes.sidebarList}>
            {tabs.map(({ icon, iconWhite, name, path }, index) => {
              let isTerminalTab = name == "Terminal Management" ? true : false;
              let isSelectedtab = sidebarRouteIndex == index ? true : false;
              let iconTheme = {
                color: isSelectedtab ? !isTerminalTab ? Colors.white : Colors.white : '#3c4858', fontSize: 18, position: 'absolute', right: 5, top: 25,
              }
              return (
                <React.Fragment key={name}>
                  <ListItem
                    onClick={(event) => handleTabClick(event, name, index, path, isTerminalTab)}
                  >
                    <div className={isSelectedtab ? "sidebarBtnSelected" : "sidebarBtn"}>
                      <div className={classes.sidebarIconContainer}>
                        <FontAwesomeIcon icon={icon} color={isSelectedtab ? "#ffffff" : '#a9afbb'} className={clsx([classes.icon, isSelectedtab && classes.seletcedTabIcon])} />
                      </div>
                      <p className={isSelectedtab ? "sidebarBtnTextSelected" : "sidebarBtnText"}>
                        {name}
                      </p>
                      {isTerminalTab ? toggleMenu ?
                        <ArrowDropUpRoundedIcon
                          style={iconTheme} />
                        : <ArrowDropDownRoundedIcon
                          style={iconTheme} />
                        : true
                      }
                    </div>
                  </ListItem>
                  {isTerminalTab ?
                    <Collapse in={toggleMenu} timeout="auto" unmountOnExit classes={{ wrapper: classes.nestedMenuWrapper }}>
                      <List component="div" disablePadding >
                        <div>
                          {nestedTabs.map(({ icon, iconWhite, name, path }, id) => {
                            let isNestedSelectedTab = sidebarNestedRouteIndex == id ? true : false;
                            return (
                              <React.Fragment key={name}>
                                <ListItem>
                                  <div className={isNestedSelectedTab ? "sidebarNestedBtnSelected" : "sidebarNestedBtn"}
                                    onClick={() => {
                                      dispatch(handleNavigationStateAction(index, false))
                                      dispatch(handleNavigationStateAction(id, true))
                                      history.push(path)
                                    }}
                                  >
                                    <div className={classes.sidebarIconContainer}>
                                      <FontAwesomeIcon icon={icon} color={isNestedSelectedTab ? "#ffffff" : '#a9afbb'} className={clsx([classes.icon, isNestedSelectedTab && classes.seletcedTabIcon])} />
                                    </div>
                                    <p
                                      className={isNestedSelectedTab ? "sidebarBtnTextSelected" : "sidebarBtnText"}>
                                      {name}
                                    </p>
                                  </div>
                                </ListItem>
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </List>
                    </Collapse>
                    : true}
                </React.Fragment>
              )
            })}
          </div>
        </List>
        <div className="sidebarBackground" style={{ zIndex: -7, }} />
      </Drawer>
      <main className={clsx(classes.content, {
        [classes.contentShift]: sidebarDrawerToggleState,
      })}>
        {props.children}
      </main>
    </div>
  );
}

export default withWidth()(DashboardLayout)
