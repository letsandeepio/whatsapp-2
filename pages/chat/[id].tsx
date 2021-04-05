import Head from 'next/head';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div``;

const Chat = () => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer></ChatContainer>
    </Container>
  );
};

export default Chat;
