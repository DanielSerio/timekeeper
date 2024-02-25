import type { DeleteObject } from "../api.types";

interface ClientBase {
  id?: string;
  client_name?: string;
  client_brand_hue?: number;
  client_brand_saturation?: number;
}

export interface ClientCreate extends ClientBase {
  id: string;
  client_name: string;
}

export interface ClientUpdate extends ClientBase {
  id?: never;
}

export type ClientDelete = DeleteObject<{}, string>;

