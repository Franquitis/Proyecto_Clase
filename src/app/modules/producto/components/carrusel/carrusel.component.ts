import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from "sweetalert2";

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  //String que modificara el valor de @Input en el componente hijo 
  product: string = '';
  //Inicializado como tipo string y vacio

  //Coleccion de productos añadidos a la lista
  productosCarrusel: Producto[] = [];

  productoAnadido(producto: Producto) {

    //Reemplazamos el valor de product
    this.product = `${producto.nombre} : $${producto.precio}`;

    try {
      /*Agregamos la informacion recibida
      por el parametro de la funcion a la colecccion
      del carrusel*/
      this.productosCarrusel.push(producto);

      Swal.fire({
        title: '¡Eso chaval!',
        text: 'Ha añadido el producto con exito',
        icon: 'info'
      })
    }
    catch (error) {
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error\n'+error,
        icon: 'error'
      })
    }
  }
}
