const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(request, response)=>{
    response.sendFile(__dirname + '/index.html');
    //response.send("<h1>Salam<z!</h1>");
});

app.post('/', (request, response)=>{
    let userChoise = request.body.currency;
    console.log(userChoise);

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/eur.json')
    .then(res => {
        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log('EUR', eur);
        console.log('USD', usd);
        let message = '';

        if(userChoise === 'EUR'){
            response.send('EUR'+ eur);
        } else {
            response.send('USD'+ usd);
        }
      
    });

});

app.get('/about', (request, response) => {
    response.send("Jegor says why are you gay?")
});

app.get('/contact', (request, response) => {
    response.send("Tel: 228133742069")
});

app.listen(3000, ()=>{
    console.log('Server is running Port 3000');
});