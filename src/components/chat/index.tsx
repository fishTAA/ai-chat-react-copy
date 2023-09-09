import { faWindowMaximize, faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Box, Button, Container, Form, Heading, Icon, Section } from "react-bulma-components";
import { useCookies } from 'react-cookie';
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import useWebSocket from 'react-use-websocket';
import { ChatCommunication, decodeMessage } from "./utils";
import dotenv from "dotenv";

dotenv.config();

interface ChatParams {
  width?: number;
  height?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

const Chat = (chatParams: ChatParams) => {
  const [tokenCookie, setTokenCookie] = useCookies(['token']);
  const [messages, setMessages] = useState<Array<ChatCommunication>>([]);

  const socketUrl = process.env.WS_URL ||'ws://localhost:8080';
  const endPoint = process.env.API_URL || 'http://localhost:8000';

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket<ChatCommunication>(`${socketUrl}/ws?token=${tokenCookie.token}`, {
    onOpen: (e) => console.log('opened', e, lastJsonMessage,lastMessage),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => {
      if(decodeMessage(lastMessage?.data).authIssue) {
        return false;
      }
      return true;
    },
    skipAssert: !tokenCookie.token,
    onMessage: (e) => {
      console.log("a",decodeMessage(e.data))
      const data = decodeMessage(e.data)
      if (data.type === "message") {
        setMessages([
          ...messages, 
          data
        ])
      }
    }
  });

  const width = chatParams.width || 400;
  const height = chatParams.height || 400;
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [sessionToken, setSessionToken] = useState<string>("");
  const sendMessageToServer = () => {
    sendMessage(message)
  }

  useEffect(()=> {
    if (tokenCookie.token ) {
      setSessionToken(tokenCookie.token)
    } else if (!sessionToken) {
      fetch(`${endPoint}/generateSession`).then((res)=> {
        return res.json();
      }).then((res) => {
        setSessionToken(res.token);
        setTokenCookie("token", res.token);
      }).catch((e) => {
        console.error(e);
      })
    }
  }, []);

  return (
    <Box 
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        height: minimized? "auto" : chatParams.fullHeight? "100%": height,
        position: chatParams.fullWidth? "absolute" : "fixed", 
        bottom: 0,
        right: 10,
        width: chatParams.fullWidth? "100%": width,
      }} color="black">
      <ChatHeader setMinimized={setMinimized} minimized={minimized} />
      {!minimized &&
        <Container style={{display: "flex", flexDirection: "column", margin: 5}}>
          <ChatMessages messages={messages}/>
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
                  onChange={(e)=>setMessage(e.target.value)}
                  style={{
                    flexGrow: 1,
                  }}
                  size="small" placeholder="Type your message here..."
                />
                <Button 
                  size="small"
                  onClick={sendMessageToServer}
                >
                  Send
                </Button>
              </Form.Control>
            </Form.Field>
          </Box>
        </Container>
      }
    </Box>
  );
}

export default Chat;