import { faPaperclip, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Form, Notification, Icon } from "react-bulma-components";
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



export 
const Chat = (chatParams: ChatParams) => {
  const [tokenCookie, setTokenCookie] = useCookies(['token']);
  const [messages, setMessages] = useState<Array<ChatCommunication>>([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [notificationShown, setNotificationShow] = useState(false);
  const [notification, setNotification] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sessionToken, setSessionToken] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [query, setQuery] = useState<string>("")
  const hiddenFileInput = useRef< null | HTMLInputElement>(null);
 
  const socketUrl = process.env.REACT_APP_WS_URL ||'ws://localhost:8000';
  const endPoint = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  const width = chatParams.width || 400;
  const height = chatParams.height || 400;

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
      console.log(data.type)
      if (data.type === "notification") {
        setNotificationShow(true);
        setNotification(data.message?.messageBody || "")
      }
      if (data.type === "remove-notification") {
        setNotificationShow(false);
        setNotification("");
      }
    }
  });
  const sendMessageToServer = () => {
    if (selectedFile) {
      setLoadingSend(true);
      const data = new FormData() 
      data.append('file', selectedFile)
      fetch(`${endPoint}/uploadFile`, {
        method: "post",
        headers: {
          "Authorization": `${sessionToken}`,
        },
        body: data
      }).then((res)=> {
        return res.json()
      }).then((res)=> {
        setMessages([
          ...messages, 
          res
        ])
        setSelectedFile(null);
      }).finally(()=> {
        setLoadingSend(false);
      })
      return;
    }
    if (message) {
      setQuery(message)
      const encryptedMessage = chatMessage("","",message, sessionToken)
      sendMessage(encryptedMessage);
      setMessage("");
    }
  }

  const retrieveMessages = () => {
    setPageLoading(true);
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
    }).finally(() => {
      setPageLoading(false);
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

  const handleKeyPress = (e: any) => {
    if(e.key === 'Enter'){
      sendMessageToServer();
    }
  }

  const selectFile = (e: any) => {
    hiddenFileInput?.current?.click();
  };

	const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setSelectedFile(selected);
    }
	};

  return (
    <Box 
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: minimized? "auto" : chatParams.fullHeight? "calc(100%-50px)": height,
        position: chatParams.fullWidth? "absolute" : "fixed", 
        bottom: 0,
        right: 10,
        top: chatParams.fullHeight? (chatParams.fullWidth? 50 : 0 ) : 'unset', 
        width: chatParams.fullWidth? "100%": width,
      }} color="black">
      {!!!chatParams.fullHeight && <ChatHeader setMinimized={setMinimized} minimized={minimized} />}
      {!minimized &&
        <Container style={{display: "flex", flexDirection: "column", margin: 5}}>
          {!pageLoading ?
            <ChatMessages
              messages={messages}
              notificationShown={notificationShown}
              notification={notification}
              userinput={query}
            /> :
            <Box
                shadowless
                style={{
                  padding: 0,
                  marginBottom: 0,
                  flexGrow: 1,
                  textAlign: "center"
                }}
            >
              Loading...
            </Box>
          }
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
                {selectedFile ?
                  <>
                    <Notification
                      style={{
                        flexGrow: 1,
                        paddingTop: 6,
                        paddingBottom: 6,
                        fontSize: 12,
                      }}
                    >
                      {selectedFile.name}
                    </Notification>
                    <Button 
                      size="small"
                      onClick={()=>setSelectedFile(null)}
                    >
                      <Icon size="small">
                        <FontAwesomeIcon icon={faTrash}  size="sm"/>
                      </Icon>
                    </Button>
                  </>:<>
                    <Form.Input
                      onChange={(e)=>{
                        setMessage(e.target.value);
                        }}
                          style={{
                          flexGrow: 1,
                        }}
                      onKeyDown={
                        handleKeyPress}
                      value={message}
                      size="small" placeholder="Type your message here..."
                    />
                    <input 
                      type="file" 
                      name="file" 
                      hidden
                      onChange={(e)=> {
                        fileSelected(e)
                      }}
                      ref={hiddenFileInput} 
                    />
                    <Button 
                      size="small"
                      onClick={selectFile}
                    >
                      <Icon size="small">
                        <FontAwesomeIcon icon={faPaperclip}  size="sm"/>
                      </Icon>
                    </Button>
                  </>
                }
                <Button 
                  size="small"
                  loading={loadingSend}
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