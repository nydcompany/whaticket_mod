import Answer from "../../models/Answer";
import AppError from "../../errors/AppError";

const ShowAnswerService = async (id: string): Promise<Answer> => {
  const answer = await Answer.findByPk(id);

  if (!answer) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  return answer;
};

export default ShowAnswerService;
