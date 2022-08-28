import {
    Requisicao
} from "../controller/request.js"

class CriarUsuario {
    static create() {

        const username  = document.querySelector('.criarUser_username');
        const email     = document.querySelector('.criarUser_email');
        const foto      = document.querySelector('.criarUser_foto');
        const senha     = document.querySelector('.criarUser_senha');
        const btn       = document.querySelector('.criarUser_btn');

        btn.addEventListener('click', async (event) =>{
            event.preventDefault()
            const data = {
                username: username.value,
                email: email.value, 
                avatarUrl: foto.value,
                password: senha.value
            }
            await Requisicao.criarUser(data);
        });
    };
};

CriarUsuario.create()