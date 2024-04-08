const requestHandeller = (requestHandellerMethod) => {
  return (req, res, next) => {
    Promise.resolve(requestHandellerMethod(req, res, next)).catch((err) =>
      next(err)
    );
  };
};

export { requestHandeller };
