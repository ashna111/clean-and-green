var express = require("express");
var router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

//Routes
//Landing Page
router.get("/", function (req, res) {
	res.render("landing");
});

//Home page
router.get("/home", function (req, res) {
	res.render("home");
});

var contents = [];
request('https://grist.org/', (error, response, html) => {
	if (!error && response.statusCode == 200) {
		const $ = cheerio.load(html);
		$('.card__title').each((i, el) => {
			const item = $(el).find('.card__title-link').text().replace(/\s\s+/g, '');
			const link = $(el).find('.card__title-link').attr('href');
			contents.push({ item: item, link: link })
		})
		// console.log(contents);
	}
})

router.get("/think-green", function (req, res) {
	res.render("think_green", { contents: contents });
});

module.exports = router;