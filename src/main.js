class App {
    // Construtor
    constructor() {
        // Lista de repositórios
        this.repostorios = [];

        // Form
        this.formulario = document.querySelector('form');

        // Método para registrar eventos do form
        this.registrarEventos();
    }

    registrarEventos() {
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    adicionarRepositorio(evento) {
        // Evita que o formulário recarregue a página
        evento.preventDefault();

        // Adiciona o repositório na lista
        this.repostorios.push({
            nome: 'Nerd Fonts',
            descricao: 'Iconic font aggregator, collection, and patcher',
            avatar_url: 'https://avatars0.githubusercontent.com/u/8083459?v=4',
            link: 'https://github.com/ryanoasis/nerd-fonts'
        });

        // Renderizar a tela
        console.log(this.repostorios);
    }
}

new App();