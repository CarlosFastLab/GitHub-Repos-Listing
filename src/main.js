class App {
    // Construtor
    constructor() {
        // Lista de repositórios
        this.repostorios = [];

        // Form
        this.formulario = document.querySelector('form');

        // Lista
        this.lista = document.querySelector('.list-group');

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
        this.renderizarTela();
    }

    renderizarTela() {
        // Limpar o conteúdo de lista para evitar duplicidade - sempre fazer!
        this.lista.innerHTML = '';

        // Percorrer toda a lista de repos e criar os elementos
        this.repostorios.forEach(repo => {
            // Precisamos criar um elemento <li>
            let li = document.createElement('li');

            // Adicionando atributo
            li.setAttribute('class', 'list-group-item list-group-item-action');

            // Criando elemento img
            let img = document.createElement('img');

            // Adicionando atributos ao img
            img.setAttribute('src', repo.avatar_url);
            // Settando a img como filho da li
            li.appendChild(img);

            // Criando elemento <strong>
            let strong = document.createElement('strong');
            // Criando textnode do strong
            let txtNome = document.createTextNode(repo.nome);
            // Adicionando txtNome como filho do <strong>
            strong.appendChild(txtNome);
            // Adicionando strong como filho do <li>
            li.appendChild(strong);

            // Criando parágrafo
            let p = document.createElement('p');
            // Criando textNode do p
            let txtDescricao = document.createTextNode(repo.descricao);
            // Adicionando txtDescricao como filho do p
            p.appendChild(txtDescricao);
            // Adicionando p como filho do li
            li.appendChild(p);

            // Criando elemento <a>
            let anchor = document.createElement('a');
            // Settando atributos do <a>
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('href', repo.link);
            // TextNode do anchor
            let txtA = document.createTextNode('Acessar');
            // Adicionando textNode como filho do a
            anchor.appendChild(txtA);
            // Adicionar anchor como filho do li
            li.appendChild(anchor);

            // Adicionando <li> como filho da <ul>
            this.lista.appendChild(li);

            // Limpando conteúdo do input
            this.formulario.querySelector('input[id=repositorio]').value = '';

            // Adicionando foco ao input
            this.formulario.querySelector('input[id=repositorio]').focus();
        });
    }
}

new App();