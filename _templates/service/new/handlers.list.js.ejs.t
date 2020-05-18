---
to: services/<%= h.changeCase.paramCase(name) %>/handlers/list.js
---
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpContentNegotiation from "@middy/http-content-negotiation";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return {
    statusCode: 201,
    body: JSON.stringify([])
  };
};

export default middy(handler)
  .use(httpErrorHandler())
  .use(cors())
  .use(httpHeaderNormalizer())
  .use(httpContentNegotiation())
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(doNotWaitForEmptyEventLoop());
