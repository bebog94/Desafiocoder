import { Router } from "express";
import { messagesManager } from '../DAL/dao/managers/messageManagers.js';
const router = Router();

router.post('/', async (req, res) => {
    try {
      const { user, message } = req.body;
      const newMessage = await messagesManager.createMessage(user, message);
  
      res.status(201).json({ message: 'Message created successfully', message: newMessage });
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Error creating message' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const messages = await messagesManager.getAllMessages();
  
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Error getting messages' });
    }
  });

export default router;