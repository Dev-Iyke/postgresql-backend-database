# PostgreSQL Backend Database API

A simple RESTful API built with Node.js, Express, and PostgreSQL for managing users.  
This project provides endpoints to create, read, update, and delete user records.

---

## Features

- CRUD operations for users (`name`, `email`, `age`)
- PostgreSQL database integration
- RESTful API design
- Error handling and validation

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure you have a running instance)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd postgresql-backend-database
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   PORT=5000
   ```

4. **Set up the database**

   Ensure you have a `users` table in your PostgreSQL database:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL,
     age INTEGER NOT NULL
   );
   ```

5. **Start the server**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

---

## API Documentation

Full API documentation is available here:  
👉 [View API Docs on Postman](https://documenter.getpostman.com/view/24242189/2sB34co31q)

---

## Example Endpoints

- `GET    /api/v1/users`         — List all users
- `GET    /api/v1/users/:id`     — Get a user by ID
- `POST   /api/v1/users`         — Create a new user
- `PUT    /api/v1/users/:id`     — Update a user
- `DELETE /api/v1/users/:id`     — Delete a user

See the [API Docs](https://documenter.getpostman.com/view/24242189/2sB34co31q) for request/response examples.

---

## Project Structure

```
postgresql-backend-database/
├── routes/
│   └── users.js
├── db.js
├── index.js
├── package.json
├── .env
└── README.md
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License