let pagina = 1;
const btnAnterior = document.getElementById('btnanterior')
const btnSiguiente = document.getElementById('btnsiguiente')

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        movies()
    }
})
btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        movies()
    }
})

const movies = async () => {
    try {
            const resultado = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e5565cf6f1634866a52dd3080fb9152f&language=es-MX&page=${pagina}`)
            console.log(resultado)

            if(resultado.status === 200){
                const datos = await resultado.json()
                
                let peliculas = '';

                datos.results.forEach(pelicula => {
                    peliculas = peliculas + `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3>${pelicula.title}</h3>
                    </div>
                    
                    `;
                });

                document.getElementById('contenedor').innerHTML = peliculas

            } else if (resultado.status === 401){
                console.log('la lleva esta mas puesta')
            } else if (resultado.status === 404){
                console.log('no existe la pelicula')
            }else {
                console.log('ocurrio un error')
            }

    } catch (error) {
        console.log(error)
    }

} 

movies()

