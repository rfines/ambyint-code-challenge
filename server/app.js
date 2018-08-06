import express from 'express'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import AddressController from './app/controllers/address'
import Geocoder from './app/helpers/geocode';

var mongoose = require('mongoose')
const mongoDB = 'mongodb://ambyint:AM8Y1nt@ds019268.mlab.com:19268/ambyint-demo';
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/addresses', AddressController.get );
app.get('/addresses/types', AddressController.types );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
app.listen(port, () => {
    console.log('We are live on ' + port)
    console.log('We are processing the addresses.csv file')
    let geo = new Geocoder('./app/files/addresses.csv')
    geo.doWork().then((models) => {
        console.log('finished processing the addresses')
        if(models && models.length) {
            console.log(`processed ${models.length} addresses`)
        }
    })

});

export default app