// const got = require('got');
const axios = require("axios");
const sessionManager = require("./sessionManager");
const DataFrame = require("dataframe-js").DataFrame;
const { createCanvas } = require('canvas');
const { Chart, registerables } = require('chart.js');
Chart.register(...registerables);



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

        // Parse and process the data
        let parsedData = response.data.data.map(item => {
            let scores = item.scores || [];
            let totalScore = scores.reduce((sum, scoreItem) => sum + scoreItem.score, 0);
            let totalWeight = scores.reduce((sum, scoreItem) => sum + scoreItem.weight, 0);
            return {
                name: item.name || "Unnamed",
                totalScore,
                totalWeight
            };
        });

        // Prepare data for Chart.js
        let labels = parsedData.map(item => item.name);
        let data = {
            labels: labels,
            datasets: [
                {
                    label: 'Total Score',
                    data: parsedData.map(item => item.totalScore),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Total Weight',
                    data: parsedData.map(item => item.totalWeight),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };

        // Create the canvas for Chart.js
        const width = 400;
        const height = 400;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Generate the chart
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // // Send response or further processing
        // res.status(200).json(response.data);

        const buffer = canvas.toBuffer('image/png');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);


    } catch (err) {
        console.log('err', err)
    }
}