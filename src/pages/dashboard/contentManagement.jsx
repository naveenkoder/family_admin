import React, { useEffect } from 'react';
import 'antd/dist/antd.css'
import './dashboard.scss'
import * as Yup from 'yup';
import { Formik } from 'formik';
import clsx from "clsx";
import { Card, Table as BSTable, } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import DashboardLayout from '../../layouts/dashboardLayout'
import { InputField, Navbar, AppBar } from '../../customComponents'
import { appConstants } from '../../themes/constants'
import { useStyles } from '../../styles/styles'
import { useSelector, useDispatch } from 'react-redux'
import { ContentUpdateAction, getContentAction } from '../../store/actions';

export const ContentManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const data = useSelector(state => state.contentManagement.data);

  const validationSchema = Yup.object().shape({
    privacy: Yup.string()
      .required('Please enter Privacy policy.')
      .min(5, 'Privacy policy must be 500 characters long.'),
    term: Yup.string()
      .required('Please enter Terms and Condition.')
      .min(500, 'Terms and Condition must be 500 characters long.'),
  })

  // Lifecycle Hooks
  useEffect(() => {
    document.title = appConstants.title
    dispatch(getContentAction());
  }, [])



  return (
    <DashboardLayout>
      <AppBar breadcrumbs={[{ route: '/content', name: "Content Management" }]} />
      <Navbar title="ContentManagement" />
      <Card className={classes.card}>
        {/* <Box m={3} /> */}
        <Grid container>
          <Grid smUp={12} className={classes.tableContainerRow}>
            <Formik
              enableReinitialize={true}
              initialValues={{ privacy: data?.privacy, term: data?.term }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(ContentUpdateAction(values))
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
                          Privacy policy
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Privacy policy"
                              name="privacy"
                              error={Boolean(touched.privacy && errors.privacy)}
                              helperText={touched.privacy && errors.privacy}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.privacy}
                              style={{ width: '50vw' }}
                              textArea
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className={classes.rowKey}>
                          Terms and Condition
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Terms and Condition"
                              name="term"
                              error={Boolean(touched.term && errors.term)}
                              helperText={touched.term && errors.term}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.term}
                              style={{ width: '50vw' }}
                              textArea
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
                            Submit
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
