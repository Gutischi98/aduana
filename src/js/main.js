// import '/src/css/style.css'

import { Aduana } from './clases/Aduana';
import { Empresa } from './clases/Empresa';
import { Importacion } from './clases/Importacion';

const formEmpresa = document.querySelector("#form-empresa"),
formImportacion = document.querySelector("#form-importacion"),
divTablas = document.querySelector("#divTablas"),
divFormImportacion = document.querySelector("#divFormImportacion"),
modalImport = new bootstrap.Modal('#modalImportaciones'),
modalEmpresas = new bootstrap.Modal('#modalEmpresas');

let aduanita = new Aduana();


formEmpresa.addEventListener("submit", (event) => {
  event.preventDefault();
  let idEmpresa = document.querySelector("#id");
  let nombreEmpresa = document.querySelector("#nombre");
  let rutEmpresa = document.querySelector("#rut");
  var empresa = new Empresa(idEmpresa.value, nombreEmpresa.value, rutEmpresa.value);
  try {
    aduanita.registrarEmpresa(empresa);
  } catch (error) {
    console.error(error);
    alert(error)
    idEmpresa.value='';
    nombreEmpresa.value='';
    rutEmpresa.value='';
    modalEmpresas.toggle();
    return;
  }
  console.log(empresa);


  document.querySelector("#numeroEmpresas").innerText = aduanita.empresas.length;


  let selectEmpresas = document.querySelector("#empresa");
  let option = document.createElement("option");
  option.text = nombreEmpresa.value;
  option.value = idEmpresa.value;
  selectEmpresas.appendChild(option)
  idEmpresa.value='';
  nombreEmpresa.value='';
  rutEmpresa.value='';
  // empresa='';
  
  // if(divFormImportacion.classList.contains("oculto")){
  //   divFormImportacion.classList.toggle("oculto");
  //   divFormImportacion.classList.toggle("mostrar");
  //   // divTablas.classList.toggle("oculto");
  //   // divTablas.classList.toggle("mostrar");
  // }
  modalEmpresas.toggle();
});


formImportacion.addEventListener("submit", (event) => {
  event.preventDefault();
  let idEmpresa = document.querySelector("#empresa");
  if(idEmpresa.value!=null){
    let idProducto = document.querySelector("#idProducto");
    let nombreProducto = document.querySelector("#producto");
    let cantidad = document.querySelector("#cantidad");
    let categoria = document.querySelector("#categoria");
    let tamano = document.querySelector("#tamano");
    let precioUnitario = document.querySelector("#precio_unitario");

    
    if(categoria.value ==1){
      let confirma = confirm("Su selección de categoria será sujeta a visacion, certificacion o visto bueno\n¿Desea continuar?")
      if(!confirma){
        idProducto.value='';
        nombreProducto.value='';
        cantidad.value='';
        categoria.value='';
        precioUnitario.value='';
        tamano.value = '';
        modalImport.toggle();
        return;
      }
    }else if(categoria.value == 2){
      alert("Su mercancía no se puede importar.")
      idProducto.value='';
      nombreProducto.value='';
      cantidad.value='';
      categoria.value='';
      precioUnitario.value='';
      tamano.value = '';
      modalImport.toggle();
      return;
    }else if(categoria.value == 3){
      alert("Su mercancía debe ser inspeccionada por aduana.")
    }

    let categoriaTexto = categoria.options[categoria.selectedIndex].text;

    // let importacion = new Importacion(idProducto,nombreProducto,cantidad,precioUnitario);
    try {
      aduanita.registroImport(idEmpresa.value,idProducto.value,nombreProducto.value,cantidad.value,precioUnitario.value,categoriaTexto, tamano.value);
      
    } catch (error) {
      console.error(error);
      alert(error)
      idProducto.value='';
      nombreProducto.value='';
      cantidad.value='';
      categoria.value='';
      precioUnitario.value='';
      tamano.value = '';
      modalImport.toggle();
    }

    // console.log(aduanita);
    let totalCantidad = 0;
    aduanita.empresas.forEach((elem, indice)=>{
      totalCantidad  += (elem.obtenerCantidadImportaciones()*1);
    })


    document.querySelector("#numeroImportaciones").innerText = totalCantidad;
    
   

    let tabla = document.getElementById("tabla");

    let fila = tabla.insertRow();
//
    let celda1 = fila.insertCell(0);
    let celda2 = fila.insertCell(1);
    let celda3 = fila.insertCell(2);
    let celdaVacia = fila.insertCell(3);
    let celda4 = fila.insertCell(4);
    let celda5 = fila.insertCell(5);
    let celda6 = fila.insertCell(6);
    let celda7 = fila.insertCell(7);
    let celda8 = fila.insertCell(8);
    let celda9 = fila.insertCell(9);
    let celda10 = fila.insertCell(10);
    // let celda8 = fila.insertCell(9);

    let empresita = aduanita.obtenerEmpresaPorId(idEmpresa.value);
    celda1.innerText = empresita.id;
    celda2.innerText = empresita.nombre;
    celda3.innerText = empresita.rut;
    celdaVacia.innerText="";
    celda4.innerText = idProducto.value;
    celda5.innerText = nombreProducto.value;
    celda6.innerText = cantidad.value;
    celda7.innerText = categoriaTexto;
    celda8.innerText = tamano.value;
    celda9.innerText = precioUnitario.value;
    celda10.innerText = precioUnitario.value * cantidad.value;
    // celda9.innerText = 

    tabla.appendChild(fila);

    if(divTablas.classList.contains("oculto")){
      divTablas.classList.toggle("oculto");
      divTablas.classList.toggle("mostrar");
    }

    // console.log(empresita.id);
    // empresa='';
    idProducto.value='';
    nombreProducto.value='';
    cantidad.value='';
    categoria.value='';
    precioUnitario.value='';
    tamano.value = '';

    document.querySelector("#totalGeneral").innerText=aduanita.obtenerTotalImportaciones();

    let bodyEmpresa= document.querySelector("#bodyEmpresa");
    bodyEmpresa.innerHTML="";
    let arrEmpresas = aduanita.empresas;
    console.log(arrEmpresas);
    for (const emp of arrEmpresas) {
      console.log(emp, emp.id);
      let total = aduanita.obtTotalPorEmpresa(emp);
      let fila = bodyEmpresa.insertRow();
//
      let celda1 = fila.insertCell(0);
      let celda2 = fila.insertCell(1);
      let celda3 = fila.insertCell(2);
      let celda4 = fila.insertCell(3);

      celda1.innerText=emp.id;
      celda2.innerText=emp.nombre;
      celda3.innerText=emp.rut;
      celda4.innerText=total;
      bodyEmpresa.appendChild(fila);
    } 

    modalImport.toggle();





  }else{

    alert("Debe seleccionar empresa primero");
    modalImport.toggle();
  }


});
