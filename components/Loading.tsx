import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
`;

const Loading = () => {
  return (
    <Container>
      <Logo src="https://i.pinimg.com/originals/c4/2c/93/c42c9352e2696ce633fc34ae711c2c68.png" />
      <CircularProgress
        style={{
          color: '#92B52B'
        }}
      />
    </Container>
  );
};

export default Loading;
