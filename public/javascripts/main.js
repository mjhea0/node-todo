function saveTodo(todo_id) {
  document.forms[0].action='/todos/' + todo_id + '/save';
  document.forms[0].submit();
};

function createTodo() {
  var description = $("[name='newTodo']").val();
  if (description) {
    document.forms[0].action='/todos/' + description + '/new';
    document.forms[0].submit();
  };
};

function priorityUp(todo_id) {
  document.forms[0].action='/todos/' + todo_id + '/priority_up';
  document.forms[0].submit();
};

function priorityDown(todo_id) {
  document.forms[0].action='/todos/' + todo_id + '/priority_down';
  document.forms[0].submit();
};

function deleteTodo(todo_id) {
  var answer = confirm('Delete it?');
  if (answer) {
    document.forms[0].action='/todos/' + todo_id + '/delete';
    document.forms[0].submit();
  };
};
