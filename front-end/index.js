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
    var new_node=document.createElement("div")
    new_node.appendChild(nodeCopy)
    var Id = prompt("Please Enter Id of the element")
    if ((!(Element_ids[Id])) && Id) {
        nodeCopy.id = Id;
        ev.target.appendChild(new_node);
        Element_ids[Id] = 1
    } else {
        alert("Element is not added because You have added a duplicate Id")
    }
}

function Reset() {
    document.getElementById('pagebd').innerHTML = '';
    Element_ids = {}
}

function Submit() {
    var inputs = document.getElementById('pagebd').getElementsByTagName('input')
    var data = []
    for (var i = 0; i < inputs.length; i++) {
        let obj = {}
        obj['id'] = inputs[i].id;
        obj['type'] = inputs[i].type
        data.push(obj)
    }
    fetch('http://localhost:4000', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            'data': data
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then((response) =>{ 
    console.log('Success:', JSON.stringify(response));
    alert(response.url)})
    .catch(error => console.error('Error:', error));
}