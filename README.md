# Synopsis

Full stack MERN app, which shows users list, their places visited. Users can authenticate, and execute full CRUD operations on their visited places.

## Downloading the project

Fork and clone this repo

## Running the project localy

To run the MERN (MongoDB, Express.js, React.js, Node.js) application locally, follow these steps:

1. Ensure you have Docker installed on your computer.

2. Navigate to the root directory of the project in your terminal.

3. Run the following command to build and start the Docker containers:

```sh
docker-compose up -d
```

This command will build the necessary Docker images and start the containers in detached mode.

1. Access the application in your web browser by visiting http://localhost:5173.

To stop the application, execute the following command:

```sh
docker-compose down
```

# Dependencies

- Node 18.x or above
- NPM 9.x or above
- react 18.2.0
- express 4.x or above
- mongoose 8.x or above
- express-validator 7.x
- husky 9.x or above
- lint-staged 15.x or above
- eslint 8.x or above
- prettier 3.x or above
- axios
- docker