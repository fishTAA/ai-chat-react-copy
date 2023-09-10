export interface ChatCommunication {
	type: 'message' | 'connection',
	authIssue?: boolean,
  method?: 'send' | 'receive', 
	message: Message,
}

export interface Message {
	messageBody?: string,
	dateSent?: string,
	sender?: string,
  senderToken?: string,
}

export const decodeMessage = (comm?: string): ChatCommunication => {
  if (!comm) {
    return {
      type: 'message',
      authIssue: false,
      message: {}
    }
  }
  const decoded: ChatCommunication =  JSON.parse(comm);
  return decoded;
}

export const chatMessage = (message: string, token: string) => {
	const chat: ChatCommunication = {
		type: 'message',
		authIssue: false,
    method: 'send',
		message: {
			messageBody: message,
			sender: '_self',
      senderToken: token,
		}
	}
	return JSON.stringify(chat)
}