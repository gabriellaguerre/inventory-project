# IVY - Inventory Management Software (SaaS)

Check out the live version of IVY here: [IVY](https://ivy-ims.onrender.com/)

IVY was designed from the ground up to represent the needs in inventory management for a small to medium sized production facility.  The backend is designed on Flask with a PostgreSQL database.  The frontend is managed using React while data flow is based on the Flux architecture.

## Features

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




