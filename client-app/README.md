# Co-Working Space Client documentation

Below is instructions on how to run and use the co-working space client

## Idea of the web based application:

The idea of this application is to simulate a business share space service, where different small business and startups can use resources provide by an organisation. They can book out rooms on a day by day.

Entities of the service:

- Organisations - companies that own the buildings being used by small businesses
- Buildings - This is the physical place that the small businesses can go in and use, each building has its own rooms and businesses within
- Businesses - These are the small businesses that are using the working spaces
- Users - This includes admins and business employees that can use the working space
- Rooms - Each building has it own rooms, which can be booked out by businesses to use
- Room Types - each room can be of a certain type, for example: a meeting room.

The app can be viewed from the perspective of an Admin or a business user, admins have several privileges over users, for example:

**Admin Privileges:**

- Admins can add, delete and update buildings in the system, this is done through the intuitive on screen buttons. (note these can only be seen when on an admin account).
- Admins can add new rooms to buildings, stating thing such as the type of room and capacity
- Admins can view the bookings that have been made by users, they can also delete bookings if they wish
- Admins can add new organisations to the service, the new organisations can then used when creating or updating a building.

**How to login:**
By default there are several users already included in the system, to simulate a partially active service. **The logins for all of these users have the password: 1234** You can choose to login as these users or register a user yourself. (Please note that passwords are hashed in storage for security). An example of an admin and a business user can be seen below.

| email              | password | isAdmin |
| ------------------ | -------- | ------- |
| admin@tuspark.com  | 12345678 | Yes     |
| JWatt@codebase.com | 12345678 | No      |

## Extension: External API service

The additional api i used for my service was googles 'Google maps autocomplete address lookup'. It is an API that acts as a predictive text search for addresses, and is used when the admin adds a new building. This is a very useful feature and I feel it adds value for two reasons:

- Acts as a form of validation on the address, as it is from googles address database
- Much faster than manually entering the address, which may have to be looked up anyway

**How to use the external API:**
When on the admin account, select "New building" on the buildings page, and the first input box is marked as the external API, enter key words into this box such as postcode, name, or street number, and the address fields will automatically be filled in with the most likely prediction.

## Extension: Heroku Upload

For the second extension the heroku cloud deployment can be found at the following URL:
[https://young-headland-22806.herokuapp.com/](https://young-headland-22806.herokuapp.com/)
the instructions for this are the same as the local deployment.
