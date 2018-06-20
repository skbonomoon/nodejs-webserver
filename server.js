
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	//fs.appendFile('server.log', log + '\n');
	fs.appendFile('server.log', log + '\r\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log.');
		}
	});
	
	next();
});

//app.use((req, res, next) => {
//	res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

hbs.registerHelper('portfoliolink', () => {
	return 'http://daum.net';
});

app.get('/', (req, res) => {
	//res.send('<hi>hello, express!</hI>');
//	res.send({
//		name: 'Skmoon',
//		likes:[
//			'Swimming',
//			'Music',
//			'Books'
//		]
//	});
	res.render('home.hbs', {
		pageTitle: 'Introduction',
		welcomeMessage: 'welcome',
		name: 'Skmoon',
		likes:[
			'Swimming',
			'Music'
		]
		//currentYear: new Date().getFullYear()
	});
});

app.get('/portfolio', (req, res) => {
	res.render('portfolio.hbs', {
		pageTitle: 'Portpolio'
	});
});

app.get('/about', (req, res) => {
	//res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page'
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Error occured',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
