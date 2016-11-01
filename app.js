"use strict";

let apiKeys = {};

function putTodoInDOM(){
  FbAPI.getTodos(apiKeys).then(function(items){
    console.log("itmems from FB", items);
    $("#completed-tasks").html("");
    $("#incomplete-tasks").html("");
    items.forEach(function(item){
    if (item.isCompleted === true){
      let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='</li>';
    //apend to list
    $('#completed-tasks').append(newListItem);
    } else {
      let newListItem = '<li>';
      newListItem+='<div class="col-xs-8">';
      newListItem+='<input class="checkboxStyle" type="checkbox">';
      newListItem+=`<label class="inputLabel">${item.task}</label>`;
      newListItem+='<input type="text" class="inputTask">';
      newListItem+='</div>';
      newListItem+='<div class="col-xs-4">';
      newListItem+='<button class="btn btn-default col-xs-6 edit">Edit</button>';
      newListItem+=`<button class="btn btn-danger col-xs-6 delete" data-fbid="${item.id}">Delete</button> `;
      newListItem+='</div>';
      newListItem+='</li>';
    //apend to list
    $('#incomplete-tasks').append(newListItem);
    }
    });
  });
}

$("#add-todo-button").on("click", function(){
  console.log("test");
  let newItem = {
    "task":$("#add-todo-text").val(),
    "isCompleted": false
  };
  FbAPI.addTodo(apiKeys, newItem).then(function(){
    putTodoInDOM();
  });
});

$(document).ready(function(){
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
      firebase.initializeApp(apiKeys);
      putTodoInDOM();
  });
});

$('ul').on("click", ".delete", function() {
  let itemId = $(this).data("fbid");
  FbAPI.deleteTodo(apiKeys,itemId).then(function() {
    putTodoInDOM(); 
  });
});