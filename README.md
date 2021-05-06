# un-scorecard-visualization

## How to run the development server
1. `yarn install`
2. `yarn dev`

## How to run the server for deployment
1. `yarn install`
2. `yarn build`
3. `yarn start -H 0.0.0.0`

The server runs at http://localhost:5000 in both cases, but you can add the `-p <PORT>` argument to change it.

## Environment Variables
1. `cp .env.example .env`
2. Configure the API URL to where the API is running.
The `API_URL` points to the running Python API. By default, this is `http://localhost:5000` as show in `.env.example`
