// const got = require('got');
const axios = require("axios");
const DataFrame = require("dataframe-js").DataFrame;


exports.testController = async (req, res, next) => {
    try {
        console.log('innn')

        // let response = await axios.post("http://localhost:3000/api/session", {
        //     json: { username: "admin@admin.com", password: "admin" },
        //     responseType: "json",
        // });
        let response = await axios.post("http://localhost:3000/api/session", {
            username: "admin@admin.com",
            password: "admin"
        });
        console.log('response', response.data)
        const session_id = response.data;
        // headers = { "X-Metabase-Session": session_id };

        res.status(200).send(session_id);


    } catch (err) {
        console.log('err', err)

    }
}



exports.cardController = async (req, res, next) => {
    let session_id = req.body.session

    try {
        // Use Axios to make a GET request
        let response = await axios.get("http://localhost:3000/api/card", {
            headers: { "X-Metabase-Session": session_id } // Assuming session_id is available
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