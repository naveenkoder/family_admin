import React from 'react'
import {
    makeStyles,
    TextField,
} from '@material-ui/core'
import clsx from 'clsx'
import { useStyles } from './styles'

const InputField = (props) => {

    const classes = useStyles()

    const {
        error,
        helperText,
        placeholder,
        name,
        onBlur,
        onChange,
        type,
        value,
        style,
        autoComplete,
        disabled,
        my,
        textArea,
        onKeyDown
    } = props
    return (
        <TextField
            placeholder={placeholder}
            error={error}
            noValidate
            helperText={helperText}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            value={value}
            fullWidth
            // classes={{root:classes.my}}
            className={clsx([classes.input, my && classes.my])}
            multiline={textArea && true}
            rows={textArea && 7}
            autoComplete={autoComplete ? autoComplete : ""}
            disabled={disabled}
            onKeyDown={onKeyDown}
            style={style}
        />
    )
}


export default InputField