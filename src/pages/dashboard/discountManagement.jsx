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
import { DiscountUpdateAction, getDiscountAction } from '../../store/actions';
import { toast } from 'react-toastify';

export const DiscountManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const data = useSelector(state => state.discountManagement.data);

  const validationSchema = Yup.object().shape({
    freeDeliveryPrice: Yup.number().required('Please enter minimum price for free delivery.'),
    shippingCharge: Yup.number().required('Please enter shipping price.'),
    framePrice: Yup.number().required('Please enter single frame price.'),
  })

  // Lifecycle Hooks
  useEffect(() => {
    document.title = appConstants.title
    dispatch(getDiscountAction());
  }, [])



  return (
    <DashboardLayout>
      <AppBar breadcrumbs={[{ route: '/discount', name: "Discount & Offers Management" }]} />
      <Navbar title="Discount & Offers Management" />
      <Card className={classes.card}>
        {/* <Box m={3} /> */}
        <Grid container>
          <Grid smUp={12} className={classes.tableContainerRow}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                freeDeliveryPrice: data?.freeDeliveryPrice,
                shippingCharge: data?.shippingCharge,
                framePrice: data?.framePrice,
                siteOfferPrice: data?.siteOfferPrice,
                siteOfferDiscount: data?.siteOfferDiscount
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if ((values.siteOfferPrice || values.siteOfferDiscount)) {
                  if (values.siteOfferPrice && values.siteOfferDiscount) {
                    dispatch(DiscountUpdateAction(values))
                  }
                  else {
                    return toast.error("Please enter Site offer price and Discount both or make both zero.", { toastId: "err" });
                  }
                }
                dispatch(DiscountUpdateAction(values))
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
                          Free Delivery Price
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Free Delivery Price"
                              name="freeDeliveryPrice"
                              error={Boolean(touched.freeDeliveryPrice && errors.freeDeliveryPrice)}
                              helperText={touched.freeDeliveryPrice && errors.freeDeliveryPrice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.freeDeliveryPrice}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Shipping Price
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Shipping Price"
                              name="shippingCharge"
                              error={Boolean(touched.shippingCharge && errors.shippingCharge)}
                              helperText={touched.shippingCharge && errors.shippingCharge}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.shippingCharge}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Single Frame Price
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Single Frame Price"
                              name="framePrice"
                              error={Boolean(touched.framePrice && errors.framePrice)}
                              helperText={touched.framePrice && errors.framePrice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.framePrice}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Site Offer Minimunm Price
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Site Offer Price"
                              name="siteOfferPrice"
                              error={Boolean(touched.siteOfferPrice && errors.siteOfferPrice)}
                              helperText={touched.siteOfferPrice && errors.siteOfferPrice}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.siteOfferPrice}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          {'Site Offer Discount(in %)'}
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Site Offer Discount (in %)"
                              name="siteOfferDiscount"
                              error={Boolean(touched.siteOfferDiscount && errors.siteOfferDiscount)}
                              helperText={touched.siteOfferDiscount && errors.siteOfferDiscount}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.siteOfferDiscount}
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
