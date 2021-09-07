import AppError from "../../errors/AppError";
import Answer from "../../models/Answer";

interface AnswerData {
  shortcut?: string;
  title?: string;
  message?: string;
}

interface Request {
  answerData: AnswerData;
  answerId: string;
}

const UpdateAnswerService = async ({
  answerData,
  answerId
}: Request): Promise<Answer> => {
  const { shortcut, title, message } = answerData;

  const answer = await Answer.findOne({
    where: { id: answerId },
    attributes: ["id", "shortcut", "title", "message"]
  });

  if (!answer) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }
  await answer.update({
    shortcut,
    title,
    message
  });

  await answer.reload({
    attributes: ["id", "shortcut", "title", "message"]
  });

  return answer;
};

export default UpdateAnswerService;
