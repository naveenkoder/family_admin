import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx'
import {useStyles} from './styles'
import { Select } from 'antd';
const Dropdown = (props) => {

    const {options} = props

    const { Option } = Select;
    const handleChange = (event) => {
    };
    const classes = useStyles()
    return ( 
      <FormControl classes={{root:classes.formControlRoot}}>
        {/* <Input> */}
          <Select placeholder="Age" onChange={handleChange} className={clsx([classes.dropdown])}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                  Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
          </Select>
        {/* </Input> */}
        {/* <span className={classes.spanBorder}></span> */}
      </FormControl>
    )
}


export default Dropdown
