import React from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
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
            <Columns>
              <Columns.Column>
                <Heading>AI Chat</Heading>
                <Heading subtitle size={3}>
                  This page contains a chat component.<br/>
                  You can easily customize this component.
                </Heading>
                <Heading subtitle size={3}>
                </Heading>
                <img src="images/dummy.jpg" />
              </Columns.Column>
              <Columns.Column>
                <Card style={{ width: 400, margin: 'auto' }}>
                  <Card.Image
                    size="4by3"
                    src="http://bulma.io/images/placeholders/1280x960.png"
                  />
                  <Card.Content>
                    <Media>
                      <Media.Item renderAs="figure" align="center">
                        <img
                          alt="64x64"
                          width="350"
                          src="images/scr.png"
                        />
                      </Media.Item>
                    </Media>
                    <Content>
                      We're excited to announce a limited-time offer of free usage for our service! 
                      For a limited period, you can take advantage of our complete range of features without any charges. 
                      Don't wait any longer – start using our product/service for free today!
                    </Content>
                  </Card.Content>
                </Card>
              </Columns.Column>
            </Columns>
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
