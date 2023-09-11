import { Box } from "react-bulma-components";
import { ChatBubble } from "./ChatBubble";
import { ChatCommunication } from "./utils";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Array<ChatCommunication>
}
export const ChatMessages = (props: ChatMessagesProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=> {
    scrollToBottom();
  }, [props.messages])

  return (
    <Box 
      shadowless 
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
          height: 280,
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
              message={chat.message.messageBody} />
            );
          })
        }
        <div ref={messagesEndRef} />
      </Box>
    </Box> 
  )
}