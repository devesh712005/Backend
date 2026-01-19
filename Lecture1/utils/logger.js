const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const status = res.statusCode;
    const type = status >= 500 ? "Error" : status >= 400 ? "Warn" : "OK";

    console.log(
      `${type} ${req.method} ${req.url} ${status} - ${Date.now() - start}ms`
    );
  });

  res.on("error", (err) => {
    console.error(`Error ${req.method} ${req.url}`);
  });

  next();
};

export default logger;
