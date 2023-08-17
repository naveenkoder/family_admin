import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '../themes/colors'
export const useStyles = makeStyles((theme) => ({
    searchBox: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    // ======> Login Screen <======
    logo: {
        width: 100,
        height: 100,
    },
    form: {
        width: '100%',
        textAlign: 'center',
    },
    title: {
        color: Colors.title,
        fontWeight: '500 !important',
        fontSize: '24px !important',
        marginTop: '10px !important',
        marginBottom: '10px !important',
    },
    authButton: {
        border: 'none',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: 16,
        cursor: 'pointer',
    },
    filledButton: {
        border: 'none',
        color: Colors.white,
        padding: '7px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
        transitionDuration: '0.4s',
        cursor: 'pointer',
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: Colors.primary,
        borderRadius: 4,
        // '&:hover':{
        //     backgroundColor:Colors.white,
        //     color:Colors.primary,
        // },
        // '&:focus':{
        //     outlineColor:Colors.primary,
        // },
    },
    linkButton: {
        width: '40%',
        border: 'none',
        paddingBottom: 8,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500 !important',
        transitionDuration: '0.4s',
        cursor: 'pointer',
        color: '#555555',
        '&:hover': {
            color: Colors.primary,
            textDecoration: 'none',
        }
    },


    // ======> Forgot Screen <======
    iconWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: '#f09C01',
        float: 'none',
        height: 30,
        width: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        cursor: 'pointer',
    },
    // ======> User details Screen <======
    // card inside all pages
    card: {
        position: 'relative',
        width: '100%',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
        borderRadius: 3,
        color: 'rgba(0,0,0, 0.87)',
        backgroundColor: '#ffffff',
        top: -40,
    },
    tableWrapper: {
        overflow: 'auto !important',
        '& .ant-table-container': {
            border: '0 !important',
        },
        '& .ant-table-container .ant-table-cell:last-child': {
            borderRight: '0 !important',
        },
        border: '1px solid #dddddd',
    },
    rowKey: {
        width: 217,
        verticalAlign: 'middle !important',
        fontSize: 17,
        fontWeight: 500,
        color: '#000000DE'
    },
    inputWrapper: {
        width: 300,
        position: 'relative',
    },
    tableContainerRow: {
        width: '100%',
        overflow: 'auto',
        marginLeft: 15,
        marginRight: 15,
        [theme.breakpoints.down('xs')]: {
            marginTop: props => props.searchable ? 15 : 60,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: props => props.searchable ? 60 : 60,
        },
        '& .ant-table-cell': {
            borderColor: '#dddddd !important',
        },
        '& .ant-table-tbody:last-child': {
            borderColor: '#dddddd !important',
        },
        '& .ant-table-container': {
            borderColor: '#dddddd !important',
        },
        '& .table-bordered th, .table-bordered td': {
            borderColor: '#dddddd !important',
        },
    },
    rowValue: {
        verticalAlign: 'middle !important',
    },
    // ** +edit user
    selectInput: {
        width: '100%',
        verticalAlign: 'middle !important',
        fontSize: 14,
        fontWeight: 500,
        color: '#555555',
    },
    buttons: {
        // minWidth: 200,
        justifyContent: 'space-around',
        '& :last-child': {
            marginRight: 0,
        }
    },
    // terminal area listing
    buttonBarWrapper: {
        marginBottom: '0.75rem',
    },
    // import terminal area
    uploadButton: {
        '&:focus': {
            outline: 0,
        },
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },
    // Category Listing
    shareIcon: {
        width: 30,
    },
    shareBtn: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        '&:hover': {
            backgroundColor: '#7F913Fe6',
            borderColor: '#7F913Fe6',
        },
        alignItems: 'center',
        justifyContent: "spaceBetween"
    },
    terminalLogo: {
        width: 70,
        height: 70,
        objectFit: 'contain',
    },
    // edit terminal

    dropdownIcon: {
        fontSize: 16,
        color: '#b2b2b2',
        right: '12px',
        position: 'absolute',
        cursor: 'pointer',
    },
    timeIcon: {
        fontSize: 16,
        color: '#555555',
        top: 11.5,
        right: 12,
        position: 'absolute',
        cursor: 'pointer',
    },
    mapLogo: {
        width: '100%',
        backgroundColor: '#f4f4f4 !important',
    },
    selectedPaginationItem: {

        borderColor: '#7F913Fe6',
    }
    // ===> Navbar <===


}));


