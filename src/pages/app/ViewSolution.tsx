import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
import Chat from '../../components/chat';
import { useParams } from 'react-router-dom';

export interface DocumentUpload {
  input: string;
  solution?: string;
  title?: string;
  uploadDate: string;
  embedding: [Number];
  score?: number;
  
}

function App() {


  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [document, setDocument ] = useState<DocumentUpload |null>(null)
  const urlparam = useParams();
  const strurlparam = JSON.stringify(urlparam.id)
 
  
  console.log(strurlparam)
  console.log(`${endPoint}/findDocument?id=${urlparam.id}`)

  
  const retrieveDocumentData = () => {
    fetch(`${endPoint}/findDocument?id=${urlparam.id}`)
    // fetch('http://localhost:8000/findDocument?id=6529a54a2e8f5df090798122')
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        setDocument(res as DocumentUpload)
    })
  }

  retrieveDocumentData();
  // console.log(headingdata)

  return (
    
    <div>
      <Hero
        hasNavbar={true}
        size="fullheight"

        // color="primary"
        style={{
          backgroundColor:'#A7C6ED',
          
        }} >
        <Hero.Body 
        style={{
            padding: 10,
            
          }} >
        <Container
        style={{
          
        }}>  
                <Heading
                
                style={{
                  padding: 10,
                  fontWeight: 'bolder',
                  
                }}>
                
                  {document?.title}
                  
                </Heading>

                <div
                style={{
                  paddingInline: '10%',
                  textAlign: 'justify'
                }}>
                  
                  {document?.solution}
                
                  {/* {document?.solution} */}
                </div>
              </Container> 
        </Hero.Body>

        
      </Hero>

    </div>
  );
}

export default App;
