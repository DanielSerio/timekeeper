export function getURLQueryObject(url: string): { [k: string]: string } {
  const queryString = url.split(/[?]/g)[1];
  if (queryString === undefined) return {};
  const queries = queryString.split(/[&]/g);
  const entries = queries
    .map((q: string) => {
      return q.split(/[=]/g);
    })
    .filter(([k, v]) => v !== "undefined" && v !== "null");
  let obj: { [k: string]: string } = {};

  entries.forEach(([k, v]) => {
    obj[k] = v;
  });

  return obj;
}

