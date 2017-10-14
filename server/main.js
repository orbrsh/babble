/*
 * Main server business logic
 */

'use strict';
var http = require('http');
//var path = require('path');
var url = require('url');
var Messages = require('./messages-utils'); // messages-utils.js module
/* var responseItem = function makeResponseItem(state, body) {
    var obj = {
        state: state,
        body: body
    };
    return obj;
}; */
var responses = {
    root: {
        state: 200,
        body: {
            version: "1.0",
            links: [{
                    href: "/messages?counter=XX",
                    rel: "list of messages",
                    method: "GET"
                },
                {
                    href: "/message",
                    rel: "post message",
                    method: "POST"
                },
                /*             {
                                href:   "/message/:id",
                                rel:    "delete message",
                                method: "DELETE"
                            }, */
                {
                    href: "/stats",
                    rel: "get stats",
                    method: "GET"
                },
                {
                    href: "/users",
                    rel: "user in",
                    method: "POST"
                },
                {
                    href: "/users/:email",
                    rel: "user out",
                    method: "DELETE"
                }
            ]
        }
    },
    stats: {
        state: 200,
        body: function bodyGetStats(userCount, msgCount) {
            var obj = {
                users: userCount,
                messages: msgCount
            };
            return obj;
        }
    },
    getMessages: {
        state: 200,
        body: function bodyGetMessages(count) {
            return Messages.getMessages(count); // array
        }
    },
    postMessage: {
        state: 201,
        body: null // optionally message id
    },
    deleteMessage: {
        state: 200,
        body: null
    },
    userIn: {
        state: 200,
        body: null
    },
    userOut: {
        state: 200,
        body: null
    }
};
/*
var responseItemList = {
    root:           responseItem(200,responseBodies.root),
    getStats:       responseItem(200, responseBodies.getStats),
    getMessages:    responseItem(200, responseBodies.getMessages(count)),
    postMessage:    responseItem(201, null),
    deleteMessage:  responseItem(200, null),
    userIn:         responseItem(200, null),
    userOut:        responseItem(200, null)

} */
var contentType = "applictions/json+babble";
http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", 'http://localhost:8080');
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    console.log('request ' + request.url);
    var urlParts = url.parse(request.url);
    console.log('url parse' + urlParts);
    //var method = request.method;

    var path = urlParts.path;
    if (path == "/")
    {
        if (request.method == "GET") {
            response.writeHead(responses.root.state);
            response.end(JSON.stringify(responses.root.body));
        } else {
            errorHandler(response, 405);
        }
    }else{

        getOption(request, response, path);
    }
}).listen(9000);
console.log('Server running at http://127.0.0.1:9000/');


function getOption(request, response, path){
    var len = path.len;
    if (len==6)
    {
        if (path == "/stats")
        {
            if (request.method == "GET") {
                response.writeHead(responses.stats.state);
                response.end(JSON.stringify(responses.stats.body(/* usr count,msg count */)));
            } else {
                errorHandler(response, 405);
            }
        }else if (path == "/users")
        {
            if (request.method == "POST") {
                //add user from post
                response.writeHead(responses.userIn.state);
                response.end(JSON.stringify(responses.userIn.body));
            } else {
                errorHandler(response, 405);
            }
        }else
        errorHandler(response, 404);
    }else if (len == 9){
        if (path == "/messages"){
            if (request.method == "POST")
            {
                 //add msg from post
                 response.writeHead(responses.postMessage.state);
                 response.end(JSON.stringify(responses.postMessage.body));
            } else {
                errorHandler(response, 405);
            }
        }else{
            errorHandler(response, 404);
        }
    }else if (path.substr(0,7) == "/users/"){
        if (request.method == "DELETE"){
            var email = path.substr(7);
            if (removeUser(email)){
                response.writeHead(responses.userOut.state);
                response.end(JSON.stringify(responses.userOut.body));

            }else{
                errorHandler(response, 404); // user not found
            }
        }else{
            errorHandler(response, 405);
        }
    }
}


function errorHandler(response, errorNo) {
    var head = 0;
    var text = "";
    switch (errorNo) {
        case 405:
            head = 405;
            text = "Error 405\nRequest not allowed";
            break;
        case 400:
            head = 400;
            text = "Error 400\nBad Request";
            break;
        case 204:
            head = 204;
            text = "Error 204\nNot Supported";
            break;
        default:
        case 404:
            head = 404;
            text = "Error 404\nPage no found";
            break;
    }
    response.writeHead(head);
    response.end(text);

}

// function errorHandler(/* error, content, response */) {
// /*     if (error) {
//         if (error.code == 'ENOENT') {
//             fs.readFile('./404.html', function (error, content) {
//                 response.writeHead(200, {
//                     'Content-Type': contentType
//                 });
//                 response.end(content, 'utf-8');
//             });
//         } else {
//             response.writeHead(500);
//             response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
//             response.end();
//         }
//     } else {
//         response.writeHead(200, {
//             'Content-Type': contentType
//         });
//         response.end(content, 'utf-8');
//     } */
// }