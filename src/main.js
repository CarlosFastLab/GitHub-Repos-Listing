import api from './api';

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

    // Apenas registra o evt, passando o evento como argumento sendo utilizado no método adicionarRepositorio()
    registrarEventos() {
        this.formulario.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    // Função asíncrona pois vai fazer requisição http (retorno com tempo de resposta e execução variáveis)
    async adicionarRepositorio(evento) {
        // Evita que o formulário recarregue a página
        evento.preventDefault();

        // Recuperar valor do input
        let input = this.formulario.querySelector('input[id=repositorio]').value;

        // Se input vier vazio, sai da app
        if (input.length === 0) {
            return; // return sempre sai da função
        }

        let response = await api.get(`/repos/${input}`);

        // Destructuring das propriedades que recebemos no respose
        let { name, description, html_url, owner: { avatar_url } } = response.data;

        // Adiciona o repositório na lista
        this.repostorios.push({
            nome: name,
            descricao: description,
            avatar_url,
            link: html_url
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