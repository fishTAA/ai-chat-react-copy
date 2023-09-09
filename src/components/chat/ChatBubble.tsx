import { Box, Columns, Heading } from "react-bulma-components";

interface ChatBubbleParams {
  sender: String;
  timeSent: String;
  message: String;
  position?: "left" | "right";
}

export const ChatBubble = (params: ChatBubbleParams) => {
  return (
    <Box shadowless
      style={{
        padding: 0,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
      }}
    >
      <Box
        shadowless
        style={{
          margin: 0,
          padding: 0
        }}
      >
        {params.sender}
      </Box>
      <Box
        style={{
          margin: 0,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0
          }}
        >
          {params.message}
        </Box>
        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            display: "flex"
          }}
        >
          <span style={{
            marginLeft: "auto",
            color: "GrayText",
            fontSize: 12,
          }}>
            {params.timeSent}
          </span>
        </Box>
      </Box>
    </Box>
  );
}