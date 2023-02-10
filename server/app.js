require('dotenv').config()
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./api/routes.js");

var app = express();
var myCache = require("./cache/cache");
var schedule = require('node-schedule');
var fetch = require('node-fetch');

schedule.scheduleJob('0 0 */1 * * *', async function () {
    const apikey = process.env.RAPID_API_KEY;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Invalid or Undefined API Key!`
    });
    try {
        var stockArray = ['IBM', 'META', 'MSFT', 'AAPL', 'NFLX', 'AMZN'];
        stockArray.forEach(async element => {
            const data = await fetch(
                `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=` + element + `&datatype=json`,
                {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
                        "x-rapidapi-key": apikey,
                    },
                }
            )
            const jsonData = await data.json();
            if (jsonData['Time Series (Daily)']) {
                let keys = Object.keys(jsonData['Time Series (Daily)']);
                let firstTen = keys.slice(0, 10);
                let values = Object.values(jsonData['Time Series (Daily)']);
                let firstTenVal = values.slice(0, 10);
                const merged = firstTen.reduce((obj, key, index) => ({ ...obj, [key]: firstTenVal[index] }), {});
                myCache.set(element, { metadata: jsonData['Meta Data'], stock: merged });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', routes);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});