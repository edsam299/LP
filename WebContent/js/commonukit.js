var linkprojecthostname="http://localhost:8082";
var linkprojectapi = "http://localhost:8080/linkrestapi/rest";
//var linkprojectapi = "http://10.190.0.57:8080/linkrestapi/rest";
//var linkprojecthostname="http://10.190.0.57:8082";

function getData(url, method, async, contentType,data, callback){
	var xhttp = new XMLHttpRequest();

	if(method.toUpperCase()=='POST'){
		xhttp.open(method, url, async);
		xhttp.setRequestHeader("Content-Type", contentType);
		xhttp.send(data);
	}else if(method.toUpperCase()=='GET'){
		xhttp.open(method, url, async);
		xhttp.setRequestHeader("Content-Type", contentType);
		xhttp.send();
	}
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && this.status == 200) {
				
		}else{
			callback(xhttp.statusText);
		}
	};
	callback(JSON.parse(xhttp.responseText));
};
function post_(){
	let url=linkprojecthostname+"/linking/testpost";
	let method='POST';
	let data='{"test":"data"}';
	let async=false;
	let contentType='application/json';
	ajaxs.callAjax(url, method, data, async, contentType, function(json){
		console.log(json);
	});
}
function ajaxUkit(){
	ajaxUkit.prototype.callAjax=function(url, method, data, async, contentType, callback){
		console.log("1");
		var xhttp = new XMLHttpRequest();
		
		console.log("2");
//		xhttp.onreadystatechange = function() {
//			if (xhttp.readyState == 4 && this.status == 200) {
//				callback(JSON.parse(xhttp.responseText));
//			}else{
//				callback(xhttp.statusText);
//			}
//		};
		if(method.toUpperCase()=='POST'){
			xhttp.open(method, url, async);
			xhttp.setRequestHeader("Content-Type", contentType);
			xhttp.send(data);
		}else if(method.toUpperCase()=='GET'){
			console.log(async)
			xhttp.open(method, url, async);
			xhttp.setRequestHeader("Content-Type", contentType);
			console.log("3");
			xhttp.send();
		}
	};
//	ajaxUkit.prototype.getCallAjax = function(url, method, data, async, contentType,callback){
//
//	    var xhr = new XMLHttpRequest();
//	    xhr.open("GET", url, async);
//	    xhr.send();
//
//	    // stop the engine while xhr isn't done
//	    for(; xhr.readyState !== 4;)
//
//	    if (xhr.status === 200) {
//
//	        console.log('SUCCESS', xhr.responseText);
//
//	    } else console.warn('request_error');
//
//	    callback(JSON.parse(xhr.responseText));
//	}
}