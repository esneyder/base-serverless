---
to: services/<%= h.changeCase.paramCase(name) %>/package.json
sh: yarn install
---
{
  "name": "<%= h.changeCase.paramCase(name) %>",
  "version": "0.1.0",
  "description": "<%= h.changeCase.titleCase(name) %> service",
  "license": "MIT",
  "private": true,
  "scripts": {
    "deploy": "serverless deploy",
    "offline": "serverless offline start"
  },
  "dependencies": {
    "@middy/core": "^1.0.0",
     "@middy/validator": "^1.0.0",
    "@middy/do-not-wait-for-empty-event-loop": "^1.0.0-alpha.43",
    "@middy/http-content-negotiation": "^1.0.0-alpha.43",
    "@middy/http-cors": "^1.0.0-alpha.43",
    "@middy/http-error-handler": "^1.0.0-alpha.43",
    "@middy/http-event-normalizer": "^1.0.0-alpha.43",
    "@middy/http-header-normalizer": "^1.0.0-alpha.43",
    "@middy/http-json-body-parser": "^1.0.0-alpha.43",
    "@middy/http-response-serializer": "^1.0.0-alpha.43",
    "http-errors": "^1.7.3"
  },
  "devDependencies": {
    "aws-sdk": "^2.528.0",
    "serverless-offline": "^6.0.0-alpha.26",
    "serverless-webpack": "^5.3.1"
  }
}
