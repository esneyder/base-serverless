export const success = (body) => {
  return buildResponse(200, body);
};
export const failure = (body) => {
  return buildResponse(500, body);
};
export const notFound = (body) => {
  return buildResponse(404, body);
};
export const conflit = (body) => {
  return buildResponse(409, body);
};
export const created = (body) => {
  return buildResponse(409, body);
};
export const badRequest = (body) => {
  return buildResponse(400, body);
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };
}
