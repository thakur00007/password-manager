# Password Manager Backend

This is the backend component of a password manager application. It provides the necessary APIs and functionality to securely store and manage user passwords.

## Frontend Repo


[password-manager-react](https://github.com/thakur00007/password-manager-react)


## Features

- User authentication and authorization
- Password encryption and decryption
- CRUD operations for managing passwords
- Secure storage of passwords in a database

## Technologies Used

- Node.js
- Express.js
- MongoDB (or any other database of your choice)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/thakur00007/password-manager-backend.git
    ```

2. Install the dependencies:

    ```bash
    cd password-manager-backend
    npm install
    ```

3. Configure the environment variables:

    - Create a `.env` file in the root directory.
    - Add the following variables:

      ```plaintext
        PORT=5001
        MONGODB_URI=<mongodb-connection-string>
        ACCESS_TOKEN_SECRET=secret_key
        ACCESS_TOKEN_EXPIRY=30m
      ```

4. Start the server:

    ```bash
    npm run dev
    ```

## API Documentation

For detailed information on the available API endpoints and how to use them, please refer to the [API documentation](api-docs.md).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
