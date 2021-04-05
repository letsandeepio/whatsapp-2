import { auth } from '../firebase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const ProfileMenu = ({ anchorEl, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const signOut = () => {
    onClose();
    auth.signOut();
  };
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={2}
      keepMounted
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <MenuItem onClick={signOut}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
