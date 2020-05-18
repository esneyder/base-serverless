# Base Serverless Monorepo

## Development

### Requirements

- [Node.js](https://nodejs.org).
- [Yarn](https://yarnpkg.com) is required in order to run any project and install dependencies. The reason for this is Yarn's [Workspaces feature](https://yarnpkg.com/en/docs/workspaces) that facilitates monorepo management.
- [Serverless Framework](https://serverless.com/)
- (Optional) [AWS CLI](https://aws.amazon.com/cli/).

In order to deploy, you will need an IAM User and [configure the credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

### Getting Started

```sh
# Clone repository and `cd` to dir.
$ git clone https://github.com/esneyder/base-serverless.git
$ cd base-serverless

# Install dependecies
$ yarn install

# Create users service
$ yarn create-service users

# Run service offline (local)
$ yarn services users offline

# Deploy service
$ yarn services users deploy
```

### Run Service Script

To run any service script, run at the project root directory

```sh
$ yarn services your-service-name script-to-run

# Example
$ yarn services users deploy
$ yarn services users offline
$ yarn services users test
$ yarn services users add chalk
```

### Service Generator

You can create new services by using a generator.

```sh
$ yarn create-service your-service-name

Loaded templates: _templates
       added: services/your-service-name/handler.js
       added: services/your-service-name/package.json
       shell: yarn install
       added: services/your-service-name/serverless.yml
Done in 11.43s.

```

A folder will be created at `services/your-service-name` with some configured file.

Each services will have some scripts. These are:

- `offline`: Run the service in local using `serverless-offline`
- `deploy`: Deploy the service to AWs.
