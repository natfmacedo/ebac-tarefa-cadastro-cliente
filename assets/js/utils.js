const tabelaClientes = document.getElementById("listaClientes");

export const listarClientes = (listaClientes) => {
    listaClientes.map((cliente) => {
        atualizarInterface(cliente);
    });
}

export const atualizarInterface = (cliente) => {
    const itemTabela = document.createElement("tr");
    itemTabela.innerHTML = `<td>${cliente.nome}</td> <td>${cliente.email}</td> <td><button type="button" value="${cliente._id}">Excluir</button></td>`;
    tabelaClientes.appendChild(itemTabela);
}

export const refreshTabela = (listaClientes) => {
    tabelaClientes.innerHTML = "";
    listarClientes(listaClientes);
}