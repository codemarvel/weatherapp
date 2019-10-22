
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var tf,tc;
function celcius() {
  let weatherText = `It's ${tc} degree celcius in ${weather.name}!`;
  res.render('index', {weather: weatherText, error: null});

}
function fahrenheit(){
  let weatherText = `It's ${tf} degree celcius in ${weather.name}!`;
  res.render('index', {weather: weatherText, error: null});
}
const apiKey = '6bec752c65aa39fb3d57fdd503d7cc52';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
         tf=weather.main.temp;
         tc=((weather.main.temp)-32)*(5/9);
         let humidity=  weather.main.humidity;
         let windspeed=weather.main.speed;
        let weatherText = `Temperature: ${tc.toFixed(1)} celcius    Humidity: ${humidity} hg `;
        res.render('index', {weather: weatherText, error: null});
        res.send(humidity);
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
