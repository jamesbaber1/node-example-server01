const express = require('express');
const  hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 8079;

var app = express();


hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine', 'hbs');



app.use((req, res, next) => {                               //middleware example: request logger
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err){
            console.log('Unable to append to server log.')
        }
    })
    next();
});

// app.use((req, res, next)=>{             //middleware example: goes to maintence page
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', ()=>{  //function without an argument
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {      //function with an argument  hbs syntax:   {{screamIt text}}
    return text.toUpperCase();
})


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my website!!',
        pageTitle: 'Home Page'
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(port, ()=>{
    console.log(`Server is up on  port ${port}`)
});