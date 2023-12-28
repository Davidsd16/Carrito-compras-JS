const items = document.getElementById('items');
const templateCard = document.getElementById('template-card');
const fragment = document.createDocumentFragment()

// Evento que escucha cuando el DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
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
