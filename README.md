# shopping-cart

This was made by following a tutorial from https://goo.gl/9Jv22c

This is a shopping cart made with node as the backend and on the front end a combination of
bootstrap and jquery, passport is used for authenticating users, and mongodb was used to store users, carts, sessions, etc.
Stripe was used as credit card processing.

technologies used: node, mongodb, passport js, mongoose js, handlebars, bootstrap, bcrypt, etc.

# How to Run

Please note that for this to work for you, you must create a stripe account 
and replace the current stripe keys with your own keys. Also you must have both mongodb and node installed.  

Step 1: clone this repo to your machine then navigate inside repo.  
Step 2: run the following command to install packages 'npm install --save'  
Step 3: run following custom command to seed some initial data, namely the example products used 'npm run seed-data'  
Step 4: run following command to run application: 'npm start'  
Step 5: All done, navigate to localhost port 3000 to view app  

