// import API from "./utils/Api.js"
import Tabs from "./components/Tabs.js"
import Form from "./components/Form.js"
import Modal from "./components/Modal.js"
// import CreateElement from "./utils/CreateElement.js";

const btnAuth = document.querySelector('.nav__link-auth')

const fieldsData = [
    {type: 'text', className: 'field-auth', name: 'username', placeholder: 'Your name', value: 'kminchelle'},
    {type: 'password', className: 'field-auth', name: 'password', placeholder: 'Password', value: '0lelplR'},
    {type: 'submit', className: 'btn-auth', value: 'Sign in'}
]

const fieldsDataSignUp = [
    {type: 'text', className: 'field-auth', name: 'username', placeholder: 'Your name'},
    {type: 'email', className: 'field-auth', name: 'e-mail', placeholder: 'Your e-mail'},
    {type: 'password', className: 'field-auth', name: 'password', placeholder: 'Password'},
    {type: 'password', className: 'field-auth', name: 'repeat-password', placeholder: 'Repeat your password'},
    {type: 'submit', className: 'btn-auth', value: 'Sign up'}
]

const tabsData = [
    {className: 'btn-signin', textContent: 'Sign In', dataset: {tab:'signin'}},
    {className: 'btn-signup', textContent: 'Sign Up', dataset: {tab:'signup'}}
]

const formSignIn = new Form(fieldsData, 'signin')
const formSignUp = new Form(fieldsDataSignUp, 'signup')
const formWrapper = document.querySelector('.tabs-body')
formWrapper.append(formSignIn.render('form-signin'),formSignUp.render('form-signup'))

const tabs = new Tabs('.tabs-head', '.tabs-body', tabsData)


const wrapper = document.querySelector('modal')

const modal = new Modal(wrapper)
modal.render(btnAuth)


const switchMode = document.getElementById('btn')

switchMode.addEventListener('click', () => {
    document.body.classList.toggle('light') 
})

const footerTabs = new Tabs('.hero__footer-select')