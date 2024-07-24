import { Router } from "express";
import { loadMessages } from "./controllers/Taggy.controller";

const router = Router();

router.post('/loadMessagesTaggy', loadMessages);

export default router;