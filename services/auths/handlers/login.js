import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpContentNegotiation from "@middy/http-content-negotiation";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { BadRequest, InternalServerError } from "http-errors";
import { success, conflit } from "../../../core/utils/response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authLoginSchema } from "../../../core/validators/auth.validate";
import {
  comparePassword,
  createToken,
} from "../../../core/services/auth.service";
import { getUserPassFromUserName } from "../../../core/controllers/auths/auth.controller";
const handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!event.body) {
    throw new BadRequest(JSON.stringify({ message: "Bad request" }));
  }
  try {
    const { username, password } = event.body;
    const userAuth = await getUserPassFromUserName(username);

    if (userAuth == null) {
      return callback(
        null,
        conflit(`user ${username} does not exist. It could not be found`)
      );
    }
    const hsPass = await comparePassword(password, userAuth.password, bcrypt);

    if (hsPass) {
      const token = await createToken(userAuth, jwt);
      return callback(null, success({ token: token }));
    } else {
      return callback(
        null,
        conflit(
          `user ${username} not complete authentication. Incorrect password`
        )
      );
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
  .use(validator({ inputSchema: authLoginSchema }))
  .use(doNotWaitForEmptyEventLoop());
