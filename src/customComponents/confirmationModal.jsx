import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from './styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop:theme.spacing(1.4),
    paddingBottom:theme.spacing(1.4),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop:theme.spacing(1.4),
    paddingBottom:theme.spacing(1.4),

  },
}))(MuiDialogActions);

export default function ConfirmationModal(props) {
  const classes = useStyles()
  const {visible,setVisible,title,text} = props

  return (
    <div>
      <Dialog onClose={setVisible} aria-labelledby="customized-dialog-title" open={visible}>
        <DialogTitle id="customized-dialog-title" onClose={setVisible}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText className={classes.confirmationText}>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  onClick={setVisible} variant="outlined" color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={setVisible} variant="contained" color="primary" size="small">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}