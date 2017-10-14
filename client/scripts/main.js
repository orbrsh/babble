/*
 *	client side main js file
 */

'use strict';

var Babble = new BabbleClass(); // the only global var.


function BabbleClass() {
	//this.http = require('http');
	this.contentType = "application/json+babble";
	this.baseServerUrl = "http://localhost:9000/";
	//this.xmlHttp = new XMLHttpRequest();
	window.alert("sdsdsd");
}

/*
 * input:
 **	userInfo:obj
 ***	userInfo.name : string
 ***	userInfo.email: string
 *
 */
BabbleClass.prototype.register = function (userInfo) {
	var registerString = "name=" + userInfo.name + "&email=" + userInfo.email;
	var url = this.baseServerUrl + "users";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === xmlHttp.DONE)
			if (xmlHttp.status === 201) {  // registration completed
				var response = JSON.parse(xmlHttp.responseText);
				window.alert("registration complete "+ JSON.stringify(response));
			} else
				BabbleClass.prototype.errorHandler(xmlHttp.status);

	}
	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader('Content-Type', this.contentType);
	xmlHttp.send(registerString);
};

/*
 * input:
 **	counter:number
 **	callback function
 *
 */
BabbleClass.prototype.getMessages = function (counter, callback) {
	// GET		/messages?counter=XX	(~ /poll)
	//var registerString = "name=" + userInfo.name + "&email=" + userInfo.email;
	var url = this.baseServerUrl + "messages" + "?counter=" + counter;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === xmlHttp.DONE)
			if (xmlHttp.status === 200) {
				var response = JSON.parse(xmlHttp.responseText);
				window.alert("messages recieved complete "+ JSON.stringify(response));
			} else
				BabbleClass.prototype.errorHandler(xmlHttp.status);

	}
	xmlHttp.open('GET', url, true);
	xmlHttp.setRequestHeader('Content-Type', this.contentType);
	xmlHttp.send(null);

};

/*
 * input:
 **	message:object
 **	callback function
 *
 */
BabbleClass.prototype.postMessage = function (message, callback) {
	// POST		/messages	(~ new message)
	// {name:String, email:String, message:String, timestamp:Number(ms)} (request body)
	//var registerString = "name=" + userInfo.name + "&email=" + userInfo.email;
	var url = this.baseServerUrl + "messages";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === xmlHttp.DONE)
			if (xmlHttp.status === 200) {
				var response = JSON.parse(xmlHttp.responseText);
				window.alert("posting complete "+ JSON.stringify(response));
			} else
				BabbleClass.prototype.errorHandler(xmlHttp.status);

	}
	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader('Content-Type', this.contentType);
	xmlHttp.send(JSON.stringify(message));

};

/*
 * input:
 **	id:string
 **	callback function
 *
 */
BabbleClass.prototype.deleteMessage = function (id, callback) {
	// DELETE	/messages/:id	(~ delete one message)
	var url = this.baseServerUrl + "messages/" + id;
	var xmlHttp = new this.http.XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === xmlHttp.DONE)
			if (xmlHttp.status === 200) {
				var response = JSON.parse(xmlHttp.responseText);
				window.alert("delete id "+id+" complete "+ JSON.stringify(response));
			} else
				BabbleClass.prototype.errorHandler(xmlHttp.status);

	}
	xmlHttp.open('DELETE', url, true);
	xmlHttp.setRequestHeader('Content-Type', this.contentType);
	xmlHttp.send(null);
};

/*
 * input:
 **	callback function
 *
 */
BabbleClass.prototype.getStats = function (callback) {
	// GET		/stats	(~ get statistics)
	// {users:Number , messages:Number}		(response body)
	var url = this.baseServerUrl + "stats";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === xmlHttp.DONE)
			if (xmlHttp.status === 200) {
				var response = JSON.parse(xmlHttp.responseText);
				window.alert("stats recieved complete "+ JSON.stringify(response));
			} else
				BabbleClass.prototype.errorHandler(xmlHttp.status);

	}
	xmlHttp.open('GET', url, true);
	xmlHttp.setRequestHeader('Content-Type', this.contentType);
	xmlHttp.send(null);

};

BabbleClass.prototype.errorHandler = function (error) {
	switch (error) {
		case 400:

			break;

		default:
			break;
	}
};

/* Babble.register(userInfo: Object)
Babble.getMessages(counter: Number, callback: Function)
Babble.postMessage(message: Object, callback: Function)
Babble.deleteMessage(id: String, callback: Function)
Babble.getStats(callback: Function) */

//#region growable textarea
// Based on: https://alistapart.com/article/expanding-text-areas-made-elegant
function makeGrowable(container) {
	var area = container.querySelector('textarea');
	var clone = container.querySelector('span');
	area.addEventListener('input', function (e) {
		clone.textContent = area.value;
	});
}
//#endregion