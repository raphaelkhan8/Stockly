# Stockly
An app to find summarized articles and sentiment analysis on current stock news. Create an account to save this information if you'd like.  

## Getting Started
The following instructions will allow you to get a copy of this project running on your local machine:

### Prerequisites
Before starting, ensure you have met the following requirements:

You have npm, node, and python installed on your machine. If not, follow the instructions from the following link:
npm: `https://www.npmjs.com/get-npm`
node: `https://nodejs.org/en/download/`
python: `https://www.python.org/downloads/`

You have installed PostgreSQL on your local machine. If not, you can install it golbally by running the following command:
`npm install -g pg`

Fork this repository and clone them to your local machine. Open the project in an IDE and you will find two repos: client and server.

In two seperate terminals, Run `cd client` to move into the client repo and `cd server` to get into the server repo.
In each terminal, run `npm install` to install dependencies. In the server terminal, run `pip install dependencies.txt` to install Python dependencies.

After dependencies have been installed, run `npm run client` in the client terminal to get the front-end running. This will open the app in the browser.

## Development server
In order to start the server, you will need PostgreSQL installed on your machine and a .env file with the database connection string:

+ DATABASE_URL=postgres://[username]:[password]@[host]:5432/[database_name]
[database_name] = 'whatever name you'd like to give to the database'
[username] = whatever username you use to access PostgreSQL
[password] = whatever password you use to access PostgreSQL
[host] = 'localhost'
[port] = 5432

After the .env file is set up, run `npm run server` in the server terminal. To make sure it is running, open up the browser and go to `http://localhost:3001/home`. You should see an object with a "welcome to server" message.

## Using the app
1. The landing page is the login view. Click the green Sinup button in the top right corner to create an account. Once created, you'll be directed to the app.
2. The home page displays the articles + info you have saved. Click the green Search button to open up the Search view.
3. Type in a stock/cryto ticker symbol or name (ex. DOGE) and the articles will be retrieved. It will take 2-3 minutes for the summarized articles + sentiment analysis to come back.
4. Up to 10 articles will be returned. Click on the green Save icon if you'd like to save one.
5. Click the red Cancel button in the top right corner to go back to the home page. You'll now see any articles you saved. Click the red X icon to delete an artice if need be.

## Built With

* [React](https://reactjs.org/docs/create-a-new-react-app.html) - The web framework used
* [Node.js](https://nodejs.org/en/docs/) - Server-side runtime environment
* [Socket.io](https://expressjs.com/en/api.html) - Server-side framework 
* [PostgreSQL](https://expressjs.com/en/api.html) - RDBMS
* [Python](https://www.python.org/) - To run sentiment analysis and summarization on stock news articles
