import Answer from "../../models/Answer";
import AppError from "../../errors/AppError";

const DeleteAnswerService = async (id: string): Promise<void> => {
  const answer = await Answer.findOne({
    where: { id }
  });

  if (!answer) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  await answer.destroy();
};

export default DeleteAnswerService;
