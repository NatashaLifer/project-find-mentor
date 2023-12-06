import Api from "./utils/Api.js"
import Tabs from "./components/Tabs.js"
import Form from "./components/Form.js"
import Modal from "./components/Modal.js"
import Card from "./components/Card.js"
import Slider from "./components/Slider.js"
import { fieldsData, fieldsDataSignUp, tabsData } from "./utils/DataDynamicComponents.js"
import "./utils/searching.js"

const switchMode = document.getElementById('btn')

switchMode.addEventListener('click', () => {
    document.body.classList.toggle('light') 
})


const btnAuth = document.querySelector('.nav__title-auth')

const formSignIn = new Form(fieldsData, 'signin')
const formSignUp = new Form(fieldsDataSignUp, 'signup')
const formWrapper = document.querySelector('.tabs-body')
formWrapper.append(formSignIn.render('form-signin'),formSignUp.render('form-signup'))

const tabs = new Tabs('.tabs-head', '.tabs-body', 1, tabsData)

const wrapper = document.querySelector('modal')
const modal = new Modal(wrapper)
modal.render(btnAuth)
 
// const selectedItemBody = document.getElementsByClassName('.item')
// setTimeout(() => {
//     console.log(selectedItemBody);

// },1500)

window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData')) 
    if(userData) {
        btnAuth.textContent = `${userData.fullName}`
        btnAuth.classList.add('deactiveted-profile')
    }

    // const selectedCategory = sessionStorage.getItem('category')
    // if(selectedCategory) {
    //     const selectedItemHead = document.querySelectorAll('.categories-item')

    //     const wrapperBody = document.querySelector('.wrapper-cards')
    //     console.log(wrapperBody.childNodes);
    //     // console.log([...wrapperBody.children]);

    //     const selectedItemBody = Array.from(wrapperBody.childNodes)
    //     let numberCard = 0
    //     if(selectedItemHead){
    //         selectedItemHead.forEach((elem) => {
    //             elem.classList.remove('active')
    //             if (elem.dataset.tab == selectedCategory){
    //                 elem.classList.add('active')
    //             }
    //         });
    //         selectedItemBody.forEach((el) => {
    //             console.log(el);
    //             el.classList.remove('active')
    //             el.classList.remove('show')
    //             if(el.dataset.bodyelem == selectedCategory){
    //                 el.classList.add('active')
    //                 numberCard++
    //                 if(numberCard <= 4) {
    //                     el.classList.add('show')
    //                 }
    //             }
    //         })
    //     }
    // }
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
        
        let selectedCategory = activeCategory.dataset.tab
        const categoryFromStorage = sessionStorage.getItem('category')
        if(categoryFromStorage){
            selectedCategory = categoryFromStorage
        } 

        const selectedCategoryMentors = document.querySelectorAll(`[data-bodyelem="${selectedCategory}"]`)
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


// const search = new Search('.form-searching', 'input[name="search"]')
// search.handleSearch()

// const searchCategory = new Search('.form-searching', 'input[name="category"]')
// searchCategory.handleSearch()


