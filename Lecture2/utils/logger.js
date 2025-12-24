// Utils are helper functions or reusable code
//logger middleware to logs all req with status and response time
const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const status = res.statusCode;
    const type = status >= 500 ? "Error" : status >= 400 ? "warn" : "ok";
    console.log(`${type} ${req.url} - ${status} ${Date.now() - start}ms`);
  });
  res.on("error", (err) => {
    console.error(`Error ${req.method} ${req.url} -${err.message}`);
  });
  next();
};
module.exports = logger;
