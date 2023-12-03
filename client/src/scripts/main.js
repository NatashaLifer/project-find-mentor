import Api from "./utils/Api.js"
import Tabs from "./components/Tabs.js"
import Form from "./components/Form.js"
import Modal from "./components/Modal.js"
import Card from "./components/Card.js"
import Slider from "./components/Slider.js"

const switchMode = document.getElementById('btn')

switchMode.addEventListener('click', () => {
    document.body.classList.toggle('light') 
})

const btnAuth = document.querySelector('.nav__title-auth')

const fieldsData = [
    {type: 'email', className: 'field-auth', name: 'email', placeholder: 'Your e-mail', value: 'aaaa123@gmail.com'},
    {type: 'password', className: 'field-auth', name: 'password', placeholder: 'Password', value: 'forest5481'},
    {type: 'submit', className: 'btn-auth', value: 'Sign in'}
]

const fieldsDataSignUp = [
    {type: 'text', className: 'field-auth', name: 'fullName', placeholder: 'Your name'},
    {type: 'email', className: 'field-auth', name: 'email', placeholder: 'Your e-mail'},
    {type: 'password', className: 'field-auth', name: 'password', placeholder: 'Password'},
    // {type: 'password', className: 'field-auth', name: 'repeat-password', placeholder: 'Repeat your password'},
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

window.addEventListener('DOMContentLoaded', () => {

    const userData = JSON.parse(sessionStorage.getItem('userData')) 
    if(userData) {
        btnAuth.textContent = `${userData.fullName}`
        btnAuth.classList.add('deactiveted-profile')
    }

    const selectedCategory = sessionStorage.getItem('category')
    if(selectedCategory) {
        const selectedItem = document.querySelectorAll('.categories-item')
        if(selectedItem){
            selectedItem.forEach((elem) => {
                elem.classList.remove('active')
                if (elem.textContent === selectedCategory){
                    elem.classList.add('active')
                }
            })
        }
    }
})

const categoriesMenu = document.querySelector('.hero__footer-select')
if(categoriesMenu){
    categoriesMenu.addEventListener('click', (ev) => {
        sessionStorage.setItem('category', ev.target.textContent)
    })
}

const mentorsList = document.querySelector('.wrapper-cards')
if(mentorsList) {
    const request = new Api('http://localhost:8080/api')
    const mentors = request.getRequest('/statements');
    mentors.then(data => {
        let numberCard = 0

        data.forEach((elem) => {
            // console.log(elem.category);
            numberCard++
            const mentor = new Card(elem);
            mentor.render(mentorsList);
        
            if(numberCard <= 4) {
                const activeCards = mentorsList.querySelectorAll('.item')
                activeCards.forEach((el) => {
                    el.classList.add('active')
                })
            }  
        })
        const sliderCard = new Slider('.arrow-right', '.arrow-left', '.wrapper-cards .item')
    })
}

// const showPage = new Pagination(mentorsList.length, 1, 4)
// showPage.render()
// const mentors = await showPage.renderContent() 

const categoryTabs = new Tabs('.categories', '.wrapper-cards')

