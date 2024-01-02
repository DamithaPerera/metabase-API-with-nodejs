const express = require('express')
const routes = require("./controller/router");

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});


app.use('/v1/metabase', routes);


app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});