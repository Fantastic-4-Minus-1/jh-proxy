// require('newrelic');
const express = require('express');
const proxy = require('http-proxy-middleware');
// const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
// app.use(morgan('dev'));

app.use('/:company', express.static(path.join(__dirname, '../public')));

app.use('/api/stockPricePoints/', proxy({target: 'http://ec2-52-53-158-219.us-west-1.compute.amazonaws.com/'}));
app.use('/api/people-also-bought/', proxy({target: 'http://ec2-54-219-140-91.us-west-1.compute.amazonaws.com/'}));
app.use('/api/graph', proxy({target: 'http://ec2-18-218-247-23.us-east-2.compute.amazonaws.com'}));
// app.use('/api/sideBar', proxy({target: 'http://ec2-52-53-155-25.us-west-1.compute.amazonaws.com:3004/'}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});