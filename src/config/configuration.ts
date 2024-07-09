export default () => ({
  PORT: +process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  DB_USER: process.env.DB_USER,
  DB_PW: process.env.DB_PW,
  DB_NAME: process.env.DB_NAME 
});