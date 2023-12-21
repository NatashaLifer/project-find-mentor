import Search from "../components/searchForm.js"

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
        
        const searchForm = new Search(".form-searching", '.wrapper-cards') 
        searchForm.searchInput()
        searchForm.handleSearch()
        // searchForm.onSave()
    }
})