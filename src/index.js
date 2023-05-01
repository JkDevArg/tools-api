const express = require("express");
const routes = require('./routes/v1');
const { errorHandler, errorConverter } = require('./utils/error');
const xss = require('xss-clean');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')
const { ApiError } = require('./utils');
const app = express();
const port = 3000;

app.use(xss());
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use('/v1', routes);


app.use((req, res, next) => {
    next(new ApiError(404, 'Not found'));
});

app.listen(port, () => {
    console.log(`Server on port: ${port}`);
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
