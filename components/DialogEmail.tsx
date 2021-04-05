import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import * as EmailValidator from 'email-validator';
import React, { useState } from 'react';

interface DialogEmailProps {
  open: boolean;
  onValidEmail: (arg1: string) => void;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogEmail = ({ open, onClose, onValidEmail }: DialogEmailProps) => {
  const [input, setInput] = useState('');

  const isInputValidEmail = () =>
    input !== '' && !EmailValidator.validate(input);

  const onSubmit = () => {
    if (EmailValidator.validate(input)) {
      onValidEmail(input);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <DialogTitle id="form-dialog-title">New Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the email address of the user you want to start a new
          chat with
        </DialogContentText>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={isInputValidEmail()}
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          helperText={
            isInputValidEmail() ? 'Valid email address is required' : ''
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEmail;
