$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    //setup click handler
$('#addButton').on('click', addTask);
}//end onReady

function addTask(){
console.log('in addTask');
//Create List Object
let listObject = {
    task: $('#taskIn').val(),
    complete: false
}//end listObject
console.log('object:', listObject);
//AJAX call to for task
$.ajax({
    method: 'POST',
    url: '/list',
    data: listObject
}).then(function(response){
    console.log('back from post with:', response);
}).catch(function(err){
    alert('error adding item to db');
    console.log(err);
})
}//end addTask
