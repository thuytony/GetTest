# Question 6: MySql Query - Get Interesting Events

### First, we need to create the database with the following command:

```sh
CREATE DATABASE dbtest;
```

### Then we need to create the data table, run the following commands in turn:

```sh
CREATE TABLE Users (
    id int PRIMARY KEY
);

CREATE TABLE Category (
    id int PRIMARY KEY,
    name varchar(100)
);

CREATE TABLE User_like (
    user_id int PRIMARY KEY,
    category varchar(100),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Events (
    id int,
    name varchar(100),
    category varchar(100),
    start_datetime datetime
);

CREATE TABLE Ticket_type (
    id int PRIMARY KEY,
    event_id int,
    name varchar(100),
    price decimal,
    capacity int
);

CREATE TABLE Transaction (
    id int PRIMARY KEY,
    user_id int,
    ticket_type_id int,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (ticket_type_id) REFERENCES Ticket_type(id)
);
```

### Next, we need to create some sample data for testing. Run the following commands one by one:

```sh
INSERT INTO `Users` (`id`) VALUES ('1');

INSERT INTO `User_like` (`user_id`, `category`) VALUES ('1', 'superman');

INSERT INTO `Events` (`id`, `name`, `category`, `start_datetime`) VALUES ('1', 'sale superman', 'superman', '2022-01-09 22:52:30');

INSERT INTO `Events` (`id`, `name`, `category`, `start_datetime`) VALUES ('2', 'sale superman', 'superman', '2021-11-09 22:52:30');

INSERT INTO `Ticket_type` (`id`, `event_id`, `name`, `price`, `capacity`) VALUES ('1', '1', 'notbuy', '1000', '1');

INSERT INTO `Ticket_type` (`id`, `event_id`, `name`, `price`, `capacity`) VALUES ('2', '1', 'buy', '1000', '1');

INSERT INTO `Ticket_type` (`id`, `event_id`, `name`, `price`, `capacity`) VALUES ('3', '2', 'buy', '1000', '1');

INSERT INTO `Ticket_type` (`id`, `event_id`, `name`, `price`, `capacity`) VALUES ('4', '2', 'notbuy', '1000', '1');

INSERT INTO `Transaction` (`id`, `user_id`, `ticket_type_id`) VALUES ('1', '1', '2');
```

## Finally, run the following command to get the results:

```sh
SELECT  e.id AS eventId
	,	e.name AS eventName
  ,	e.category AS eventCategory
	,	e.start_datetime AS eventStartDateTime
	,	t.capacity AS eventCapacity
	,	t.id AS ticketId
	,	t.name AS ticketName
	,	t.price AS ticketPrice
FROM User_like ul
INNER JOIN Events e ON ul.category = e.category AND DATEDIFF(CURRENT_DATE(), e.start_datetime) <= 60 
INNER JOIN Ticket_type t ON e.id = t.event_id
LEFT JOIN Transaction trans ON trans.user_id = ul.user_id AND trans.ticket_type_id = t.id
WHERE trans.id IS NULL
```

### Notes:
Since MySQL does not allow the table to be named "User" and "Event", these two tables have been renamed "Users" and "Events".