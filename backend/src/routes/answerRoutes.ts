import express from "express";
import isAuth from "../middleware/isAuth";

import * as AnswerController from "../controllers/AnswerController";

const answerRoutes = express.Router();

answerRoutes.get("/answers", isAuth, AnswerController.index);

answerRoutes.get("/answers/:answerId", isAuth, AnswerController.show);

answerRoutes.post("/answers", isAuth, AnswerController.store);

answerRoutes.put("/answers/:answerId", isAuth, AnswerController.update);

answerRoutes.delete("/answers/:answerId", isAuth, AnswerController.remove);

export default answerRoutes;
