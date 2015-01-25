function JSONRPC(options){
    this.host = options.host;
    this.transport = options.transport||"http"
    this.path = options.path||"/"
}

JSONRPC.prototype.setAuth = function(auth){
    this.username = this.password = null
    this.auth = auth
}

JSONRPC.prototype.setBasicAuth = function(username, password){
    this.username = username;
    this.password = password;
}

JSONRPC.prototype.call = function(method, params, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4){
            try{
                var json = JSON.parse(xhr.responseText)
                if(xhr.status==200){
                    if(typeof json.error != "undefined" && json.error){
                        callback(json.error);
                    }else{
                        callback(null, json.result);
                    }
                }else{
                    callback(json.error);
                }
            }catch(e){
                callback("error: "+e);
            }
    
        }
    }

    var request = {method:method, params:params}

    if(typeof this.auth != "undefined"){
        this.auth(xhr, request)
    }
    var url = this.transport+"://";
    if(this.username && this.password){
        url+=this.username+":"+this.password+"@";
    }
    url+=this.host
    url+=this.path
    xhr.open("POST", url, true, this.username, this.password);
    xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(JSON.stringify(request));
}


