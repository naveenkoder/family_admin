import { createMuiTheme } from '@material-ui/core';
import typography from './typography';
import palette from './palette'
const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            input: {
                padding: "10px 12px",
                border: "1px solid #d2d2d2",
                borderRadius: '3px !important',
                fontSize: 14,
                fontWeight: 500,
                color: '#555555',
                lineHeight: "normal",
            },
            multiline: {
                padding: 0,
            }
        },
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottom: 0,
                },
                '&:after': {
                    left: 1,
                    right: 1,
                    content: "",
                    position: "absolute",
                    transform: "scaleX(0)",
                    transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                    borderBottom: "2px solid #7F913F",
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                }
            }
        },
        MuiDivider: {
            middle: {
                marginLeft: '10%',
                marginRight: '10%',
            }
        },
        MuiButton: {
            label: '#7F913F !important'
        },
        MuiFormHelperText: {
            root: {
                fontSize: '14px !important',
            }
        },
    },
    palette,
    typography,
});

export default theme;