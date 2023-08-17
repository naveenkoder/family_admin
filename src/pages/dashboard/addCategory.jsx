import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'

// Navigation
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import './dashboard.scss'
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

// utils methods
import cl from '../../utils/cl'
import { useStyles } from '../../styles/styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { handleNavigationStateAction, userDetailInitiate, userDetailUpdateInitiate, addCategoryInitiate } from '../../store/actions'
import { toast } from 'react-toastify';
// Global constants

export const AddCategory = () => {
    // Hooks declarations
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation()
    const tabItemRef = useRef(null)
    const dispatch = useDispatch()
    const { appState } = useSelector(state => state)
    const userDetail = useSelector(state => state.userManagement.userDetail)

    const [values, setValues] = useState({
        name: "",
        gender: ''
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Please enter category name.')
            .min(2, 'Category name must be 2 characters long.')
            .max(15, "Category name should not be longer than 15 characters long.")
    })

    // Lifecycle Hooks
    useEffect(() => {
        document.title = appConstants.title

    }, [])

    useEffect(() => {

        setValues({
            name: userDetail.name ?? "",
            gender: userDetail.gender ?? "",
        })

    }, [userDetail])

    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/users', name: "category Management" }, { route: '/edit-user', name: "Add Category" }]} />
            <Navbar title="Add Category" />
            <Card className={classes.card}>
                {/* <Box m={3} /> */}
                <Grid container>
                    <Grid smUp={12} className={classes.tableContainerRow}>
                        <Formik
                            enableReinitialize={true}
                            initialValues={values}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {

                                dispatch(addCategoryInitiate({ name: values.name }, history))
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
                                                        Category Name
                                                </td>
                                                    <td className={classes.rowValue}>
                                                        <div className={classes.inputWrapper}>
                                                            <InputField
                                                                placeholder="Category Name"
                                                                name="name"
                                                                error={Boolean(touched.name && errors.name)}
                                                                helperText={touched.name && errors.name}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                type="text"
                                                                value={values.name}
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
                                                            Add
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
