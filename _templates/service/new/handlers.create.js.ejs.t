---
to: services/<%= h.changeCase.paramCase(name) %>/handlers/create.js
---
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpContentNegotiation from "@middy/http-content-negotiation";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { BadRequest,InternalServerError } from "http-errors";
import { success, conflit } from "../../../core/utils/response";
import { <%= h.inflection.singularize(name) %>Schema } from "../../../core/validators/<%= h.inflection.singularize(name) %>.validate";
import { create<%= h.changeCase.pascal(h.inflection.singularize(name)) %> } from "../../../core/controllers/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(name) %>.controller";
 const handler = async (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!event.body) {
    throw new BadRequest(JSON.stringify({ message: "Bad request" }));
  } 
  try {
    const response = await create<%= h.changeCase.pascal(h.inflection.singularize(name)) %>(event.body);
    if (response) {
      return callback( null,success("<%= h.inflection.singularize(name) %> created successfully!")
      ); 
    } else {
      return callback(null, conflit("an error occurred while creating <%= h.inflection.singularize(name) %>!"));
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
  .use(validator({ inputSchema: <%= h.inflection.singularize(name) %>Schema }))
  .use(doNotWaitForEmptyEventLoop());
