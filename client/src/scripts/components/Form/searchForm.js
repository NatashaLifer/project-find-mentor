import Form from "./Form.js"
import Api from "../../utils/Api.js"

export default class Search extends Form {
    constructor(form, cardsList, qtyActiveSlides, messageNoCard){
        super()
        this.element = document.querySelector(form)
        this.cardsList = document.querySelector(cardsList);
        this.qtyActiveSlides = document.querySelector(qtyActiveSlides)
        this.input = this.element.querySelector("input")
        this.messageNoCard = document.querySelector(messageNoCard)
        // this.results = searchResults
        // console.log(this.results);
            //серед яких елементів буде йти пошук: 
            // - search - пошук по ключовим фразам в description
            // - category - пошук по розширеному списку категорій itemizedCategory з випадаючого списку
    }
    handleSearch(){
        super.handleForm()
    }
    searchInput(){
        this.input.addEventListener('input', (event) => {
            const activeCategory = document.querySelector('.categories-item.active')
            if(activeCategory) {
                activeCategory.classList.remove('active')
                //document.querySelector('[data-tab="all"]').add('active')
            }
            this.messageNoCard.classList.remove('visible')
            // const activeSlides = this.cardsList.querySelectorAll('.active')
            
            // console.log(event.data)
            const searchValue = event.target.value
            // return searchValue
            const request = new Api('http://localhost:8080/api')
            const mentors = request.getRequest('/statements');
            let numberCard = 0;
            
            [...this.cardsList.children].forEach(singleCard => {
                    singleCard.classList.remove('active')
                    singleCard.classList.remove('show')
                mentors.then(data => {
                    data.forEach((mentor) => {
                        const selectedWords = [...searchValue.split(' ')]
                        for (let i = 0; i < selectedWords.length; i++) {    
                            const elemFind = mentor.description.toLowerCase().includes(selectedWords[i].toLowerCase())  
                            // console.log(singleCard.dataset.id, mentor._id )                         
                            if(elemFind && singleCard.dataset.id === mentor._id) {
                                singleCard.classList.add('active')                
                                numberCard++
                                this.qtyActiveSlides.textContent = `${numberCard}`
                                if(numberCard <= 4) {
                                    singleCard.classList.add('show')
                                }
                            }
                        }  
                        
                        //* *вибір по одному слову або виразу:
                        // const elemFind = mentor.description.toLowerCase().includes(searchValue.toLowerCase())
                        // if(elemFind & singleCard.dataset.id === mentor._id) {
                            //     singleCard.classList.add('active')
                            //     singleCard.classList.add('show')                     
                            // }
                        })
                })
                // const oneCard = document.querySelector('.item.active.show')
                // console.log(oneCard);
        
                // if (!oneCard){
                //     const mentorsCardsWrapper = document.querySelector('.wrapper-cards')
                //     const noMentorMessage = new CreateElement ('p', {textContent: 'There are no mentors by this statements', className: 'wrapper-cards__message'}).render()
                //     mentorsCardsWrapper.append(noMentorMessage)
                // }
            })
            
        }) 
    }
    async onSave(event){
        // console.log(this.element);
        // console.log(this.searchInput()); // не знаходить
        // const requestRes = this.searchInput();
        const requestRes = super.onSave(event) // для живого пошуку цей рядок коментується
        const selectedDescrip = requestRes.search // це буде братися з окремого методу searchInput
        const selectedCategory = requestRes.category // i це братися з окремого методу searchCategory

        const request = new Api('http://localhost:8080/api')
        const mentors = await request.getRequest('/statements');
        let numberCard = 0;
        [...this.cardsList.children].forEach(singleCard => {
            singleCard.classList.remove('active')
            singleCard.classList.remove('show')

            mentors.forEach(mentor => { 
                if(selectedCategory.includes(mentor.itemizedCategory)) {
                    const selectedWords = [...selectedDescrip.split(' ')]

                    for (let i = 0; i < selectedWords.length; i++) {    
                        const elemFind = mentor.description.toLowerCase().includes(selectedWords[i].toLowerCase())
                            
                        if(elemFind & singleCard.dataset.id === mentor._id) {
                            singleCard.classList.add('active')
                            numberCard++
                                if(numberCard <= 4) {
                                    singleCard.classList.add('show')
                                }                 
                        }
                    }                        
                }
            })  
        }) 
        const activeSlides = this.cardsList.querySelectorAll('.active')
        this.qtyActiveSlides.textContent = `${activeSlides.length}`

        const oneCard = document.querySelector('.item.active.show')
        if (!oneCard){
            this.messageNoCard.classList.add('visible')

            // const mentorsCardsWrapper = document.querySelector('.wrapper-cards')
            // const noMentorMessage = new CreateElement ('p', {textContent: 'There are no mentors by this statements', className: 'wrapper-cards__message'}).render()
            // mentorsCardsWrapper.append(noMentorMessage)
        }
    }     
}
