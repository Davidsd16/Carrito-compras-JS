const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card');
const templateFooter = document.getElementById('template-footer');
const templateCarrito = document.getElementById('template-carrito');

const fragment = document.createDocumentFragment()
let carrito = {};

// Evento que escucha cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchData();
        pintarCards(data);
    } catch (error) {
        console.error('Error en DOMContentLoaded:', error);
    }
});


cards.addEventListener('click', e => {
    addCarrito(e);
})

// Función asíncrona para obtener datos desde 'api.json'
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
}

// Función para renderizar tarjetas basadas en los datos proporcionados
const pintarCards = data => {
    // Iterar sobre cada producto en los datos
    data.forEach(item => {
        // Clonar el contenido de la plantilla para cada producto
        const clone = templateCard.content.cloneNode(true);
        // Obtener referencias a elementos específicos dentro de la plantilla clonada
        clone.querySelector('h5').textContent = item.title;
        clone.querySelector('p').textContent = item.precio;
        clone.querySelector('button').dataset.id = item.id;
        // Agregar la plantilla clonada al fragmento de documento
        fragment.appendChild(clone);
    });
// Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) al contenedor de tarjetas
    cards.appendChild(fragment);
}

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
    pintarCarrito();
}

// Función para renderizar los productos en el carrito
const pintarCarrito = () => {
    items.innerHTML = ''
    // Iterar sobre cada producto en el carrito
        Object.values(carrito).forEach(producto => {
            // Clonar la plantilla del carrito para cada producto
            const clone = templateCarrito.content.cloneNode(true);
            // Configurar el contenido de los elementos
            clone.querySelector('th').textContent = producto.id
            clone.querySelectorAll('td')[0].textContent = producto.title
            clone.querySelectorAll('td')[1].textContent = producto.cantidad
            clone.querySelector('.btn-info').dataset.id = producto.id
            clone.querySelector('.btn-danger').dataset.id = producto.id
            clone.querySelector('span').dataset.id = producto.id
          //  console.log(templateCarrito);
            fragment.appendChild(clone)
          //  console.log(fragment);
        });
        // Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) a la sección de items en el carrito
        items.appendChild(fragment)
};

