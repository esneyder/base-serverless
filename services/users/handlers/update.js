import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpContentNegotiation from "@middy/http-content-negotiation";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { BadRequest,InternalServerError } from "http-errors";
import { updateUser } from "../../../core/controllers/users/user.controller";
const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!event.pathParameters.id) {
    throw new BadRequest(JSON.stringify({ message: "Bad request" }));
  }
  try {
    const response = await updateUser (event.pathParameters.id,event.body);
    if (response) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "record successfully updated",
          response})
      };
    } else {
      return {
        statusCode: 204,
        body: JSON.stringify({
         message: "No data found",
        }),
      };
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
