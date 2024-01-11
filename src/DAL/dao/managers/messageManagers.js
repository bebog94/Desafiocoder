import {messageModel} from '../db/models/messages.model.js';

class MessagesManager {
  async createMessage(user, message) {
    try {
      const newMessage = new messageModel({ user, message });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async getAllMessages() {
    try {
      const messages = await messageModel.find();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

export const messagesManager = new MessagesManager();