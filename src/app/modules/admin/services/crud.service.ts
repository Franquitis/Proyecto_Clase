import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
//importaciones para manejo de archivos
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';
/*
getDownloadURL -> Para obtener la URl de descarga de una imagen subida
getStorage -> Para obtener la instancia de almacenamiento
ref -> para crear referencias a ubicaciones en el almacenamiento
UploadResult -> Tipo que representa el resultado de una operacion subida
uploadString ->Para subir imagenes en formato de cadena
deleteObject -> Para eliminar un espacio en el almacenamiento
*/

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos colección para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  //Definir
  private respuesta!: UploadResult;

  //Inicializar storage
  private storage = getStorage();


  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
  }

  // CREAR productos -> Obtiene datos de formulario y url de imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        //Asigamos URl recibida del parametro al atributo "imagen" de interfaz Producto
        producto.imagen = url

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  // OBTENER productos
  obtenerProducto() {
    /*
      snapshotChanges => toma captura del estado de los datos
      pipe => tuberías que retornan un nuevo arreglo
      map => "mapea" o recorre esa nueva información
      a => resguarda la nueva información y la envía como un documento 
    */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    /*
      Accedemos a la colección "productos" de la Base de Datos, buscamos el ID del 
      producto seleccionado y lo actualizamos con el método "update", enviando la 
      nueva información
    */
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  // ELIMINAR productos
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {

          const storage = getStorage();
          const referenciaImagen = ref(storage, imagenUrl);



        deleteObject(referenciaImagen)
        .then((res) => {
          const respuesta = this.productosCollection.doc(idProducto).delete();
          resolve(respuesta);
        })
        .catch(error =>{
          
        })
        
      }
      catch (error) {
        reject(error);
      }
    })
  }

  //OBTENER url de imagenes
  ObtenerUrlImagen(respuesta: UploadResult) {
    //retorna URL obtenida como REFERENCIA
    return getDownloadURL(respuesta.ref);
  }

  /**
   * PARAMETROS DEFINIDOS
   * @param {string}nombre <- Nombre imagen
   * @param {any} imagen <- tipo de imagen que se puede subir
   * @param {string} ruta <- ruta de almacenamiento de las imagenes
   * @returns <- se returna lo obtenido
   */

  //SUBIR imagenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    try {
      //Crear una referencia de imagen
      //Accede a Storage (alamcenamiento), ruta (carpeta) / nombre (nombreImagen)
      let referenciaImagen = ref(this.storage, ruta + "/" + nombre);

      //Asignarle a la respuesta la informacion de las imagenes subidas
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')

        .then(resp => {
          return resp;
        })

      return this.respuesta
    }
    catch (error) {
      console.log(error);

      return this.respuesta;
    }
  }
}
