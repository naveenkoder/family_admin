export const ValidationConstants = {
    'invalid': {
        'email': {
            'invalidEmail': 'Please enter valid email address.',
            'invalidEmailorPassword': 'Invalid email address or password.',
            'unRegisteredEmail': 'Please enter registered email address.',
        },
        'password': {
            'shortPassword': 'Password should be alteast 6 characters long.',
            'longPassword': "Password must contain less than 255 characters",
            'unmathcedConfirm': 'Password and confirm password must be same.',
        },
        'name': {
            'shortName': 'Name should be alteast 2 characters long.',
        },
        'contact': {
            'incorrectContactLength': 'Phone number should be between 8 to 15 digits.',
            'incorrectContact': 'Please enter valid phone number.',
        },

    },
    'empty': {
        'emptyEmail': 'Please enter email address.',
        'emptyOldPassword': 'Please enter old password.',
        'emptyNewPassword': 'Please enter new password.',
        'emptyPassword': 'Please enter password.',
        'emptyConfirm': 'Please enter confirm password.',
        'emptyContact': 'Please enter phone number.',
        'emptyName': 'Please enter name.',
        'subject': 'Please enter subject.',
        'message': 'Please enter message.',
    },
    'success': {
        'registerSuccess': 'You have been registered successfully.',
        'verifyRegisteration': 'You have been registered successfully! Please verify your email address to login into the website.',
        'forgotSuccess': 'Forgot password link has been sent to your registered email address. ',
        'updateSuccess': 'User details has been updated successfully. ',
        'blockSuccess': 'User has been blocked successfully.',
        'unBlockSuccess': 'User has been unblocked successfully.',
        'userAddedSuccess': 'User has been added successfully.',
        'deleteSuccess': 'User has been delete successfully.',
        'blockedEmail': 'Your account has been blocked by admin.',
    },
    'offline': 'Your internet connection appears to be offline. Please try again.'

}

export const appConstants = {

    "title": "Family Vibes",

    'headerTitle': {
        'login': 'Family Vibes | Login',
        'forgotPassword': 'Family Vibes | Forgot Password',
        'dashboard': 'Family Vibes | Dashboard',
        'userManagement': 'Family Vibes | User Management',
        'userDetails': 'Family Vibes | User Details',
        'editUserDetails': 'Family Vibes | Edit User Details',
        'savedLocations': 'Family Vibes | Saved Locations',
        'terminalAreaListing': 'Family Vibes | Terminal Area Listing',
        'addTerminalArea': 'Family Vibes | Add Terminal Area',
        'editTerminalArea': 'Family Vibes | Edit Terminal Area',
        'importTerminalArea': 'Family Vibes | Import Terminal Area',
        'categoryListing': 'Family Vibes | Category Listing',
        'addTerminal': 'Family Vibes | Add Terminal',
        'editTerminal': 'Family Vibes | Edit Terminal',
        'importTerminal': 'Family Vibes | Import Terminal',
        'managePost': 'Family Vibes | Manage Post',
        'postDetails': 'Family Vibes | Post Details',
        'reportPost': 'Family Vibes | Report post',
        "resetPassword": "Family Vibes | Reset Password",
        "changePassword": "Family Vibes | Change Password"
    },
    'tooltip': {
        'uploadImage': 'Click here to upload terminal image.',
        'changeImage': 'Click here to change terminal image.',
        'uploadFile': "Click here to upload file.",
        'changeFile': "Click here to change file.",
    },
    "axiosConstants": {

        "offline": "Your internet connection appears to be offline. Please try again.",
        "messageStatus500": "Something went wrong.",
    },
    "authentication": {
        "loggedIn": "Logged in successfully.",
        "loggedOut": "Logged out successfully.",
        "forgotPasswordLinkSent": "A verification link has been sent to your registered email address."

    }


}