// import React, { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom'
// import { Table as BSTable, } from 'react-bootstrap';

// // Styles
// import 'antd/dist/antd.css'
// // antd
// import { Card, } from 'react-bootstrap';
// // Mui Components
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// // Custom components
// import DashboardLayout from '../../layouts/dashboardLayout'
// import { AppBar, Navbar, InputField } from '../../customComponents'
// // Constants
// import { AppImages } from '../../themes/appImages'
// import { Colors } from '../../themes/colors'
// import { appConstants } from '../../themes/constants'
// // Redux
// import { useDispatch, useSelector } from 'react-redux'
// import { Formik } from 'formik';
// import * as Yup from "yup";
// import { ValidationConstants } from "../../themes/constants";
// import clsx from "clsx";
// // styles
// import { useStyles } from "../../styles/styles";
// import { changePasswordInitiate } from '../../store/actions';
// import '../dashboard/dashboard.scss'

// export const ChangePassword = () => {
//     const classes = useStyles();
//     const history = useHistory();
//     const dispatch = useDispatch()
//     const loading = useSelector(x => x.authentication.isLoading)


//     const values = {
//         oldPassword: "",
//         password: "",
//         confirmPasssword: ""
//     };

//     const validationSchema = Yup.object().shape({
//         oldPassword: Yup.string().required("Please enter old password."),
//         password:
//             Yup.string().required("Please enter new password.")
//                 .min(6, "New password should be at least 8 characters long."),
//         confirmPasssword: Yup.string()
//             .oneOf(
//                 [Yup.ref("password"), null],
//                 "Confirm new password must match with new password."
//             )
//             .required("Please enter confirm new password."),
//     });

//     useEffect(() => {
//         document.title = appConstants.title;
//     }, [])

//     return (
//         <DashboardLayout>
//             <AppBar breadcrumbs={[{ route: '/', name: "dashboard" }]} />
//             <Navbar title="Change Password" />
//             <Card className={classes.card} >
//                 <Card.Body />
//             </Card>
//             <Grid container>
//                 <Formik
//                     enableReinitialize={true}
//                     initialValues={values}
//                     validationSchema={validationSchema}
//                     onSubmit={(values) => {

//                         dispatch(changePasswordInitiate({ oldPassword: values.oldPassword, newPassword: values.password }, history))
//                     }}
//                 >
//                     {({
//                         values,
//                         errors,
//                         handleBlur,
//                         handleChange,
//                         handleSubmit,
//                         isSubmitting,
//                         touched,
//                     }) => (
//                         <form onSubmit={handleSubmit} className="change-password-form">
//                             <BSTable striped bordered>
//                                 <tbody>
//                                     <tr>
//                                         <td className={classes.rowKey}>
//                                             Old Password
//                                         </td>
//                                         <td className={classes.rowValue}>
//                                             <div className={classes.inputWrapper}>

//                                                 <InputField
//                                                     placeholder="Old Password"
//                                                     error={Boolean(touched.oldPassword && errors.oldPassword)}
//                                                     helperText={touched.oldPassword && errors.oldPassword}
//                                                     name="oldPassword"
//                                                     // autoComplete='new-Password'
//                                                     onBlur={handleBlur}
//                                                     onChange={handleChange}
//                                                     type="password"
//                                                     // value={values.oldPassword.trim()}
//                                                     fullWidth
//                                                     my
//                                                 />
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className={classes.rowKey}>New Password</td>
//                                         <td className={classes.rowValue}>
//                                             <div className={classes.inputWrapper}>
//                                                 <InputField
//                                                     placeholder="New Password"
//                                                     error={Boolean(touched.password && errors.password)}
//                                                     helperText={touched.password && errors.password}
//                                                     name="password"
//                                                     // autoComplete='new-Password'
//                                                     onBlur={handleBlur}
//                                                     onChange={handleChange}
//                                                     type="password"
//                                                     // value={values.password.trim()}
//                                                     fullWidth
//                                                     my
//                                                 />
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className={classes.rowKey}>Confirm New Password</td>
//                                         <td className={classes.rowValue}>
//                                             <div className={classes.inputWrapper}>
//                                                 <InputField
//                                                     placeholder="Confirm New Password"
//                                                     error={Boolean(touched.confirmPasssword && errors.confirmPasssword)}
//                                                     helperText={touched.confirmPasssword && errors.confirmPasssword}
//                                                     name="confirmPasssword"
//                                                     // autoComplete='new-Password'
//                                                     onBlur={handleBlur}
//                                                     onChange={handleChange}
//                                                     type="password"
//                                                     // value={values.confirmPassword.trim()}
//                                                     fullWidth
//                                                     my
//                                                 />
//                                             </div>
//                                         </td>
//                                     </tr>

//                                     <tr>
//                                         <td className={classes.rowKey}></td>
//                                         <td className={classes.rowValue}>
//                                             <button
//                                                 type="submit"
//                                                 disabled={loading}
//                                                 className={clsx([classes.authButton, classes.filledButton])}
//                                             >
//                                                 Submit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </BSTable>
//                         </form>
//                     )}
//                 </Formik>
//             </Grid>
//         </DashboardLayout>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'

// Navigation
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import '../dashboard/dashboard.scss'
// Third party Components
import * as Yup from 'yup';
import { Formik } from 'formik';
import clsx from "clsx";

// antd
import { Breadcrumb, Input, Table, Space } from 'antd';
import { Card, Container, Row, Col, Table as BSTable, } from 'react-bootstrap';
// Mui Components
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Paper, Grid, CssBaseline, List, Box, Select, Typography, Divider, ListItem, useTheme, Collapse, Breadcrumbs, ListItemText, ListItemIcon } from '@material-ui/core';
// Custom components
import DashboardLayout from '../../layouts/dashboardLayout'
import { InputField, Navbar, AppBar, Button } from '../../customComponents'
// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
// Constants
import { AppImages } from '../../themes/appImages'
import { Colors } from '../../themes/colors'
import { ValidationConstants, appConstants } from '../../themes/constants'
import { passwordRegex } from '../../themes/regex'
// utils methods
import cl from '../../utils/cl'
import { useStyles } from '../../styles/styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { changePasswordInitiate, handleNavigationStateAction, userDetailInitiate, userDetailUpdateInitiate } from '../../store/actions'
// Global constants

export const ChangePassword = () => {
    // Hooks declarations
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation()
    const tabItemRef = useRef(null)
    const dispatch = useDispatch()


    const values = {
        oldPassword: "",
        password: "",
        confirmPasssword: ""
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Please enter old password.")
            .test(
                "trim",
                "Please enter old password.",
                (value) => {

                    return value?.trim()?.length > 0
                }
            ),
        password:
            Yup.string().required("Please enter new password.")
                .test(
                    "trim",
                    "Please enter new password.",
                    (value) => {
                        return value?.trim()?.length > 0
                    }
                )
                .min(8, "New password should be at least 8 characters long.")
                .matches(passwordRegex, "New password must include 1 upper case letter, 1 lower case letter, 1 numeric value, 1 special character and no spaces.")
        ,
        confirmPasssword: Yup.string()
            .required("Please enter confirm new password.")
            .test(
                "trim",
                "Please enter confirm new password.",
                (value) => {

                    return value?.trim()?.length > 0
                }
            )
            .oneOf(
                [Yup.ref("password"), null],
                "Confirm new password must match with new password."
            )
    });

    useEffect(() => {
        document.title = appConstants.title;
    }, [])


    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/change-password', name: "Change Password" }]} />
            <Navbar title="Change Password" />
            <Card className={classes.card}>
                {/* <Box m={3} /> */}
                <Grid container>
                    <Grid smUp={12} className={classes.tableContainerRow}>
                        <Formik
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {

                                dispatch(changePasswordInitiate({ oldPassword: values.oldPassword, newPassword: values.password }, history))
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
                                <form onSubmit={handleSubmit}>
                                    <BSTable striped bordered>
                                        <tbody>
                                            <tr>
                                                <td className={classes.rowKey}>
                                                    Old Password
                                                </td>
                                                <td className={classes.rowValue}>
                                                    <div className={classes.inputWrapper}>
                                                        <InputField
                                                            placeholder="Old Password"
                                                            error={Boolean(touched.oldPassword && errors.oldPassword)}
                                                            helperText={touched.oldPassword && errors.oldPassword}
                                                            name="oldPassword"
                                                            // autoComplete='new-Password'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            type="password"
                                                            value={values.oldPassword.trim()}
                                                            fullWidth
                                                            my
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.rowKey}>New Password</td>
                                                <td className={classes.rowValue}>
                                                    <div className={classes.inputWrapper}>
                                                        <InputField
                                                            placeholder="New Password"
                                                            name="password"
                                                            error={Boolean(touched.password && errors.password)}
                                                            helperText={touched.password && errors.password}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            type="password"
                                                            value={values.password.trim()}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.rowKey}>Confirm New Password</td>
                                                <td className={classes.rowValue}>
                                                    <div className={classes.inputWrapper}>
                                                        <InputField
                                                            placeholder="Confirm New Password"
                                                            name="confirmPasssword"
                                                            error={Boolean(touched.confirmPasssword && errors.confirmPasssword)}
                                                            helperText={touched.confirmPasssword && errors.confirmPasssword}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            type="password"
                                                            value={values.confirmPasssword.trim()}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={classes.rowKey}></td>
                                                <td className={classes.rowValue}>
                                                    <button
                                                        type="submit"
                                                        className={clsx([classes.authButton, classes.filledButton])}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </BSTable>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Card>
        </DashboardLayout>
    );
}
