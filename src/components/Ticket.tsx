import React, {useState} from 'react';
import { Box, Block, Icon, Form, Button, Container } from "react-bulma-components";

export const Ticket = () => {
        const [username, setUsername] = useState('Name');
        const [email, setEmail] = useState('@trajector.com');
        const [subject, setSubject] = useState('');
        const [message, setMessage] = useState('');
        const [tocAgreed, setTocAgreed] = useState(false);
        const [questionValue, setQuestionValue] = useState('');
      
        return (
          <Container
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', zIndex: 99, minWidth: '-webkit-fill-available'}}>
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
                <Form.Input
                  value={username}
                  onChange={(e) => {
                    return setUsername(e.target.value);
                  }}
                />
              </Form.Control>
            </Form.Field>
      
            <Form.Field>
              <Form.Label>Email</Form.Label>
              <Form.Control>
                <Form.Input
                  value={email}
                  onChange={(e) => {
                    return setEmail(e.target.value);
                  }}
                />
              
              </Form.Control>
            </Form.Field>
      
            <Form.Field>
              <Form.Label>Subject</Form.Label>
              <Form.Field kind="group">
                <Form.Control>
                  <Form.Select
                    value={subject}
                    onChange={(e) => {
                      return setSubject(e.target.value);
                    }}
                  >
                    <option value="ticket-class"> Ticket Classification </option>
                    <option value="crm"> CRM Issues </option>
                    <option value="hardware"> Hardware Issues </option>
                    <option value="software"> Software Issues </option>
                    <option value="8x8"> 8x8 Issues </option>
                    <option value="bria"> Bria Issues </option>
                  </Form.Select>
                </Form.Control>
                <Form.Control fullwidth>
                  <Form.Input placeholder="Specify Topic" />
                </Form.Control>
              </Form.Field>
            </Form.Field>
      
            <Form.Field>
              <Form.Label>Message</Form.Label>
              <Form.Control>
                <Form.Textarea placeholder="Describe the issue."
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
                <Button color="link">Submit</Button>
              </Form.Control>
              <Form.Control>
                <Button color="link" colorVariant="light">
                  Cancel
                </Button>
              </Form.Control>
            </Form.Field>
          </form>
          </Container>
        );
}

