import Form from "./Form/Form.js"
import Api from "../utils/Api.js"
import Slider from "./Slider.js"

export default class Search extends Form {
    constructor(form, cardsList){
        super()
        this.element = document.querySelector(form)
        this.cardsList = document.querySelector(cardsList);

        this.input = this.element.querySelector("input")

        // this.results = searchResults
        // console.log(this.results);
            //серед яких елементів буде йти пошук:
            // - search - пошук по ключовим фразам в description
            // - category - пошук по розширеному списку категорій itemizedCategory з випадаючого списку (додати ці категорії в базу даних)
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

            console.log(event.data)
            const searchValue = event.target.value
            // return searchValue
            const request = new Api('http://localhost:8080/api')
            const mentors = request.getRequest('/statements');
            [...this.cardsList.children].forEach(singleCard => {
                    singleCard.classList.remove('active')
                    singleCard.classList.remove('show')
                mentors.then(data => {
                    data.forEach((mentor) => {
                        const selectedWords = [...searchValue.split(' ')]
                        for (let i = 0; i < selectedWords.length; i++) {    
                            const elemFind = mentor.description.toLowerCase().includes(selectedWords[i].toLowerCase())                            
                            if(elemFind & singleCard.dataset.id === mentor._id) {
                                singleCard.classList.add('active')                
                                singleCard.classList.add('show')  
                            }
                        }  
                        
                        //* *вибір по одному слову або виразу:
                        // const elemFind = mentor.description.toLowerCase().includes(searchValue.toLowerCase())
                        // if(elemFind & singleCard.dataset.id === mentor._id) {
                        //     singleCard.classList.add('active')
                        //     singleCard.classList.add('show')                     
                        // }
                    })
                    new Slider('.arrow-right', '.arrow-left', '.item.active')
                })
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

        [...this.cardsList.children].forEach(singleCard => {
            singleCard.classList.remove('active')
            singleCard.classList.remove('show')

            mentors.forEach(mentor => { 
                if(selectedCategory.includes(mentor.itemizedCategory)) {
                    console.log(mentor.itemizedCategory);
                    const selectedWords = [...selectedDescrip.split(' ')]

                    for (let i = 0; i < selectedWords.length; i++) {    
                        const elemFind = mentor.description.toLowerCase().includes(selectedWords[i].toLowerCase())
                            
                        if(elemFind & singleCard.dataset.id === mentor._id) {
                            singleCard.classList.add('active')
                            singleCard.classList.add('show')                     
                        }
                    }                        
                }
            })  
        }) 
    }     
}
