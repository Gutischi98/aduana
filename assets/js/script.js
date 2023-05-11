class Aduana {
  // El constructor inicializa un array vacío para guardar las empresas
  constructor() {
    this._empresas = [];
  }

  // Este método registra una nueva empresa ingresando id, nombre y rut
  registrarEmpresa(empresa) {
    // Comprueba si una empresa con el id dado ya existe
    if (this.obtenerEmpresaPorId(empresa.id)) {
      throw new Error('Empresa ya existe');
    }
    // Si no, crea una nueva empresa y lo agrega al array de empresas
    this.empresas.push(empresa);
  }

  // Acceso al array de empresas
  get empresas() {
    return this._empresas;
  }

  // Modificación del array de empresas
  set empresas(value) {
    this._empresas = value;
  }

  // Este método entrega el objeto Empresa con la id dada, o entrega un null si no existe
  obtenerEmpresaPorId(id) {
    return this._empresas.find(empresa => empresa.id === id);
  }

  // Este método registra una nueva importación para la empresa dando su id
  registroImport(empresaId, idProducto,producto, cantidad, precioUnitario) {
    // Busca la empresa con el id
    const empresa = this.obtenerEmpresaPorId(empresaId);
    // Si no existe, devuelve un error
    if (!empresa) {
      throw new Error('Empresa no encontrada');
    }
    // Si ya existe, agrega una nueva importación
    empresa.agregarImport(idProducto,producto, cantidad, precioUnitario);
  }

  // Este método retorna el array de importaciones de la empresa dando su id
  obtenerEmpresaImport(id) {
    const empresa = this.obtenerEmpresaPorId(id);
    if (!empresa) {
      throw new Error('Empresa no encontrada');
    }
    return empresa.importaciones;
  }

  // Este método entrega el valor total de todas las importaciones de todas las empresas
  obtenerTotalImportaciones() {
    let total = 0;
    for (const empresa of this._empresas) {
      total += empresa.obtenerTotalEmpresaImport();
    }
    return total;
  }

  // Este método retorna el total de importaciones por el número de productos y su precio unitario
  obtTotalImportPorProducto(producto) {
    let totalCantidad = 0;
    let totalValor = 0;
    for (const empresa of this._empresas) {
      for (const importacion of empresa.importaciones) {
        if (importacion.producto === producto) {
          totalCantidad += importacion.cantidad;
          totalValor += importacion.cantidad * importacion.precioUnitario;
        }
      }
    }
    return {
      producto: producto,
      cantidad: totalCantidad,
      valor: totalValor
    };
  }
}


class Empresa {

  constructor(id, nombre, rut) {
    this._id = id;
    this._nombre = nombre;
    this._rut = rut;
    this._importaciones = [];
  }

  // getters y setters que permiten acceder y modificar rut, id y nombre
  get id() {
    return this._id;
  }

  set id(valor) {
    this._id = valor;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(valor) {
    this._nombre = valor;
  }

  get rut() {
    return this._rut;
  }

  set rut(valor) {
    this._rut = valor;
  }

  get importaciones() {
    return this._importaciones;
  }

  // Agrega una nueva importación al array de importaciones
  agregarImport(id, producto, cantidad, precioUnitario) {
    this._importaciones.push(new Importacion(id, producto, cantidad, precioUnitario));
  }

  // Este método entrega el valor total de todas las importaciones para esta empresa
  obtenerTotalEmpresaImport() {
    let total = 0;
    for (const datosImport of this._importaciones) {
      total += datosImport.cantidad * datosImport.precioUnitario;
    }
    return total;
  }
}


class Importacion {
  constructor(id,producto, cantidad, precioUnitario) {
    this.id = id;
    this.producto = producto;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }
}


let aduanita = new Aduana();


document.querySelector("#form-empresa").addEventListener("submit", (event) => {
  event.preventDefault();
  let idEmpresa = document.querySelector("#id").value;
  let nombreEmpresa = document.querySelector("#nombre").value;
  let rutEmpresa = document.querySelector("#rut").value;
  var empresa = new Empresa(idEmpresa, nombreEmpresa, rutEmpresa);
  aduanita.registrarEmpresa(empresa);
  console.log(empresa);

  let selectEmpresas = document.querySelector("#empresa");
  let option = document.createElement("option");
  option.text = nombreEmpresa;
  option.value = idEmpresa;
  selectEmpresas.appendChild(option)
  idEmpresa='';
  nombreEmpresa='';
  rutEmpresa='';
  empresa='';

});


document.querySelector("#form-importacion").addEventListener("submit", (event) => {
  event.preventDefault();
  let idEmpresa = document.querySelector("#empresa").value;
  if(idEmpresa!=null){
    let idProducto = document.querySelector("#idProducto").value;
    let nombreProducto = document.querySelector("#producto").value;
    let cantidad = document.querySelector("#cantidad").value;
    let precioUnitario = document.querySelector("#precio_unitario").value;

    let importacion = new Importacion(idProducto,nombreProducto,cantidad,precioUnitario);
    
    aduanita.registroImport(idEmpresa,idProducto,nombreProducto,cantidad,precioUnitario);

    console.log(aduanita);
    
    
   

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
    // let celda8 = fila.insertCell(9);


    let empresita = aduanita.obtenerEmpresaPorId(idEmpresa);
    celda1.innerText = empresita.id;
    celda2.innerText = empresita.nombre;
    celda3.innerText = empresita.rut;
    celdaVacia.innerText="";
    celda4.innerText = idProducto;
    celda5.innerText = nombreProducto;
    celda6.innerText = cantidad;
    celda7.innerText = precioUnitario;
    celda8.innerText = precioUnitario * cantidad;
    // celda9.innerText = 

    tabla.appendChild(fila);


    console.log(empresita.id);
    // empresa='';
    idProducto='';
    nombreProducto='';
    cantidad='';
    precioUnitario='';
    
  }else{
    alert("Debe seleccionar empresa primero");
  }


});

// localStorage.setItem('aduana', JSON.stringify(aduana));
// localStorage.setItem('empresa', JSON.stringify(empresa));
// localStorage.setItem('importacion', JSON.stringify(importacion));
