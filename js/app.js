//variables
const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const divCarrito = document.querySelector('#lista-carrito tbody');
const listaArticulos = document.querySelector('#lista-articulos');

// después de crear los artículos (leer datos) para el carrito nos devolvemos a crear un array

let articulosCarrito = []; 

registrarEventListeners() //la función todo el tiempo está escuchando

//-------------Funciones---------------------

//la función va a tener las escuchas de cada uno de los eventos que necesitamos..Cuando demos registrar artculos, se agregu el artículo
function registrarEventListeners(){
    //este evento llama la función agregar artículo. 
    listaArticulos.addEventListener('click',agregarArticulo);

    //Este evento llama la función eliminarArticulo
    carrito.addEventListener('click',eliminarArticulo);

     //escuchar el boton de vaciar carrito
     vaciarCarrito.addEventListener('click',()=>{
        articulosCarrito = [];//vuelvo y dejo el arreglo vacio
        //console.log('Vaciando carrito')
        limpiarHtml();//borramos todo el html
    })
}

// agregamos el artículo al carrito
function agregarArticulo(e){
    e.preventDefault() //no deja que se recargue la página
    if(e.target.classList.contains('agregar-carrito')){
        const articuloSeleccionado = e.target.parentElement.parentElement; // detectar el botón y depués se guarda en la constante
        leerDatosArticulo(articuloSeleccionado)//leer la información

        // los console son para verificar la información
        // console.log('Hey le diste click a uno de los    botones')
        //console.log(e.target.parentElement.parentElement)//si lo que estoy seleccionado de las calses contiene ('agregar carriro'), muestre el console log
    }
}
//FUNCIÓN PARA ELIMINAR ARTÍCULOS*

function eliminarArticulo(e){
    if(e.target.classList.contains('borrar-articulo')){
        const ArticuloId = e.target.getAttribute('data-id');
        /* console.log(e.target.getAttribute('data-id')) */
        articulosCarrito = articulosCarrito.filter(articulo=> articulo.id !== ArticuloId);
        carritoHtml();
    }
}

//carrito.addEventListener('click', eliminarArticulo)

//e.target en el cosole.log(e.target)... permite mostrar a lo que le damos click en la página

//LEER HTML  
// Leer el html donde dimos click y lo extraemos, la siguiente función es para que lea los datos de la funció
function leerDatosArticulo(articulo){
    //la función fue llamda con la información
    //creemos un objeto con los datos de card
   const infoArticulo = {
    imagen:articulo.querySelector('.card img').src,  //extraer la imagen Ese pedazo se llama articulo -- .src dice que le especifique la ruta
    titulo:articulo.querySelector('h4').textContent, // captura el título
    precio:articulo.querySelector('.precio span').textContent,//capturar el precio
    id:articulo.querySelector('a').getAttribute('data-id'),// captura el id
    cantidad:1
}
//articulosCarrito = [...articulosCarrito,infoArticulo]// nos llame info artículos carrito y le sume info artículos, se creo para que sume
//console.log(articulo)
//console.log(infoArticulo)
//console.log(articulosCarrito)

//SUMAR en el carrito
//Revisemos si el articulo ya esta en el array y si sí solo actualiza la cantidad, sino devuelve el mismo valor
const existeArticulo = articulosCarrito.some(articulo=> articulo.id === infoArticulo.id);
if(existeArticulo){
    const articulos = articulosCarrito.map(articulo=>{
        if(articulo.id === infoArticulo.id){
            articulo.cantidad++;
            return articulo; //retornamos el array mapeado solo con la condición
        }else {
            return articulo;
        }
    })
    articulosCarrito = [...articulos]
}else{
    //sino agregamos el producto al carrito
    articulosCarrito = [...articulosCarrito,infoArticulo]
}
carritoHtml() //la función
    
    }

//INYECTAR LOS ARTÍCULOS DEL ARRAY EN EL HTML DEL CARRITO, ES DECIR, EN EL (tbody)


//forEach llama de a un (1) artículo
function carritoHtml(){
    //llamamos la función que limpia el html
    limpiarHtml();

    // recorre el array y limpia el html
    articulosCarrito.forEach(articulo =>{
        const{imagen,titulo,precio,cantidad,id} = articulo;//destructuring
        const row =document.createElement('tr');//ingresar en HTMl la etiqueta tr
        row.innerHTML = `
        <td>
       <img src="${imagen}" width="100">
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
         <a href ="#" class="borrar-articulo" data-id="${id}">X</a>
        </td>
        `;
        divCarrito.appendChild(row)
        //dentro del tr poner td las comillas son temple string, son dinámicos.* .innerHTML es para ingresarlo al HTML. * appendChild es para agregar un hijo a la división. 

        //console.log(articulo)
    })
}
//Creemos una función que nos limpie el html del carrito cuando demos click en el botón vaciar 

function limpiarHtml(){
   // Esta es una forma lenta y sirve para aplicativos pequeños
    // divCarrito.innerHTML = '';

    //Esta forma es mucho mejor para limpiar el html
    while (divCarrito.firstChild){
        divCarrito.removeChild(divCarrito.firstChild)
    }
}