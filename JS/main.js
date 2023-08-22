const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
// JSON.parse analisa a string passada atraves do JSON.stringify gerando o valor ou objeto JS //
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    // Variavel const para procurar se existe o elemento no array de itens //
    const existe = itens.find((elemento) => elemento.nome === nome.value);

    const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value,
    };
    // Condição para conferir "IF/SE" o elemente existe//
    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex((elemento) => elemento.id === existe.id)] =
            itemAtual;
        // Caso não exista a condição acima realize a operação abaixo com "else" //
    } else {
        itemAtual.id = itens[itens.length - 1]
            ? itens[itens.length - 1].id + 1
            : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item) {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML =
        item.quantidade;
}

// Função incluir botão de deletar um elemento da lista //
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

// Função para efetivamente deletar um elemento cliclado da lista utilizando a tag.remove //
function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(
        itens.findIndex((elemento) => elemento.id === id),
        1
    );
    //  JSON.stringify converte os valores em um string para o JS //
    localStorage.setItem("itens", JSON.stringify(itens));
}
