const express = require('express');
const { readFileSync } = require('fs');
const { networkInterfaces } = require('os');
const ping = require('ping');

function exitHandler() {
    console.log('exiting');
    process.exit(0);
}
process.on('SIGINT', exitHandler);

const app = express();

app.get('/', (req, res) => {
    console.log('GET Request for ' + '\'/\'' + ' received from ' + req.ip);
    res.send(readFileSync('./index.html', 'utf-8'));
});

app.get('/ping', async (req, res) => {
    const pingDestination = 'google.com';
    console.log('GET Request for ' + '\'/ping\'' + ' received from ' + req.ip);
    const pingResponse = await ping.promise.probe(pingDestination);
    res.send(pingDestination + ' is ' + (!pingResponse.alive ? 'not ' : '') + 'alive.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App is available on');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (!net.internal) {
                console.log('http://' + net.address + ':' + port);
            }
        }
    }
});
