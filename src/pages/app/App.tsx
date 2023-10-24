import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media, Form, Table,Button,Block } from 'react-bulma-components';
import Chat from '../../components/chat';
import { Ticket } from '../../components/Ticket';
import { FooterSection } from '../../components/Footer';
import Manage from '../manage';
import { useLocation, useNavigate, useParams,Link} from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import image from '../../media/image.png';

function App() {
  interface TestInterface {
    _id: string,
    input: string,
    title: string,
    score: number,
    solution?: string
  }

  let navigate = useNavigate();
  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [loadingTest, setLoadingTest] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [document, setDocument] = useState("");

  const handleTestEmbeddings = () => {
      setLoadingTest(true);
      fetch(`${endPoint}/testEmbedding`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          keyword: document,
        })
      }).then((res)=> {
        return res.json()
      }).then((res)=> {
        setTestResults(res.related);
        console.log(res.related);
      }).finally(()=> {
        setLoadingTest(false);
      })
    }

  
  

  return (
    <>
    { showTicketForm && (
      < Ticket setShowTicketForm={setShowTicketForm} />
    )}
    <div>
      <NavigationBar/>
      <Hero
        hasNavbar={true}
        size="fullheight"
        
        // color="primary"
        style={{
          paddingTop: 100,
          backgroundImage: `url(${image})`,
          height: '100vh',
          backgroundSize:'contain',
          // backgroundColor:'#A7C6ED',
        }}  
      >
        <Hero.Body>
          <Container> 
          <Form.Field kind="addons">
            <Form.Control fullwidth>
              <Form.Input
                    onChange={(e)=>setDocument(e.target.value)}
                    onKeyDown={(e)=>{
                      if (e.key === `Enter`)
                        handleTestEmbeddings()
                      }}
                      
                    value={document}
                    placeholder="Search"                      
                      style={{
                      boxShadow: '2px 2px 5px 0px #888888',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderRight: 'none',
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "hidden",
                      resize:"none",
                      marginTop: -50,
                    }}
                    />
            </Form.Control>
            <Form.Control>
              <Button
              onClick={()=>{
                setDocument('');
                setTestResults([]);

              }}

              style={{
                boxShadow: '2px 2px 5px 0px #888888',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: 'none',
                maxHeight: "50px",
                minHeight: "50px",
                overflow: "hidden",
                resize:"none",
                marginTop: -50,
              }}
              >Clear</Button>
            </Form.Control>
          </Form.Field>

          <Form.Field
          style={{
            paddingInline: 100,
          }}
            >
            {loadingTest? (
            <>
              <Block style={{
              display: 'flex' ,
              flexDirection: 'column',
              alignItems: 'center', 
              }}>
                <BeatLoader color="#36d7b7"
                    size={35} />
              </Block>
          </>
          ):null}
          </Form.Field>

<section>
            <Columns
            style={{
              paddingTop: 20
            }}>
              {testResults.map((res)=>{        
                    return (
                      <Columns.Column className='is-one-third'
                      style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                      <Card style={{maxWidth: '70%', minWidth: '100%', margin: 10, minHeight: '100%'}}
                        onClick={()=> {
                          navigate('view-solution/'+res._id+'/'+document)
                        }}>
                            <Card.Content>
                              <Media>
                                <Media.Item>
                                  <Heading
                                  
                                  size={4}
                                    >
                                      {res.title}
                                    </Heading>
                                
                                </Media.Item>
                              </Media>
                              <Content>
                                {res.input}
                              </Content>
                            </Card.Content>
                        </Card>

                        
                      </Columns.Column> 
                    )
              })}   
              
              <Columns.Column className='is-one-third'
                      style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                <Card 
                  onClick={()=>setShowTicketForm(true)}
                  style={{ width: '100%', margin: 10, minHeight: '100%', backgroundColor: '#307FE2', cursor: 'pointer'  }}>
                  <Card.Content>
                    <Media>
                      <Media.Item>
                        <Heading size={4}
                        style={{
                          color:"white",
                          }}
                          >
                            Submit Ticket
                          </Heading>
                      
                      </Media.Item>
                    </Media>
                    <Content style={{
                          color:"white",
                          }}>
                      Can't find what you're looking for? Submit a ticket!
                    </Content>
                  </Card.Content>

                  
              </Card>    
            </Columns.Column>
            </Columns>
            </section>
          </Container>
        </Hero.Body>
        <FooterSection />
      </Hero>
      
      <Chat 
        width={350}
      />
    </div>
    </>
  );
}

export default App;

