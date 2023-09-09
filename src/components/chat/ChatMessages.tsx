import { Box } from "react-bulma-components";
import { ChatBubble } from "./ChatBubble";
import { ChatCommunication } from "./utils";

interface ChatMessagesProps {
  messages: Array<ChatCommunication>
}
export const ChatMessages = (props: ChatMessagesProps) => {
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
              timeSent={chat.message.dateSent} 
              message={chat.message.messageBody} />
            );
          })
        }
      </Box>
    </Box> 
  )
}