const form = document.getElementById("comentarioForm")
const listaComentarios = document.getElementById("listaComentarios")

function carregarComentarios() {

const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []

listaComentarios.innerHTML = ""

comentarios.forEach((comentario)=>{

const article = document.createElement("article")

article.innerHTML = `
<h3>${comentario.nome}</h3>
<p><em>${comentario.data}</em></p>
<p>${comentario.mensagem}</p>
<hr>
`

listaComentarios.appendChild(article)

})

}

form.addEventListener("submit",(event)=>{

event.preventDefault()

const nome = document.getElementById("nome").value
const mensagem = document.getElementById("mensagem").value

const comentarios = JSON.parse(localStorage.getItem("comentarios")) || []

const novoComentario = {

nome: nome,
mensagem: mensagem,
data: "agora"

}

comentarios.unshift(novoComentario)

localStorage.setItem("comentarios",JSON.stringify(comentarios))

form.reset()

carregarComentarios()

})

carregarComentarios()