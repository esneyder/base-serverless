export const authAdminSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "email", "password"],
    },
  },
};

export const authLoginSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
  },
};
export const authClientSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        password: { type: "string" },
        full_name: { type: "string" },
        phone: { type: "string" },
      },
      required: ["username", "email", "password", "phone", "full_name"],
    },
  },
};
