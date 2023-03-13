import { ChatContainer } from "../persistence/containers/chat.container.js";

const persistence = new ChatContainer('messages');

const getNormalized = async () => {
    return await persistence.getNormalized();
}

const insertMessage =  async (message) => {
    return await persistence.save(message);
}

export default {
    getNormalized,
    insertMessage
}