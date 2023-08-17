import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import DateRangeSharpIcon from '@mui/icons-material/DateRangeSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import EventRepeatSharpIcon from '@mui/icons-material/EventRepeatSharp';
import TodaySharpIcon from '@mui/icons-material/TodaySharp';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
// Styles
import 'antd/dist/antd.css'
import './dashboard.scss'
// antd
import { Card, } from 'react-bootstrap';
// Mui Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// Custom components
import DashboardLayout from '../../layouts/dashboardLayout'
import { AppBar, Navbar } from '../../customComponents'
// Constants
import { AppImages } from '../../themes/appImages'
import { Colors } from '../../themes/colors'
import { appConstants } from '../../themes/constants'
// utils methods
import cl from '../../utils/cl'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { handleNavigationStateAction, handleClearStateAction, dashboardInitiate } from '../../store/actions'
// Global constants

// Custom styles
const useStyles = makeStyles((theme) => ({
    card: {
        top: -40,
        position: 'relative',
        width: '100%',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        borderRadius: 3,
        backgroundColor: '#ffffff',
        marginBottom: 50,

    },
    leftCard: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: 12.5,
        },
    },
    rightCard: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 15,
        },
    },
    cardLink: {
        '&:hover $cardTitle': {
            color: `${Colors.primary} !important`,
        }
    },
    cardImage: {
        height: "200px",
        width: 200,
        color: "#000000"
    },
    cardTitle: {
        textAlign: 'center',
        // paddingTop: '5%',
        // paddingBottom: '5%',
        fontSize: 14,
        fontWeight: 'unset',
        color: '#3c4858 !important',
        marginTop: '50px',
        borderTop: "solid 1px rgba(0, 0, 0, 0.1)",
        paddingTop: "15px"
    },
}));

export const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const dashboardData = useSelector(x => x.userManagement.dashboard)

    const [dashboardState, setDashboardState] = useState([
        {
            title: "Total number of users registered in this week",
            icon: PeopleAltSharpIcon,
            value: 0
        },
        {
            title: "Total number of users registered in this month",
            icon: PeopleAltSharpIcon,
            value: 0
        },
        {
            title: "Total number of users registered in this Year",
            icon: PeopleAltSharpIcon,
            value: 0
        },
        {
            title: "Total number of order placed in this week",
            icon: PeopleAltSharpIcon,
            value: 0
        },
        {
            title: "Total number of order placed in this month",
            icon: PeopleAltSharpIcon,
            value: 0
        },
        {
            title: "Total number of order placed in this year",
            icon: PeopleAltSharpIcon,
            value: 0
        },
    ])

    useEffect(() => {
        document.title = appConstants.title;
        dispatch(handleNavigationStateAction(0, false))
        dispatch(dashboardInitiate())
    }, [])

    useEffect(() => {

        setDashboardState([
            {
                title: "Total number of users registered in this week",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.orders?.lastWeek
            },
            {
                title: "Total number of users registered in this month",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.orders?.lastMonth
            },
            {
                title: "Total number of users registered in this Year",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.orders?.lastYear
            },
            {
                title: "Total number of order placed in this week",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.users?.lastWeek
            },
            {
                title: "Total number of order placed in this month",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.users?.lastMonth
            },
            {
                title: "Total number of order placed in this year",
                icon: PeopleAltSharpIcon,
                value: dashboardData?.users?.lastYear
            },

        ])
    }, [dashboardData])

    return (
        <DashboardLayout>
            <AppBar breadcrumbs={[{ route: '/', name: "Dashboard" }]} />
            <Navbar title="Dashboard" />
            <Card className={classes.card} >
                <Card.Body />
            </Card>
            <Grid container>

                {
                    dashboardState?.map((i, index) => {

                        return (
                            <Grid lg={4} sm={6} xs={12} spacing={2} className={classes.leftCard}>
                                <Card className={clsx([classes.card])}>
                                    <Card.Body className="dashboard-card-body">

                                        <div className={`card-body-floating-box${index < 4 ? index + 1 : index - 4 + 1}`}>
                                            {index < 3 ?
                                                <PeopleAltSharpIcon className="dashboard-card-icon" />
                                                : <InventorySharpIcon className="dashboard-card-icon" />}

                                        </div>

                                        <div className='dashboard-card-body-value'>{i?.value}</div>
                                        <Card.Title className={classes.cardTitle}>
                                            {i.title}
                                        </Card.Title>

                                    </Card.Body>
                                </Card>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </DashboardLayout>
    );
}
