const API_URL = "https://crudcrud.com/api/ced6d87b23894d1f9fa9cc305e31c6df/clientes";

const tabelaClientes = document.getElementById("listaClientes");

fetch(API_URL)
    .then(resposta => resposta.json())
    .then((listaClientes) => {
        listaClientes.forEach((cliente) => {
            const itemTabela = document.createElement("tr");

            itemTabela.innerHTML = `<td>${cliente.nome}</td> <td>${cliente.email}</td> <td><button onclick="removerCliente('${cliente._id}', this)">Excluir</button></td>`;
            
            tabelaClientes.appendChild(itemTabela);
        });
    })
    .catch(error => console.error("Erro ao carregar clientes:" , error));

document.getElementById("cadastrarCliente").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) return;

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then(resposta => resposta.json())
    .then((cliente) => {
        const itemTabela = document.createElement("tr");

        itemTabela.innerHTML = `<td>${cliente.nome}</td> <td>${cliente.email}</td> <td><button onclick="removerCliente('${cliente._id}', this)">Excluir</button></td>`;
            
        tabelaClientes.appendChild(itemTabela);
    })
    .catch((error) => console.error("Erro ao adicionar cliente: ", error));
});

function removerCliente(id, botao) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    })
    .then(() => {
        const td = botao.parentElement;
        const tr = td.parentElement;
        tr.remove();
    })
    .catch((error) => console.error("Erro ao remover cliente: ", error));
}