import React, { useState, useEffect } from 'react';
import moment from 'moment'
// Navigation
import { useHistory } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import './dashboard.scss'
// antd
import { Table, Pagination, Modal } from 'antd';
import { Grid, useTheme, useMediaQuery, Box } from '@material-ui/core';
// Custom components
import DashboardLayout from '../../layouts/dashboardLayout'
import { AppBar, Button, PaginationBar, Navbar, NavbarSearch, InputField } from '../../customComponents'
// Constants
import { appConstants } from '../../themes/constants'
// utils methods
import { useStyles } from '../../styles/styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { testimonialAddAction, testimonialDeleteAction, testimonialListInitiate } from '../../store/actions'
import { toast } from 'react-toastify';
import { Card, Table as BSTable, } from 'react-bootstrap';
export const TestimonialManagement = () => {

    const styleProps = { searchable: true }
    // Hooks declarations
    const classes = useStyles(styleProps);
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch()
    const userList = useSelector(x => x.testimonialManagement.userList)
    const pagination = useSelector(x => x.testimonialManagement.pagination)
    const [payload, setPayload] = useState({ offset: 0, limit: 10, sort: "", order: 0, search: "" })
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [imageValue, setImageValue] = useState('');
    const [feedbackValue, setFeedbackValue] = useState('');
    const cancelModel = () => setShowModal(false)


    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    // Global state initialization
    // const {sidebarRouteIndex,sidebarNestedRouteIndex} = appState

    //lifecycle hooks
    useEffect(() => {
        document.title = appConstants.title
        // dispatch(handleNavigationStateAction(1, false))
        dispatch(testimonialListInitiate(payload))
    }, [])

    //Callback methods
    const handleChange = (pagination, filters, sorter) => {
        const tempPayload = { ...payload, sort: sorter?.columnKey, order: sorter.order === "ascend" ? 1 : sorter.order === "descend" ? -1 : null, offset: currentPage === 1 ? 0 : (currentPage - 1) * 10 }
        setPayload(tempPayload)
        dispatch(testimonialListInitiate(tempPayload))
    }

    const handlePagination = (pagination) => {
        setCurrentPage(pagination)
        const tempPayload = { ...payload, offset: pagination == 1 ? 0 : (pagination - 1) * 10 }
        setPayload(tempPayload)
        dispatch(testimonialListInitiate(tempPayload))
        window.scrollTo(0, 0)

    }
    const columns = [
        {
            title: 'Sr. No.',
            dataIndex: 'sr',
            key: 'sr',
            ellipsis: false,
            width: "80px",
            render: (key, data, index) => (<>{payload.offset + index + 1}</>),
        },
        {
            title: 'Image',
            dataIndex: 'media',
            key: 'media',
            sorter: true,
            // width: "250px",
            render: (key, data, index) => (<><img style={{ height: 100, width: 100 }} src={data.media}></img></>),
        },
        {
            title: 'Review',
            dataIndex: 'text',
            key: 'text',
            sorter: true,
            ellipsis: true,
            // width: "250px",
            render: (key, data, index) => { return (<><span>{data.text}</span></>) }
        },

        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'Action',
            // width: "300px",
            align: 'center',
            render: (key, data) => {
                return (
                    <Grid className={classes.buttons}>

                        <button className="table-action-button" onClick={() => dispatch(testimonialDeleteAction({ id: data._id }, payload))}>
                            {"Delete"}
                        </button>

                    </Grid>
                )
            },
        }
    ];

    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/testimonial', name: "Testimonial Management" }]} />
            <button className="add-category-button" onClick={() => { setShowModal(true) }}>Add Testimonial</button>

            <Grid container className="mt-4" >
                <Navbar title="Testimonial Management" />
                <Card className={classes.card}>
                    {matches &&
                        <Box className={classes.searchBox}>
                            <NavbarSearch />
                        </Box>
                    }
                    <Grid container>
                        <Grid smUp={12} className={classes.tableContainerRow}>
                            <Table className={classes.tableWrapper} scroll bordered columns={columns} dataSource={userList} onChange={handleChange} />
                            <Pagination current={currentPage} total={pagination?.totalCount ? pagination.totalCount : 10} className="table-pagination" onChange={handlePagination} />

                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Modal
                visible={showModal}
                title="Add Testimonial"
                closable={false}
                onCancel={cancelModel}
                centered={true}
                footer={[
                    <div className="delete-category-modal-footer">
                        <button onClick={() => {
                            if (imageValue && feedbackValue) {
                                dispatch(testimonialAddAction({
                                    "media": imageValue,
                                    "text": feedbackValue
                                }, payload))
                                setImageValue('')
                                setFeedbackValue('')
                                cancelModel()
                            }
                            else {
                                toast.error('Please fill the form.')
                            }
                        }}>Add</button>
                    </div>
                ]}

                className="delete-category-modal"
            >
                <BSTable striped bordered>
                    <tbody>
                        <tr>
                            <td className={classes.rowKey}>
                                Select Image
                            </td>
                            <td className={classes.rowValue}>
                                <div className={classes.inputWrapper}>
                                    <InputField
                                        placeholder="Select Image"
                                        name="image"
                                        onChange={e => setImageValue(e.target.files[0])}
                                        type="file"
                                        value={imageValue?.path}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.rowKey}>
                                Review Feedback
                            </td>
                            <td className={classes.rowValue}>
                                <div className={classes.inputWrapper}>
                                    <InputField
                                        placeholder="Review feedback"
                                        name="feedback"
                                        onChange={e => setFeedbackValue(e.target.value)}
                                        type="text"
                                        value={feedbackValue}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </BSTable>
            </Modal>
        </DashboardLayout>
    );
}
