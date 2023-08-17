import React from 'react';
import clsx from 'clsx';
// antd
import { Button as AntButton } from 'antd';
// Styles
import {useStyles} from './styles'

const Button = (props) => {
  // Hooks declarations
  const classes = useStyles();
  // Props destructuring
  const {onClick,title,mr,mb,grey} = props

  return <AntButton type="primary" size="large" className={clsx(classes.button,[mr && classes.mr,mb && classes.mb,grey && classes.grey])}  onClick={onClick}>{title}</AntButton>
}

export default Button

