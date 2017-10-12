/*
*   Meessages utils node module
*/
'use strict';

function Messages() {
    //var messageList = new [];
    this.messageList = [];
}

Messages.prototype.addMessages = function (message /* type:Object */ ) {
    // : Number(id);
    /* var messageObj = {
        'id': this.id,
        'message': message
    };
    this.messageList.push(messageObj);
    this.id++;
    return this.id-1; */
    var ret = this.messageList.push(message);
    return ret-1; // id
};

Messages.prototype.getMessages = function (counter /* type:Number */ ) {
    // : Array(messages);
    if (isNaN(counter))
        return;
    return this.messageList.slice(counter);

    //return this.messageList.slice(counter);
};

Messages.prototype.deleteMessage = function (id /* type:String */ ) {

    // no return value
    this.messageList.splice(id,1);
};


//module.exports = Messages;