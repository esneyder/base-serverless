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
import { authAdminSchema } from "../../../core/validators/auth.validate";
import { hashPassword, createToken } from "../../../core/services/auth.service";
import {
  createAdmin,
  existUser,
} from "../../../core/controllers/auths/auth.controller";
const handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!event.body) {
    throw new BadRequest(JSON.stringify({ message: "Bad request" }));
  }
  try {
    const { username, email, phone, password } = event.body;
    const validateUser = await existUser({ email, username, phone });
    if (validateUser) {
      return callback(
        null,
        conflit(
          "The email,username, phone or user are already associated with an account."
        )
      );
    }
    const hsPass = await hashPassword(password, bcrypt);
    const response = await createAdmin(event.body, hsPass);
    if (response) {
      const token = await createToken(response, jwt);
      return callback(null, success({ token: token }));
    } else {
      return callback(null, conflit("error creating user"));
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
  .use(validator({ inputSchema: authAdminSchema }))
  .use(doNotWaitForEmptyEventLoop());
