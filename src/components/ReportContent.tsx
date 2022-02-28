import React, {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ContentDialog: FC<any> = (props) => {
  return (
    <BootstrapDialog
      maxWidth="md"
      fullWidth
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        Sent: {props.title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {props.content}
      </DialogContent>
    </BootstrapDialog>
  )
}

export default ContentDialog