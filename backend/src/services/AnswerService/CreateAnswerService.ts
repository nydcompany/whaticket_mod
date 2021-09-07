import AppError from "../../errors/AppError";
import Answer from "../../models/Answer";

interface Request {
  shortcut: string;
  title: string;
  message: string;
}

const CreateAnswerService = async ({
  shortcut,
  title,
  message
}: Request): Promise<Answer> => {
  const nameExists = await Answer.findOne({
    where: { shortcut, title }
  });

  if (nameExists) {
    throw new AppError("ERR_DUPLICATED_CONTACT");
  }

  const answer = await Answer.create({ shortcut, title, message });

  return answer;
};

export default CreateAnswerService;
