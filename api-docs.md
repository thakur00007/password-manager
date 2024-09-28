# API Documentation

This is a RESTful API documentation for a password manager application. The API provides endpoints for user authentication, password management, and user profile management. The API is secured using JSON Web Tokens (JWT) for authentication and authorization. The API is built using Node.js, Express.js, and MongoDB.


## User Routes

### Register User

```http
  POST /api/v1/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. User's name |
| `email`   | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

### Login User

```http
  POST /api/v1/user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |


### Change Password

```http
  POST /api/v1/user/changepassword
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required**. User's old password |
| `newPassword` | `string` | **Required**. User's new password |

### Update Profile

```http
  PATCH /api/v1/user/updateprofile
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. User's name |
| `email`   | `string` | **Required**. User's email |

### Get User Profile

```http
  GET /api/v1/user/getuserprofile
```

## Password Routes

### Save Password

```http
  POST /api/v1/password/save
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `about`    | `string` | **Required**. About the password |
| `password`   | `string` | **Required**. Password |
| `questionId` | `string` | **Required**. Security Question ID |
| `answer` | `string` | **Required**. Answer to the question |

### Fetch All Password List

```http
  GET /api/v1/password/fetchall
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

### Fetch Password

```http
  POST /api/v1/password/fetch
```

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `passwordId` | `string` | **Required**. Password ID |
| `answer` | `string` | **Required**. Answer to the question |

### Delete Password

```http
  DELETE /api/v1/password/delete
```
| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. bearer token

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `passwordId` | `string` | **Required**. Password ID |