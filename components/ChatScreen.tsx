import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import firebase from 'firebase';
import { auth, db } from '../firebase';
import Message from './Message';
import MicIcon from '@material-ui/icons/Mic';
import { useState } from 'react';
import { getRecipientEmail } from '../utils/getRecipientEmail';

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > span {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessagesContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessages = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const router = useRouter();

  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id as string)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    e.preventDefault();
    db.collection('users')
      .doc(user.uid)
      .set({ lastSeen: timestamp }, { merge: true });
    db.collection('chats')
      .doc(router.query.id as string)
      .collection('messages')
      .add({
        timestamp,
        user: user.email,
        photoURL: user.photoURL,
        message: input
      });

    setInput('');
  };

  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          <span>Last Seen</span>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessagesContainer>
        {showMessages()}
        <EndOfMessages />
      </MessagesContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
