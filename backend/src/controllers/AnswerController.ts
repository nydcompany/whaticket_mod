import * as Yup from "yup";
import { Request, Response } from "express";
import { getIO } from "../libs/socket";

import ListAnswerService from "../services/AnswerService/ListAnswerService";
import CreateAnswerService from "../services/AnswerService/CreateAnswerService";
import ShowAnswerService from "../services/AnswerService/ShowAnswerService";
import UpdateAnswerService from "../services/AnswerService/UpdateAnswerService";
import DeleteAnswerService from "../services/AnswerService/DeleteAnswerService";

import AppError from "../errors/AppError";

type IndexQuery = {
  searchParam: string;
  pageNumber: string;
};

interface AnswerData {
  shortcut: string;
  title: string;
  message: string;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { searchParam, pageNumber } = req.query as IndexQuery;

  const { answers, count, hasMore } = await ListAnswerService({
    searchParam,
    pageNumber
  });

  return res.json({ answers, count, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newAnswer: AnswerData = req.body;

  const AnswerSchema = Yup.object().shape({
    shortcut: Yup.string().required(),
    title: Yup.string().required(),
    message: Yup.string().required()
  });

  try {
    await AnswerSchema.validate(newAnswer);
  } catch (err) {
    throw new AppError(err.message);
  }

  const answer = await CreateAnswerService({
    ...newAnswer
  });

  const io = getIO();
  io.emit("answer", {
    action: "create",
    answer
  });

  return res.status(200).json(answer);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { answerId } = req.params;

  const answer = await ShowAnswerService(answerId);

  return res.status(200).json(answer);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const answerData: AnswerData = req.body;

  const schema = Yup.object().shape({
    shortcut: Yup.string(),
    title: Yup.string(),
    message: Yup.string()
  });

  try {
    await schema.validate(answerData);
  } catch (err) {
    throw new AppError(err.message);
  }

  const { answerId } = req.params;

  const answer = await UpdateAnswerService({ answerData, answerId });

  const io = getIO();
  io.emit("answer", {
    action: "update",
    answer
  });

  return res.status(200).json(answer);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { answerId } = req.params;

  await DeleteAnswerService(answerId);

  const io = getIO();
  io.emit("answer", {
    action: "delete",
    answerId
  });

  return res.status(200).json({ message: "Answer deleted" });
};
