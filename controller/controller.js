// const got = require('got');
const axios = require("axios");
const sessionManager = require("./sessionManager");
const DataFrame = require("dataframe-js").DataFrame;



exports.cardController = async (req, res, next) => {
    let session_id = sessionManager.getSessionId()
    try {
        // Use Axios to make a GET request
        let response = await axios.get("http://localhost:3000/api/card", {
            headers: { "X-Metabase-Session": session_id.id } // Assuming session_id is available
        });
        // Filter for public questions
        // const questions = response.data.filter(q => q.public_uuid);
        // console.log(`${questions.length} public of ${response.data.length} questions`);

        // Send response or further processing
        res.status(200).json(response.data);
    } catch (err) {
        console.log('err', err)
    }
}



exports.cardFilterController = async (req, res, next) => {
    let session_id = sessionManager.getSessionId()
    try {
        let response = await axios.get("http://localhost:3000/api/search/?archived=false&models=dashboard", {
            headers: { "X-Metabase-Session": session_id.id } // Assuming session_id is available
        });

        // Send response or further processing
        res.status(200).json(response.data);
    } catch (err) {
        console.log('err', err)
    }
}