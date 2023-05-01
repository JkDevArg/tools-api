const jsonResponse = (res, httpStatus = 500, dataResult = [], paginate = {}, msg = '') => {
  let data = {
    status: httpStatus,
  };
  if ((dataResult && dataResult.length > 0)
    || (typeof dataResult === 'object' && Object.keys(dataResult).length > 0)) {
    data = {
      ...data,
      data: dataResult,
    };
  }

  if (paginate instanceof Object && Object.values(paginate).length > 0) {
    data = {
      ...data,
      info: paginate,
    };
  }

  if (msg !== '') {
    data = {
      ...data,
      message: msg,
    };
  }

  if (httpStatus === 200 || httpStatus === 201 || httpStatus === 400) {
    return res.status(httpStatus).json(data);
  }

  return res.sendStatus(httpStatus);
};

module.exports = { jsonResponse };
