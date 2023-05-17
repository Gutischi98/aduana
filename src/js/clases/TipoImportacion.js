import { Importacion } from "./Importacion";

export class TipoImportacion extends Importacion {
    constructor(id,producto, cantidad, precioUnitario, categoria,tamano) {
      super(id,producto, cantidad, precioUnitario)
      this.categoria = categoria;
      this.tamano = tamano;
    }

    // get cantidad(){
    //     return this.cantidad;
    // }
    // set cantidad(cantidad){
    //     this.cantidad= cantidad;
    // }
    // get precioUnitario(){
    //     return this.precioUnitario;
    // }
    // set precioUnitario(precio){
    //     this.precioUnitario= precio;
    // }
  }