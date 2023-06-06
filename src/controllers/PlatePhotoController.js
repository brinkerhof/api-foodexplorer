import knex from "../database/knex/index.js";
import DiskStorage from "../providers/DiskStorage.js";

export default class PlatePhotoController {
  async update(request, response) {
    const {id} = request.params
    const photoFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const plate = await knex("plates").where({id}).first()

    if (!plate) {
      throw new AppError('Prato não encontrado', 404);
    }

    if (plate.image) {
      await diskStorage.deleteFile(plate.image);
    }

    const filename = await diskStorage.saveFile(photoFilename);

    plate.image = filename;

    const updated_at = knex.fn.now();

    await knex("plates").update({...plate, updated_at}).where({id})

    return response.json(plate);
  }
}