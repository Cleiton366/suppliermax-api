# SupplierMax

SupplierMax is a robust backend system designed to efficiently manage supplier data and interactions. Built with Prisma, PostgreSQL, and Node.js, SupplierMax provides a seamless and secure way to handle supplier-related operations, ensuring reliability and performance at scale.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Related Project](#related-project)

## Features

- **Supplier Management**
  - Add, list, update, and delete supplier information.
  
- **Supplier Address Tracking**
  - See Supplier address on Google Maps using Google Maps API
  
## Technology Stack

- **Prisma**
  - ORM for seamless database interaction.
  - Type-safe database queries and easy schema management.
  
- **PostgreSQL**
  - Reliable and powerful open-source relational database.
  - Scalable and secure storage for supplier data.
  
- **MongoDB**
  - NoSQL database for flexible and scalable data storage.
  - Ideal for handling unstructured and semi-structured data.
  
- **Node.js**
  - Server-side JavaScript runtime for fast and efficient backend processing.
  - Handles asynchronous operations and concurrent requests effectively.

- **TypeScript**
  - Typed superset of JavaScript that compiles to plain JavaScript.
  - Ensures type safety and reduces runtime errors.
  
- **Jest**
  - Comprehensive testing framework for JavaScript.
  - Provides a complete solution for writing unit and integration tests.

## Architecture

- **RESTful API**
  - Clean API for frontend integration.
  - Supports CRUD operations.
  
- **Middleware**
  - Utilizes Express.js for request handling and  Multer middleware to manage file uploads.
  
## Installation

### Requeriments:
- MongoDB, see the documentation: https://www.mongodb.com/docs/

1. Clone the repository:
   ```bash
   git clone https://github.com/Cleiton366/suppliermax-api.git
   cd SupplierMax
    ```
2. Install dependencies:
```bash 
npm install
```

3. Set up the environment variables:
Create a .env file in the root directory and add the following variables:
   
```bash
DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydb?schema=public"

CORS_ORIGIN='localhost:3000'
PORT=4000

MONGO_DB_URL='mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin&replicaSet=myRepl'
 ```
 
4. Run the database migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```

## Testing

To ensure the robustness and reliability of SupplierMax, extensive tests have been implemented using Jest and Supertest package. The test coverage currently stands at 91.3%, ensuring that the majority of the backend functionality is thoroughly tested.

### Running Tests

```bash
npm run test
```

### Checking Coverage

To check the coverage in the whole backend, access:
```bash
http://localhost:4000/test-coverage/
```

## Related Project

Opcionally, you can run this project with the frontend, see: https://github.com/Cleiton366/suppliermax-frontend
