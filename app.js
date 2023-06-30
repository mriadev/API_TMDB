document.addEventListener('DOMContentLoaded', function() {

    let page = 1;
    let btnPrev = document.getElementById('prev');
    let btnNext = document.getElementById('next');
    let type = 'popular';
    let h1 = this.querySelector('h1');
    h1.innerHTML = 'PELÍCULAS POPULARES';

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

    const popular = document.getElementById('popular');
    const estrenos = document.getElementById('now_playing');
    const mejorCalificadas = document.getElementById('top_rated');
    const proximosEstrenos = document.getElementById('upcoming');

    popular.addEventListener('click', (e) => {
        page = 1;
        type = 'popular';
        h1.innerHTML = 'PELÍCULAS POPULARES';
        cambiarActivo(e);
        cargarPeliculas();
    });

    estrenos.addEventListener('click', (e) => {
        page = 1;
        h1.innerHTML = 'PELÍCULAS EN CARTELERA';
        type = 'now_playing';
        cambiarActivo(e);
        cargarPeliculas();
    });


    mejorCalificadas.addEventListener('click', (e) => {
        page = 1;
        h1.innerHTML = 'PELÍCULAS MEJOR CALIFICADAS';
        type = 'top_rated';
        cambiarActivo(e);
        cargarPeliculas();
    });


    proximosEstrenos.addEventListener('click', (e) => {
        page = 1;
        h1.innerHTML = 'PRÓXIMOS ESTRENOS';
        type = 'upcoming';
        cambiarActivo(e);
        cargarPeliculas();
    });



    const cargarPeliculas = async() => {

        try {
            const respuesta = await fetch('https://api.themoviedb.org/3/movie/'+ type +'?api_key=cb34ebf4edf9d1fb15cdfb9395b13e2f&language=es-ES&page=' + page);

            if (!respuesta.ok) throw 'Error al cargar los datos';
        
            const datos = await respuesta.json();

            let peliculas = mostrarPeliculas(datos);
        
            document.getElementById('container').innerHTML = peliculas;

        } catch (error) {
            console.log(error);
        }

    }



    function mostrarPeliculas(datos) {
        let peliculas = '';

        datos.results.forEach(pelicula => {
            peliculas += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                <h3 class="titulo">${pelicula.title}</h3>
                </div>`;
        });
        return peliculas;
    }

    const cambiarActivo = (e) => {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    }


    cargarPeliculas();

});
