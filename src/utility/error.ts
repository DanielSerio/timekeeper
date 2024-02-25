import type { ApiError } from "../model/ApiError";

export function error(err: ApiError): Response {
  return new Response(JSON.stringify(err.asJSON()), {
    status: err.status || 500,
  });
}

