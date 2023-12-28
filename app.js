const items = document.getElementById('items');
const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment()
let carrito = {};

// Evento que escucha cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

items.addEventListener('click', e => {
    addCarrito(e);
})

// Función asíncrona para obtener datos desde 'api.json'
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data);
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Función para renderizar tarjetas basadas en los datos proporcionados
const pintarCards = data => {
      // Registrar los datos recibidos desde la API en la consola
    console.log(data);
    // Iterar sobre cada producto en los datos
    data.forEach(producto => {
        // Clonar el contenido de la plantilla para cada producto
        const clone = templateCard.content.cloneNode(true);

        // Obtener referencias a elementos específicos dentro de la plantilla clonada
        const h5Element = clone.querySelector('h5');
        const pElement = clone.querySelector('p');
        const img = clone.querySelector('img').setAttribute('src', producto.thumbnailUrl);
        const button = clone.querySelector('.btn-dark').dataset.id = producto.id;

      // Agregar la plantilla clonada al fragmento de documento
        fragment.appendChild(clone);
    });

    // Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) al contenedor
    items.appendChild(fragment);
};
// Función que se ejecuta al hacer clic en algún elemento del DOM
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()
}

// Función para agregar un producto al carrito a partir de un objeto (elemento del DOM)
const setCarrito = objeto => {
    // Crear un objeto 'producto' con información del elemento
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    // Si el producto ya está en el carrito, incrementar la cantidad
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad +1;
    }
    // Actualizar el carrito con el producto (o agregarlo si no existía)
    carrito[producto.id] = {...producto}
    console.log(carrito)
}

