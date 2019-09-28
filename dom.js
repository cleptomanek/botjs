'use strict';

const request = require('request');
const cheerio = require('cheerio');
const url = 'http://play-aura.com/ranking2010/';
const fs = require('fs');

const getPage = ( cb ) => {
    request(url, {
        timeout: 3000
    }, (error, response, body) => {
        if(!error) {
            cb(body);
        }
    });
};

const parsePage = ( data ) => {
    const $ = cheerio.load(data);
    let output = [];
	$(".ladder_class table tr:nth-child(2) table tr:nth-child(2) select:nth-child(1) option").each (function() {
    console.log($( this ).html());
	});
    return output;
};

getPage( (html) => {
    let data = parsePage( html );
});