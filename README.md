# MOLE Back-End server

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

* Notes: `npm start` requires the code to be compiled first. This command is meant for production.

# Dev

```
npm run dev
# or yarn dev
```

