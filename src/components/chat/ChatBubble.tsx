import { Box, Columns, Heading } from "react-bulma-components";

interface ChatBubbleParams {
  sender?: String;
  timeSent?: String;
  message?: String;
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
        marginLeft: params.sender === '_self' ? 20 : 0,
        marginRight: params.sender === '_self' ? 0 : 20,
        display: "flex",
        flexDirection: 'column',
        alignItems: params.sender === '_self' ? "end" : "start",
      }}
    >
      <Box
        shadowless
        style={{
          margin: 0,
          padding: 0,
          fontSize: 12,
          fontWeight: "bold",
          textAlign: params.sender === '_self' ? "right": "left",
        }}
      >
        {params.sender === '_self' ? 'Me' : params.sender}
      </Box>
      <Box
        style={{
          margin: 0,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#6ab1fc",
          display: 'flex',
          inlineSize: 'fit-content',
          flexDirection: 'column',
        }}
      >
        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            background: "none",
            color: "white",
            fontSize: 14,
            overflowWrap: "anywhere",
          }}
        >
          {params.message}
        </Box>
        <Box
          shadowless
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            background: "none",
          }}
        >
          <span style={{
            marginLeft: "auto",
            color: "GrayText",
            fontSize: 8,
          }}>
            {params.timeSent}
          </span>
        </Box>
      </Box>
    </Box>
  );
}