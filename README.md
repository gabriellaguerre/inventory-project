# IVY - Inventory Management Software (SaaS)

Check out the live version of IVY here: [IVY](https://ivy-ims.onrender.com/)

IVY was designed from the ground up to represent the needs in inventory management for a small to medium sized production facility.  The backend is designed on Flask with a PostgreSQL database.  The frontend is managed using React while data flow is based on the Flux architecture.

# User Stories

## Users

### Sign up

* Admin will sign up an unregistered and unauthorized user up for the website via a sign-up form.
  * When Admin is on the `/signup` page:
    * Admin will enter the employeeID number, the access level, and a password on a clearly laid out form.
  * When Admin enters invalid data on the sign-up form:
    * The website will inform Admin of the validations that failed to pass, and repopulate the form with valid entries (except my password).
    * So that Admin can try again without needing to refill forms they entered valid data into.

![ivy - signup new employee](https://github.com/gabriellaguerre/inventory-project/assets/51093596/d401bd83-9dfd-4408-b3a1-b2a6c481c0d8)


### Log in   

* As a registered and authorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my employeeID number and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the login form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the login form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

![ivy login](https://github.com/gabriellaguerre/inventory-project/assets/51093596/61f71d9d-d346-465d-8012-1da67b45ae98)


### Demo Admin and Demo Employee

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo Admin or Demo Employee button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying a login form.
      * So that I can easily log out to keep my information secure.

## Items

### Create Items

* As a logged in Admin user, I want to be able to create new items.
  * When I'm on any page:
    * I can create and submit a new item.
      * So that I can add a new item in the inventory.

### Viewing Items

* As a logged in user (admin/employee), I want to be able to view a selection of the inventory items.
  * When I'm on the `/items` page:
    * I can view the list of all items in inventory.
    
* As a logged in user, I want to be able to view a specific item and its associated suppliers, request forms and purchase orders.
  * When I'm on the /'items' page:
    * I can view the content of the item, as well as the associated suppliers, request forms and purchase orders.
      * So that I can read and better understand the flow of items in inventory.

### Updating Items

* As a logged in Admin user, I want to be able to edit my items by clicking an Edit button associated with the item.
  * When I'm on the `/items` page:
    * I can click "Edit" to make permanent changes to items an admin user has created.
      

### Deleting Items

* As a logged in Admin user, I want to be able to delete my items by clicking a Delete button associated with the item anywhere that item appears.
  * When I'm on the `/items` page:
    * I can click "Delete" to permanently delete an item I have created.

![ivy-items](https://github.com/gabriellaguerre/inventory-project/assets/51093596/079cc709-c613-4498-934b-1dd0b61d493a)

     
## Suppliers

### Create Suppliers

* As a logged in Admin user, I want to be able to add new suppliers for items.
  * When I'm on any page:
    * I can create and submit a new supplier.
      
### Viewing Suppliers

* As a logged in user, I want to be able to view the suppliers.
  * When I'm on the `/suppliers` page:
    * I can view all of the suppliers and the items they offer.
      
### Updating Suppliers

* As a logged in Admin user, I want to be able to edit suppliers by clicking an Edit button associated with the supplier on the item that supplier appears.
  * When I'm on the `/suppliers` page:
    * I can click "Edit" to make permanent changes to a supplier that was created.
      * So that I can fix any errors I make in the supplier's data.

### Deleting Suppliers

* As a logged in Admin user, I want to be able to delete suppliers by clicking a Delete button associated with the supplier on the item that supplier appears.
  * When I'm on the `/suppliers` page:
    * I can click "Delete" to permanently delete a supplier that was created.
      

## Requests

### Creating Requests

* As a logged in user, I want to be able to create a request for an item.
  * When I'm on any page:
    * I can click a request tab to create a request.

![ivy-create request](https://github.com/gabriellaguerre/inventory-project/assets/51093596/e369c049-1b3c-42d5-834f-99d39b7c3395)


### Deleting Requests

* As a logged in user, I want to be able to delete or void a request that I previously created.
  * When I'm on the `/requests` page and click on a request from the list:
    * I can click the delete or void request button to remove a request.


## Purchase Orders

### Create Purchase Orders

* As a logged in user, I want to be able to create a purchase order to order items that are low in stock
  * When I'm on any page:
    * I can click a purchase order tab to create a purchase order.

### Editing Purchase Orders

* As a logged in user, I want to be able to edit a purchase order in the event I don't receive the quantity of items listed in the purchase order.
  * When I'm on the '/purchase_orders' page and click on a purchase order:
    * I can click an edit purchase order button to make adjustments to existing purchase orders.



# Feature List

## 1. New account creation, log in, log out, and guest/demo login

* Admin Users can sign up employee users and provide access level to each employee 
* Admin users can log in, and log out.
* Users can try the site with a demo log in (admin) and demo log in (employee).
* Users can't use any features without logging in.
* Logged in users (employees) are directed to their access level page which displays certain features.
* Logged out users are directed to a page displaying login page.

## 2. items

* Logged in users (employees) can see list of items in inventory.
* Logged in users (admin) can see list, create, update, and delete items 

## 3. Suppliers

* Logged in users (employees) can see list of suppliers.
* Logged in users (admin) can see list, create, update, and delete suppliers 

## 4. Requests

* Logged in users (admin/employee) can create and delete requests for parts.
* Logged in users (admin/employee) can see list of all requests made for parts.

## 5. Purchase Orders

* Logged in users (admin/employee) can create and edit purchase orders for parts.
* Logged in users (admin/employee) can see list of all purchase made for parts.

## 6. Bonus

* Logged in users (admin/employee) can sign a request form and a pdf file of the form will be created and available for download

# Database Schema

![Ivy DB Schema](https://github.com/gabriellaguerre/inventory-project/assets/51093596/c87abbaa-5276-446a-9f74-ff87ed7808bc)



## `users`

| column name     | data type | details                   |
|-----------------|-----------|---------------------------|
| id              | integer   | not null, primary key     |
| employeeID      | integer   | not null, unique          |
| accessLevel     | string    | not null                  |
| hashed_password | string    | not null                  |
| created_at      | datetime  | not null                  |
| updated_at      | datetime  | not null                  |

## `items`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| code        | integer   | not null              |
| description | string    | not null              |
| item_type   | string    | not null              |
| unit_cost   | integer   | not null              |
| manufacturer| string    | not null              |
| userId      | integer   | not null, foreignkey  |
| supplierId  | integer   | not null, foreignkey  |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `supplierId` references `suppliers` table
* `userId` references `users` table

## `suppliers`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| address     | string    | allow null            |
| contact     | string    | allow null            |
| email       | string    | allow null            |
| cell        | string    | allow null            |
| itemId      | integer   | not null, foreignkey  |
| userId      | integer   | not null, foreignkey  |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

* `itemId` references `items` table
* `userId` references `users` table

## `purchase_orders`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| quantity      | integer   | not null              |
| itemId        | integer   | not null, foreignkey  |
| userId        | integer   | not null, foreign key |
| supplierId    | integer   | not null, foreignkey  |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |

* `userId` references `users` table
* `itemId` references `items` table
* `supplierId` references `suppliers` table

## `requests`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| quantity      | integer   | not null                       |
| userId        | integer   | not null, foreign key          |
| itemId        | integer   | not null, foreign key          |
| created_at    | datetime  | not null                       |
| updated_at    | datetime  | not null                       |

* `userId` references `users` table
* `itemId` references `items` table

## `request_items`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| quantity      | integer   | not null                       |
| request       | integer   | not null, foreign key          |
| itemId        | integer   | not null, foreign key          |
| created_at    | datetime  | not null                       |
| updated_at    | datetime  | not null                       |

* `requestId` references `requests` table
* `itemId` references `items` table

## `purchase_order_items`

| column name        | data type | details                        |
|--------------------|-----------|--------------------------------|
| id                 | integer   | not null, primary key          |
| quantity           | integer   | not null                       |
| purchase_orderId   | integer   | not null, foreign key          |
| itemId             | integer   | not null, foreign key          |
| created_at         | datetime  | not null                       |
| updated_at         | datetime  | not null                       |

* `purchase_orderId` references `purchase_orders` table
* `itemId` references `items` table

## `supplier_items`

| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |                      |
| supplier_id   | integer   | not null, foreign key          |
| item_id       | integer   | not null, foreign key          |

* `supplier_id` references `suppliers` table
* `item_id` references `items` table



# API-Routes

Ivy uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Items

* All users (employee/admin) can view the most recent items on their feed, as well as a specific item by id.

  * `GET /api/items`
  * `GET /api/items/:page`
  * `GET /api/items/:posId`

* A logged in user (admin) may create a new item, adding to the recent items without causing a refresh/redirect.

  * `POST /api/items`

* A logged in user (admin) may edit an item, with visible changes without causing a refresh/redirect.

  * `PUT /api/items/:itemId`

* A logged in user (admin) may delete an item, removing it from the list of visible items without causing a refresh/redirect.

  * `DELETE /api/items/delete/:itemId`

## Suppliers

* A logged in user(employee/admin) can view suppliers on an item.

  * `GET /api/suppliers/:itemId`

* A logged in user (admin) can add a new supplier

  * `POST /api/suppliers`

* A logged in user (admin) can edit the supplier of an item, changing it in the list of visible items without causing a refresh.

  * `PUT /api/suppliers/:supplierId`

* A logged in user (admin) can delete a supplier for an item, removing it from the list of visible items without causing a refresh/redirect.

  * `DELETE /api/suppliers/:supplierId`

## Requests

* A logged in user (employee/admin) can create a request to get an item with visual confirmation without causing a refresh/redirect.
* A logged in user (employee/admin) can delete a request to get an item with visual confirmation without causing a refresh/redirect.

  * `POST /api/requests/`
  * `DELETE /api/requests/:requestId`

## Purchase Orders

* A logged in user (employee/admin) can create a Purchase Order.
* A logged in user (employee/admin) can edit a Purchase Order.

  * `POST /api/purchase_orders`
  * `PUT /api/purchase_orders/:posId`




