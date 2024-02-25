import type { APIRoute } from "astro";
import { getDataSource } from "../../../data/source";
import type { ApiError } from "../../../model/ApiError";
import { getClientService } from "../../../services/client.service";
import { success } from "../../../utility/success";
import { error } from "../../../utility/error";

export const GET: APIRoute = async () => {
  const source = await getDataSource();
  const clientService = getClientService(source);

  try {
    const result = await clientService.getAll();

    return success(result);
  } catch (e) {
    const err = e as ApiError;

    return error(err);
  }
};

