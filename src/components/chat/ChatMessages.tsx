import { Box } from "react-bulma-components";
import { ChatBubble } from "./ChatBubble";
import { ChatCommunication } from "./utils";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: Array<ChatCommunication>, // An array of chat messages
  notification?: string, // Notification message
  notificationShown: boolean, // Whether the notification is shown or not
  userinput: string,

}

export const ChatMessages = (props: ChatMessagesProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatContentsRef = useRef<null | HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(0);

  // Function to scroll to the bottom of the chat messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=> {
    // Automatically scroll to the bottom when new messages arrive or the notification is shown
    scrollToBottom();
  }, [props.messages, props.notificationShown]);

  useEffect(() => {
    if (chatContentsRef.current?.clientHeight) {
      if (bodyHeight == 0 || bodyHeight > chatContentsRef.current?.clientHeight) {

        // Update the body height to match the chat contents if it's larger
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
      }}>
      <Box
        shadowless 
        style={{
          padding: 0,
          marginBottom: 0,
          overflowY: "scroll",
          height: bodyHeight,
          display: "flex",
          flexDirection: "column",
        }}>

        {props.messages &&
          props.messages.map((chat, i)=> {
            return (

              // Render individual chat bubbles based on message data
            <ChatBubble 
              key={i}
              sender={chat.message.sender} 
              timeSent={new Date(chat.message.dateSent!)} 
              fileName={chat.fileName}
              type={chat.format}
              message={chat.message.messageBody}
              title = {chat.message.messageTitle} 
              id= {chat.message.messageID}
              userinput={props.userinput}
            />

            );
          })
        }
        {
          props.notification && props.notificationShown && (

            // Display the notification if it is provided and shown
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