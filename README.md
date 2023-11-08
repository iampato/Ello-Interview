# probable-octo-couscous

A nodejs Application

## Prerequisites
-  Typescript
-  Nodejs
-  Graphql
-  Terraform
-  AWS CLI

## How to run the project

**Step 1:**

Download or clone this repo by using the link below:


[https://github.com/iampato/probable-octo-couscous.git](https://github.com/iampato/probable-octo-couscous.git)


**Step 2:**

Install dependencies

```
yarn install
```

**Step 3:**

Generate a .env file and add PORT number

```bash
touch .env && echo "PORT=9007" >> .env
```

**Step 4:**

Run the project

```
yarn dev
```

Open the browser http://localhost:9007 to access the graphiql UI

### Libraries & Tools Used

* [jest](https://jestjs.io/)
* [@apollo/server]([https://jestjs.io/](https://www.apollographql.com/docs/apollo-server/))

### Deployment

These services work together to deploy a Docker containerized application using ECS, with ECR serving as the container image repository. The VPC, subnets, security groups, and internet gateway provide the necessary network configuration for your ECS instances or Fargate tasks.

Navigate to the /deployment directory:

```bash
  cd deployment
```

Initialize Terraform:

```bash
terraform init
```

Create a plan:
```bash
terraform plan 
```

Apply the changes:

```
terraform apply
```

## Improvements that could be made
1. Adding of more tests (time constraints)
