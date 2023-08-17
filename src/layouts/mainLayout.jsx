import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import {AppImages} from '../themes/appImages'
import { useStyles } from "./styles";
import { useHistory} from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';
const MainLayout = (props) => {

    const classes = useStyles()
    const history = useHistory()

    return (
        <Grid container className={classes.wrapper}>
            <CardMedia image={AppImages.banner} className={classes.bg}>
                <Box className={classes.page}>
                    {props.children}
                </Box>
            </CardMedia>
        </Grid>
    )
}

export default MainLayout