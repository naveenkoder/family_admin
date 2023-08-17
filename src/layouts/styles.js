import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../themes/colors'

const drawerWidth = 260;
export const useStyles = makeStyles((theme) => ({
  // ==> Global styles<==
  flex: {
    display: 'flex !important',
  },
  // ===> MainLayout Component <====
  wrapper: {
    height: '100%',
    position: 'fixed',
  },
  bg: {
    extend: 'flex',
    width: '100%',
    padding: '5%',
  },
  page: {
    extend: 'flex',
    minWidth: '240px',
    width: '60%',
    maxWidth: '389px',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255)',
    borderRadius: theme.spacing(1) * 0.5,
    border: '1px solid #cccccc',
    boxShadow: "0 4px 8px 0 #f09C01, 0 6px 20px 0 #f09C01",
  },
  // ===> DashboardLayout Component <===
  sidebarTab: {
    extend: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    cursor: 'pointer',
  },

  sidebarBtnText: {
    lineHeight: 30,
    fontSize: 17,
    margin: 0,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerLogo: {
    position: 'relative',
    textAlign: 'center',
    padding: theme.spacing(1.1)
  },
  title: {
    fontWeight: 500,
    color: "#f09C01"
  },
  listPadding: {
    padding: 0,
  },
  sidebarList: {
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
    // border: 0,
    // boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
  sidebarIcon: {
    width: 18,
    marginTop: 2,
  },
  // typographyRoot:{
  //   margin:'0 !important',
  // },
  breadIcon: {
    width: 24,
    marginBottom: 4,
  },
  // necessary for content to be below app bar
  customNavbar: {
    padding: 0,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  customNavbarShift: {
    padding: 0,
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    display: 'flex',
  },
  appBar: {
    padding: '1%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    padding: '1%',
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('sm')]: {
      marginRight: drawerWidth,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingLeft: '1%',
    paddingRight: '1%',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'baseline',
      justifyContent: 'flex-end',
    },
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#f09C01',
    marginRight: theme.spacing(2),
    '&:focus': {
      outline: "none"
    },
    '&:hover': {
      background: '#f5f8f9',
    },
    marginRight: 0,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down('sm')]: {
    //   marginRight: drawerWidth,
    // },
  },
  breadcrumbIcon: {
    fontSize: 21,
    marginTop: 5,
  },
  sidebarIconContainer: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    float: 'left',
    marginRight: 13,
  },
  icon: {
    width: '21px !important',
    fontSize: 21,
    lineHeight: 30,
    textAlign: 'center',
  },
  seletcedTabIcon: {
    width: '23px !important',
    fontSize: 23,
    lineHeight: 30,
    textAlign: 'center',
  },
  nestedMenuWrapper: {
    backgroundColor: Colors.white,
    marginTop: '0.5rem',
    borderRadius: 4,
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
  logo: {
    width: 100,
    height: 100,
    cursor: 'pointer',
  }
}))