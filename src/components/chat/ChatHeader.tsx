import { faWindowMinimize, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { Box, Button, Heading, Icon } from "react-bulma-components";
import { Tooltip } from "react-tooltip";

interface ChatHeaderParams {
  minimized: boolean;
  setMinimized: Dispatch<SetStateAction<boolean>>
}

export const ChatHeader = (chatHeaderParams: ChatHeaderParams) => {
  return (
  <Box 
      backgroundColor="grey"
      style={{
        display: "flex",
        paddingTop: 10, 
        paddingBottom: 10,
      }}
    >
      <Heading 
        style={{
          flexGrow: 1,
          marginBottom: 0,
        }}
        size={5} 
        textColor="white"
      >
        Chat
      </Heading>
      <Tooltip anchorSelect=".resize-tooltip" place="top">
        {chatHeaderParams.minimized ? "Maximize" : "Minimize"}
      </Tooltip>
      {!chatHeaderParams.minimized &&
        <Button 
          size="small" 
          className="resize-tooltip"
          style={{
            width: 25,
            height: 25,
            borderRadius: 45,
          }}
          onClick={()=>chatHeaderParams.setMinimized(true)}
          title="Minimize Chat"
        >
          <Icon size="small">
            <FontAwesomeIcon icon={faWindowMinimize}  size="sm"/>
          </Icon>
        </Button>
      }
      {chatHeaderParams.minimized &&
        <Button 
          size="small" 
          className="resize-tooltip"
          style={{
            width: 25,
            height: 25,
            borderRadius: 45,
          }}
          onClick={()=>chatHeaderParams.setMinimized(false)}
          title="Maximize Chat"
        >
          <Icon size="small">
            <FontAwesomeIcon icon={faWindowMaximize}  size="sm"/>
          </Icon>
        </Button>
      }
    </Box>
  );
}