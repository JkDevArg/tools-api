const { ApiError } = require('../utils');

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(err instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Default error message';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {

  let { statusCode, message } = err;

  if (statusCode === undefined) {
    statusCode = 500;
  }

  const response = {
    status: statusCode,
    message,
  };

  if (statusCode !== 500 && statusCode !== 404) {
    return res.status(statusCode).send(response || { message: 'Something wrong' });
  }

  return res.sendStatus(statusCode);
};

module.exports = {
  errorHandler,
  errorConverter,
};
