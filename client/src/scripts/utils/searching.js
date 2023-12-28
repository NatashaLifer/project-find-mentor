import Search from "../components/Form/searchForm.js"

window.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname === '/searching.html') {
        const selectedCategory = sessionStorage.getItem('category') || 'all'
        const selectedItemHead = document.querySelectorAll('.categories-item')
              
        if(selectedCategory){
            selectedItemHead.forEach((elem) => {
                elem.classList.remove('active')
                if (elem.dataset.tab == selectedCategory){
                    elem.classList.add('active')
                }
            })
        }
        
        const searchForm = new Search('.search__form', '.wrapper-cards', '.qty-mentors span', '.wrapper-cards__message') 
        searchForm.searchInput()
        searchForm.handleSearch()
        // searchForm.onSave()
    }
})