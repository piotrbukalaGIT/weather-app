const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// AWS EB
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Piotr'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'O mnie',
        name: 'Piotr'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Tutaj bedzie pomoc',
        title: 'Help',
        name: 'Piotr'
    })
})

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      error: 'Please provide address'
    })
  }
  
  geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
          return res.send({
            error: error
          })
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
      })
    })
})

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Piotr',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Piotr',
        errorMessage: 'Page not found.'
    })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

module.exports = app;