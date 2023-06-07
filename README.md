## Running the Application

## Definition of the routes and their arguments

You can test all the routes with the command prompt of your operating system, just have curl installed, or use Postman to do the tests

### Create an user

To create the user, you must inform name, lastName, username, password and passwordConfirmation as a as Body Request.

Sample:

```sh
curl  -X POST \
  'http://localhost:3000/users' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "any_name",
    "lastName": "any_last_name",
    "username": "any_username",
    "password": "yourpassword",
    "passworldConfimation": "yourpassword"
  }'
```

### List all users

> **NOTE**: When listing all users or listing on user by Id, it is possible to see the encrypted password, just for study purposes.

```sh
curl  -X GET \
  'http://localhost:3000/users' \
  --header 'Accept: */*'
```

### Find user by Id

User id is UUID passed by parameters in URL

```sh
http://localhost:3000/users/:id
```

Sample:

```sh
curl  -X GET \
  'http://localhost:3000/users/e7a57d9f-c152-4146-96cc-c538e88e11e8' \
  --header 'Accept: */*'
```

### Update user by Id

To update the user id (UUID) passed by parameters in the URL and inform the data that must be updated such as name, user and more

```sh
http://localhost:3000/users/:id
```

```sh
curl  -X PATCH \
  'http://localhost:3000/users/e7a57d9f-c152-4146-96cc-c538e88e11e8' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "username": "vincenzo_vgn"
  }'
```

### Delete user by Id

You can delete a user with id passed by parameters url

```sh
http://localhost:3000/users/:id
```

```sh
curl  -X DELETE \
  'http://localhost:3000/users/a4f1a576-1604-4c51-9d9e-e67eff88236a' \
  --header 'Accept: */*'
```
