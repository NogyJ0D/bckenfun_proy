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

const handleEdit = book => {
  const id = book.parentElement.parentElement.id
  console.log(id)
}

const handleRemove = async book => {
  const id = book.parentElement.parentElement.id
  await fetch(`/api/book/${id}`, { method: 'DELETE' })
    .then(() => { return window.location.reload() })
}

readMaterias()
