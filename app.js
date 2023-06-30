document.addEventListener('DOMContentLoaded', function() {

    let page = 1;
    let btnPrev = document.getElementById('prev');
    let btnNext = document.getElementById('next');

    btnPrev.addEventListener('click', () => {
        if (page > 1) {
            page--;
            cargarPeliculas();
        }
    });

    btnNext.addEventListener('click', () => {
        page++;
        cargarPeliculas();
    });


    const cargarPeliculas = async() => {

        try {         
            const respuesta =  await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cb34ebf4edf9d1fb15cdfb9395b13e2f&language=es-ES&page=' + page);
            
            if (!respuesta.ok) throw 'Error al cargar los datos';

            const datos = await respuesta.json();

            let peliculas = '';
           
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                    <h3 class="titulo">${pelicula.title}</h3>
                    </div>`;
            });

            document.getElementById('container').innerHTML = peliculas;

        } catch (error) {
            console.log(error);
        }

    }


    cargarPeliculas();

});