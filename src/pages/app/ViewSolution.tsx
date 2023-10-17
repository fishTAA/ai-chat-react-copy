import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
import Chat from '../../components/chat';
export interface DocumentUpload {
  input: string;
  solution?: string;
  title?: string;
  uploadDate: string;
  embedding: [Number];
  score?: number;
}

function ViewSolution() {


  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const [document, setDocument ] = useState<DocumentUpload |null>(null)
  
  
  const retrieveDocumentData = () => {
    fetch("http://localhost:8000/findDocument?id=6529a54a2e8f5df090798122")
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        setDocument(res as DocumentUpload)
    })
  }

  // retrieveDocumentData();
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
                  Add 8x8 Site Cookies
                  {/* {document?.title} */}
                </Heading>

                <div
                style={{
                  paddingInline: '10%',
                  textAlign: 'justify'
                }}>
                  
                  Resolves the following error: “"dialog box is already opened”

For Edge, navigate to Settings, Cookie and site Permissions then manage and delete cookies and site data

For Chrome, navigate to Settings, Privacy and Security then Site Settings, scroll down to Cookie and Site Data

Add the following sites

sso.8x8.com

Cloud8.8x8.com

Make sure to check “Include third-party cookies on this site”
                
                  {/* {document?.solution} */}
                </div>
              </Container> 
        </Hero.Body>

        
      </Hero>

    </div>
  );
}

export default ViewSolution;
