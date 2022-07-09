var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');

const todo = require('./todo')


module.exports.handler = function(req, resp, context) {
    // Get the uri path
    var uri = (req.path.slice(1))

    getRawBody(req, function(err, body) {
        resp.setHeader('content-type', 'text/json')
        const reqBody = body.toString()
        switch(req.method) {
            case 'GET':
                // API of get method
                const responseGet = todo.get(uri)
                resp.setStatusCode(responseGet.code)
                resp.send(JSON.stringify(responseGet))
                break
            case 'POST':
                // API of post method
                const responsePost = todo.post(uri, reqBody)
                resp.setStatusCode(responsePost.code)
                resp.send(JSON.stringify(responsePost))
                break
            case 'DELETE':
                // API of delete method
                const responseDelete = todo.remove(uri, reqBody)
                resp.setStatusCode(responseDelete.code)
                resp.send(JSON.stringify(responseDelete))
                break
            default:
                // Other methods return 400
                resp.setStatusCode(400)
                resp.send(JSON.stringify({ 'code': 400, 'error': true }))
        }
    })
}
