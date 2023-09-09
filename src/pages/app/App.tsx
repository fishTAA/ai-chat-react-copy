import React from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Container, Content, Footer, Heading, Hero } from 'react-bulma-components';
import Chat from '../../components/chat';

function App() {
  return (
    <div>
      <Hero
        hasNavbar={true}
        size="fullheight"
        color="info"
      >
        <Hero.Body>
          <Container>
            <Heading>OUR AI Chat</Heading>
            <Heading subtitle size={3}>
              This page contains a chat component
            </Heading>
            <img src="http://dummy-images.com/abstract/dummy-480x270-Map.jpg" />
          </Container>
        </Hero.Body>
        <Hero.Footer p={5}>
          <Content style={{ textAlign: 'center' }}>
              <strong>Created</strong> by{' '}
              <a href="https://www.linkedin.com/in/srilan-catalinio/">Srilan Catalinio</a>.
          </Content>
        </Hero.Footer>
      </Hero>
      <Chat 
        width={400}
      />
    </div>
  );
}

export default App;
