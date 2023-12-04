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

const tabs = new Tabs('.tabs-head', '.tabs-body', 1, tabsData)

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
        const selectedItemHead = document.querySelectorAll('.categories-item')

        const wrapperBody = document.querySelector('.wrapper-cards')
        console.log(wrapperBody.childNodes);
        // console.log([...wrapperBody.children]);

        const selectedItemBody = Array.from(wrapperBody.childNodes)
        console.log(selectedItemBody);
        let numberCard = 0
        if(selectedItemHead){
            selectedItemHead.forEach((elem) => {
                elem.classList.remove('active')
                if (elem.dataset.tab == selectedCategory){
                    elem.classList.add('active')
                }
            });
            selectedItemBody.forEach((el) => {
                console.log(el);
                el.classList.remove('active')
                el.classList.remove('show')
                if(el.dataset.bodyelem == selectedCategory){
                    el.classList.add('active')
                    numberCard++
                    if(numberCard <= 4) {
                        el.classList.add('show')
                    }
                }
            })
        }
    }
})

const categoriesMenu = document.querySelector('.hero__footer-select')
if(categoriesMenu){
    categoriesMenu.addEventListener('click', (ev) => {
        sessionStorage.setItem('category', ev.target.parentElement.dataset.tab)
    })
}

const mentorsList = document.querySelector('.wrapper-cards')
const activeCategory = document.querySelector('.categories-item.active')

if(mentorsList) {
    const request = new Api('http://localhost:8080/api')
    const mentors = request.getRequest('/statements');
    mentors.then(data => {
        let numberCard = 0

        data.forEach((elem) => {
            const mentor = new Card(elem);
            mentor.render(mentorsList);
        })
        
        const selectedCategoryMentors = document.querySelectorAll(`[data-bodyelem="${activeCategory.dataset.tab}"]`)
        // console.log(selectedCategoryMentors);
        selectedCategoryMentors.forEach(element => {
            element.classList.add('active')
            numberCard++
            if(numberCard <= 4) {
                element.classList.add('show')
            }
        })
        const sliderCard = new Slider('.arrow-right', '.arrow-left', '.item.active') 
    })
}

// const showPage = new Pagination(mentorsList.length, 1, 4)
// showPage.render()
// const mentors = await showPage.renderContent() 

const categoryTabs = new Tabs('.categories', '.wrapper-cards', 4)


