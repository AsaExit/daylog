const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post.js');
const auth = require('./middleware/auth');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', auth, postRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 3002;
    res.status(status).json({ error: { message: err.message } });
});

mongoose.connect(MONGODB, { 
  useNewUrlParser: true, 
  useCreateIndex:true, 
  useFindAndModify:false,
  useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb');
        return app.listen(3002);
    })
    .then(() => console.log('server running at 3002'))
    .catch(err => console.log(err.message));
