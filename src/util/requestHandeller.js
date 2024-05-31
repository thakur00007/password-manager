const requestHandeller = (requestHandellerMethod) => {
  return (req, res, next) => {
    Promise.resolve(requestHandellerMethod(req, res, next)).catch((err) => {
      res.status(err.statusCode || 500).json(err);
      // next(err);
    });
  };
};

export { requestHandeller };
