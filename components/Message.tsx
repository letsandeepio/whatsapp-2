import styled from 'styled-components';

const Container = styled.div``;

const Messages = ({ user, message }) => {
  return <Container>{message}</Container>;
};

export default Messages;
