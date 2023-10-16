import React, {useState} from 'react';
import { Box, Block, Icon, Form, Button } from "react-bulma-components";

export const Ticket = () => {
        const [username, setUsername] = useState('bulma');
        const [email, setEmail] = useState('hello@');
        const [subject, setSubject] = useState('');
        const [message, setMessage] = useState('');
        const [tocAgreed, setTocAgreed] = useState(false);
        const [questionValue, setQuestionValue] = useState('');
      
        return (
          <form
          style={{
            position: 'absolute',
            width: '50%',
            padding: '10px', 
            margin: 5,
            borderRadius: 6,
            zIndex: 100,
            background: 'white',
           }}
           >
            <Form.Field >
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <Form.Input
                  color="success"
                  value={username}
                  onChange={(e) => {
                    return setUsername(e.target.value);
                  }}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-user" />
                </Icon>
                <Icon align="right" size="small">
                  <i className="fas fa-check" />
                </Icon>
              </Form.Control>
              <Form.Help color="success">This username is available</Form.Help>
            </Form.Field>
      
            <Form.Field>
              <Form.Label>Email</Form.Label>
              <Form.Control>
                <Form.Input
                  color="danger"
                  value={email}
                  onChange={(e) => {
                    return setEmail(e.target.value);
                  }}
                />
                <Icon align="left" size="small">
                  <i className="fas fa-envelope" />
                </Icon>
                <Icon align="right" size="small">
                  <i className="fas fa-exclamation-triangle" />
                </Icon>
              </Form.Control>
              <Form.Help color="danger">This email is invalid</Form.Help>
            </Form.Field>
      
            <Block renderAs="fieldset" disabled>
              <Form.Field>
                <Form.Label>Label Text</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Inside a field set" />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Label>Another disabled field</Form.Label>
                <Form.Control>
                  <Form.Input placeholder="Another nside a field set" />
                </Form.Control>
              </Form.Field>
            </Block>
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
                    <option value="select-dropdown">Select dropdown</option>
                    <option value="with-options">With options</option>
                  </Form.Select>
                </Form.Control>
                <Form.Control fullwidth loading>
                  <Form.Input placeholder="With loading state" />
                </Form.Control>
              </Form.Field>
            </Form.Field>
      
            <Form.Field>
              <Form.Label>Message</Form.Label>
              <Form.Textarea
                value={message}
                onChange={(e) => {
                  return setMessage(e.target.value);
                }}
              />
            </Form.Field>
      
            <Form.Field>
              <Form.Control>
                <Form.Checkbox
                  checked={tocAgreed}
                  onChange={(e) => {
                    return setTocAgreed(e.target.checked);
                  }}
                >
                  {'  '}I agree to the <a href="#">terms and conditions</a>
                </Form.Checkbox>
              </Form.Control>
            </Form.Field>
      
            <Form.Field>
              <Form.Control>
                <Form.Radio
                  value="yes"
                  name="question"
                  checked={questionValue === 'yes'}
                  onChange={(e) => {
                    return setQuestionValue(e.target.value);
                  }}
                >
                  {'  '}Yes
                </Form.Radio>
                <Form.Radio
                  value="no"
                  name="question"
                  checked={questionValue === 'no'}
                  onChange={(e) => {
                    return setQuestionValue(e.target.value);
                  }}
                >
                  {'  '}No
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
        );
}