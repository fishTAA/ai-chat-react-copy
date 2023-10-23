import { Box } from "react-bulma-components";
import { ChatBubble } from "./ChatBubble";
import { ChatCommunication } from "./utils";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: Array<ChatCommunication>,
  notification?: string,
  notificationShown: boolean,
}
export const ChatMessages = (props: ChatMessagesProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatContentsRef = useRef<null | HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(0);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=> {
    scrollToBottom();
  }, [props.messages, props.notificationShown]);

  useEffect(() => {
    if (chatContentsRef.current?.clientHeight) {
      if (bodyHeight == 0 || bodyHeight > chatContentsRef.current?.clientHeight) {
        setBodyHeight(chatContentsRef.current?.clientHeight);
      }
    }
  }, [chatContentsRef.current?.clientHeight]);

  

  return (
    <div 
      ref={chatContentsRef}
      style={{
        padding: 0,
        marginBottom: 0,
        flexGrow: 1,
      }}
    >
      <Box
        shadowless 
        style={{
          padding: 0,
          marginBottom: 0,
          overflowY: "scroll",
          height: bodyHeight,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.messages &&
          props.messages.map((chat, i)=> {
            return (<ChatBubble 
              key={i}
              sender={chat.message.sender} 
              timeSent={new Date(chat.message.dateSent!)} 
              fileName={chat.fileName}
              type={chat.format}
              message={chat.message.messageBody}
              title = {chat.message.messageTitle} />
            );
          })
        }
        {
          props.notification && props.notificationShown && (
            <Box 
              shadowless 
              style={{
                padding: 0,
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 0,
                color: "#9c9c9c"
              }}
            >
              {props.notification}
            </Box>
          )
        }
        <div ref={messagesEndRef} />
      </Box>
    </div> 
  )
}