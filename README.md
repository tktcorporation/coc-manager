# Overview

Usages
- [On a Docker](#docker)
- [On a AWS Lambda](#aws-sam)

## Docker

### Requirements

* [Docker installed](https://www.docker.com/community-edition)

### Usage

1. Create a file starter.sh from filestarter.sh.sample.
1. DB migration
    - Run the sql living in [here](src/infrastructure/db/migrations)
        - Migration setting by typeorm for docker has not prepared.  
        Please help the settings...

1. Run the following command.

```sh
$ docker-compose build
$ docker-compose run app /bin/bash

$ npm i
$ tsc
$ sh starter.sh
```

## AWS SAM

- Work on AWS Lambda with AWS API Gateway
- You need to prepare a stand alone database

### Requirements

* AWS CLI already configured with Administrator permission
* [nodejs10.x installed](https://nodejs.org/en/download/releases/)
* [Docker installed](https://www.docker.com/community-edition)
* Typescript 3.7.x

### Database settings

#### db config

* `template.yml` (Globals -> Function -> Environment -> Variables)
  * This is a setting for connect to a DB through the Lambda.
* ormconfig.json
  * This is a setting for connect to a DB directly.

Initialize and Build local db on docker.

```sh
# build
make build-local-db

# migrate
make migrate-local-db
```

Start local db on docker.

```sh
docker-compose up -d
```

#### db migration

###### local

```bash
# generate migration file
ts-node $(npm bin)/typeorm migration:generate -n {name}

# run migration
ts-node $(npm bin)/typeorm migration:run
```

###### dev stg prod

Migrate with AWS Cloud9.  
// TODO : Wrting more how to migrate db.

### Packaging and deployment

1. Create files *.env.json from *.env.json.sample.  

1. Run the following commands.

```bash
# select env
export ENV=(dev || stg || prod)

export STACK_NAME=coc-manager

# setting for env file
# Run 'brew install jq' if jq is not installed.
export ENV_PARAMS=$(jq -r '.Parameters | to_entries[] | "\(.key)=\"\(.value)\" \\"' env/$ENV.env.json)
```

```bash
# Build and test during development
make

# Build, Package and Deploy
make deploy-stack
```

#### Local test

```bash
make local-api
```

Individual lambda functions can be tested using the SAM CLI:

```bash
# Updates the handler.zip lambda package that SAM references
make local-package

sam local invoke <LAMBDA_FUNCTION_NAME>
```

###### Packaging notes

* The `devDependencies` are installed in order for `tsc` to compile the TypeScript code to Javascript
* The dev `node_modules` are then removed and the production dependencies are installed and zipped in the lambda package

