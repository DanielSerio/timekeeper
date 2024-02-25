export function success<Type extends object>(data: Type): Response {
  return new Response(JSON.stringify(data), { status: 200 });
}
