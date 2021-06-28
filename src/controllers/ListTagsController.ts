import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();
    // Option to customize tag name  without using the class transformer library
    // tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}));

    return response.json(tags);
  }
}

export { ListTagsController };
