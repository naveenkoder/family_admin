
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
// Styles
import {useStyles} from './styles'
// Custom components
import Breadcrumbs from './breadcrumbs'
// Mui Components
import withWidth,{isWidthUp} from '@material-ui/core/withWidth';
import {AppBar as MuiAppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Hidden from "@material-ui/core/Hidden"
import MenuIcon from '@material-ui/icons/Menu';
// utils methods
import cl from '../utils/cl'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { handleNavigationStateAction, handleSidebarDrawerToggleStateAction } from '../store/actions'


const AppBar = (props) => {

  const {breadcrumbs} = props
  // Hooks declarations
  const classes = useStyles();
  const dispatch = useDispatch()
  const { appState } = useSelector(state => state)
  // Global state initialization
  const {sidebarDrawerToggleState } = appState

  //Callback methods
  const handleDrawerOpen = () => {
    cl('inside drawer terye click')
    dispatch(handleSidebarDrawerToggleStateAction(true))
  };

  const handleDrawerClose = () => {
    cl('inside drawer  fasf click')
    dispatch(handleSidebarDrawerToggleStateAction(false))
  };

  return ( <MuiAppBar elevation={0}  color="transparent" className={clsx(classes.appBar, {
            [classes.appBarShift]: sidebarDrawerToggleState,
          })}>
            <Toolbar className={classes.toolbar}>
              <Hidden mdUp>
                {!sidebarDrawerToggleState ?
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, sidebarDrawerToggleState && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton> : true
                  // <IconButton onClick={handleDrawerClose} className={classes.menuButton}>
                  //   {isWidthUp('md', props.width) ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  // </IconButton>
                }
              </Hidden>
              <Hidden smDown>
                <Breadcrumbs pathSnippets={breadcrumbs}  />
              </Hidden>
        </Toolbar>
        </MuiAppBar>
        
  );
}

export default withWidth()(AppBar)


