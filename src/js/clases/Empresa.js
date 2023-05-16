import { Importacion } from "./Importacion";
export class Empresa {

  constructor(id, nombre, rut, rubro, tamano) {
    this._id = id;
    this._nombre = nombre;
    this._rut = rut;
    this._rubro = rubro;
    this._tamano = tamano;
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

  get rubro() {
    return this._rubro;
  }
  set rubro(in_rubro) {
    this._rubro = in_rubro;
  }

  get tamano() {
    return this._tamano;
  }
  set tamano(in_tamano) {
    this._tamano = in_tamano;
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