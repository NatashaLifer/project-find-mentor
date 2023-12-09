import Search from "../components/searchForm.js"
import Api from "./Api.js"
import Form from "../components/Form.js"

window.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname === '/searching.html') {
        const selectedCategory = sessionStorage.getItem('category')
        const selectedItemHead = document.querySelectorAll('.categories-item')
              
        if(selectedCategory){
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

        const request = new Api('http://localhost:8080/api')
        const mentors = request.getRequest('/statements');
        mentors.then(data => {
            const allDescription = []
            data.forEach(elem => {
                allDescription.push(elem.description)
            })
            // console.log(allDescription);
            const search = new Search('input[name="search"]', allDescription)
            // search.handleSearch()
        })


        // const formSearching = new Form([], '.form-searching')
        
        const searchCategory = new Search('input[name="category"]') //, itemizedCategory)
        searchCategory.handleSearch()
    }
})