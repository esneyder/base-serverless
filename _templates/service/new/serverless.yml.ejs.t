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
    SMALL_EXPIRE: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.expire.SMALL_EXPIRE}
    MEDIUM_EXPIRE: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.expire.MEDIUM_EXPIRE}
    LARGE_EXPIRE: ${file(${self:custom.relativePathToCommon}/env.yml):${opt:stage, self:provider.stage}.expire.LARGE_EXPIRE}
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
  list:
    handler: handlers/list.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>
          method: get
          cors: true
  create:
    handler: handlers/create.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>
          method: post
          cors: true
  get:
    handler: handlers/get.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: get
          cors: true
  update:
    handler: handlers/update.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: put
          cors: true
  delete:
    handler: handlers/delete.default
    events:
      - http:
          path: <%= h.changeCase.paramCase(name) %>/{id}
          method: delete
          cors: true
