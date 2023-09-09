import { Box, Button, Container, Form, Heading, Section } from "react-bulma-components";

interface ChatParams {
  width?: number;
  height?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

const Chat = (chatParams: ChatParams) => {

  const width = chatParams.width || 400;
  const height = chatParams.height || 400;

  return (
    <Box 
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: chatParams.fullHeight? "100%": height,
        position: chatParams.fullWidth? "absolute" : "fixed", 
        bottom: 0,
        right: 10,
        width: chatParams.fullWidth? "100%": width,
      }} color="black">
      <Box style={{
        paddingTop: 10, 
        paddingBottom: 10,
      }}>
        <Heading size={6}>
          Chat
        </Heading>
      </Box>
      <Container style={{display: "flex", flexDirection: "column", margin: 5}}>
        <Box 
          shadowless 
          style={{
            flexGrow: 1,
            padding: 0,
            marginBottom: 0
          }}
        >
          <Section>
            Here
          </Section>
        </Box> 
        <Box 
          shadowless 
          style={{
            padding: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10
          }}
        >
          <Form.Field>
            <Form.Control
              style={{
                display: "flex",
              }}
            >
              <Form.Input
                style={{
                  flexGrow: 1,
                }}
               size="small" placeholder="Type your message here..."
              />
              <Button size="small">Send</Button>
            </Form.Control>
          </Form.Field>
        </Box>
      </Container>
    </Box>
  );
}

export default Chat;