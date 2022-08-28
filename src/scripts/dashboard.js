import {
    Requisicao
} from "../controller/request.js";

class RenderizarPosts {
    static userId = localStorage.getItem('userId')

    static renderizarHeader(data) {
        let container     = document.querySelector('.container');
        let userContainer = document.querySelector('.user_container');

        let userImg       = document.createElement('img');
        let userName      = document.createElement('p');
        let userLogoutBtn = document.createElement('logout');

        userLogoutBtn.addEventListener('click', (event) =>{
            event.preventDefault()
            localStorage.clear()
            window.location.assign('../../index.html')
        })

        userImg.classList.add('user_avatar')
        userName.classList.add('user_name')
        userLogoutBtn.classList.add('user_logout_btn')

        userImg.src = data.avatarUrl
        userName.innerText = data.username
        userLogoutBtn.innerText = 'Logout'

        userContainer.append(userImg, userName)
        container.append(userContainer, userLogoutBtn)
    };

    static renderizarPosts(base) {
        const postContainerDiv = document.querySelector('.postContainer')
        postContainerDiv.innerHTML = ''

        base.data.forEach((element) => {
            let postBgColor       = document.createElement('div');
            let postDivImgBtn     = document.createElement('div');
            let postAvatar        = document.createElement('img');
            let postContainerBtn  = document.createElement('div');


            let postDivText   = document.createElement('div');
            let postUser      = document.createElement('h2');
            let postText      = document.createElement('p');
            let divData       = document.createElement('div');
            let postData      = document.createElement('p');

            postBgColor.classList.add('post_bg_color');
            postDivImgBtn.classList.add('post_div_img_btn');
            postAvatar.classList.add('post_avatar');
            postContainerBtn.classList.add('post_container_btn');

            postDivText.classList.add('post_div_text');
            postUser.classList.add('post_user');
            postText.classList.add('post_text');
            postData.classList.add('post_data');
            divData.classList.add('div_data');

            postAvatar.src      = element.user.avatarUrl
            postUser.innerText  = element.user.username
            postText.innerText  = element.content
            postData.innerText  = element.createdAt.substring(1, 10).split('-').reverse().join('/') 

            postDivText.append(postUser, postText);

            postDivImgBtn.append(postAvatar, postContainerBtn);
            divData.append(postData);
            postBgColor.append(postDivImgBtn, postDivText, divData);
            postContainerDiv.append(postBgColor);

            if (this.userId == element.user.id) {
                let postEditBtn   = document.createElement('button');
                let postDeleteBtn = document.createElement('button');
                let imgEdit       = document.createElement('img');
                let imgDelete     = document.createElement('img');

                imgEdit.src = "../assets/edit.png"
                imgEdit.width = 15
                imgDelete.src = "../assets/delete.png"
                imgDelete.width = 15

                postEditBtn.classList.add('post_edit_btn')
                postDeleteBtn.classList.add('post_delete_btn')

                postDeleteBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    const deletar = document.querySelector('.delete')
                    deletar.classList.remove('closeModel')

                    const deleteBtn = document.querySelector('.delete_btn') 
                    deleteBtn.addEventListener('click', async (event) =>{
                        event.preventDefault()

                        await Requisicao.deletarPost(element.id)

                        deletar.classList.add('closeModel')

                        const arrayDados = await Requisicao.renderizarPage(1)

                        RenderizarPosts.renderizarPosts(arrayDados)

                    })
                })

                postEditBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    const edit = document.querySelector('.edit')
                    edit.classList.remove('closeModel')

                    const editPostBtn = document.querySelector('.edit_post_btn')
                    editPostBtn.addEventListener('click', async (event) => {
                        event.preventDefault()
                        const newContent = document.querySelector('.new_content')

                        const base = {
                            content: newContent.value
                        }
                        await Requisicao.editarPost(base, element.id)

                        edit.classList.add('closeModel')

                        const arrayDados = await Requisicao.renderizarPage(1)

                        RenderizarPosts.renderizarPosts(arrayDados)

                    })
                })
                postDeleteBtn.append(imgDelete)
                postEditBtn.append(imgEdit)
                postContainerBtn.append(postEditBtn, postDeleteBtn)
            }
        })
    };

    static criarPost() {
        const userPost      = document.querySelector('.userPost')
        const userPostBtn   = document.querySelector('.postBtn')

        userPostBtn.addEventListener('click', async (event) => {
            event.preventDefault()

            const base = {
                content: userPost.value
            }
            await Requisicao.criarPost(base)
            const page = await Requisicao.renderizarPage(1)
            const homePage = RenderizarPosts.renderizarPosts(page)
            
            userPost.value = ''
            
            return homePage

        })
    };
};

const arrayDados = await Requisicao.renderizarPage(1);
const userById = await Requisicao.userId(RenderizarPosts.userId);

RenderizarPosts.renderizarPosts(arrayDados);
RenderizarPosts.renderizarHeader(userById);
RenderizarPosts.criarPost();