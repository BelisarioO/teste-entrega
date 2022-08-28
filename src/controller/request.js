export class Requisicao {
    static baseUrl = "https://blog-m2.herokuapp.com"

    static token = localStorage.getItem('token')

    static headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
    };

    static async loginUser(data) {
        const base = await fetch(`${this.baseUrl}/users/login`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('userId', res.userId)
                localStorage.setItem('token', res.token)
                return res
            })
            .catch(err => console.log(err))

        return base
    };

    static async criarUser(data) {
        const base = await fetch(`${this.baseUrl}/users/register`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                window.location.assign("../../index.html")
                return res
            })
            .catch(err => console.log(err))
        return base
    };

    static async renderizarPage(page) {
        return await fetch(`${this.baseUrl}/posts?page=${page}`, {
                method: 'GET',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    };

    static async userId(id) {
        return await fetch(`${this.baseUrl}/users/${id}`, {
                method: 'GET',
                headers: this.headers,

            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    };

    static async postId(id) {
        return await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'GET',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    };

    static async criarPost(data) {
        const base = await fetch(`${this.baseUrl}/posts`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

        return base;
    };


    static async editarPost(data, id) {
        return await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    };

    static async deletarPost(id) {
        const base = await fetch(`${this.baseUrl}/posts/${id}`, {
                method: 'DELETE',
                headers: this.headers,
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => err)

        return base;
    };
};