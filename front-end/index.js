var Element_ids = {} // object for storing Ids of dropped elements
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("element", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("element");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    var Id = prompt("Please Enter Id of the element")
    if ((!(Element_ids[Id])) && Id) {
        nodeCopy.id = Id;
        ev.target.appendChild(nodeCopy);
        Element_ids[Id] = 1
    } else {
        alert("Element is not added because You have added a duplicate Id")
    }
}

function Reset(){
	document.getElementById('pagebd').innerHTML='';
	Element_ids={}
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function Submit(){
	var inputs=document.getElementById('pagebd').getElementsByTagName('input')
	var data=[]
	for(var i=0;i<inputs.length;i++){
		let obj={}
		obj['id']=inputs[i].id;
		obj['type']=inputs[i].type
		data.push(obj)
	}
	postAjax('http://localhost:4000/', {'data':data}, function(data){ console.log(data); });

}