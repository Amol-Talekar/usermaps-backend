export const MONGODB_URL =
  process.env.MONGODB_URL === undefined
    ? "mongodb://127.0.0.1:27017/usermaps"
    : process.env.MONGODB_URL;
