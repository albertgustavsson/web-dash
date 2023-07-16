const express = require('express');
const { networkInterfaces } = require('os');
const ping = require('ping');
const wol = require('wol');

function exitHandler() {
    console.log('exiting');
    process.exit(0);
}
process.on('SIGINT', exitHandler);

const app = express();
app.use(express.static('public'));

//app.get('/', (req, res) => {
//    console.log('GET Request for ' + '\'/\'' + ' received from ' + req.ip);
//    res.sendFile(__dirname + '/index.html');
//});

app.get('/ping', async (req, res) => {
    const pingDestination = '192.168.50.10';
    console.log('GET Request for ' + '\'/ping\'' + ' received from ' + req.ip);
    const pingResponse = await ping.promise.probe(pingDestination);
    console.log(pingResponse);
    if (pingResponse.alive) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
    //res.send(pingDestination + ' is ' + (!pingResponse.alive ? 'not ' : '') + 'reachable.');
});

app.post('/wake', async (req, res) => {
    const mac = '3C:7C:3F:D5:FA:1D';
    console.log('POST Request for ' + '\'/wake\'' + ' received from ' + req.ip);
    wol.wake(mac, function(err, wake_res) {
        console.log(wake_res);
        if (wake_res) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    });
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
