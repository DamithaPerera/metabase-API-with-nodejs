const express = require('express')
const routes = require("./controller/router");
const axios = require("axios");
const {setSessionId} = require("./controller/sessionManager");

const app = express();
const port = 4000;



app.use(express.json());
app.use(express.urlencoded({extended: false}));

global.session_id = null;

async function initializeSession() {
    try {
        console.log('Initializing session...');
        let response = await axios.post("http://localhost:3000/api/session", {
            username: "admin@admin.com",
            password: "admin"
        });
        console.log('Session initialized:', response.data);
        global.session_id = response.data;
        setSessionId(response.data);
    } catch (err) {
        console.log('Error initializing session:', err);
    }
}


app.use('/v1/metabase', routes);


app.listen(port, () => {
    initializeSession();
    console.log(`🚀 Server is running on port ${port}`);
});