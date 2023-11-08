import { useAccount } from '@azure/msal-react';
import React, {useEffect, useState} from 'react';
import { Box, Block, Icon, Form, Button, Container, Notification, Hero} from "react-bulma-components";

interface TicketProps {
  setShowTicketForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Ticket = (props: TicketProps) => {
  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('@trajector.com');
  const [ticketClassification, setTicketClassification] = useState('');
  const [specificTopic, setSpecificTopic] = useState('');
  const [message, setMessage] = useState('');
  const [tocAgreed, setTocAgreed] = useState(false);
  const [questionValue, setQuestionValue] = useState('');
  const [submittingNotification, setSubmittingNotification] = useState<any>(<></>);

  // Get user account information from local storage
  const account = localStorage.getItem("account") || "{}";
  console.log(account);
  const userAccount = useAccount(JSON.parse(account));  

  // Get user account information from local storage
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setTicketClassification('');
    setMessage('');
    setQuestionValue('');
  };

  // Load user account information if available
  useEffect(() => {
    if (userAccount) {
      setUsername(userAccount.name || '');
      setEmail(userAccount.idTokenClaims?.preferred_username || '');
    }
  }, [userAccount]);
 
  // Function to submit the ticket form
  const submitTicketForm = () => {
    fetch(`${endPoint}/submitForm`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: username,
        email: email,
        ticketClassification: ticketClassification,
        specificTopic: specificTopic,
        message: message,
        questionValue: questionValue
      })
    }).then(() => {
      setSubmittingNotification(
        <Notification color="success">
          Ticket Created
        </Notification>
      );
      resetForm();
      window.location.replace('/');
    })
    .catch((error) => {
      setSubmittingNotification(
        <Notification color="danger">
          Error: {error.message}
        </Notification>
      );
    });
  }

  return (
    
    <Container
      style={{
        backgroundColor: 'rgba(0,0,0,.2)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        minWidth: '-webkit-fill-available'
        }}>
    <form
    style={{
      minHeight: 100,
      minWidth: '200px',
      padding: '20px', 
      margin: 80,
      borderRadius: 10,
      background: 'white',
      }}
      >
      <Form.Field >
        <Form.Label>Name</Form.Label>
        <Form.Control>
          <Form.Input className='userName'
            value={username}
            onChange={(e) => {
              return setUsername(e.target.value);
            }}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label >Email</Form.Label>
        <Form.Control>
          <Form.Input className='userEmail'
            value={email}
            onChange={(e) => {
              return setEmail(e.target.value);
            }}
          />
        
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Ticket Classification</Form.Label>
        <Form.Field style={{ display: "flex" }}>
          <Form.Control >
            <Form.Select
              value={ticketClassification}
              onChange={(e) => {
                return setTicketClassification(e.target.value);
              }}
            >x
              <option  value="crm"> CRM Issues </option>
              <option value="hardware"> Hardware Issues </option>
              <option value="software"> Software Issues </option>
              <option value="8x8"> 8x8 Issues </option>
              <option value="bria"> Bria Issues </option>
            </Form.Select>
          </Form.Control>
          <Form.Control fullwidth>
            <Form.Input className='Topic' placeholder="Specify Topic" 
             value={specificTopic}
             onChange={(e) => {
               return setSpecificTopic(e.target.value);
             }}/>
          </Form.Control>
        </Form.Field>
      </Form.Field>

      <Form.Field>
        <Form.Label>Message</Form.Label>
        <Form.Control>
          <Form.Textarea className='textareaMessage' placeholder="Describe the issue."
          value={message}
          onChange={(e) => {
            return setMessage(e.target.value);
          }}
        />
        </Form.Control>
      </Form.Field>
          
      <Form.Field>
      <Form.Label> Are other people experiencing this problem?</Form.Label>
        <Form.Control>
          <Form.Radio
            className='radioBTYes'
            value="yes"
            name="question"
            checked={questionValue === 'yes'}
            onChange={(e) => {
              return setQuestionValue(e.target.value);
            }}
          >
            {'  '} Yes - Others have this issue too 
          </Form.Radio>
          <br />
          <Form.Radio
            className='radioBTNo'
            value="no"
            name="question"
            checked={questionValue === 'no'}
            onChange={(e) => {
              return setQuestionValue(e.target.value);
            }}
          >
            {'  '} No
          </Form.Radio>
        </Form.Control>
      </Form.Field>

      <Form.Field kind="group">
          <Form.Control>
            <Button className='submitBT' color="link"
             onClick={submitTicketForm}>
              Submit
            </Button>
          </Form.Control>
          
          <Form.Control>
            <Button
              className='cancelBT'
              color="link"
              colorVariant="light"
              onClick={() => {
                resetForm();
                props.setShowTicketForm(false);
              }}
            >
              Cancel
            </Button>
          </Form.Control>
        </Form.Field>
        {submittingNotification}
      </form>
    </Container>
    
  );
}

