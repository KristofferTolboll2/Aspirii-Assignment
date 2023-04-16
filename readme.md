#### Spirii coding challenge

##### Instructions

1. Clone this repository
2. install dependencies on the frontend

   `cd frontend && npm install`

3. To start the frontend run `npm run start`
4. install dependencies on the backend

5. Create a `.env` file. (see `.env.example` for reference)

   `cd backend && npm install`

6. run the backend

   ```bash
   cd backend && npm run start:dev
   ```

   This will start it in development mode and will reload the application everytime you make a change. Otherwise, you can use `npm run start:prod` to run it in production mode.

7. I have also created a Docker image for the backend if that is preferred over running it as a node process.

8. To run the backend in a docker container, run the following command:

   ```bash
   docker build -t spirii-backend .
   docker run -p 3000:3000 spirii-backend
   ```

9. The explanation for Task 3 is in the `backend/tdd-explanation.md` file.
