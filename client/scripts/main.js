/*
 *	client side main js file
 */

'use strict';

var Babble; // the only global var.


Babble = function Babble() {
	var this.http = require('http');
	var this.contentType = "application/json+babble";

};

/*
 * input:
 **	userInfo:obj
 *
 */
Babble.prototype.register = function (userInfo) {
	this.http.
};

/*
 * input:
 **	counter:number
 **	callback function
 *
 */
Babble.prototype.getMessages = function (counter, callback) {
	// GET		/messages?counter=XX	(~ /poll)

};

/*
 * input:
 **	message:object
 **	callback function
 *
 */
Babble.prototype.postMessage = function (message, callback) {
	// POST		/messages	(~ new message)
	// {name:String, email:String, message:String, timestamp:Number(ms)} (request body)

};

/*
 * input:
 **	id:string
 **	callback function
 *
 */
Babble.prototype.deleteMessage = function (id, callback) {
	// DELETE	/messages/:id	(~ delete one message)

};

/*
 * input:
 **	callback function
 *
 */
Babble.prototype.getStats = function (callback) {
	// GET		/stats	(~ get statistics)
	// {users:Number , messages:Number}		(response body)

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