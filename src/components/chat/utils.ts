export interface ChatCommunication {
	type: 'message' | 'connection',
	authIssue?: boolean,
	message: Message,
}

export interface Message {
	messageBody: string,
	dateSent: string,
	sender: string,

}

export const decodeMessage = (comm?: string): ChatCommunication => {
  if (!comm) {
    return {
      type: 'message',
      authIssue: false,
      message: {
        messageBody:'',
        dateSent: '',
        sender: '',
      }
    }
  }
  const decoded: ChatCommunication =  JSON.parse(comm);
  return decoded;
}