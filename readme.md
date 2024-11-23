#### Live Deployment Link

[https://bike-store-a2.vercel.app/](https://bike-store-a2.vercel.app/)

#### All Features

### Creating a Bike

#### user can create a bike with name,brand,category,description,quantity,inStcok in request body using this end point.

#### endpoint : /api/products/create-bike

### Get all bikes

#### user can get all bike list by this endpoint.

#### endpoint : /api/products

### Get a specific bike

#### user can get a specific bike by this endpoint, productId is the \_id of bike in the database.

#### endpoint : /api/products/:productId

### Update a Bike

#### user can update a bike giving valid json in response body.prodcutId is the availabe \_id of any documents in bikes collections

#### endpoint : /api/products/:productId

### Delete a Bike

#### user can delete a bike by this endpoint.productId is the availabe \_id of any documents in bikes collections

#### endpoint : /api/products/:productId

### Order a Bike

#### users can order a bike by giving valid json in response of this endpoint

#### endpoint : /api/orders/order-bike

### Calculate Revenue from Orders

#### this will give total sum of totalprice from every order

#### endpoint : /api/orders/revenue

#### Instructions on setting up the project locally.

#### Installation and setting up .env

#### Add PORT and DATABASE_URL variable in .env file.DATABASE_URL is the uri from mongodb.

### Now install npm

```
npm install
```

#### run project

```
npm run start:dev
```
