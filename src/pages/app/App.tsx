import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media, Form, Box, Button } from 'react-bulma-components';
import Chat from '../../components/chat';
import { Ticket } from '../../components/Ticket';

function App() {
  const [document, setDocument] = useState("");

  return (
    <div>
      <Hero
        hasNavbar={true}
        size="fullheight"
        
        // color="primary"
        style={{
          paddingTop: 100,
          backgroundColor:'#A7C6ED',
        }}  
      >
        <Hero.Body
        >
          <Container>
          <Form.Field kind="addons">
            <Form.Control fullwidth>
              <Form.Input
                    onChange={(e)=>setDocument(e.target.value)}
                    value={document}
                    placeholder="Search"
                    
                    style={{
                      borderRadius: "20px",
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize:"none"

                    }}
                    />
            </Form.Control>
            <Form.Control>
              <Button
              onClick={()=>setDocument('')}

              style={{
                borderRadius: "20px",
                maxHeight: "50px",
                minHeight: "50px",
                overflow: "hidden",
                resize:"none"

              }}
              >Clear</Button>
            </Form.Control>
          </Form.Field>
          <Form.Field
          style={{
            paddingInline: 100,
          }}
          >
                {/* <Form.Control>
                  <Form.Textarea
                    onChange={(e)=>setDocument(e.target.value)}
                    value={document}
                    placeholder="Search"

                    style={{
                      borderRadius: 20,
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize:"none"

                    }}

                  />
                </Form.Control> */}
                
          </Form.Field>

<section>
            <Columns
            style={{
              paddingTop: 20
            }}>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Card style={{  width: '90%', margin: 10, minHeight: '100%'}}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              Add 8x8 Site Cookies (Chrome)
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                      Resolves the following error: “"dialog box is already opened”
                      </Content>
                    </Card.Content>
                </Card>
              </Columns.Column>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Card style={{  width: '90%', margin: 10, minHeight: '100%'}}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              Add 8x8 Site Cookies (Edge)
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                      Resolves the following error: “"dialog box is already opened”
                      </Content>
                    </Card.Content>
                </Card>


              </Columns.Column>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Card style={{ width: '90%', margin: 10, minHeight: '100%'}}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              8x8 Browser Pop-ups
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                      Resolves the issue of 8x8 creating pop-ups on new tabs
                      </Content>
                    </Card.Content>
                </Card>
              </Columns.Column>
              
            </Columns>
            </section>

            <section>
            <Columns
            style={{
              paddingTop: 20
            }}>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Card style={{  width: '90%', margin: 10, minHeight: '100%'}}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              8x8 opening multiple windows on Zoho (Chrome)
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                      Fix for 8x8 opening multiple windows on Zoho (Chrome)
                      </Content>
                    </Card.Content>
                </Card>
              </Columns.Column>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                 <Card style={{  width: '90%', margin: 10, minHeight: '100%' }}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              Article 5
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                        iaculis mauris. <a>@bulmaio</a>.<a href="#1">#css</a>{' '}
                        <a href="#2">#responsive</a>
                      </Content>
                    </Card.Content>
                 </Card>

              </Columns.Column>
              <Columns.Column
              style={{
                display: 'flex' ,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
               <Card style={{ width: '90%', margin: 10, minHeight: '100%', backgroundColor: '#e9eda7', cursor: 'pointer'  }}>
                    <Card.Content>
                      <Media>
                        <Media.Item>
                          <Heading size={4}
                          style={{
                            color:"black",
                            }}
                            >
                              Submit Ticket
                            </Heading>
                        
                        </Media.Item>
                      </Media>
                      <Content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                        iaculis mauris. <a>@bulmaio</a>.<a href="#1">#css</a>{' '}
                        <a href="#2">#responsive</a>
                      </Content>
                    </Card.Content>
                </Card>
              </Columns.Column>
              
            </Columns>
            </section>
          </Container>
        </Hero.Body>
        <Hero.Footer p={5}>
          <Content style={{ textAlign: 'center' }}>
              <strong>Created</strong> by{' '}
              <a>LaSson and ToLay</a>.
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
