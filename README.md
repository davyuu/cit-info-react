# README


## ENVIRONMENTS
All project secrets and keys are stored in `.env` files  
An `.env.example` file is in the root folder as an example  
For `.env.dev` and `.env.prod`, message David  

### NPM RUN SCRIPTS
`start` runs `dev` environment  
`prod` runs `prod` environment  

`build` will build the project using webpack into plain html and javascript using the `prod` environment

For firebase or production deployments, message David for details.


## NETWORK REQUEST
In `utils => NetworkUtils.js`, there is the helpers for the network request functions. There are 2 main types of requests in the app.

1. REST requests to PlanningCenter API  
2. POST request to Google Sheets scripts  

**All network urls and keys should be stored in the `.env` files.**

