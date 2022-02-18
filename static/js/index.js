const mainBody = document.getElementById('main')
const createForm = document.getElementById('createForm')
const booksDiv = document.getElementById('booksDiv')
const materiaSelector = document.getElementById('materiaSelector')
const materiaIdHidden = document.getElementById('materia_id_input')
var materiaId 

const readMaterias = async () => {
  await fetch('/api/readall/materias')
  .then(res => { return res.json() })
  .then(data => {
    for (materia of data.all) {
      materiaSelector.innerHTML += `
      <option value=${materia.id}>${materia.materia}</option>
      `
    }
    materiaId = materiaSelector[0].value
    materiaIdHidden.value = materiaId
    readAllBooks()
    })
}

const readAllBooks = async () => {
  await fetch(`/api/read/books/:${materiaId}`)
    .then(res => { return res.json() })
    .then(data => { 
      for (book of data.books) {
        booksDiv.innerHTML += `
        <div id="${book.id}" class="border-2 border-black p-4 rounded-xl max-h-fit w-[340px] bg-slate-200">
          <div class="item"><b>Título:</b> ${book.titulo}</div>
          <div class="item"><b>Autor:</b> ${book.autor}</div>
          <div class="item"><b>Año:</b> ${book.anio}</div>
          <div class="item"><b>Editorial:</b> ${book.editorial}</div>
          <div class=${book.en ? 'item' : 'hidden'}><b>En:</b> ${book.en ? book.en : ''}</div>
          <div class=${book.paginas ? 'item' : 'hidden'}><b>Paginas:</b> ${book.paginas ? book.paginas : ''}</div>
          <div class=${book.capitulos ? 'item' : 'hidden'}><b>Capítulos:</b> ${book.capitulos ? book.capitulos : ''}</div>
          <div class=${book.unidad ? 'item' : 'hidden'}><b>Unidad:</b> ${book.unidad ? book.unidad : ''}</div>
          <div class="item"><b>Condición:</b> ${book.condicion}</div>
          <div class="flex gap-4 w-max ml-auto mt-2">
            <button onclick="handleEdit(this)">
              <b class="bg-blue-500 p-1 rounded border border-black">Editar</b>
            </button>
            <button onclick="handleRemove(this)">
              <b class="bg-red-500 p-1 rounded border border-black">Borrar</b>
            </button>
          </div>
        </div>
        `
      }
  })
}

materiaSelector.addEventListener('change', () => {
  booksDiv.innerHTML = ''
  materiaId = materiaSelector.value
  materiaIdHidden.value = materiaId
  readAllBooks()
})

const handleEdit = async book => {
  const id = book.parentElement.parentElement.id

  await fetch(`/api/read/book/${id}`)
  .then(res => { return res.json() })
  .then(data => booksDiv.innerHTML += `
    <section id="editSection" class="fixed flex bg-black bg-opacity-80 top-0 left-0 w-full h-screen items-center justify-center">
      <form id="editForm" method="POST" action="/api/book/${id}"
        class="border-4 border-black bg-slate-300 p-8 rounded-xl font-semibold min-h-max grid grid-cols-3 gap-2">

        <h4 class="text-2xl underline col-span-2">Editar libro:</h4>

        <button onclick="closeEdit()" class="border-2 font-bold bg-slate-400 border-black rounded-xl">Cancelar</button>

        <label for="titulo" class="flex flex-col">*Título:
          <input name="titulo" type="text" required class=" rounded outline-none px-2" value="${data.book.titulo}">
        </label>

        <label for="anio" class="flex flex-col">*Fecha de publicación:
          <input name="anio" type="text" required maxlength="10" class=" rounded outline-none px-2" value="${data.book.anio}">
        </label>

        <label for="autor" class="flex flex-col">*Autor:
          <input name="autor" type="text" required class=" rounded outline-none px-2" value="${data.book.autor}">
        </label>

        <label for="editorial" class="flex flex-col">*Editorial:
          <input name="editorial" type="text" required class=" rounded outline-none px-2" value="${data.book.editorial}">
        </label>

        <label for="en" class="flex flex-col">En:
          <input name="en" type="text" class=" rounded outline-none px-2" value="${data.book.en}">
        </label>

        <label for="capitulos" class="flex flex-col">Capítulos:
          <input name="capitulos" type="text" class=" rounded outline-none px-2" value="${data.book.capitulos}">
        </label>

        <label for="paginas" class="flex flex-col">Páginas:
          <input name="paginas" type="text" class=" rounded outline-none px-2" value="${data.book.paginas}">
        </label>

        <label for="unidad" class="flex flex-col">*Unidad:
          <input name="unidad" required type="number" min="0" class=" rounded outline-none px-2" min="0" value="${data.book.unidad}">
        </label>

        <label for="condicion" class="flex flex-col">*Condición:
          <select name="condicion" required class=" rounded outline-none px-2" value="${data.book.condicion}">
            <option value="Obligatorio">Obligatorio</option>
            <option value="Ampliatorio">Ampliatorio</option>
          </select>
        </label>

        <input id="materia_id_input" name="materia_id" type="hidden" value="${data.book.materia_id}">
        <p class="self-center text-center">* (requerido)</p>
        <button class="col-span-2 rounded-xl border-2 border-black bg-slate-400 w-96 text-xl font-bold mx-auto px-2">Editar</button>

      </form>
    </section>
  `
    
  
  // if (window.confirm('¿Acepta los cambios?'))
  // await fetch(`/api/book/${id}`, { method: 'PUT' })
  //   .then(() => { return window.location.reload() })
  )
}

const closeEdit = () => {
  document.getElementById('editSection').remove()
}

const handleRemove = async book => {
  const id = book.parentElement.parentElement.id
  await fetch(`/api/book/${id}`, { method: 'DELETE' })
    .then(() => { return window.location.reload() })
}

readMaterias()
