# Truefoundry-Assignment

### Task:
The goal of this assignment is to create a small website using NestJS (https://nestjs.com/ ) in the backend and basic HTML CSS in the frontend. The website should allow anyone to authorize their github account and the code will create a sample repo in their account.

### How I did it:
I used github oauth apps to do this next-auth.js.
On logging in the app the user is taken to a button where they sign in using github. On clicking this we are taken to the app where github will ask for authorization with read and write permissions for repo and access to user info. 
Once the user has given access, the access_tokens are created and these can be stored and used for further use (in our case, creating repositories)

### Deployment:
I tried to deploy it on heroku link: (https://truefoundry-assig.herokuapp.com)
However on clicking sign in I am getting 500 internal server error. Haven't been able to figure out why this is happening.

### Database:
I also have the option to connect with the mongodb database inside the application but currently not using it. 

### Screenshots from app:
<p float="left">
  <img src="/imgs/screenshot1.png" width=400 height=300 />
  <img src="/imgs/screenshot2.png" width=400 height=300/>
</p>

### How to run locally:
1. clone the repo
2. cd into the repo
3. run the command:  npm install
4. run the command: npm run dev
5. open http://localhost:3000/
