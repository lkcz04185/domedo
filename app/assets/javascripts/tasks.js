$(function(){  

    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
  function taskHtml(task) {
    var checkedStatus = task.done ? "checked" : " "
    var liElement = '<li><div class="view"><input class="toggle" type="checkbox" data-id="' + task.id + '"' + checkedStatus + '><label>' + task.title + '</label></input></div></li>';
    return liElement;
  }
  // toggleTask takes in an HTML representation of the
  // an event that fires from an HTML representation of
  // the toggle checkbox and  performs an API request to toggle
  // the value of the `done` field   

  function toggleTask(e) {
    var itemId = $(e.target).data("id");
      
    var doneValue = Boolean($(e.target).is(':checked'));
      
      $.post ("/tasks/" + itemId, {
        _method: "PUT",
        task: {done: doneValue}
      });
  }

  $.get("/tasks").success (function(data) {
    var htmlString = ""

    $.each(data, function(index, task) {
      htmlString += taskHtml(task);
    });

    var ulTodo = $(".todo-list");
    ulTodo.html(htmlString);
    $('.toggle').change(toggleTask)    
  });

  $('#new-form').submit (function(event) {
    event.preventDefault();
    var textbox = $('.new-todo')
    var payload = {
      task: {
        title: textbox.val()
      }
    };
    $.post ("/tasks/", payload).success(function(data) {
      var htmlString = taskHtml(data);
      var ulTodo = $(".todo-list");
      ulTodo.append(htmlString);
      $('.toggle').click(toggleTask);
      $('.new-todo').val('')
    });  
  });
})
  