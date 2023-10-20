import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media, Progress, Block, Message } from 'react-bulma-components';
import Chat from '../../components/chat';
import { useParams, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

 export interface DocumentUpload {
  input: string;
  solution?: string ;
  title?: string;
  uploadDate: string;
  embedding: [Number];
  score?: number;
  
}
interface TestInterface {
  _id: string,
  input: string,
  title: string,
  score: number,
  solution?: string
}

function App() {


  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [document, setDocument ] = useState<DocumentUpload |null>(null)
  const urlparam = useParams();
  const strurlparam = JSON.stringify(urlparam.id)
  const [loadingTest, setLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [urlQuery, setUrlQuery] = useState("");
  let navigate = useNavigate();
  

  const retrieveDocumentData = () => {
    setLoadingTest(true);
    fetch(`${endPoint}/findDocument?id=${urlparam.id}`)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        setDocument(res as DocumentUpload)
    }).finally(()=> {
      setLoadingTest(false);
    })
  }
  useEffect(() => {
    if(urlQuery)
    handleTestEmbeddings();
  }, [urlQuery]);

  
  useEffect(() => {
   retrieveDocumentData()
  }, [urlparam.id]);
  
  const containsHTML = (str: string) => /<\/?[a-z][\s\S]*>/.test(str);
  // console.log(headingdata)
  useEffect(() => {
    const query  = JSON.stringify(urlparam.query)
    setUrlQuery(query);
    console.log("query",query)
  }, []);


  const handleTestEmbeddings = () => {
    setLoadingTest(true);
    fetch(`${endPoint}/testEmbedding`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword: urlQuery,
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
    
    <div
    style={{
      
    }}
    >
      <Hero
        hasNavbar={true}
        size="fullheight"
        style={{
          backgroundColor:'#A7C6ED',
        }} >
        <Hero.Body 
        style={{
            padding: 10,
            paddingTop: 100,
            alignItems: 'unset'  
          }} >
          <Container
            style={{
            }}>    
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
              
                <Heading
                
                style={{
                  padding: 20,
                  fontWeight: 'bolder',
                }}>
                
                  {document?.title}
                  
                </Heading>

                <div
                style={{
                  paddingInline: '10%',
                  textAlign: 'justify',
                }}>
                    
                    {document?.solution && containsHTML(document.solution) ? (
                      <div dangerouslySetInnerHTML={{ __html: document?.solution }} />
                    ) : (
                      <p>{document?.solution}</p>
                    )}  
                </div>
              </Container> 
        </Hero.Body>

        {testResults.map((res)=>{   
            if(document?.title != res.title){
              return (
                <Columns.Column className='is-one-third'
                style={{
                  display: 'flex' ,
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Card style={{  maxWidth: '70%', minWidth: '100%', margin: 10, minHeight: '100%'}}
                  onClick={()=> {


                    window.scrollTo({top:0,left:0,behavior:'smooth'})
                    setLoadingTest(true)
                    const cleanURL = urlQuery.replace(/"/g, '');
                    navigate('/view-solution/'+res._id+'/'+cleanURL)
                      
                  }}>
                      <Card.Content>
                        <Media>
                          <Media.Item>
                            <Heading
                            
                            size={4}
                            style={{
                              color:"black",
                              }}
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
            }                      
        })}       
        
      </Hero>

    </div>
  );
}

export default App;
