import React, { useState, useEffect, useRef } from 'react';
// Navigation
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import './dashboard.scss'
// antd
import { Input, Table, Button as AntButton, Modal, Pagination } from 'antd';
import { Card, Container, Row, Col } from 'react-bootstrap';

// fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
// Mui Components
import { Grid, useTheme, useMediaQuery, Box } from '@material-ui/core';
// Custom components
import DashboardLayout from '../../layouts/dashboardLayout'
import { AppBar, Button, PaginationBar, Navbar, NavbarSearch, ConfirmationModal } from '../../customComponents'
// Constants
import { AppImages } from '../../themes/appImages'
import { Colors } from '../../themes/colors'
import { appConstants } from '../../themes/constants'
// utils methods
import cl from '../../utils/cl'
import { useStyles } from '../../styles/styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { handleNavigationStateAction, categoryListInitiate, deleteCategoryInitiate } from '../../store/actions'

export const CategoryListing = () => {
    const styleProps = { searchable: true }
    // Hooks declarations
    const classes = useStyles(styleProps);
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch()
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [currentPage, setCurrentPage] = useState(1)
    const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null)
    const [payload, setPayload] = useState({ offset: 0, limit: 10, sort: "", order: 0, search: "" })
    const categotyList = useSelector(x => x.categoryManagement?.categoryList)
    const pagination = useSelector(x => x.categoryManagement.pagination)
    const [showModal, setShowModal] = useState(false)
    const cancelModel = () => setShowModal(false)

    useEffect(() => {
        document.title = appConstants.title;
        dispatch(categoryListInitiate(payload))
    }, [])

    const handleChange = (pagination, filters, sorter) => {

        const tempPayload = { ...payload, sort: sorter?.columnKey, order: sorter.order === "ascend" ? 1 : sorter.order === "descend" ? -1 : null, offset: currentPage === 1 ? 0 : (currentPage - 1) * 10 }
        setPayload(tempPayload)
        dispatch(categoryListInitiate(tempPayload))
    }

    const handleSearch = (e) => {

        if (!e.target.value.startsWith(" ")) {

            const tempPayload = { ...payload, search: e.target.value.trimLeft() }
            setPayload(tempPayload)
            dispatch(categoryListInitiate(tempPayload))
        }
        else e.target.value = ""
    }

    const handlePagination = (pagination) => {


        setCurrentPage(pagination)
        const tempPayload = { ...payload, offset: pagination == 1 ? 0 : (pagination - 1) * 10 }
        setPayload(tempPayload)
        dispatch(categoryListInitiate(tempPayload))
        window.scrollTo(0, 0)

    }

    const deleteCategory = () => {

        setShowModal(false)
        dispatch(deleteCategoryInitiate({ ...payload, id: currentSelectedCategory }))

    }
    const columns = [
        {
            title: 'Sr. No.',
            dataIndex: 'sr',
            key: 'sr',
            ellipsis: false,
            render: (key, data, index) => (<>{payload.offset + index + 1}</>),
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            ellipsis: false,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 100,
            align: 'center',
            render: (key, data) => {
                return (
                    <Grid className={classes.buttons}>
                        <button className="table-action-button" onClick={() => history.push({
                            pathname: "/edit-category",
                            state: data
                        })}>
                            Edit
                        </button>

                        <button className="table-action-button" onClick={() => {
                            setShowModal(true)
                            setCurrentSelectedCategory(data._id)
                        }} >
                            Delete
                        </button>
                    </Grid>
                )
            },
        },
    ];

    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/Category-Mangement', name: "Category Mangement" }]} />
            <button className="add-category-button" onClick={() => history.push('/add-category')}>Add Category</button>

            <Navbar title="Category Mangement" searchable onChange={handleSearch} value={payload.search} />
            <Card className={classes.card}>
                {matches &&
                    <Box className={classes.searchBox}>
                        <NavbarSearch />
                    </Box>
                }
                <Grid container>
                    <Grid smUp={12} className={classes.tableContainerRow}>
                        <Modal
                            visible={showModal}
                            title="Delete Category"
                            closable={false}
                            onCancel={cancelModel}
                            centered={true}
                            footer={[
                                <div className="delete-category-modal-footer">
                                    <button onClick={deleteCategory}>Delete</button>
                                    <button onClick={cancelModel}>Cancel</button>
                                </div>
                            ]}

                            className="delete-category-modal"
                        >
                            <div className="delete-category-modal-text">Are you sure to delete this category?</div>
                        </Modal>
                        <Table className={classes.tableWrapper} scroll bordered columns={columns} dataSource={categotyList} onChange={handleChange} />
                        <Pagination current={currentPage} total={pagination?.totalCount ? pagination.totalCount : 10} className="table-pagination" onChange={handlePagination} />

                    </Grid>
                </Grid>
            </Card>
        </DashboardLayout>
    );
}
