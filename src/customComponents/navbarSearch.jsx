import React from 'react';
import clsx from 'clsx';
import { Navbar as BsNavbar } from 'react-bootstrap';
import { Input } from 'antd'
// Styles
import { useStyles } from './styles'

const NavbarSearch = (props) => {
  // Hooks declarations
  const classes = useStyles();
  // Props destructuring

  return (<div>
    {/* <BsNavbar.Brand className={classes.navbarTextSearch}>Search:&nbsp;</BsNavbar.Brand> */}
    <Input className={classes.navbarInput} onChange={props.onChange} value={props.value} placeholder='Search' />
  </div>
  )
}

export default NavbarSearch

