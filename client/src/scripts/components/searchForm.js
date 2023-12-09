import Form from "./Form.js"

export default class Search {
    constructor(input, searchResults){
        this.input = document.querySelector(input)
        this.results = searchResults || [] //серед яких елементів буде йти пошук:
                        // - search - пошук по ключовим фразам в description
                        // - category - пошук по розширеному списку категорій itemizedCategory з випадаючого списку (додати ці категорії в базу даних)
        }
    handleSearch(){
        // console.log(this.results);
        this.input.addEventListener('input', (event) => {
            // console.log(event.data);
            const searchValue = event.target.value;
            console.log(searchValue);
        })
    }
}
