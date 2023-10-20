import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Block, Section } from 'react-bulma-components';
import Chat from '../../components/chat';
import { useParams, useNavigate } from 'react-router-dom';
import { FooterSection } from '../../components/Footer';
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
    style={{}}>
      <Hero
        hasNavbar={true}
        size="fullheight"
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:'#A7C6ED',
        }} >
        <Hero.Body paddingless>
          <Columns style={{ margin: 'none', marginTop: '10%', flexGrow: 1,
        overflowX: 'hidden', overflowY: 'hidden', whiteSpace: 'pre-wrap'
        }}>
            <Columns.Column size="three-quarters"
            style={{display: 'flex' ,
            flexDirection: 'column',
            paddingInline: 0,
            }}>
              <Container 
              style={{
                  paddingTop: 0,
                  minHeight: '100%',
                  marginInline: 0,
                }} >
                  <Section style={{ minHeight: '100%', paddingTop: 0}}>
                    <Container> 
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
                        paddingTop: 0,
                        fontWeight: 'bolder',
                         }}>
                      
                        {document?.title}
                        
                      </Heading>

                      <Section
                      style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        paddingInline: '10%',
                        backgroundColor: 'white',
                        minHeight: '100%',
                        textAlign: 'justify',
                        borderRadius: 9,
                        boxShadow: '0px 0px 5px #888888',
                        
                        }}>

                          {document?.solution && containsHTML(document.solution) ? (
                            <div dangerouslySetInnerHTML={{ __html: document?.solution }} />
                          ) : (
                            <p style={{ whiteSpace: 'pre-wrap'}}>{document?.solution}</p>
                        )}  
                      </Section>

                    </Container> 
                  </Section>
              </Container>
            </Columns.Column>

            <Columns.Column 
              size="one-quarter"
              style={{ 
              backgroundColor: 'white',                  
              display: 'flex' ,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 9,
              boxShadow: '0px 0px 5px #888888',
              }}>
              <div style={{
                        display: 'flex' ,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                <Content style={{ fontWeight: 'bolder', fontSize: 30, textAlign: 'center' }}> RELATED TOPICS </Content>
                {testResults.map((res)=>{
                  if(document?.title != res.title){
                    return (
                      <Container
                      style={{
                        alignItems: 'center',
                        margin: '2px'
                      }}>

                        <Block style={{
                        cursor: 'pointer',
                        margin: 10,
                        }}
                          onClick={()=> {
                            const cleanURL = urlQuery.replace(/"/g, '');
                            navigate('/view-solution/'+res._id+'/'+cleanURL)  
                            }}>
                            {res.title}
                        </Block>

                        </Container> 
                  )
                  }                      
                })} 
                </div>
                
            </Columns.Column>
          </Columns>      
        </Hero.Body>
        <FooterSection />
      </Hero>
    </div>
  );
}

export default App;
