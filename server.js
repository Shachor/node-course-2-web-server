const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Middleware can be added to express to do just about anything through the app.use()
// This middleware will log requests to the screen and timestamp them
app.use((req, res, next) => {
  // This will be used for the timestamp
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  // save the log to a server.log file !!!!LOGFILES!!!!!
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// This middleware is a maintenance tag. If you want to take the entire site
// offline for maintenance, uncomment this block. Because it never calls next,
// nothing else after it will get called.
app.use((req, res, next) => {
  res.render('maintenance');
});
// We had to move this after our maintenance or else anything in the public dir would
// still be available even in maintenance mode.
app.use(express.static(__dirname + '/public'));   // __dirname is part of the wrapper

//This is an HBS helper. Allows us to run common functions then call them in handlebars in our pages.
// Helpers can take arguments.
// hbs.registerHelper('NAME', CALLBACK)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// We can send our helpers arguments from within the template
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// Routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    pageTitle: 'Welcome to Mi Casa',
    welcomeMessage: 'Whatever you do during your stay, don\'t look directly at his eyes.',
    // currentYear: new Date().getFullYear(),     No longer necessary because of Helper
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    pageTitle: "ABOUT PAGE",
    // currentYear: new Date().getFullYear(),     No longer necessary because of Helper
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'This is a bad request.'
  });
})




// app.listen(3000);
app.listen(3000, () => {
  console.log('Server is up on Port 3000');
});


// This command to start the server will watch for changes to js and hbs files
// nodemon server.js -e js,hbs
