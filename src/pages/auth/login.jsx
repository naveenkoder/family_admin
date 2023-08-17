import React, { useEffect, useState } from "react";
// styles
import { useStyles } from "../../styles/styles";
import "./auth.scss";

// Third party front-end libs
import { BottomNavigation, Grid, Typography } from "@material-ui/core";
// Third party component libs
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import cl from "../../utils/cl";
// Custom components
import { InputField, Navbar } from "../../customComponents";
import MainLayout from "../../layouts/mainLayout";
// Themes
import { AppImages } from "../../themes/appImages";
import { ValidationConstants, appConstants } from "../../themes/constants";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { handleClearStateAction, loginInitiate } from "../../store/actions";

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(x => x.authentication.isLoading)

  const values = {
    email: "",
    password: "",
  };
  // lifecycle hooks
  useEffect(() => {
    document.title = appConstants.title
    dispatch(handleClearStateAction());
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string(ValidationConstants.empty.emptyEmail)
      .email(ValidationConstants.invalid.email.invalidEmail)
      .max(255)
      .required(ValidationConstants.empty.emptyEmail),
    password: Yup.string().required("Please enter password."),
  });

  return (
    <MainLayout>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className="m-4"
      >
        <img src={AppImages.logo} alt="logo-image" className={classes.logo} />
        <Typography variant="h5" className={`${classes.title} mb-3`}>
          Admin Login
        </Typography>
        <div className={classes.form}>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // localStorage.setItem("token","asdhkahdkjha")
              // BottomNavigation.navigate("dashboard")
               dispatch(loginInitiate(values, history))
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
                <form noValidate onSubmit={handleSubmit}>
                  <InputField
                    placeholder="Email Address"
                    // autoComplete='new-Email'
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    fullWidth
                    my
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}

                  />
                  <InputField
                    placeholder="Password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    name="password"
                    // autoComplete='new-Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password.trim()}
                    fullWidth
                    my
                  />
                  <Grid container justify="center">
                    <Typography
                      variant="body1"
                      display="block"
                      className={clsx([classes.authButton, classes.linkButton])}
                      onClick={() => history.push("/forgot-password")}
                    >
                      Forgot password?
                  </Typography>
                  </Grid>
                  <button
                    type="submit"
                    disabled={loading}
                    className={clsx([classes.authButton, classes.filledButton])}
                  >
                    Login
                </button>
                </form>
              )}
          </Formik>
        </div>
      </Grid>
    </MainLayout>
  );
};
