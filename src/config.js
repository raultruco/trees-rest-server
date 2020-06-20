export default {
  port: safeParseInt(process.env.PORT, 8081),
  host: process.env.HOST || 'localhost',
};

function safeParseInt(val, defaultVal) {
  const parsed = parseInt(val);
  return !isNaN(parsed) ? parsed : defaultVal;
}
