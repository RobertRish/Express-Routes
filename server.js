const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// console.log("testing");
mongoose.connect(
    // look at URL in line below
    process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);


// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Now running on port ${PORT}!`);
});

