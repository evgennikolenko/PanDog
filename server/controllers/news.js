const https = require('https');

module.exports.getNews = async function (req, res) {
    https.get('https://newsapi.org/v2/everything?pageSize=50&sources=national-geographic&apiKey=5f87115c45194e94af3a96bbff7a0a7f', (resp) => {
        let data = [];

        resp.on('data', (chunk) => {
            data.push(chunk.toString());
        });

        resp.on('end', () => {
            res.status(200);
            res.send(JSON.parse(data));
        })
    }).on('error', (err) => {
        res.status(400);
        res.send({ message: `Cannot get news! + ${err}`})
    });
};