export default class Slider {
    constructor(btnRight, btnLeft, slideItem, indexFirstElem, set, qtyActiveSlides) {
        this.btnRight = document.querySelector(btnRight)
        this.btnLeft = document.querySelector(btnLeft)
        this.slides = Array.from(document.querySelectorAll(slideItem));
        this.firstIndex = indexFirstElem || 0;
        this.set = set || 4;
        this.qtyActiveSlides = document.querySelector(qtyActiveSlides)
        
        this.init()
    }
    
    handleSlider() {
        this.btnLeft.addEventListener('click', () => {
            let activeSlides = this.slides.filter((slide) => slide.classList.contains('active'))
            
            this.qtyActiveSlides.textContent = `${activeSlides.length}`

            const isClearSlider = localStorage.getItem('clearSlider')
            if(isClearSlider === 'true'){
                this.firstIndex = 0
            } 
            localStorage.setItem('clearSlider', false)

            this.btnRight.classList.remove('deact')
            
            if(this.firstIndex === 0 ) {
                this.btnLeft.classList.add('deact')
            } else {
                //гортання на один слайд вліво (назад до початку)
                let lastIndex = this.firstIndex + this.set - 1 
                activeSlides[lastIndex].classList.remove('show')
                
                this.firstIndex = this.firstIndex - 1 
                activeSlides[this.firstIndex].classList.add('show')
            }
        })
        
        this.btnRight.addEventListener('click', () => {
            let activeSlides = this.slides.filter((slide) => slide.classList.contains('active'))

            this.qtyActiveSlides.textContent = `${activeSlides.length}`
            
            let slideCount = activeSlides.length;

            const isClearSlider = localStorage.getItem('clearSlider')
            if(isClearSlider === 'true'){
                this.firstIndex = 0
            } 
            localStorage.setItem('clearSlider', false)

            this.btnLeft.classList.remove('deact')
            
            if (slideCount <= (this.firstIndex + this.set)) {
                this.btnRight.classList.add('deact')
            } else {
                //гортання на один слайд вправо (вперед до кінця)
                activeSlides[this.firstIndex].classList.remove('show') 
                this.firstIndex = this.firstIndex + 1 
                
                let lastIndex = this.firstIndex + this.set - 1
                activeSlides[lastIndex].classList.add('show')
            }
        })
    }

    init(){
        if(!!this.slides.length){
            this.handleSlider()
        } 
    }
}