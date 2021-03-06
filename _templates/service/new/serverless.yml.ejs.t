---
to: services/<%= h.changeCase.paramCase(name) %>/serverless.yml
---
service: <%= h.changeCase.paramCase(name) %>

provider:
  name: aws
  runtime: nodejs12.x
  endpointType: REGIONAL
  memorySize: ${file(${self:custom.relativePathToCommon}/common.yml):memorySize}
  timeout: 30
  tracing:
    lambda: true
    apiGateway: true
  deploymentBucket: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.deploy.BUCKET}
  environment:
    DATABASE: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.database.SERVER}
    JWT_SECRET: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.database.JWT_SECRET} 
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - logs:CreateLogGroup,
        - logs:CreateLogStream,
        - logs:PutLogEvents,
        - logs:DescribeLogStreams
      Resource: "arn:aws:logs:*:*:*"

package:
  individually: true
  exclude:
    - .git/**

plugins:
  - serverless-webpack
  - serverless-offline

custom:
  relativePathToCommon: '../../lib/serverless/common'
  # env: ${file(${self:custom.relativePathToCommon}/env.yml)}
  # prefixes: ${file(${self:custom.relativePathToCommon}/prefixes.yml)}
  stage: ${opt:stage, self:provider.stage}
  webpack: ${file(${self:custom.relativePathToCommon}/common.yml):webpack}

functions:
  #verify-token:
    #handler: ../core/middleware/verifyToken.handler
  list:
    handler: handlers/list.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>
          method: get
          cors: true
          #authorizer: verify-token
  create:
    handler: handlers/create.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>
          method: post
          cors: true
          #authorizer: verify-token
  get:
    handler: handlers/get.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: get
          cors: true
          #authorizer: verify-token
  update:
    handler: handlers/update.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: put
          cors: true
          #authorizer: verify-token
  delete:
    handler: handlers/delete.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: delete
          cors: true
          #authorizer: verify-token
