$(function () {
  console.log($);
}); // Fin de la función anónima que sirve como punto de entrada de jQuery

// window.addEventListener("load", function () {
//   console.log("Inicio");

//   // Creamos un objeto URL para la base de la API de Star Wars
//   const baseUrl = new URL("http://localhost/exam/php/getEmployee.php");
//   // Agregamos el endpoint para obtener la lista de películas
//   const filmsEndpoint = "films/"; // Elegimos elegimos el path de búsqueda para películas.
//   // Creamos una nueva URL con el endpoint de películas
//   const filmsUrl = new URL(filmsEndpoint, baseUrl);
//   filmsUrl.searchParams.set("search", "Jedi"); // Fijamos parámetros de búsqueda
//   console.log(baseUrl.toString()); // https://swapi.dev/api/films/?search=Jedi

//   fetch("../php/getEmployee.php") // Hacer una solicitud GET a la API con la ruta de la película "A New Hope"
//     .then((response) => response.json()) // Analizar la respuesta JSON
//     .then((data) => {
//       let results = data.results; // Obtenemos el array de búsqueda
//       console.log(data); // 1. Solamente un único resultado obtenido
//     })
//     .catch((error) => console.error(error)); // Manejar errores
// });

/**
 * El DOM está dividido en 2 partes, por un lado un formulario sobre el cual
 * se recoge una serie de datos de un empleado y por otro disponemos de una tabla
 * dónde mostrar los datos recogidos.
 * Los datos que se solicitan son: Nombre, Apellido, Edad, Puesto de trabajo y Localización
 * Por cada empleado deberemos crear una fila en la tabla con dichos datos, el botón create, en lugar
 * de enviar los datos al servidor se limita a recogerlos y mostrarlos en la tabla utilizando
 * el API de DOM O jQuery. pero sin utilizar la propiedad innerHTML. El botón debe capturar
 * el evento submit y cancelar su envio al servidor.  Una vez recogidos los datos se debe resetear
 * el formulario.  Los datos deben ser validados antes de ser mostrados en la tabla.
 */
import productions from "../data/productions.js";
window.addEventListener("load", function () {
  // Esperar a que la página cargue completamente
  console.log("Inicio");

  // --- Manejo del formulario y tabla ---

  const createButton = document.getElementById("create");
  const resultsTableBody = document.querySelector("#results tbody");
  const selectedfilmTextarea = document.getElementById("selected-film");
  const deleteButton = document.getElementById("delete");
  const randomButton = document.getElementById("random");
  const selectButton = document.getElementById("selected");
  const searchButton = document.getElementById("button-addon2");
  const sendButton = document.getElementById("send"); //Botón para guardar los datos en el archivo json

  createButton.addEventListener("click", function () {
    const title = document.getElementById("validationDefault01");
    const nationality = document.getElementById("validationDefault02");
    const publication = document.getElementById("validationDefault03");
    const synospsis = document.getElementById("validationDefault04");

    //Crear los elementos individualmente
    const newRow = document.createElement("tr");

    const newTitle = document.createElement("td");
    const newNationality = document.createElement("td");
    const newPublication = document.createElement("td");
    const newSinopsis = document.createElement("td");

    //Agregar los elementos a la fila
    newTitle.textContent = title.value;
    newNationality.textContent = nationality.value;
    newPublication.textContent = publication.value;
    newSinopsis.textContent = synospsis.value;

    newRow.appendChild(newTitle);
    newRow.appendChild(newNationality);
    newRow.appendChild(newPublication);
    newRow.appendChild(newSinopsis);

    resultsTableBody.appendChild(newRow);
    // if (validateForm()) {
      document.getElementsByName("film")[0].value = "";
    // }
  });

  // validateForm = function () {
  //   isValid = true;
  //   document.querySelectorAll("input[required]").forEach(function (input) {
  //     if (input.value === "") {
  //       input.classList.add("is-invalid");
  //       isValid = false;
  //     } else {
  //       input.classList.remove("is-invalid");
  //       input.classList.add("is-valid");
  //     }
  //   });
  // };

  // --- MOSTRAR LOS DATOS DE LA FILA SELECCIONADA EN EL TEXTAREA ---
  resultsTableBody.addEventListener("click", function (event) {
    const clickedRow = event.target.closest("tr"); // Encontrar la fila clicada

    // Deseleccionar otras filas y seleccionar la clicada
    resultsTableBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.remove("selected"));
    clickedRow.classList.add("selected");

    // Obtener datos de la fila y mostrar en textarea
    const filmData = {
      title: clickedRow.cells[0].textContent,
      nationality: clickedRow.cells[1].textContent,
      publication: clickedRow.cells[2].textContent,
      synopsis: clickedRow.cells[3].textContent,
    };
    selectedfilmTextarea.value = JSON.stringify(filmData, null, 4); // Convertir a JSON con formato el null es para que no haya espacios y el 2 es para que haya 2 espacios
  });

  // --- Random button
  randomButton.addEventListener("click", function () {
    fetch("../php/getFilms.php")
      .then((response) => response.json())
      .then((production) => {
        document.getElementById("validationDefault01").value = production.title;
        document.getElementById("validationDefault02").value =
          production.nationality;
        document.getElementById("validationDefault03").value =
          production.publication;
        document.getElementById("validationDefault04").value =
          production.synopsis;
      })
      .catch((error) =>
        console.error("Error al obtener la pelicula aleatoria", error)
      );
  });

  //---Desplegable para seleccionar la película

  
    const selectPeliculas = document.getElementById("selectPeliculas");

  
    function cargarPeliculas() {
      selectPeliculas.innerHTML = '<option value="">Selecciona una película</option>';
  
      fetch("../php/peliculas.php")
        .then((response) => response.json())
        .then((films) => {
          films.forEach((film) => {
            const option = document.createElement("option");
            option.textContent = film.title;
            option.value = film.title;
            selectPeliculas.appendChild(option);
          });
        });
    }
  
    cargarPeliculas();
  
    // Si se selecciona una película del desplegable se muestra en el formulario
    selectButton.addEventListener("click", function () {
      const selectedId = selectPeliculas.value;
      if (!selectedId) {
        alert("Por favor, selecciona una película.");
        return;
      }
      fetch("../php/peliculas.php?title=" + selectedId)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
          }
          return response.json();
        })
        .then((pelicula) => {
          document.getElementById("validationDefault01").value = pelicula.title;
          document.getElementById("validationDefault02").value = pelicula.nationality;
          document.getElementById("validationDefault03").value = pelicula.publication;
          document.getElementById("validationDefault04").value = pelicula.synopsis;
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error al cargar los datos de la película.');
        });
    });

    //Buscador de películas

    const search= document.getElementById("search");
    const results= document.getElementById("selected-film");
    searchButton.addEventListener("click", function () {
      const searchValue = search.value;

      if (!searchValue){
        alert("Por favor, introduce un título de película.");
        return;
      }
      fetch("../php/peliculas.php?title=" + searchValue)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
          }
          return response.json();
        })
        .then((pelicula) => {
          results.innerHTML = JSON.stringify(pelicula, null, 4);
          //En la tabla también
          const newRow = document.createElement("tr");
          const newTitle = document.createElement("td");
          const newNationality = document.createElement("td");
          const newPublication = document.createElement("td");
          const newSinopsis = document.createElement("td");
          newTitle.textContent = pelicula.title;
          newNationality.textContent = pelicula.nationality;
          newPublication.textContent = pelicula.publication;
          newSinopsis.textContent = pelicula.synopsis;
          newRow.appendChild(newTitle);
          newRow.appendChild(newNationality);
          newRow.appendChild(newPublication);
          newRow.appendChild(newSinopsis);
          resultsTableBody.appendChild(newRow);

        })
        .catch((error) => {
          console.error('Error:', error);
          alert('El título no existe en la base.');
        });

      

    });

    //Eliminar película

    deleteButton.addEventListener("click", function () {
      const selectedRow = resultsTableBody.querySelector("tr.selected");
      if (!selectedRow) {
        alert("Por favor, selecciona una película.");
        return;
      }
      const title = selectedRow.cells[0].textContent;
      fetch("../php/peliculas.php?title=" + title, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error HTTP! status: ${response.status}`);
          }
          return response.json();
        })
        .then((pelicula) => {
          alert('Película eliminada correctamente.');
          selectedRow.remove();
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error al eliminar la película.');
        });
    });

    //Guardar película Y PINTARLO EN LA TABLA

    // sendButton.addEventListener("click", function () {
    //   const title = document.getElementById("validationDefault01").value;
    //   const description = document.getElementById("validationDefault02").value;
    //   const publication = document.getElementById("validationDefault03").value;
    //   const synopsis = document.getElementById("validationDefault04").value;

    //   if (!title || !description || !publication || !synopsis) {
    //     alert("Por favor, rellena todos los campos.");
    //     return;
    //   }

    //   fetch("../php/saveFilm.php", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ title, description, publication, synopsis }),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`Error HTTP! status: ${response.status}`);
    //       }
    //       return response.text();
    //     })
    //     .then((pelicula) => {
    //       alert('Película guardada correctamente.');
    //       document.getElementById("validationDefault01").value = '';
    //       document.getElementById("validationDefault02").value = '';
    //       document.getElementById("validationDefault03").value = '';
    //       document.getElementById("validationDefault04").value = '';

    //       const newRow = document.createElement("tr");
    //       const newTitle = document.createElement("td");
    //       const newNationality = document.createElement("td");
    //       const newPublication = document.createElement("td");
    //       const newSinopsis = document.createElement("td");
    //       newTitle.textContent = pelicula.title;
    //       newNationality.textContent = pelicula.national
    //       newPublication.textContent = pelicula.publication;
    //       newSinopsis.textContent = pelicula.synopsis;
    //       newRow.appendChild(newTitle);
    //       newRow.appendChild(newNationality);
    //       newRow.appendChild(newPublication);
    //       newRow.appendChild(newSinopsis);
    //       resultsTableBody.appendChild(newRow);
        
    //     });

    //   });
  //SIMPLIFICADO
    sendButton.addEventListener("click", function () {
      const title = document.getElementById("validationDefault01").value;
      const description = document.getElementById("validationDefault02").value;
      const publication = document.getElementById("validationDefault03").value;
      const synopsis = document.getElementById("validationDefault04").value;
  
      if (!title || !description || !publication || !synopsis) {
          alert("Por favor, rellena todos los campos.");
          return;
      }
  
      fetch("../php/saveFilm.php", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, publication, synopsis }),
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Error HTTP! status: ${response.status}`);
              }
              return response.json(); // Expect JSON from server
          })
          .then(data => { 
              if (data.success) { 
                  alert('Película guardada o actualizada correctamente.');
                  // ... (Clear form fields and add row to table) ...
                  document.getElementById("validationDefault01").value = '';
                  document.getElementById("validationDefault02").value = '';
                  document.getElementById("validationDefault03").value = '';
                  document.getElementById("validationDefault04").value = '';
              } else {
                  alert('Error al guardar la película: ' + data.error);
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Error al guardar la película. Por favor, inténtelo de nuevo.');
          });
  });
  
          

});
// Fin de la función anónima que sirve como punto de entrada de JavaScript
