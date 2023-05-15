export class Aduana {
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
      return this._empresas.find(empresa => empresa.id == id);
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

    obtTotalPorEmpresa(empresa){
        let importaciones = this.obtenerEmpresaImport(empresa.id);
        let suma = 0;
        for (const importacion of importaciones) {
            suma+=importacion.cantidad * importacion.precioUnitario;
        }
        return suma;
    }
  }