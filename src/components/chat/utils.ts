export interface ChatCommunication {
	type: 'message' | 'connection' | 'notification' | 'remove-notification',
	authIssue?: boolean,
	method?: 'send' | 'receive', 
	message: Message,
	format?: 'text' | 'file',
	fileName?: string,
}

export interface Message {
	messageID?: string,
	messageTitle?: string,
	messageBody?: string,
	dateSent?: string,
	sender?: string,
  senderToken?: string,
}

// Decode a string into a ChatCommunication object.
export const decodeMessage = (comm?: string): ChatCommunication => {
  if (!comm) {
	// If the input is empty, return a default message of type 'message'
    return {
      type: 'message',
      authIssue: false,
      message: {}
    }
  }

  // Parse the input string into a ChatCommunication object and return it.
  const decoded: ChatCommunication =  JSON.parse(comm);
  return decoded;
}

// Create a chat message in JSON format with the provided details.
export const chatMessage = (messageID: string, messageTitle: string, message: string, token: string) => {
	const chat: ChatCommunication = {
		type: 'message',
		authIssue: false,
    	method: 'send',
		message: {
			messageID: messageID,
			messageTitle: messageTitle,
			messageBody: message,
			sender: '_self',
      		senderToken: token,
		}
	}
	return JSON.stringify(chat)
}