import {
    Requisicao
} from "../controller/request.js"

class LoginPage {
    static renderLoginPage() {
        const token = localStorage.getItem("token")

        const inputEmail    = document.querySelector('.login_email')
        const inputPassword = document.querySelector('.login_password')
        const button        = document.querySelector('.login_btn')

        button.addEventListener("click", async (event) => {
            event.preventDefault()
            const data = {
                email: inputEmail.value,
                password: inputPassword.value
            }

            await Requisicao.loginUser(data)
                window.location.assign('./src/pages/dashboard.html')
        });
    };
};

LoginPage.renderLoginPage();