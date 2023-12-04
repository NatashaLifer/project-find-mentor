export default class Slider {
    constructor(btnRight, btnLeft, slideItem, indexFirstElem, set) {
        this.btnRight = document.querySelector(btnRight)
        this.btnLeft = document.querySelector(btnLeft)
        this.slides = Array.from(document.querySelectorAll(slideItem));
        this.firstIndex = indexFirstElem || 0;
        this.set = set || 4;
        
        this.init()
    }
    
    handleSlider() {
        const slideCount = this.slides.length;

        this.btnLeft.addEventListener('click', () => {
            this.btnRight.classList.remove('deact')
            if(this.firstIndex === 0 ) {
                this.btnLeft.classList.add('deact')
            } else {
                //гортання на один слайд вліво (назад до початку)
                let lastIndex = this.firstIndex + this.set - 1 
                this.slides[lastIndex].classList.remove('show')
                
                this.firstIndex = this.firstIndex - 1 
                this.slides[this.firstIndex].classList.add('show')
            }
        })
        
        this.btnRight.addEventListener('click', () => {
            this.btnLeft.classList.remove('deact')
            
            if (slideCount <= (this.firstIndex + this.set)) {
                this.btnRight.classList.add('deact')
            } else {
                //гортання на один слайд вправо (вперед до кінця)
                this.slides[this.firstIndex].classList.remove('show') 
                this.firstIndex = this.firstIndex + 1 
                
                let lastIndex = this.firstIndex + this.set - 1
                this.slides[lastIndex].classList.add('show')
            }
        })
    }
    init(){
        if(!!this.slides.length){
            this.handleSlider()
        }
    }
}