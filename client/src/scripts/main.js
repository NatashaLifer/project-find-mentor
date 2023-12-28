import Tabs from "./components/Tabs.js"
import FormLogin from "./components/Form/FormLogin.js"
import FormRegistr from "./components/Form/FormRegistr.js"
import Modal from "./components/Modal.js"
import { fieldsData, fieldsDataSignUp, tabsData } from "./utils/DataDynamicComponents.js"
import "./utils/searching.js"
import "./utils/renderCards.js"

const switchMode = document.getElementById('btn')

switchMode.addEventListener('click', () => {
    document.body.classList.toggle('light') 
})

const btnAuth = document.querySelector('.nav__item-auth')

const formSignIn = new FormLogin(fieldsData, 'signin')
const formSignUp = new FormRegistr(fieldsDataSignUp, 'signup')
const formWrapper = document.querySelector('.tabs-body')
formWrapper.append(formSignIn.render('form-signin'),formSignUp.render('form-signup'))

new Tabs('.tabs-head', '.tabs-body', 1, tabsData)

const wrapper = document.querySelector('modal')
const modal = new Modal(wrapper)
modal.render(btnAuth)

window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData')) 
    if(userData) {
        btnAuth.textContent = `${userData.fullName}`
        btnAuth.classList.add('deactiveted-profile')
    }
})

const categoriesMenu = document.querySelector('.hero__footer-select')
if(categoriesMenu){
    categoriesMenu.addEventListener('click', (ev) => {
        sessionStorage.setItem('category', ev.target.parentElement.dataset.tab)
    })
}

new Tabs('.categories', '.wrapper-cards', 4, null, '.qty-mentors span', '.wrapper-cards__message')





