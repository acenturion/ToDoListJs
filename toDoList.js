function tarea(id, titulo,descripcion){
	this.id = id;
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.completado = false;
}

function toDoList() {
	var tareas = [];
	this.repetido = false;

	this.agregarNoticia = function(tarea){
		if(tareas.length == 0){
			console.log("Se ingreso la primer tarea");
			tareas.push(tarea);			
		}else{
			//verificacion de repetido
			for (var i = 0; i < tareas.length; i++) {
				if(tareas[i].id == tarea.id){
					this.repetido = true;
					break;
				}
			}
			if (this.repetido == false) {
				console.log("Se ingreso una nueva tarea");
				tareas.push(tarea);
			}else{
				console.log("Tarea repetida por id");
			}

			this.repetido = false;
		}
	}

	this.mostrarTareas = function(){
		this.limpiarTareas();
		for (var i = 0; i < tareas.length; i++) {
			this.generarTarea(tareas[i]);
			//console.log(tareas[i]);
		}

	}

	this.eliminarPorId = function(idBorrar){
		if(idBorrar == 'all'){
			tareas = [];
		}else{
		for (var i = 0; i < tareas.length; i++) {
			tareas[i].id;
			if(tareas[i].id == idBorrar){
				console.log("Se elemino la tarea con ID: "+idBorrar);
				tareas.splice(i,1);
				}
			}
		}
		this.mostrarTareas();
	}

	this.generarTarea = function(tarea){
		var contenedor = document.getElementById('contenedorTareas');
		var div = document.createElement("div");
		var titulo = document.createElement("h1");
		var descripcion = document.createElement("p");
		var btnEliminar = document.createElement("i");
		var btnEditar = document.createElement("i");
		var contenedorBtn = document.createElement("div");
		var estado = document.createElement("p");

		//Seteo los atributos del contendor de tareas
		div.setAttribute("id","tarea"+tarea.id);
		div.setAttribute("class","tarea");
		
		//botones
		btnEliminar.setAttribute("class","fa fa-times fa-2x");
		btnEditar.setAttribute("class","fa fa-pencil fa-2x");
		contenedorBtn.setAttribute("class", "botones");
	

		if(tarea.completado == true){	
			div.setAttribute("style","background-color:#ADFF2F");
			estado.appendChild(document.createTextNode("Estado: Completado :)"));
		}
		if(tarea.completado == false){
			estado.appendChild(document.createTextNode("Estado: no completado"));
		}
		
		estado.setAttribute("id","estado"+tarea.id);
		div.setAttribute("onclick","completarTarea("+tarea.id+")");
		btnEliminar.setAttribute("onclick","eliminarTarea("+tarea.id+")");
		btnEditar.setAttribute("onclick","editarTarea("+tarea.id+")");

		titulo.appendChild(document.createTextNode("#"+tarea.id+" - "+tarea.titulo));
		descripcion.appendChild(document.createTextNode(tarea.descripcion));

		div.appendChild(titulo);
		div.appendChild(descripcion);

		contenedorBtn.appendChild(estado);
		contenedorBtn.appendChild(btnEliminar);
		contenedorBtn.appendChild(btnEditar);
		div.appendChild(contenedorBtn);

		contenedor.appendChild(div);
	}

	this.limpiarTareas = function(){
		var tareas = document.getElementsByClassName('tarea');
		while(tareas.length > 0 ){
			tareas[0].parentNode.removeChild(tareas[0]);
		}
	}

	this.ordenarTareas = function(){
		console.log("ordenar tareas por id");
		tareas.sort(function(a,b){return a.id - b.id})
	}

	this.ordenarTareasByTitutlo = function(){
		console.log("Ordenar tareas por titulo");
		for (var i = 0; i < tareas.length; i++) {
			tareas.sort(function(a,b){
				var nameA=a.titulo.toLowerCase(), nameB=b.titulo.toLowerCase();
				if (nameA < nameB){
        			return -1;
				}
    			if (nameA > nameB){
        			return 1;
    			}
   				return 0;
			});
		}
	}	

	this.editarTarea = function(idTarea){
		for (var i = 0; i < tareas.length; i++) {
			if(tareas[i].id == idTarea){
				console.log("Atencion: se va a editar una tarea");
				document.getElementById('idTarea').value = tareas[i].id;
				document.getElementById('titulo').value = tareas[i].titulo;
				document.getElementById('descripcion').value = tareas[i].descripcion;
				this.eliminarPorId(idTarea);
			}
		}
	}

	this.completarTarea = function(idTarea){
		for (var i = 0; i < tareas.length; i++) {
			if (tareas[i].id == idTarea) {
				console.log("se completo una tarea");
				tareas[i].completado = true;
				document.getElementById('tarea'+idTarea).style.background = "#ADFF2F";
				document.getElementById('estado'+idTarea).innerHTML = "Estado: Completado :)";
			}
		}
	}

	this.limpiarForm = function(){
		document.getElementById('titulo').value = "";
		document.getElementById('descripcion').value = "";
		document.getElementById('idTarea').value = "";
	}
	

} 

var lista = new toDoList();


function limpiar(){
	lista.limpiarForm();
}

function agregarTarea(){
	console.log(document.getElementById('idTarea').value);
	if(document.getElementById('idTarea').value != ""){
		var t = new tarea(parseInt(document.getElementById('idTarea').value),document.getElementById('titulo').value,document.getElementById('descripcion').value);
		lista.agregarNoticia(t);
		lista.mostrarTareas();
		limpiar();
	}
}

function borrarTareas(){
	lista.eliminarPorId('all');
	lista.mostrarTareas();

}

function ordenarTareas(funcion){

	switch(funcion){
		case 'id': lista.ordenarTareas(); break;
		case 'asc': lista.ordenarTareasByTitutlo(); break;
		case 'desc': lista.ordenarTareas(); break;
	}
	lista.mostrarTareas();
}

function eliminarTarea(idTarea){
	lista.eliminarPorId(idTarea);
}

function editarTarea(idTarea){
	lista.editarTarea(idTarea);

}

function completarTarea(idTarea){
	lista.completarTarea(idTarea);
}