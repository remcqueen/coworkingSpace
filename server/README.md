# Co-Working Space API Documentation

Below is the documentation for the node.js rest APIs used for the co-working space web based application.

## GoogleAPI.js - External API extention task

**Uses the google maps lookup prediction api to automatically fill in a building address field as the user enters part of the address**

**GET /api/googleApi/:prediction**

**Resource URL**
http://localhost:3900/api/googleApi/:prediction

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name        | Required | Description                                                                    |
| ----------- | -------- | ------------------------------------------------------------------------------ |
| :prediction | Yes      | This parameter is the text that will generate a prediction of the full address |

**Example Request**

http://localhost:3900/api/googleApi/Durham%20Science%20Site

**Example Response**

```javascript
{
    "candidates": [
        {
            "formatted_address": "Lower Mount Joy, South Rd, Durham DH1 3LE, UK",
            "name": "Department of Chemistry • Durham University"
        }
    ],
    "status": "OK"
}
```

# Routes

## Auth.js

**Authentication API used to login a user and generate JWT (JSON web tokens) for security and authentication)**

**POST /api/auth**

**Resource URL**
http://localhost:3900/api/auth

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Body of Request**

```javascript
{
	"email": "example@email.com",
	"password": "examplePassword"
}
```

**Example Response**

```javascript
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2M2MDkwNGVjNzg0MTQ5NzkwYTNjM2IiLCJmTmFtZSI6IkpvaG4iLCJzTmFtZSI6IlNtaXRoIiwiZW1haWwiOiJhZG1pbkB0dXNwYXJrLmNvbSIsImlzQWRtaW4iOnRydWUsImJ1c2luZXNzSWQiOiI1Y2MzM2Q5Mzc4ZjgzYzE3YTI5Nzg2YjkiLCJpYXQiOjE1NTY3ODQ4NjJ9.IxuKC-g7V9yvAJf7SsVcDnJIAdL6v6IWzSioHPvqXvg"
}
```

## Booking.js

**API used to save room bookings, made by a user, to the server**

**POST /api/booking**

**Resource URL**
http://localhost:3900/api/bookings

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Body of Request**

```javascript
 {
	"date": "2019-04-27",
	"userId": "5ca487d4eeedbe8ab59d7a7d",
	"buildingId": "5ca48481eeedbe8ab59d7a36",
	"roomId": "5cbef47b735b5737d5e2311c"
}
```

**Example Response**

```javascript
{
    "room": {
        "_id": "5cc61ad9e9b1b24aef41c41e",
        "name": "105"
    },
    "building": {
        "_id": "5cc6195fc3bb0c4ac61cbf6e",
        "name": "Barclays Eagle Lab Manchester"
    },
    "user": {
        "_id": "5cc60a613e844849a5782c21",
        "email": "e.morley@gmail.com"
    },
    "date": "2019-04-27"
}
```

**GET /api/booking**

**Resource URL**
http://localhost:3900/api/bookings

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Response**

```javascript
[
  {
    _id: "5cc61a5ce9b1b24aef41c3f7",
    room: {
      _id: "5cc61a1fe9b1b24aef41c3dc",
      name: "101"
    },
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    },
    user: {
      _id: "5cc5ec2f812a4721c1a6288b",
      email: "JWatt@codebase.com"
    },
    date: "2019-04-30"
  },
  {
    _id: "1556785273580",
    room: {
      _id: "5cc61ad9e9b1b24aef41c41e",
      name: "105"
    },
    building: {
      _id: "5cc6195fc3bb0c4ac61cbf6e",
      name: "Barclays Eagle Lab Manchester"
    },
    user: {
      _id: "5cc60a613e844849a5782c21",
      email: "e.morley@gmail.com"
    },
    date: "2019-04-27"
  }
];
```

**DELETE /api/booking**

**Resource URL**
http://localhost:3900/api/bookings/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                                       |
| ---- | -------- | ----------------------------------------------------------------- |
| :id  | Yes      | This is the bookingId of the saved booking document to be deleted |

**Example request**

http://localhost:3900/api/bookings/5cc61a5ce9b1b24aef41c3f7

**Example Response**
sends back the deleted booking

```javascript
 {
    "_id": "5cc61a5ce9b1b24aef41c3f7",
    "room": {
        "_id": "5cc61a1fe9b1b24aef41c3dc",
        "name": "101"
    },
    "building": {
        "_id": "5cc607f264e43048cae8ccc5",
        "name": "TusParks"
    },
    "user": {
        "_id": "5cc5ec2f812a4721c1a6288b",
        "email": "JWatt@codebase.com"
    },
    "date": "2019-04-30"
}
```

## Buildings.js

**API used to interact with the buildings entity of the co-working spaces**

**POST /api/buildings**

**Resource URL**
http://localhost:3900/api/buildings

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Body of Request**

```javascript
 {
	"name": "TusParks",
	"address": "Maybrook House, Grainger Street, Newcastle upon Tyne",
	"postcode": "NE1 5JE",
	"organisationId": "5b21ca3eeb7f6fbccd471814"
}
```

**Example Response**

```javascript
 {
    "name": "TusParks",
    "address": "Maybrook House, Grainger Street, Newcastle upon Tyne",
    "postcode": "NE1 5JE",
    "organisation": {
        "_id": "5b21ca3eeb7f6fbccd471814",
        "name": "Hoults"
    }
}
```

**PUT /api/buildings**

**Resource URL**
http://localhost:3900/api/buildings/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                          |
| ---- | -------- | ---------------------------------------------------- |
| :id  | Yes      | This is the ID of the building that is to be updated |

**Example request**

http://localhost:3900/api/buildings/5cc607f264e43048cae8ccc5

**Example Body of Request**

```javascript
{
	"name": "TusParks",
	"address": "Maybrook House, Grainger Street, Newcastle upon Tyne",
	"postcode": "NE1 5JE",
	"organisationId": "5b21ca3eeb7f6fbccd471814"
}
```

**Example Response**

```javascript
{
    "_id": "5cc607f264e43048cae8ccc5",
    "occupants": 5,
    "businesses": 2,
    "name": "TusParks",
    "address": "Maybrook House, Grainger Street, Newcastle upon Tyne",
    "postcode": "NE1 5JE",
    "organisation": {
        "_id": "5b21ca3eeb7f6fbccd471814",
        "name": "Hoults"
    }
}
```

**DELETE /api/buildings**

**Resource URL**
http://localhost:3900/api/buildings/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                          |
| ---- | -------- | ---------------------------------------------------- |
| :id  | Yes      | This is the ID of the building that is to be deleted |

**Example request**

http://localhost:3900/api/buildings/5cc607f264e43048cae8ccc5

**Example Response**
response contains the deleted building

```javascript
 {
    "_id": "5cc607f264e43048cae8ccc5",
    "occupants": 5,
    "businesses": 2,
    "name": "TusParks",
    "address": "Maybrook House, Grainger Street, Newcastle upon Tyne",
    "postcode": "NE1 5JE",
    "organisation": {
        "_id": "5b21ca3eeb7f6fbccd471814",
        "name": "Hoults"
    }
}
```

**GET /api/buildings/from/:id**

**Resource URL**
http://localhost:3900/api/buildings/from/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                                                        |
| ---- | -------- | ---------------------------------------------------------------------------------- |
| :id  | Yes      | :id is the id of a business, returns the building that the business is a member of |

**Example request**

http://localhost:3900/api/buildings/from/5cc6088163c6b748d82e5139

**Example Response**

```javascript
{
    "_id": "5cc6195fc3bb0c4ac61cbf6e",
    "businesses": 3,
    "occupants": 4,
    "name": "Barclays Eagle Lab Manchester",
    "address": "Union, Albert Square, Manchester , United Kingdom",
    "postcode": "M2 6LW",
    "organisation": {
        "_id": "5b21ca3eeb7f6fbccd471818",
        "name": "Eagle Labs"
    }
}
```

## Businesses.js

**API used to manage the business entity**

**POST /api/businesses**

**Resource URL**
http://localhost:3900/api/businesses

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example request**

http://localhost:3900/api/businesses

**Example Body of Request**

```javascript
 {
	"name": "New Business",
	"buildingId": "5cc6195fc3bb0c4ac61cbf6e"
}
```

**Example Response**

```javascript
 {
    "name": "New Business",
    "building": {
        "_id": "5cc6195fc3bb0c4ac61cbf6e",
        "name": "Barclays Eagle Lab Manchester"
    }
}
```

**GET /api/businesses/:id**

**Resource URL**
http://localhost:3900/api/businesses/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                                                              |
| ---- | -------- | ---------------------------------------------------------------------------------------- |
| :id  | Optional | When a valid business ID is set as :id, will return only information about that business |

**Example request**

http://localhost:3900/api/businesses

**Example Response**

```javascript
[
  {
    _id: "5cc33d9378f83c17a29786b9",
    name: "Management",
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    }
  },
  {
    _id: "5cc61974c3bb0c4ac61cbf72",
    name: "Codebase",
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    }
  },
  {
    _id: "5cc6088163c6b748d82e5139",
    name: "Fibrewear",
    building: {
      _id: "5cc6195fc3bb0c4ac61cbf6e",
      name: "Barclays Eagle Lab Manchester"
    }
  },
  {
    _id: "5cc7088163c6b748d82e5139",
    name: "Hasbro",
    building: {
      _id: "5cc38358849f881ed832ae61",
      name: "Hoults Yard"
    }
  },
  {
    _id: "1556786833456",
    name: "New Business",
    building: {
      _id: "5cc6195fc3bb0c4ac61cbf6e",
      name: "Barclays Eagle Lab Manchester"
    }
  }
];
```

## Organisations.js

**API for managing the organisations of the co-working space web application, these are the businesses that run each co-working space and can own multiple buildings**

**POST /api/organisations**

**Resource URL**
http://localhost:3900/api/organisations

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Body of Request**

> {

    "name": "New organisation"

}

**Example Response**
responds with the newly created organisation

> {

    "name": "New organisation"

}

**GET /api/organisations**

**Resource URL**
http://localhost:3900/api/organisations

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Request**
http://localhost:3900/api/organisations

**Example Response**
responds with the newly created organisation

```javascript
[
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "Eagle Labs"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    name: "Hoults"
  },
  {
    _id: "1556787102345",
    name: "New organisation"
  }
];
```

## Rooms.js

**API for managing the rooms of the service, each building can contain many rooms which can be booked**

**DELETE /api/rooms/:id**

**Resource URL**
http://localhost:3900/api/rooms/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | Yes  |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                          |
| ---- | -------- | ---------------------------------------------------- |
| :id  | Yes      | :id should be a valid room ID which is to be deleted |

**Example Request**
http://localhost:3900/api/rooms/5cc61a1fe9b1b24aef41c3dc

**Example Response**
Server responds with the deleted room and status 200

```javascript
{
    "_id": "5cc61a1fe9b1b24aef41c3dc",
    "name": "101",
    "building": {
        "_id": "5cc607f264e43048cae8ccc5",
        "name": "TusParks"
    },
    "capacity": 12,
    "roomType": {
        "_id": "5cc60731b8240248a3c1734b",
        "name": "Presentation"
    }
}
```

**GET /api/rooms/:id**

**Resource URL**
http://localhost:3900/api/rooms

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                               |
| ---- | -------- | --------------------------------------------------------- |
| :id  | Optional | :id can be used to specify a specific room to be returned |

**Example Request**
http://localhost:3900/api/rooms/5cc61a3de9b1b24aef41c3e4

**Example Response**

```javascript
 {
    "_id": "5cc61a3de9b1b24aef41c3e4",
    "name": "102",
    "building": {
        "_id": "5cc607f264e43048cae8ccc5",
        "name": "TusParks"
    },
    "capacity": 6,
    "roomType": {
        "_id": "5cc60728b8240248a3c1734a",
        "name": "Meeting"
    }
}
```

**GET /api/rooms/building/:id**

**Resource URL**
http://localhost:3900/api/rooms/building/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                                                                     |
| ---- | -------- | ----------------------------------------------------------------------------------------------- |
| :id  | Yes      | :id should be a valid building Id which will return all of the rooms which are in that building |

**Example Request**
http://localhost:3900/api/rooms/building/5cc607f264e43048cae8ccc5

**Example Response**

```javascript
[
  {
    _id: "5cc61a3de9b1b24aef41c3e4",
    name: "102",
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    },
    capacity: 6,
    roomType: {
      _id: "5cc60728b8240248a3c1734a",
      name: "Meeting"
    }
  },
  {
    _id: "5cc61ad9e9b1b24aef41c41e",
    name: "105",
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    },
    capacity: 12,
    roomType: {
      _id: "5cc60737b8240248a3c1734c",
      name: "IT"
    }
  },
  {
    _id: "5cc61b36e9b1b24aef41c432",
    name: "205",
    building: {
      _id: "5cc607f264e43048cae8ccc5",
      name: "TusParks"
    },
    capacity: 3,
    roomType: {
      _id: "5cc60750b8240248a3c1734d",
      name: "Office"
    }
  }
];
```

## RoomType.js

**API for managing the room types of a room. This will allow users to book rooms for specific purposes such are meetings or presentations**

**GET /api/roomTypes**

**Resource URL**
http://localhost:3900/api/RoomTypes

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Request**
http://localhost:3900/api/roomTypes

**Example Response**

```javascript
[
  {
    _id: "5cc60728b8240248a3c1734a",
    name: "Meeting"
  },
  {
    _id: "5cc60731b8240248a3c1734b",
    name: "Presentation"
  },
  {
    _id: "5cc60737b8240248a3c1734c",
    name: "IT"
  },
  {
    _id: "5cc60750b8240248a3c1734d",
    name: "Office"
  },
  {
    _id: "5cc60758b8240248a3c1734e",
    name: "Desk"
  }
];
```

## Users.js

**Authentication API used to manage user account creation and validation**

**POST /api/users**

**Resource URL**
http://localhost:3900/api/users

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description |
| ---- | -------- | ----------- |
|      |          |             |

**Example Body of Request**

```javascript
{
	"fName":"John",
	"sName":"Smith",
	"email":"admin@Tuspark.com",
	"password":"12345678",
	"businessId":"5cc61974c3bb0c4ac61cbf72"
}
```

**Example Response**
sends back a JSON web token to authenticate and log in user

```javascript
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmTmFtZSI6IkpvaG4iLCJzTmFtZSI6IlNtaXRoIiwiZW1haWwiOiJhZG1pbkBUdXNwYXJrLmNvbSIsImJ1c2luZXNzSWQiOiI1Y2M2MTk3NGMzYmIwYzRhYzYxY2JmNzIiLCJpYXQiOjE1NTY3ODg4OTF9.-MZkzdbrBL1bPbED5kvs58B6C5J9oZrhue0qP52_flc"
}
```

**GET /api/users/:id**

**Resource URL**
http://localhost:3900/api/users/:id

**Resource Information**

|                         |      |
| ----------------------- | ---- |
| Response Format         | JSON |
| Requires Authentication | No   |
| Rate Limited            | No   |

**Parameters**

| Name | Required | Description                                                                              |
| ---- | -------- | ---------------------------------------------------------------------------------------- |
| :id  | Yes      | Returns all of the users from a building matching the building ID given in the parameter |

**Example Request**
http://localhost:3900/api/users/5cc607f264e43048cae8ccc5

**Example Response**
sends back a JSON web token to authenticate and log in user

```javascript
[
  {
    _id: "5cc60904ec784149790a3c3b",
    fName: "John",
    sName: "Smith",
    email: "admin@tuspark.com",
    password: "$2b$10$35/MUbdu6q2JeKL41yyU/emd8KJBUZASAFzHNrwfDq/5XRvDPHHCu",
    business: {
      _id: "5cc33d9378f83c17a29786b9",
      name: "Management"
    },
    isAdmin: true
  },
  {
    _id: "5cc5ec2f812a4721c1a6288b",
    fName: "Joe",
    sName: "Watt",
    email: "JWatt@codebase.com",
    password: "$2b$10$PnJdzYOdKMAmiabIuEe50.GFEEiUuDOi3o7S7Ihk2lLPSu9h9hrp6",
    business: {
      _id: "5cc61974c3bb0c4ac61cbf72",
      name: "Codebase"
    }
  },
  {
    _id: "5cc60a613e844849a5782c21",
    fName: "Emily",
    sName: "Morley",
    email: "e.morley@gmail.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: {
      _id: "5cc61974c3bb0c4ac61cbf72",
      name: "Codebase"
    }
  },
  {
    _id: "5cc60104ec784149790a3c3b",
    fName: "Kelly",
    sName: "Smith",
    email: "k.Smith@gmail.com",
    password: "$2b$10$aRFNzgbSm6ldW1Mz2rr7yuz.iWqLVc5gZYDqDVHa5IeSaAr.TwTdy",
    business: {
      _id: "5cc61974c3bb0c4ac61cbf72",
      name: "Codebase"
    }
  }
];
```
