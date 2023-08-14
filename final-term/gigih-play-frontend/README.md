# gigih-play-frontend

## Description
Tokopedia Play Clone App.

## Features
- Login.
- Register.
- Logout.
- Profile.
- Video list.
- Video search.
- Video detail.
- Video detail - product list.
- Video detail - product search.
- Video detail - comment list.
- Video detail - comment submission.

## Test User
- Username: `admin`
- Password: `admin`

## How to Run the App
### Prerequisites
- Node.js.
- NPM.
- Yarn.
- Browser (Preferable Chrome).
- Git.
- Docker.
- Docker Compose.

### Run Steps (with docker)
1. Clone this repository.
2. Open the terminal and go to the repository directory.
3. Set the environment variable `VITE_ONE_CLIENT_URL` to the backend http protocol in the `.env` file.
4. Set the environment variable `VITE_ONE_SOCKET_URL` to the backend web socket protocol in the `.env` file.
5. Run `yarn install` to install all dependencies.
6. Run `docker-compose up` to run the App.
7. Open the browser and try the app.

### Run Steps (without docker)
1. Clone this repository.
2. Open the terminal and go to the repository directory.
3. Set the environment variable `VITE_ONE_CLIENT_URL` to the backend http protocol in the `.env` file.
4. Set the environment variable `VITE_ONE_SOCKET_URL` to the backend web socket protocol in the `.env` file.
5. Run `yarn install` to install all dependencies.
6. Run `yarn start` to run the App.
7. Open the browser and try the app.

## Notes
1. Typescript transpile needs time, so wait for a few seconds/minutes after running the App.
2. I already implemented the minimum (video, product, & comment) and bonus (profile, realtime comment, & search) requirements.
