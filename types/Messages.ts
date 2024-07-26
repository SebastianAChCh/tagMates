export type Message = {
    sender: string,
    receiver: string,
    message: string,
    type: string,
};


//It makes reference to the section where I get through the body the email and type of the file, so that I can Identify the folder where I should save the file
export type foldersMessagesFiles = {
    email?: string;
    type?: string;
    [key: string]: any;
};

export type MessageTaggy = {
    user: string,
    sender: string,
    receiver: string,
    message: string,
    type: string,
};
