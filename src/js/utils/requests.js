

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

function http_request(method, url, callback){
    var request = makeHttpObject();
    request.open(method.toUpperCase(), url, true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4){
            callback(request.responseText)
        }
    };
}