const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card');
const templateFooter = document.getElementById('template-footer');
const templateCarrito = document.getElementById('template-carrito');

/*
console.log(cards);
console.log(items);
console.log(footer);
console.log('*********************************');
console.log(templateCard);
console.log('**********************************');
console.log(templateFooter);
console.log(templateCarrito);
*/


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

// Resto de tu código...



cards.addEventListener('click', e => {
    addCarrito(e);
})

// Función asíncrona para obtener datos desde 'api.json'
const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data);

        console.log('data');
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}
/*
// Función para renderizar tarjetas basadas en los datos proporcionados
const pintarCards = data => {
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


    // Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
    // Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) al contenedor
    cards.appendChild(fragment);
};
*/

// Pintar productos
// Pintar productos
const pintarCards = data => {

    data.forEach(item => {
        // Clonar el contenido de la plantilla para cada producto
        const clone = templateCard.content.cloneNode(true);

        // Obtener referencias a elementos específicos dentro de la plantilla clonada
        clone.querySelector('h5').textContent = item.title;
        clone.querySelector('p').textContent = item.precio;
        clone.querySelector('button').dataset.id = item.id;

        fragment.appendChild(clone);
    });

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
   // console.log('producto');
   // console.log(producto);

    // Si el producto ya está en el carrito, incrementar la cantidad
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad +1;
    }
    // Actualizar el carrito con el producto (o agregarlo si no existía)
    carrito[producto.id] = {...producto}
    pintarCarrito();
}

const pintarCarrito = () => {
    items.innerHTML = ''
        Object.values(carrito).forEach(producto => {
            const clone = templateCarrito.content.cloneNode(true);
            clone.querySelector('th').textContent = producto.id
            clone.querySelectorAll('td')[0].textContent = producto.title
            clone.querySelectorAll('td')[1].textContent = producto.cantidad
            clone.querySelector('.btn-info').dataset.id = producto.id
            clone.querySelector('.btn-danger').dataset.id = producto.id
            clone.querySelector('span').dataset.id = producto.id
            console.log(templateCarrito);
           // const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
            console.log(fragment);
        });
        items.appendChild(fragment)
};

