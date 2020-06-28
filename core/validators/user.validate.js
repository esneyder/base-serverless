export const userSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" }
      },
      required: ["name"],
    },
  },
};