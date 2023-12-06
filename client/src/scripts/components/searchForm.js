export default class Search {
    constructor(form, input, searchResults){
        this.form = document.querySelector(form)
        this.input = this.form.querySelector(input)
    
        this.results = searchResults || []
    }
    handleSearch(){
        this.input.addEventListener('input', (event) => {
            // console.log(event.data);
            const searchValue = event.target.value;
            console.log(searchValue);
        })
    }
}
