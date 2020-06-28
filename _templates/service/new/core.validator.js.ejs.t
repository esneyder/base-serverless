---
to: core/validators/<%= h.inflection.singularize(name) %>.validate.js
---
export const <%= h.inflection.singularize(name) %>Schema = {
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