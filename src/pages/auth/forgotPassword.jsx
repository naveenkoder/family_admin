import React, { useEffect, useState } from 'react'
// styles
import { useStyles } from '../../styles/styles'
import './auth.scss'
// Third party front-end libs
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
// Third part libs
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom'
import clsx from 'clsx'
// Custom components
import { InputField, Navbar } from '../../customComponents'
import MainLayout from '../../layouts/mainLayout'
// Themes
import { AppImages } from '../../themes/appImages'
import { ValidationConstants, appConstants } from '../../themes/constants'
// Icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordInitiate } from '../../store/actions'


export const ForgotPassword = (props) => {

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const loading = useSelector(x => x.authentication.isLoading)
    console.log("load", loading)
    // lifecycle hooks
    useEffect(() => {
        document.title = appConstants.title
    }, [])

    const values = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string(ValidationConstants.empty.emptyEmail).email(ValidationConstants.invalid.email.invalidEmail).max(255).required(ValidationConstants.empty.emptyEmail),
    })

    return (
        <MainLayout>
            <Grid container justify="center" alignItems="center" direction="column" className="m-4 position-relative">
                <div className={classes.iconWrapper} onClick={() => history.goBack()} >
                    <FontAwesomeIcon icon={faArrowLeft} color="white" className={classes.backIcon} />
                </div>
                <img src={AppImages.logo} alt="logo-image" className={classes.logo} />
                <Typography variant="h5" className={clsx([classes.title, "mb-4"])}>Forgot Password</Typography>
                <div className={classes.form}>
                    <Formik
                        initialValues={values}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            dispatch(forgotPasswordInitiate(values, history))
                        }}
                    >
                        {({
                            values,
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                        }) => (
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <InputField
                                    placeholder="Email Address"
                                    autoComplete='new-Email'
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    fullWidth
                                />
                                <button type="submit" className={clsx([classes.authButton, classes.filledButton, "mt-4"])} disabled={loading}>Send</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Grid>
        </MainLayout>
    )
}
