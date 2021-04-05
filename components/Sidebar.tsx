import { Avatar, Button, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import CustomDialog from './CustomDialog';
import DialogEmail from './DialogEmail';
import ProfileMenu from './ProfileMenu';
import Chat from './Chat';

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
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);

  const [chatSnapshots] = useCollection(userChatRef);

  const handleCustomDialogClose = () => {
    setCustomDialogOpen(false);
  };

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
    if (email === user.email) {
      window.setTimeout(() => setCustomDialogOpen(true), 1000);
    } else if (!chatAlreadyExists(email)) {
      db.collection('chats').add({
        users: [user.email, email]
      });
    }
  };

  const chatAlreadyExists = (recipientEmail: string) =>
    !!chatSnapshots?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

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
      {chatSnapshots?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
      <DialogEmail
        open={open}
        onClose={handleDialogClose}
        onValidEmail={handleEmail}
      />
      <CustomDialog
        open={customDialogOpen}
        onClose={handleCustomDialogClose}
        message="It is nice to talk to yourself sometime, unfortunately this feature is not supported by this app at the moment."
      />
    </Container>
  );
};

export default Sidebar;
