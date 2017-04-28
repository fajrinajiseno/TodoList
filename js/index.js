$(function(){ 
	$("#toDoList").html(""); 
	var operation = "Add";
	var selected_index = -1;
	var listTask = localStorage.getItem("listTask");
	listTask = JSON.parse(listTask);
	if(listTask == null) {
		listTask = []; 
	}
	var indexLoad = listTask.length - 1;
	var indexStop = indexLoad - 5;
	if (indexStop < 0){
		$("#plusTask").remove();
	}
	$('.datetime').datetimepicker({
		pickDate: true,
		pickTime: true
	});
	List();
	$('[data-tooltip=\'tooltip\']').tooltip({container: 'body'});
	
	/* Fungsi yang digunakan untuk meng-input data task ke localstorage */
	function Add(){ 
		var done;
		if ($('#done').is(":checked")) {
			done = "Task selesai";
		}
		else {
			done = "Task belum selesai"
		}
		var client = JSON.stringify({ 
			Judul : $("#judulTask").val(), 
			Deskripsi : $("#deskripsiTask").val(), 
			Mulai : $("#tanggalMulai").val(), 
			Selesai : $("#tanggalSelesai").val(),
			Prioritas : $("#prioritas").val(),
			Done : done
		}); 
		listTask.push(client); 
		localStorage.setItem("listTask", JSON.stringify(listTask));
		setTimeout(function() {
			x0p({
			  title: 'Success',
			  text: 'List data was saved.',
			  icon: 'ok',
			  buttons: [],
			  autoClose: 3000
			}).then(function(data) {
				location.reload();
			});
		}, 1000);
	} 

	/* Fungsi yang digunakan untuk meng-update data task ke localstorage */
	function Edit(){ 
		var done;
		if ($('#done').is(":checked")) {
			done = "Task selesai";
		}
		else {
			done = "Task belum selesai"
		}
		listTask[selected_index] = JSON.stringify({ 
			Judul : $("#judulTask").val(), 
			Deskripsi : $("#deskripsiTask").val(), 
			Mulai : $("#tanggalMulai").val(), 
			Selesai : $("#tanggalSelesai").val(),
			Prioritas : $("#prioritas").val(),
			Done : done
		});
		localStorage.setItem("listTask", JSON.stringify(listTask)); 
		operation = "Add";
		setTimeout(function() {
			x0p({
			  title: 'Success',
			  text: 'List data was edited.',
			  icon: 'ok',
			  buttons: [],
			  autoClose: 3000
			}).then(function(data) {
				location.reload();
			});
		}, 1000);
	} 
	
	/* Fungsi yang digunakan untuk mengdapus data task pada localstorage */
	function Delete(){ 
		listTask.splice(selected_index, 1); 
		localStorage.setItem("listTask", JSON.stringify(listTask)); 
		setTimeout(function() {
			x0p({
			  title: 'Success',
			  text: 'List was deleted.',
			  icon: 'ok',
			  buttons: [],
			  autoClose: 3000
			}).then(function(data) {
				location.reload();
			});
		}, 1000); 
	} 

	/* Fungsi yang menampilkan semua task pada localstorage */
	function List(){
		if(listTask == null || listTask.length == 0) {
			$("#toDoList").html("<h2 class='text-center'><div class='alert alert-danger'>To do list masih kosong!</div></h2>");
		}
		else{
			while (indexLoad >= 0 && indexLoad > indexStop){ 
				var cli = JSON.parse(listTask[indexLoad]); 
				var done = "";
				if (cli.Done == "Task selesai") {
					done = cli.Done + "<i class='fa fa-check' aria-hidden='true' style='color:#5cb85c;margin-left:10px;'></i>";
				}
				else {
					done = cli.Done + "<i class='fa fa-times' aria-hidden='true' style='color:#d9534f;margin-left:10px;'></i>";
				}
				$("#toDoList").append(
					"<div class='card mb-3'>"+ 
					"<div class='card-header'>"+cli.Judul+"</div>" + 
					"<div class='card-block'>" + 
					"<div class='row detail-info'><div class='col-lg-2 col-sm-3 col-xs-12'><b>Deskripsi Task</b></div><div class='col-xs-1 hidden-xs'>:</div><div class='col-lg-9 col-sm-8 col-xs-12'>"+cli.Deskripsi+"</div></div>" + 
					"<div class='row detail-info'><div class='col-lg-2 col-sm-3 col-xs-12'><b>Task dimulai</b></div><div class='col-xs-1 hidden-xs'>:</div><div class='col-lg-9 col-sm-8 col-xs-12'>"+cli.Mulai+"</div></div>" + 
					"<div class='row detail-info'><div class='col-lg-2 col-sm-3 col-xs-12'><b>Task selesai</b></div><div class='col-xs-1 hidden-xs'>:</div><div class='col-lg-9 col-sm-8 col-xs-12'>"+cli.Selesai+"</div></div>" + 
					"<div class='row detail-info'><div class='col-lg-2 col-sm-3 col-xs-12'><b>Prioritas Task</b></div><div class='col-xs-1 hidden-xs'>:</div><div class='col-lg-9 col-sm-8 col-xs-12'>"+cli.Prioritas+"</div></div>" + 
					"<div class='row detail-info'><div class='col-lg-2 col-sm-3 col-xs-12'><b>Status Task</b></div><div class='col-xs-1 hidden-xs'>:</div><div class='col-lg-9 col-sm-8 col-xs-12'>"+done+"</div></div>" + 
					"<div class='pull-right btn-toolbar'>" + 
					"<div id='Edit"+indexLoad+"' class='btnEdit btn-group' data-tooltip='tooltip' title='Edit Task'><i class='fa fa fa-pencil-square-o' aria-hidden='true'></i></div>" + 
					"<div id='Delete"+indexLoad+"' class='btnDelete btn-group' data-tooltip='tooltip' title='Delete Task'><i class='fa fa-trash-o' aria-hidden='true'></i></div>" + 
					"</div>" + 
					"</div>" + 
					"</div>"
				); 
				indexLoad--;
			}
			indexStop = indexStop - 5;
		}		
	}	

	/* Submit form handler */
	$("#btnSave").bind("click",function(){ 
		if(operation == "Add") {
			x0p({
				title: 'Confirmation',
				text: 'Are you sure you want to add this task?',
				icon: 'warning',
				animationType: 'fadeIn',
				buttons: [
					{
						type: 'cancel'
					},
					{
						type: 'info',
						text: 'confirm',
						showLoading: true
					}
				]
			}, function(button) {
				if(button == 'info') {
					// Simulate Delay
					setTimeout(function() {
						Add();
					}, 1000);         
				}
			});
		}
		else {
			x0p({
				title: 'Confirmation',
				text: 'Are you sure you want to update this task?',
				icon: 'warning',
				animationType: 'fadeIn',
				buttons: [
					{
						type: 'cancel'
					},
					{
						type: 'info',
						text: 'confirm',
						showLoading: true
					}
				]
			}, function(button) {
				if(button == 'info') {
					// Simulate Delay
					setTimeout(function() {
						Edit();	
					}, 1000);         
				}
			});
		}
	});

	/* Edit button on click handler */
	$(".btnEdit").bind("click", function(){ 
		operation = "Edit"; 
		selected_index = parseInt($(this).attr("id").replace("Edit", "")); 
		var cli = JSON.parse(listTask[selected_index]); 
		
		$("#judulTask").val(cli.Judul); 
		$("#deskripsiTask").val(cli.Deskripsi); 
		$("#tanggalMulai").val(cli.Mulai); 
		$("#tanggalSelesai").val(cli.Selesai); 
		$("#prioritas").val(cli.Prioritas); 
		$("#done").val(cli.Done); 
		if (cli.Done == "Task selesai") {
			$("#done").prop('checked', true);
		}
		$("#judulTask").focus(); 
	}); 
	
	/* Delete button on click handler */
	$(".btnDelete").bind("click", function(){ 
		selected_index = parseInt($(this).attr("id").replace("Delete", "")); 
		x0p({
			title: 'Confirmation',
			text: 'Are you sure you want to permanently delete this task?',
			icon: 'warning',
			animationType: 'fadeIn',
			buttons: [
				{
					type: 'cancel'
				},
				{
					type: 'info',
					text: 'confirm',
					showLoading: true
				}
			]
		}, function(button) {
			if(button == 'info') {
				// Simulate Delay
				setTimeout(function() {
					Delete(); 
				}, 1000);         
			}
		});
	});	
	
	/* Plus on click handler */
	$("#plusTask").bind("click", function(){ 
		List();
		if (indexStop < 0) {
			$("#plusTask").remove();
		}
	});
});