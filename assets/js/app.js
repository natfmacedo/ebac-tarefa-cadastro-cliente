import { Cliente, OperacoesCrud } from "./classes.js";
import { listarClientes, atualizarInterface, refreshTabela } from "./utils.js";

const crud = new OperacoesCrud("https://crudcrud.com/api/7379b9eb8dc24588b15518fdcc977dd0", "clientes");

const clientes = await crud.lerDados();
listarClientes(clientes);

const formulario = document.querySelector("form");
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nomeInformado = formulario.nome.value;
    const emailInformado = formulario.email.value;

    if (!nomeInformado || !emailInformado) return;

    const cliente = new Cliente(nomeInformado, emailInformado);
    crud.cadastrarDados(cliente.nome, cliente.email);
    atualizarInterface(cliente);
    const novosClientes = await crud.lerDados();
    refreshTabela(novosClientes);
    formulario.reset();
});

document.getElementById("listaClientes").addEventListener("click", async (event) => {
    const idCliente = event.target.value;

    await crud.deletarDados(idCliente);
    const listaClientes = await crud.lerDados();
    refreshTabela(listaClientes);

});