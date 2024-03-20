# Full Stack E-Commerce App Built Using the Mern Stack and Redux Toolkit




### Links

- Solution URL: [Github](https://github.com/mcwachira/Mern-Ecommerce-app)
- Live Site URL: [Live](https://mernecommerce-app.onrender.com)
<!-- toc -->

- [Features](#features)
- [Usage](#usage)
    - [Env Variables](#env-variables)
    - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
    - [Run](#run)
- [Build & Deploy](#build--deploy)
    - [Seed Database](#seed-database)

*

<!-- tocstop -->

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
---


### Built with

- React
- React Bootstrap
- Nodejs
- Express
- MongoDb
- Mobile-first workflow

### What I learned

- Learnt How to build a Ecommerce app from teh ground app to production
- Learnt How to use React , Node and Express to build and app.
- Learnt How to use MongoDb to store my data


## Author

- Website - [mcwachira.com](https://mcwachira.com)
- Twitter - [@mc_wachira](https:https://twitter.com/mc_wachira)
