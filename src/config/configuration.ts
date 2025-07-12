export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
});
