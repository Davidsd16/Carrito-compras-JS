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
    // Iterar sobre cada item en los datos
    data.forEach(item => {
        // Clonar el contenido de la plantilla para cada item
        const clone = templateCard.content.cloneNode(true);
        // Obtener referencias a elementos específicos dentro de la plantilla clonada
        clone.querySelector('h5').textContent = item.title;
        clone.querySelector('p').textContent = item.precio;
        clone.querySelector('.img-card-top').setAttribute('src', item.thumbnailUrl);
        clone.querySelector('button').dataset.id = item.id;
        // Agregar la plantilla clonada al fragmento de documento
        fragment.appendChild(clone);
    });

// Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) al contenedor de tarjetas
    cards.appendChild(fragment);
}

// Función que se ejecuta al hacer clic, Añadimos elemntos al carrito ( setCarrito )
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {      
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation()
}

// Función para agregar un item al carrito a partir de un objeto (elemento del DOM)
const setCarrito = objeto => {
    // Crear un objeto 'item' con información del elemento
    const item = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    // Si el item ya está en el carrito, incrementar la cantidad
    if (carrito.hasOwnProperty(item.id)) {
        item.cantidad = carrito[item.id].cantidad +1;
    }
    // Actualizar el carrito con el item (o agregarlo si no existía)
    carrito[item.id] = {...item}
    console.log(carrito[item.id]);
    pintarCarrito();
}

// Función para renderizar los items en el carrito
const pintarCarrito = () => {
    items.innerHTML = ''
    // Iterar sobre cada producto en el carrito
        Object.values(carrito).forEach(producto => {
            // Clonar la plantilla del carrito para cada producto
            const clone = templateCarrito.content.cloneNode(true);
            // Configurar el contenido de los elementos
            clone.querySelector('th').textContent = producto.id;
            clone.querySelectorAll('td')[0].textContent = producto.title;
            clone.querySelectorAll('td')[1].textContent = producto.cantidad;
            clone.querySelector('.btn-info').dataset.id = producto.id;
            clone.querySelector('.btn-danger').dataset.id = producto.id;
            clone.querySelector('span').textContent = producto.cantidad * producto.precio;

            fragment.appendChild(clone)
        });
        // Agregar el fragmento de documento (conteniendo todas las plantillas clonadas) a la sección de items en el carrito
        items.appendChild(fragment)

        pintarFooter();
};

const pintarFooter = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
    }   
}

