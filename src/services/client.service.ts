import type { DataSource, DeleteResult } from "typeorm";
import { Client } from "../data/entity/client";
import type { OperationResponseBody } from "../types/api.types";
import type { ClientCreate, ClientUpdate } from "../types/entity/client.types";
import { constrainNumber } from "../utility/constrain-number";
import { ApiError } from "../model/ApiError";

export interface ClientService {
  getAll: () => Promise<Client[]>;
  getByID: (id: string) => Promise<Client | null>;
  create: (
    body: ClientCreate
  ) => Promise<OperationResponseBody<"CREATE", "client">>;
  update: (
    id: string,
    body: ClientUpdate
  ) => Promise<OperationResponseBody<"UPDATE", "client">>;
  delete: (id: string) => Promise<DeleteResult>;
}

export function getClientService(source: DataSource): ClientService {
  async function getAll() {
    return await clientRepo.find();
  }

  async function getByID(id: string) {
    return await clientRepo.findOne({ where: { id } });
  }

  async function create(
    body: ClientCreate
  ): Promise<OperationResponseBody<"CREATE", "client">> {
    const client = new Client();
    client.id = body.id;
    client.client_name = body.client_name;

    if (body.client_brand_hue) {
      client.client_brand_hue = constrainNumber(body.client_brand_hue, 359);
    }

    if (body.client_brand_saturation) {
      client.client_brand_saturation = constrainNumber(
        body.client_brand_saturation
      );
    }

    const result = await clientRepo.save(client);

    return {
      operation: "CREATE",
      entity: "client",
      result,
    };
  }

  async function update(
    id: string,
    body: ClientUpdate
  ): Promise<OperationResponseBody<"UPDATE", "client">> {
    const client = await getByID(id);

    if (client === null) {
      const err = new ApiError({
        status: 404,
        message: `Client with ID '${id}' not found`,
        cause: `Provided a client ID that does not exist (${id})`,
      });
      throw err;
    }

    if (body.client_name) {
      client.client_name = body.client_name;
    }

    if (body.client_brand_hue) {
      client.client_brand_hue = constrainNumber(body.client_brand_hue, 359);
    }

    if (body.client_brand_saturation) {
      client.client_brand_saturation = constrainNumber(
        body.client_brand_saturation
      );
    }

    const result = await clientRepo.save(client);
    return {
      operation: "UPDATE",
      entity: "client",
      result,
    };
  }

  async function deleteClient(id: string): Promise<DeleteResult> {
    return await clientRepo.delete(id);
  }

  const clientRepo = source.getRepository(Client);

  return {
    getAll,
    getByID,
    create,
    update,
    delete: deleteClient,
  };
}

