import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceivedComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"], //get all informations from the relations
    });

    return compliments;
  }
}

export { ListUserReceivedComplimentsService };
