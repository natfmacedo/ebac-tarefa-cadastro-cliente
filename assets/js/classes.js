export class Cliente {
    #nome;
    #email;
    constructor(nome, email) {
        this.#nome = nome;
        this.#email = email;
    }
    get nome() {
        return this.#nome;
    }
    get email() {
        return this.#email;
    }
} 

export class OperacoesCrud {
    #apiUrl;
    #endpoint;
    constructor(apiUrl, endpoint) {
        this.#apiUrl = apiUrl;
        this.#endpoint = endpoint; 
    }
    get apiUrl() {
        return this.#apiUrl;
    }
    get endpoint() {
        return this.#endpoint;
    }
    async cadastrarDados(nome, email) {
        try {
            const response = await fetch(`${this.#apiUrl}/${this.#endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response}`);
            }
        } catch (error){
            console.error("Erro ao obter dados: ", error);
            throw  error;
        }
    }

    async lerDados() {
        try {
            const response = await fetch(`${this.#apiUrl}/${this.#endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
            throw error;
        }
    }

    async deletarDados(id) {
        try {
            const response = await fetch(`${this.#apiUrl}/${this.#endpoint}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao deletar dados: ", error);
            throw error;
        }
    }

}