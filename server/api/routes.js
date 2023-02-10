var express = require('express');
var router = express.Router();
var myCache = require('../cache/cache');
var fetch = require('node-fetch');
router.get('/getStock/:stock', async (req, res) => {
  const apikey = process.env.RAPID_API_KEY;
  if (apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Invalid or Undefined API Key!`
  });
  try {
    if (myCache.get(req.params.stock)) {
      res.status(200).json(myCache.get(req.params.stock));
    } else {
      const data = await fetch(
        `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=` + req.params.stock + `&datatype=json`,
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
        myCache.set(req.params.stock, { metadata: jsonData['Meta Data'], stock: merged });
        res.status(200).json(myCache.get(req.params.stock));
      } else {
        res.status(500).json({ msg: `Exceeded api limit. Please try again later.` });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error. Please try again later or contact the administrator.` });
  }
});

module.exports = router;