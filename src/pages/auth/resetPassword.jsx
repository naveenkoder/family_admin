import React, { useEffect } from "react";
// styles
import { useStyles } from "../../styles/styles";
import "./auth.scss";

// Third party front-end libs
import { Grid, Typography } from "@material-ui/core";
// Third party component libs
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
// Custom components
import { InputField } from "../../customComponents";
import MainLayout from "../../layouts/mainLayout";
// Themes
import { AppImages } from "../../themes/appImages";
import { appConstants } from "../../themes/constants";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { loginInitiate, resetPasswordInitiate, resetPasswordLinkInitiate } from "../../store/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { passwordRegex } from '../../themes/regex'
export const ResetPassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation()
    const linkFetched = useSelector(x => x.authentication.resetPasswordLinkFetched)
    const linkExpired = useSelector(x => x.authentication.resetPasswordLinkExpired)

    const loading = useSelector(x => x.authentication.isLoading)
    const token = location.search.split('=')[1]

    const values = {
        password: "",
        confirmPassword: ""
    };

    useEffect(() => {
        document.title = appConstants.title
        dispatch(resetPasswordLinkInitiate({ token }))
    }, []);

    const validationSchema = Yup.object().shape({
        password:
            Yup.string().required("Please enter new password.")
                .min(8, "Password should be at least 8 characters long.")
                .matches(passwordRegex, "Password must include 1 upper case letter, 1 lower case letter, 1 numeric value, 1 special character and no spaces.")
        ,
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password"), null],
                "Confirm new password must match with new password."
            )
            .required("Please enter confirm new password."),
    });

    return (
        <MainLayout>
            {
                linkFetched ?
                    (<Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        className="m-4"
                    >
                        <Link to="/">
                            <img src={AppImages.logo} alt="logo" className={classes.logo} />
                        </Link>
                        <Typography variant="h5" className={`${classes.title} mb-3`}>
                            Reset Password
                        </Typography>
                        <div className={classes.form}>
                            <Formik
                                initialValues={values}
                                validationSchema={validationSchema}
                                onSubmit={(values) => { dispatch(resetPasswordInitiate({ token, password: values.password }, history)) }}
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
                                    <form noValidate onSubmit={handleSubmit}>
                                        <InputField
                                            placeholder="New Password"
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="password"
                                            value={values.password}
                                            fullWidth
                                            my
                                        />
                                        <InputField
                                            placeholder="Confirm New Password"
                                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                            name="confirmPassword"
                                            // autoComplete='new-Password'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            type="password"
                                            value={values.confirmPassword.trim()}
                                            fullWidth
                                            my
                                        />

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={clsx([classes.authButton, classes.filledButton])}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </Grid>)
                    :
                    linkExpired ? (<Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        className="m-4"
                    >
                        <Link to="/">
                            <img src={AppImages.logo} alt="logo" className={classes.logo} />
                        </Link>
                        <Typography variant="h5" className={`${classes.title} mb-3`}>
                            Link has been expired.
                        </Typography>

                    </Grid>) : (<Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        className="m-4"
                    >
                        <Link to="/">
                            <img src={AppImages.logo} alt="logo" className={classes.logo} />
                        </Link>
                        <Typography variant="h5" className={`${classes.title} mb-3`}>
                        </Typography>

                    </Grid>)
            }
        </MainLayout>
    );
};
