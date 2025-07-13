export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: process.env.JWT_EXPIRATION,
    refreshTokenTtl: process.env.REFRESH_TOKEN_EXPIRATION,
  },
});
