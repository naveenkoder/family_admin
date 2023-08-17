import React, { useEffect, useState } from 'react';
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
import { HomeUpdateAction, getHomeAction, globalLoader } from '../../store/actions';
import { uploadFile } from "../../utils/s3Bucket";

export const HomeManagement = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [imageValue, setImageValue] = useState('');
  const [imageValue2, setImageValue2] = useState('');
  const [imageValue3, setImageValue3] = useState('');
  const data = useSelector(state => state.homeManagement.data);

  const validationSchema = Yup.object().shape({
    instragram: Yup.string().required('Please enter instagram social link.'),
    facebook: Yup.string().required('Please enter facebook social link.'),
    youTube: Yup.string().required('Please enter youtube social link.'),
    pinterest: Yup.string().required('Please enter pinterest social link.'),
    secondContentTitle: Yup.string().required('Please enter second box title.'),
    secondContentDesc: Yup.string().required('Please enter second box description.'),
    firstContentTitle: Yup.string().required('Please enter first box title.'),
    firstContentDesc: Yup.string().required('Please enter first title.'),
    firstContentYoutube1: Yup.string().required('Please enter first box youtube link 1.'),
    firstContentYoutube2: Yup.string().required('Please enter first box youtube link 2.'),
    firstContentYoutube3: Yup.string().required('Please enter first box youtube link 3.'),
    firstContentYoutube4: Yup.string().required('Please enter first box youtube link 4.'),
  })

  // Lifecycle Hooks
  useEffect(() => {
    document.title = appConstants.title
    dispatch(getHomeAction());
  }, [])



  return (
    <DashboardLayout>
      <AppBar breadcrumbs={[{ route: '/home', name: "Home Management" }]} />
      <Navbar title="Home Management" />
      <Card className={classes.card}>
        {/* <Box m={3} /> */}
        <Grid container>
          <Grid smUp={12} className={classes.tableContainerRow}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                instragram: data?.instragram,
                facebook: data?.facebook,
                youTube: data?.youTube,
                pinterest: data?.pinterest,
                secondContentTitle: data?.secondContent?.title,
                secondContentDesc: data?.secondContent?.description,
                firstContentTitle: data?.firstContent?.title,
                firstContentDesc: data?.firstContent?.description,
                firstContentYoutube1: data?.firstContent?.links[0],
                firstContentYoutube2: data?.firstContent?.links[1],
                firstContentYoutube3: data?.firstContent?.links[2],
                firstContentYoutube4: data?.firstContent?.links[3],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                dispatch(globalLoader(true));
                const imgUrls = {
                  image1: data?.secondContent?.links[0],
                  image2: data?.secondContent?.links[1],
                  image3: data?.secondContent?.links[2]
                }
                if (imageValue) {
                  imgUrls.image1 = await uploadFile(imageValue)

                }
                if (imageValue2) {
                  imgUrls.image2 = await uploadFile(imageValue2)
                }
                if (imageValue3) {
                  imgUrls.image3 = await uploadFile(imageValue3)
                }
                const tempData = {
                  "instragram": values?.instragram,
                  "twitter": values?.instragram,
                  "facebook": values?.facebook,
                  "pinterest": values?.pinterest,
                  "youTube": values?.youTube,
                  "secondContent": {
                    "description": values?.secondContentDesc,
                    "title": values?.secondContentTitle,
                    "links": [
                      imgUrls.image1,
                      imgUrls.image2,
                      imgUrls.image3
                    ]
                  },
                  "firstContent": {
                    "description": values?.firstContentDesc,
                    "title": values?.firstContentTitle,
                    "links": [
                      values?.firstContentYoutube1,
                      values?.firstContentYoutube2,
                      values?.firstContentYoutube3,
                      values?.firstContentYoutube4
                    ]
                  }
                }

                dispatch(HomeUpdateAction(tempData))
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
                          Instragram Link
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Instragram Link"
                              name="instragram"
                              error={Boolean(touched.instragram && errors.instragram)}
                              helperText={touched.instragram && errors.instragram}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.instragram}
                              style={{ width: '50vw' }}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Facebook Link
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Facebook Link"
                              name="facebook"
                              error={Boolean(touched.facebook && errors.facebook)}
                              helperText={touched.facebook && errors.facebook}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.facebook}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Youtube Link
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Youtube Link"
                              name="youTube"
                              error={Boolean(touched.youTube && errors.youTube)}
                              helperText={touched.youTube && errors.youTube}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.youTube}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Pinterest Link
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Pinterest Link"
                              name="pinterest"
                              error={Boolean(touched.pinterest && errors.pinterest)}
                              helperText={touched.pinterest && errors.pinterest}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.pinterest}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Title
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="First Box Title"
                              name="firstContentTitle"
                              error={Boolean(touched.firstContentTitle && errors.firstContentTitle)}
                              helperText={touched.firstContentTitle && errors.firstContentTitle}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.firstContentTitle}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Description
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="First Box Description"
                              name="firstContentDesc"
                              error={Boolean(touched.firstContentDesc && errors.firstContentDesc)}
                              helperText={touched.firstContentDesc && errors.firstContentDesc}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.firstContentDesc}
                              textArea
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Youtube Link 1
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="First Box Youtube Link 1"
                              name="firstContentYoutube1"
                              error={Boolean(touched.firstContentYoutube1 && errors.firstContentYoutube1)}
                              helperText={touched.firstContentYoutube1 && errors.firstContentYoutube1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.firstContentYoutube1}
                              style={{ width: '50vw' }}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Youtube Link 2
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              style={{ width: '50vw' }}
                              placeholder="First Box Youtube Link 2"
                              name="firstContentYoutube2"
                              error={Boolean(touched.firstContentYoutube2 && errors.firstContentYoutube2)}
                              helperText={touched.firstContentYoutube2 && errors.firstContentYoutube2}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.firstContentYoutube2}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Youtube Link 3
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="First Box Youtube Link 3"
                              name="firstContentYoutube3"
                              error={Boolean(touched.firstContentYoutube3 && errors.firstContentYoutube3)}
                              helperText={touched.firstContentYoutube3 && errors.firstContentYoutube3}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              style={{ width: '50vw' }}
                              type="text"
                              value={values.firstContentYoutube3}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          First Box Youtube Link 4
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="First Box Youtube Link 4"
                              name="firstContentYoutube4"
                              error={Boolean(touched.firstContentYoutube4 && errors.firstContentYoutube4)}
                              helperText={touched.firstContentYoutube4 && errors.firstContentYoutube4}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.firstContentYoutube4}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Second Box Title
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Second Box Title"
                              name="secondContentTitle"
                              error={Boolean(touched.secondContentTitle && errors.secondContentTitle)}
                              helperText={touched.secondContentTitle && errors.secondContentTitle}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.secondContentTitle}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Second Box Description
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper}>
                            <InputField
                              placeholder="Second Box Description"
                              name="secondContentDesc"
                              error={Boolean(touched.secondContentDesc && errors.secondContentDesc)}
                              helperText={touched.secondContentDesc && errors.secondContentDesc}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              style={{ width: '50vw' }}
                              value={values.secondContentDesc}
                              textArea
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Second Box Image Link 1
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper} style={{ display: 'flex', gap: 12 }}>
                            <img src={imageValue ? URL.createObjectURL(imageValue) : data?.secondContent?.links[0]} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                            <InputField
                              placeholder="Select Image"
                              name="image"
                              onChange={e => setImageValue(e.target.files[0])}
                              type="file"
                              value={imageValue?.path}
                              accept="image/png, image/gif, image/jpeg"
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className={classes.rowKey}>
                          Second Box Image Link 2
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper} style={{ display: 'flex', gap: 12 }}>
                            <img src={imageValue2 ? URL.createObjectURL(imageValue2) : data?.secondContent?.links[1]} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                            <InputField
                              placeholder="Select Image"
                              name="image"
                              onChange={e => setImageValue2(e.target.files[0])}
                              type="file"
                              value={imageValue2?.path}
                              accept="image/png, image/gif, image/jpeg"
                            />
                          </div>
                        </td>
                      </tr>

                      {/* <tr>
                        <td className={classes.rowKey}>
                          Second Box Image Link 3
                        </td>
                        <td className={classes.rowValue}>
                          <div className={classes.inputWrapper} style={{ display: 'flex', gap: 12 }}>
                            <img src={imageValue3 ? URL.createObjectURL(imageValue3) : data?.secondContent?.links[2]} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                            <InputField
                              placeholder="Select Image"
                              name="image"
                              onChange={e => setImageValue3(e.target.files[0])}
                              type="file"
                              value={imageValue3?.path}
                              accept="image/png, image/gif, image/jpeg"
                            />
                          </div>
                        </td>
                      </tr> */}

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
