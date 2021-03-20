$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    //setup click handler
$('#addButton').on('click', addTask);
getList();
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
    console.log('back from POST with:', response);
    getList();
}).catch(function(err){
    alert('error adding item to db');
    console.log(err);
})
}//end addTask


function getList(){
    console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function(response){
        console.log('back from GET:', response);
        let el = $('#viewTasks');
        el.empty();
        for (let i = 0; i < response.length; i++) {
            el.append(`
        <tr>
            <th>${response[i].task}</th>
            <th>${response[i].complete}</th>
        </tr>    
            `)
        }//end for
    }).catch(function(error){
        console.log('error in GET', error);
    })
}//end getList