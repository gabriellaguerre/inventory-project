# IVY - Inventory Management Software (SaaS)

Check out the live version of IVY here: [IVY](https://ivy-ims.onrender.com/)

IVY was designed from the ground up to represent the needs in inventory management for a small to medium sized production facility.  The backend is designed on Flask with a PostgreSQL database.  The frontend is managed using React while data flow is based on the Flux architecture.

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

# API-Routes

Ivy uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Items

* All users (employee/admin) can view the most recent items on their feed, as well as a specific item by id, and the items on a user's profile.

  * `GET /api/items`
  * `GET /api/items/:itemId`
  * `GET /api/users/:userId/items`

* A logged in user (admin) may create a new item, adding to the recent items without causing a refresh/redirect.

  * `POST /api/items`

* A logged in user (admin) may edit an item, with visible changes without causing a refresh/redirect.

  * `PUT /api/items/:itemId`

* A logged in user (admin) may delete an item, removing it from the list of visible items without causing a refresh/redirect.

  * `DELETE /api/items/:itemId`

## Suppliers

* A logged in user(employee/admin) can view suppliers on an item.

  * `GET /api/items/:itemId/suppliers`

* A logged in user (admin) can add a new supplier

  * `POST /api/items/:itemId/suppliers`

* A logged in user (admin) can edit the supplier of an item, changing it in the list of visible items without causing a refresh.

  * `PUT /api/items/:itemId/suppliers/:supplierId`

* A logged in user (admin) can delete a supplier for an item, removing it from the list of visible items without causing a refresh/redirect.

  * `DELETE /api/items/:itemId/suppliers/:supplierId`

## Requests

* A logged in user (employee/admin) can create a request to get an item with visual confirmation without causing a refresh/redirect.
* A logged in user (employee/admin) can delete a request to get an item with visual confirmation without causing a refresh/redirect.

  * `POST /api/users/:userId/requests/`
  * `DELETE /api/users/:userId/requests/:requestId`

## Purchase Orders

* A logged in user (employee/admin) can create a Purchase Order.
* A logged in user (employee/admin) can edit a Purchase Order.

  * `POST /api/items/:requestId`
  * `PUT /api/items/:requestId`




