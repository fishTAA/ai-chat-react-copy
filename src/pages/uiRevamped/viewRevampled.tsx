import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Columns, Container, Heading, Hero, Block, Section, Content, Card } from 'react-bulma-components';
import Chat from '../../components/chat';
import { useParams, useNavigate } from 'react-router-dom';
import { FooterSection } from '../../components/Footer';
import image from '../../media/image.png';
import { BeatLoader } from 'react-spinners';
import { useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import './homepage.css';
import { articlesView} from '../uiRevamped/sample';

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


function UiRevampView() {

  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [document, setDocument ] = useState<DocumentUpload |null>(null)
  const urlparam = useParams();
  const strurlparam = JSON.stringify(urlparam.id)
  const [loadingTest, setLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState<Array<TestInterface>>([]);
  const [urlQuery, setUrlQuery] = useState("");
  let navigate = useNavigate();
  
  // Check if the user is authenticated
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();
  const account = localStorage.getItem("account") || "{}";

  // useEffect(()=> {
  //   if (inProgress === InteractionStatus.None && !isAuthenticated) {
  //     setLoadingTest(true)
  //     if(account) {
  //       instance.acquireTokenSilent({
  //         account: JSON.parse(account),
  //         scopes: ["openid", "profile"],
  //       }).then(e => {
  //         setLoadingTest(false);
  //       }).catch(e=> {
  //         console.log("here", e)
  //         navigate('/login')
  //       });
  //     } else {
  //       navigate('/login')
  //     }
  //   }
  // }, [inProgress]);

  // Handle collapsing of related topics
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const contentStyle = {
    display: collapsed ? 'none' : 'block',
  };

   // Retrieve document data
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
  
  // Function to check if a string contains HTML
  const containsHTML = (str: string) => /<\/?[a-z][\s\S]*>/.test(str);
  
  // console.log(headingdata)
  useEffect(() => {
    // Set the URL query as a string
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
    //   backgroundImage: `url(${image})`,
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <Hero
        hasNavbar={true}
        size="fullheight"
        style={{
          flexGrow: 1,
        }} >
        <NavigationBar/>
        <Hero.Body style={{display:'block',marginBlock: '40px'}}>
        <Columns marginless paddingless style={{height:'100%'}}>
         <Columns.Column className="is-two-third" 
        //  style={{border: '1px solid red'}}
         >
           <div className='mobile-view' style={{
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: '10px',
            padding: '10px',
            marginBlock: '0 10px',
            border: '1px solid #bcbcbc',
            boxShadow: 'none',
            fontSize:'40px'
          }}> TITLE: {articlesView[0].title}
          </div>
         <Container style={{
          borderInline: '1px solid #bcbcbc',
          padding: '10px',
          height: '100%'
          }}>
            {articlesView[0].content}
         </Container>
         </Columns.Column>
         <Columns.Column className="is-one-third" 
        //  style={{border: '1px solid blue'}}
         >
         <Container>
          <div className='mobile-view-2' style={{
            flexDirection: 'column',
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: '10px',
            padding: '10px',
            marginBlock: '0 10px',
            border: '1px solid #bcbcbc',
            boxShadow: 'none',
            fontSize:'40px'
          }}> TITLE: {articlesView[0].title}
          </div>
         </Container>
         <div className='sticky-container'>
          <Card 
          style={{
            display: 'flex',
            flexDirection: 'column',
            // width:'50%',
            backgroundColor: "#ffffff",
            borderRadius: '10px',
            padding: '10px',
            marginBlock: '0 10px',
            border: '1px solid #bcbcbc',
            boxShadow: 'none',
          }}
          > <div>Related Items</div>
          <Content 
          style={{
            borderBottom: '1px solid black',
            margin: '5px 0 5px 0',
          }}>
          </Content>
          {articlesView.map((items)=>
            (
              <div>{items.title}</div>
            ))}
          </Card>
            
         </div>
         </Columns.Column>
         </Columns>
      </Hero.Body>
      </Hero>
      <FooterSection/>
    </div>
  );
}
export default UiRevampView;