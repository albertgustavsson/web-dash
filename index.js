const express = require('express');
const { readFileSync } = require('fs');
const { networkInterfaces } = require('os');

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
