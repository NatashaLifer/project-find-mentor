import Search from "../components/searchForm.js"

window.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname === '/searching.html') {
        const selectedCategory = sessionStorage.getItem('category')
        const selectedItemHead = document.querySelectorAll('.categories-item')
              
        if(selectedItemHead){
            selectedItemHead.forEach((elem) => {
                elem.classList.remove('active')
                if (elem.dataset.tab == selectedCategory){
                    elem.classList.add('active')
                }
            });
            // setTimeout(() => {
                //     let numberCard = 0
                //     const wrapperBody = document.querySelector('.wrapper-cards')
                //     console.dir([...wrapperBody.children]);
                //     const selectedItemBody = Array.from([...wrapperBody.children])
                
                //     selectedItemBody.forEach((el) => {
                    //         el.classList.remove('active')
                    //         el.classList.remove('show')
                    //         if(el.dataset.bodyelem == selectedCategory){
                        //             el.classList.add('active')
                        //             numberCard++
                        //             if(numberCard <= 4) {
            //                 el.classList.add('show')
            //             }
            //         }
            //     })
            // },1000)
            // setTimeout(() => {
            //     const selectedItemBody = document.getElementsByClassName('.item')
            //     console.log(selectedItemBody);
            // }, 1000)
        }

        const search = new Search('.form-searching', 'input[name="search"]')
        search.handleSearch()

        const searchCategory = new Search('.form-searching', 'input[name="category"]')
        searchCategory.handleSearch()
    }
})