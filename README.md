# MOLE Back-End server

Mole is an application devoted to gather opportunities. Eating food cannot ever be this cheap. Games does not have to be expensive. Your weekend is friendly with your wallet. Go with MOLE now, and enjoy the best promotions it offers.

# Features

1. Google Puppeteer for data scrapping.
2. Redis caching for fast responses in heavy requests
3. cron job for (separate) heavy duty of scrapping and validating promos for no duplication

# init just after cloning

```
npm install
# or yarn install
```

## If you have no dist folder and only want to compile without running it

```
npm run compile
# or yarn compile
```

# Start

```
npm start
# or yarn start
```

- Notes: `npm start` requires the code to be compiled first. This command is meant for production.

# Dev

```
npm run dev
# or yarn dev
```

# Endpoints

## User Endpoint

### User Register `POST`

```
/users/register
```

body

```
{
  "device_token": "DEVICE_TOKEN"
}
```

### User Login `POST`

```
/users/login
```

body

```
{
  "device_token": "DEVICE_TOKEN"
}
```

## Fetch Endpoints

### Dana `GET`

All of this endpoints will return Redis cache if available, otherwise it will scrap new

```
/fetch/dana/food
/fetch/dana/game
/fetch/dana/entertainment
```

### Dana Update DB `GET`

```
/fetch/dana/update
```

Fetches all other fetch endpoints and updates database, then returns the values.

### OVO `GET`

All of this endpoints will return Redis cache if available, otherwise it will scrap new

```
/fetch/ovo/food
```

### OVO Update DB `GET`

```
/fetch/dana/update
```

Fetches all other fetch endpoints and updates database, then returns the values.

## Promos Endpoint

### Get Promos in DB `GET`

```
/promos
```

| Queries | Value                                     | Description                                                  |
| ------- | ----------------------------------------- | ------------------------------------------------------------ |
| q       | String, default empty                     | Searches in title for promos. case insensitive               |
| limit   | number, default 20                        | Limits the result                                            |
| offset  | number, default 0                         | Skips the number amount of document. Best used with limit query |
| sort    | String, default 'createdAt'               | the criteria for sorting the result the client will receive. |
| order   | number, default -1,  only accepts -1 or 1 | the order for the sorting. Default 'descending'              |



### Get User Subscribed Promo in DB `GET`

```
/promos/subscribed
```

Headers:

```json
{
  "device_token": "DEVICE_TOKEN"
}
```

Queries

| Queries | Value                                     | Description                                                  |
| ------- | ----------------------------------------- | ------------------------------------------------------------ |
| limit   | number, default 20                        | Limits the result                                            |
| offset  | number, default 0                         | Skips the number amount of document. Best used with limit query |
| sort    | String, default 'createdAt'               | the criteria for sorting the result the client will receive. |
| order   | number, default -1,  only accepts -1 or 1 | the order for the sorting. Default 'descending'              |

### Get Promos by Tags `GET`

```http
/promos/tags
```

Queries

| Queries | Value                                     | Description                                                  |
| ------- | ----------------------------------------- | ------------------------------------------------------------ |
| tags    | String[], default null                    | **Mandatory**.  Not giving this value will return an error.  |
| limit   | number, default 20                        | Limits the result                                            |
| offset  | number, default 0                         | Skips the number amount of document. Best used with limit query |
| sort    | String, default 'createdAt'               | the criteria for sorting the result the client will receive. |
| order   | number, default -1,  only accepts -1 or 1 | the order for the sorting. Default 'descending'              |

### Search Promos with Tags `GET`

```json
/promos/searchWithTags
```

Queries

| Queries | Value                                     | Description                                                  |
| ------- | ----------------------------------------- | ------------------------------------------------------------ |
| tags    | String[], default null                    | **Mandatory**.  Not giving this value will return an error.  |
| q       | String, default empty                     | Searches the title                                           |
| limit   | number, default 20                        | Limits the result                                            |
| offset  | number, default 0                         | Skips the number amount of document. Best used with limit query |
| sort    | String, default 'createdAt'               | the criteria for sorting the result the client will receive. |
| order   | number, default -1,  only accepts -1 or 1 | the order for the sorting. Default 'descending'              |

### 