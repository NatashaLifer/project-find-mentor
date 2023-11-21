export default class Modal {
    constructor (html) {
        this.content = html
    }
    render(btn) {
        const modalWrap = document.querySelector('.modal-wrapper')

        btn.addEventListener("click", () => {
            modalWrap.classList.remove('deactiveted')

            modalWrap.addEventListener('click', (event) => {         
                if (event.currentTarget === event.target || event.target.className === 'modal-close') {
                    modalWrap.classList.add('deactiveted')
                } 
            })    
        })
    }
}