##jsonrpc.js
JSON RPC client implementation in javascript

##usage

Create client object
```javascript
    var client = new JSONRPC({host:"localhost:3001"});
```

other available options
```javascript
    host : rpc host
    transport: used transport, default http
    path: rpc path
```

call remote methods
```javascript
client.call("sum", [1,2,3], function(err, result){})
```
