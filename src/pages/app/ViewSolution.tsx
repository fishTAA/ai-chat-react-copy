import React, {useState} from 'react';
import logo from './logo.svg';
import { NavigationBar } from '../../components/NavigationBar';
import { Card, Columns, Container, Content, Footer, Heading, Hero, Media } from 'react-bulma-components';
import Chat from '../../components/chat';
export interface DocumentUpload {
  input: string;
  solution?: string ;
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

   retrieveDocumentData();
  // console.log(headingdata)

  return (
    
    <div
    style={{
      
    }}>
      <Hero
        hasNavbar={true}
        
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
                
                  {document?.solution}
                </div>
              </Container> 
        </Hero.Body>

        
      </Hero>

    </div>
  );
}

export default ViewSolution;
