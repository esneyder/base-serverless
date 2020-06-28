export const rolSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        resource: { type: "string" },
      },
      required: ["name"],
    },
  },
};
