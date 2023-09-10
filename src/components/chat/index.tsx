import { faWindowMaximize, faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Box, Button, Container, Form, Heading, Icon, Section } from "react-bulma-components";
import { useCookies } from 'react-cookie';
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import useWebSocket from 'react-use-websocket';
import { ChatCommunication, chatMessage, decodeMessage } from "./utils";

interface ChatParams {
  width?: number;
  height?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

const Chat = (chatParams: ChatParams) => {
  const [tokenCookie, setTokenCookie] = useCookies(['token']);
  const [messages, setMessages] = useState<Array<ChatCommunication>>([]);

  const socketUrl = process.env.REACT_APP_WS_URL ||'ws://localhost:8000';
  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
    const encryptedMessage = chatMessage(message, sessionToken)
    sendMessage(encryptedMessage);
    setMessage("");
  }

  const retrieveMessages = () => {
    fetch(`${endPoint}/getMessages`,{
      headers: {
        "Authorization": `${sessionToken}`
      }
    }).then((res)=> {
      return res.json();
    }).then((res) => {
      setMessages(res)
    }).catch((e) => {
      console.error(e);
    })
  }

  const validateToken = (token: String) => {
    return fetch(`${endPoint}/validateSession`,{
      headers: {
        "Authorization": `${token}`
      }
    }).then((res)=> {
      return res.json();
    }).then((res) => {
      return res;
    })
  }
  const generateToken = () => {
    fetch(`${endPoint}/generateSession`).then((res)=> {
      return res.json();
    }).then((res) => {
      setSessionToken(res.token);
      setTokenCookie("token", res.token);
    }).catch((e) => {
      console.error(e);
    })
  }

  useEffect(()=> {
    if (sessionToken)
      retrieveMessages()
  }, [sessionToken]);

  useEffect(()=> {
    if (tokenCookie.token ) {
      validateToken(tokenCookie.token).then(()=> {
        setSessionToken(tokenCookie.token);
      }).catch(()=> {
        generateToken();
      })
    } else if (!sessionToken) {
      generateToken();
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
                  value={message}
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