$(document).ready(onReady);
const bootstrap = require('bootstrap')

function onReady(){
    console.log('JQ');
    getList();
    //setup click handler
$('#addButton').on('click', addTask);
$('#viewTasks').on('click', '.completeButton', updateList);
$('#viewTasks').on('click', '.deleteButton', deleteTask);
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
            let completeHTML = `<button data-id="${response[i].id}" class="completeButton">Task Complete</button>`;
            if (response[i].complete === true) {
                completeHTML = "Completed"
                el.append(`
                <tr>
                    <th><li><s>${response[i].task}</s></li></th>
                    <th>${completeHTML}</th>
                    <th><button data-id=${response[i].id} class="deleteButton" aria-label="Close">x</button></th>
                </tr>    
                    `)
            } else{
            el.append(`
        <tr>
            <th><li>${response[i].task}</li></th>
            <th>${completeHTML}</th>
            <th><button data-id=${response[i].id} class="deleteButton" aria-label="Close">x</button></th>
        </tr>    
            `)}
        }//end for
    }).catch(function(error){
        console.log('error in GET', error);
    })
}//end getList

function updateList(){
    const myId = $(this).data ('id',);
    console.log('in updateList', myId);

$.ajax({
    method: 'PUT',
    url: '/list/' + myId
}).then(function(response){
    console.log('back from PUT:', response);
    getList();
}).catch(function(err){
    console.log(err);
    alert('error in PUT');
})
}//end updateList

function deleteTask(){
    console.log($(this).data('id'));
    const myId = $(this).data('id');
    console.log('in deleteTask');
    swal({
      title: "WARNING",
      text: "Would you like to delete your task?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((deleteTask)=>{
      if (deleteTask) {
        swal("Your task has been deleted.",{
          icon: "success",
        });
  
        $.ajax({
          method: 'DELETE',
          url: '/list/' + myId
        }).then(function(response){
          console.log('back from DELETE with:', response);
          getList();
        }).catch(function(err){
          console.log(err);
          alert('error in DELETE');
        })
  
      }//end deleteTask 
    })
}