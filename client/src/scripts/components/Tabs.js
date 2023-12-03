import CreateElement from "../utils/CreateElement.js";

export default class Tabs {
    constructor (selectorHead, selectorBody, tabs) {
        this.tabs = tabs || []
        this.head = document.querySelector(selectorHead) || '' 
        this.bodytab = document.querySelector(selectorBody) || '' 
        this.init()
    }
    
    handleTabs() {
    if(this.head){
        this.head.addEventListener ('click', (ev) => {
            [...this.head.children].forEach((item) => {
                item.classList.remove('active')
            })
            
            ev.target.classList.add('active');
            ev.target.parentElement.classList.add('active')

            if(this.bodytab) {
                [...this.bodytab.children].forEach((elem) => {
                    elem.classList.remove('active')
                    if (elem.dataset.bodyelem == ev.target.dataset.tab) {
                         elem.classList.add('active')
                    }
                })
            }
        })
    }
    }

    render() {
        this.tabs.forEach((tab) => {
            const singleTab = new CreateElement('button', tab).render()  
            if (singleTab.className === 'btn-signin') {
                singleTab.classList.add('active')
            } 
            this.head.append(singleTab);
        });
    }
    
    init() {
        if(!!this.tabs.length){
            this.render()
        }
        this.handleTabs()

    }
}
