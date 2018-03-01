$(document).ready(function(){

	$("#addItem").on("click", addItem);
	$("#todoList").on("change", '.completeItem', completeItem);
	$("#todoList").on("click", '.delete', deleteItem);
	$('#newTodo').on('keypress', function(event) {
		if(event.which === 13){
			event.preventDefault();
			addItem();
		}
	})

	var editing = true;
	$('#todoList').on('click', '.editBtn', function(){
		if(editing) {
			startEditing($(this));
			$(this).removeClass('fa-pencil');
			$(this).addClass('fa-floppy-o');
			editing = false;
		} else {
			stopEditing($(this));
			$(this).removeClass('fa-floppy-o');
			$(this).addClass('fa-pencil');
			editing = true;
		}
	})

	function startEditing(button) {
		var currentText = button.parent().find('.todoText').text();
		button.parent().find(".editText").val(currentText);
		button.parent().find(".editText").show();
		button.parent().find(".todoText").hide();
	}

	function stopEditing(button) {
		var newValue = button.parent().find(".editText").val();
		button.parent().find(".editText").hide();
		button.parent().find('.todoText').text(newValue);
		button.parent().find('.todoText').show();
	}

	function addItem(event){
		var todoText = $("#newTodo").val();
		if (todoText){
			$("#todoList").append('<li><input type="checkbox" class="completeItem"><span class="todoText">' + todoText + 
				'</span><input class="editText" type="text"><i class="fa fa-trash-o delete" aria-hidden="true"></i><i class="fa fa-pencil editBtn" aria-hidden="true"></i></li>');
			$("#newTodo").val(""); // to clear input
		}
	}

	function deleteItem(){
		$(this).parent().remove();
	}

	function completeItem(){
		$(this).parent().toggleClass("done");
	}

	$("#todoList").sortable({'axis' : 'y'});

	// -----------------------------------------------------

	$("#sortByName").on('click', sortByName);

	function sortByName(){
		var i, switching, listItem, shouldSwitch, direction, switchCount = 0;
		switching = true;
		direction = "asc";
		while(switching) {
			switching = false;
			listItem = $("#todoList li");
			for(i = 0; i < (listItem.length - 1); i++) {
				shouldSwitch = false;
				if(direction == "asc") {
					if(listItem.eq(i).find(".todoText").html().toLowerCase() > listItem.eq(i+1).find(".todoText").html().toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (direction == "desc") {
					if(listItem.eq(i).find(".todoText").html().toLowerCase() < listItem.eq(i+1).find(".todoText").html().toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}

			if(shouldSwitch) {
				listItem.eq(i+1).remove().insertBefore(listItem.eq(i));
				switching = true;
				switchCount ++;
			} else {
				if(switchCount == 0 && direction == "asc") {
					direction = "desc";
					switching = true;
				}
			}
		}
	}


})