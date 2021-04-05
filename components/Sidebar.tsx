import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import ProfileMenu from './ProfileMenu';
import DialogEmail from './DialogEmail';

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  margin: 0px;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const IconsContainer = styled.div``;

const SidebarChat = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const showDialog = () => {
    setOpen(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmail = (email: string) => {
    console.log(email);
  };
  const createChat = () => {
    const input = prompt(
      'Please enter an email address you wish to chat with:'
    );
    if (!input) return null;
    if (true) {
      db.collection('chats').add({
        users: [user.email, input]
      });
    }
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={handleClick} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarChat onClick={showDialog}>Start a new chat </SidebarChat>
      <ProfileMenu anchorEl={anchorEl} onClose={handleClose} />
      <DialogEmail
        open={open}
        onClose={handleDialogClose}
        onValidEmail={handleEmail}
      />
    </Container>
  );
};

export default Sidebar;
