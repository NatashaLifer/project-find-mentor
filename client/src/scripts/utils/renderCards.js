import Api from "./Api";
import Card from "../components/Card";
import Slider from "../components/Slider";

const mentorsList = document.querySelector('.wrapper-cards')
const qtyActiveSlides = document.querySelector('.qty-mentors span')
// const activeCategory = document.querySelector('.categories-item.active')

if(mentorsList) {
    const request = new Api('http://localhost:8080/api')
    const mentors = request.getRequest('/statements');
    mentors.then(data => {
        let numberCard = 0

        data.forEach((elem) => {
            const mentor = new Card(elem);
            mentor.render(mentorsList);
        })
        
        const categoryFromStorage = sessionStorage.getItem('category')
        if(categoryFromStorage){
        
            const selectedCategoryMentors = document.querySelectorAll(`[data-bodyelem="${categoryFromStorage}"]`)
            selectedCategoryMentors.forEach(element => {
                element.classList.add('active')
                numberCard++
                qtyActiveSlides.textContent = `${numberCard}`
                if(numberCard <= 4) {
                    element.classList.add('show')
                }
            })
        } else {
            let allCards = document.querySelectorAll('.item')
            allCards.forEach(elem => {
                elem.classList.add('active')
                numberCard++
                qtyActiveSlides.textContent = `${numberCard}`
                if(numberCard <= 4) {
                    elem.classList.add('show')
                }
            })
        }
        sessionStorage.removeItem('category')
        new Slider('.arrow-right', '.arrow-left', '.item.active', 0, 4, '.qty-mentors span') 
    })
}
