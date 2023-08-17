import React, { useState, useEffect } from 'react';
import moment from 'moment'
// Navigation
import { useHistory } from 'react-router-dom'
// Styles
import 'antd/dist/antd.css'
import './dashboard.scss'
// antd
import { Table, Pagination } from 'antd';
import { Card, } from 'react-bootstrap';
import { Grid, useTheme, useMediaQuery, Box } from '@material-ui/core';
// Custom components
import DashboardLayout from '../../layouts/dashboardLayout'
import { AppBar, Button, PaginationBar, Navbar, NavbarSearch } from '../../customComponents'
// Constants
import { appConstants } from '../../themes/constants'
// utils methods
import { useStyles } from '../../styles/styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { userBlockInitiate, userListInitiate } from '../../store/actions'
export const UserManagement = () => {

    const styleProps = { searchable: true }
    // Hooks declarations
    const classes = useStyles(styleProps);
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch()
    const userList = useSelector(x => x.userManagement.userList)
    const pagination = useSelector(x => x.userManagement.pagination)
    const [payload, setPayload] = useState({ offset: 0, limit: 10, sort: "", order: 0, search: "" })
    const [currentPage, setCurrentPage] = useState(1)


    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    // Global state initialization
    // const {sidebarRouteIndex,sidebarNestedRouteIndex} = appState

    //lifecycle hooks
    useEffect(() => {
        document.title = appConstants.title
        // dispatch(handleNavigationStateAction(1, false))
        dispatch(userListInitiate(payload))
    }, [])

    //Callback methods
    const handleChange = (pagination, filters, sorter) => {

        const tempPayload = { ...payload, sort: sorter?.columnKey, order: sorter.order === "ascend" ? 1 : sorter.order === "descend" ? -1 : null, offset: currentPage === 1 ? 0 : (currentPage - 1) * 10 }
        setPayload(tempPayload)
        dispatch(userListInitiate(tempPayload))
    }

    const handleSearch = (e) => {

        if (!e.target.value.startsWith(" ")) {

            const tempPayload = { ...payload, search: e.target.value.trimLeft() }
            setPayload(tempPayload)
            dispatch(userListInitiate(tempPayload))
        }
        else e.target.value = ""
    }

    const handlePagination = (pagination) => {


        setCurrentPage(pagination)
        const tempPayload = { ...payload, offset: pagination == 1 ? 0 : (pagination - 1) * 10 }
        setPayload(tempPayload)
        dispatch(userListInitiate(tempPayload))
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
            title: 'User Id',
            dataIndex: '_id',
            key: '_id',
            sorter: true,
            ellipsis: true
        },
        {
            title: 'Image',
            dataIndex: 'picture',
            key: 'picture',
            sorter: true,
            // width: "250px",
            render: (key, data, index) => (<><img style={{ height: 100, width: 100 }} src={data.profile}></img></>),
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            ellipsis: true,
            // width: "250px",
            render: (key, data, index) => { return (<><span>{data.email}</span></>) }
        },


        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            ellipsis: false,
            ellipsis: true

        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            ellipsis: false,
            // width: "180px",
            render: (key, data) => (<>{data.createdAt ? moment(data.createdAt).format("DD-MM-YYYY") : "N/A"}</>)
        },
        // {
        //     title: 'Actions',
        //     dataIndex: 'action',
        //     key: 'Action',
        //     // width: "300px",
        //     align: 'center',
        //     render: (key, data) => {
        //         return (
        //             <Grid className={classes.buttons}>
        //                 {/* <button className="table-action-button" onClick={() => history.push({
        //                     pathname: '/view-user-details',
        //                     state: data._id
        //                 })} >
        //                     View
        //                 </button>

        //                 <button className="table-action-button" onClick={() => history.push({
        //                     pathname: '/edit-user',
        //                     state: data._id
        //                 })}>
        //                     Edit
        //                 </button> */}

        //                 <button className="table-action-button" onClick={() => dispatch(userBlockInitiate({ id: data._id }))}>
        //                     {data.block ? "Unblock" : "Block"}
        //                 </button>

        //             </Grid>
        //         )
        //     },
        // },
    ];
    console.log(userList, "sadad;ald;asd;sa");
    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/users', name: "User Management" }]} />
            <Grid container className="mt-4" >
                <Navbar title="User Management" searchable onChange={handleSearch} value={payload.search}

                />
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
        </DashboardLayout>
    );
}
