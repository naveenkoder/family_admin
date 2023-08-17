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
import { faqAddAction, faqDeleteAction, faqListInitiate } from '../../store/actions'
import { Card, Table as BSTable, } from 'react-bootstrap';
import { toast } from 'react-toastify';
export const FAQManagement = () => {

    const styleProps = { searchable: true }
    // Hooks declarations
    const classes = useStyles(styleProps);
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch()
    const userList = useSelector(x => x.faqManagement.userList)
    const pagination = useSelector(x => x.faqManagement.pagination)
    const [payload, setPayload] = useState({ offset: 0, limit: 10, sort: "", order: 0, search: "" })
    const [currentPage, setCurrentPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [questionValue, setQuestionValue] = useState('')
    const [answerValue, setAnswerValue] = useState('')
    const cancelModel = () => setShowModal(false)


    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    // Global state initialization
    // const {sidebarRouteIndex,sidebarNestedRouteIndex} = appState

    //lifecycle hooks
    useEffect(() => {
        document.title = appConstants.title
        // dispatch(handleNavigationStateAction(1, false))
        dispatch(faqListInitiate(payload))
    }, [])

    //Callback methods
    const handleChange = (pagination, filters, sorter) => {
        const tempPayload = { ...payload, sort: sorter?.columnKey, order: sorter.order === "ascend" ? 1 : sorter.order === "descend" ? -1 : null, offset: currentPage === 1 ? 0 : (currentPage - 1) * 10 }
        setPayload(tempPayload)
        dispatch(faqListInitiate(tempPayload))
    }

    const handlePagination = (pagination) => {
        setCurrentPage(pagination)
        const tempPayload = { ...payload, offset: pagination == 1 ? 0 : (pagination - 1) * 10 }
        setPayload(tempPayload)
        dispatch(faqListInitiate(tempPayload))
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
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            sorter: true,
            ellipsis: false,
            // width: "250px",
            render: (key, data, index) => { return (<><span>{data.question}</span></>) }
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            sorter: true,
            ellipsis: false,
            // width: "250px",
            render: (key, data, index) => { return (<><span>{data.answer}</span></>) }
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

                        <button className="table-action-button" onClick={() => dispatch(faqDeleteAction({ id: data._id }, payload))}>
                            {"Delete"}
                        </button>

                    </Grid>
                )
            },
        }
    ];

    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/faq', name: "FAQ Management" }]} />
            <button className="add-category-button" onClick={() => { setShowModal(true) }}>Add FAQ</button>

            <Grid container className="mt-4" >
                <Navbar title="FAQ Management" />
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
                title="Add FAQ"
                closable={false}
                onCancel={cancelModel}
                centered={true}
                footer={[
                    <div className="delete-category-modal-footer">
                        <button onClick={() => {
                            if (questionValue && answerValue) {
                                dispatch(faqAddAction({
                                    "answer": answerValue,
                                    "question": questionValue
                                }, payload))
                                setQuestionValue('')
                                setAnswerValue('')
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
                                Question
                            </td>
                            <td className={classes.rowValue}>
                                <div className={classes.inputWrapper}>
                                    <InputField
                                        placeholder="Question"
                                        name="question"
                                        onChange={e => setQuestionValue(e.target.value)}
                                        type="text"
                                        value={questionValue}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.rowKey}>
                                Answer
                            </td>
                            <td className={classes.rowValue}>
                                <div className={classes.inputWrapper}>
                                    <InputField
                                        placeholder="Answer"
                                        name="answer"
                                        onChange={e => setAnswerValue(e.target.value)}
                                        type="text"
                                        value={answerValue}
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
