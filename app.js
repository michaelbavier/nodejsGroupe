const express = require ('express');

const path = require ('path');

const body-Parser = require ('body-parser');

const cors = require ('cors');

const passport = require ('passport');

const mangoose = require ('mangoose');

const config = require ('./api/config/database');


mangoose.Promise = require ('bluebird');

mangoose.connect ( config.database, {
  promiseLibrary : require('bluebird')
})

.then(() => console.log('Connected to database ${config.database}'))
.catch((err) => console.log('Datase error: ${err}'));

const app = express();

const useer = require ('/api/routes/user');

const port = 3000;



app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.inialize());
app.use(passport.session());

require('./api/config/passport') (passport);

app.use('/users', users);

app.get('/', req,res) => {
  res.send('Invalid Endpoint');
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html'));
});


app.use((req, res , next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error,status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});

module.exports = app;

const = http = require('http');
const app = require ('/app');


const port = passport = process.env.PORT || 3000;

const server = http.createServer(app);

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
