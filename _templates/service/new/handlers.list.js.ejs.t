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
import { BadRequest,InternalServerError } from "http-errors";
import { success, notFound } from "../../../core/utils/response";
import { get<%= h.changeCase.pascal(name) %> } from "../../../core/controllers/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(name) %>.controller";
const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
      const { next, previous } = event.queryStringParameters;
    const response = await get<%= h.changeCase.pascal(name) %>( next, previous);
    if (response) {
      return callback(null,success(response));
    } else {
      return callback(null, notFound("no records")); 
    }
  } catch (error) {
    throw new InternalServerError(
      JSON.stringify({ message: `error processing request ${error}` })
    );
  }
   
};

export default middy(handler)
  .use(httpErrorHandler())
  .use(cors())
  .use(httpHeaderNormalizer())
  .use(httpContentNegotiation())
  .use(httpEventNormalizer())
  .use(jsonBodyParser())
  .use(doNotWaitForEmptyEventLoop());
