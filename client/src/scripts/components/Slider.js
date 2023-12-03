export default class Slider {
    constructor(btnRight, btnLeft, slideItem, indexFirstElem, set) {
        this.btnRight = document.querySelector(btnRight)
        this.btnLeft = document.querySelector(btnLeft)
        // this.category = document.querySelectorAll('[data-bodyelem="business"]')
        // console.log(this.category);
        this.slides = Array.from(document.querySelectorAll(slideItem));
        // console.log(this.slides);
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
                let lastIndex = this.firstIndex + this.set - 1 // 4 (1+4-1)
                this.slides[lastIndex].classList.remove('active')
                
                this.firstIndex = this.firstIndex - 1 // 0 (1-1)
                this.slides[this.firstIndex].classList.add('active')
            }
        })
        
        this.btnRight.addEventListener('click', () => {
            this.btnLeft.classList.remove('deact')
            
            if (slideCount <= (this.firstIndex + this.set)) {
                this.btnRight.classList.add('deact')
            } else {
                //гортання на один слайд вправо (вперед до кінця)
                // console.log(this.slides);
                // console.log(this.firstIndex);
                this.slides[this.firstIndex].classList.remove('active') //0  1
                this.firstIndex = this.firstIndex + 1 // 1 (0+1)  2
                
                let lastIndex = this.firstIndex + this.set - 1// 4 (1+4-1)  5
                this.slides[lastIndex].classList.add('active')
            }
        })
    }
    init(){
        if(!!this.slides.length){
            this.handleSlider()
        }
    }
}

/*
* ************************ варіант В'ячеслава ******************************

constructor(btnRight, btnLeft, imgList) {
    this.btnRight = document.querySelector(btnRight)
    this.btnLeft = document.querySelector(btnLeft)
    this.imgList = document.querySelector(imgList)
    console.log(this.imgList.scrollWidth);
    console.log(this.imgList.clientWidth);
    this.maxScroll = this.imgList.scrollWidth - this.imgList.clientWidth

    this.init()
}
initSlider() {
    // попередній слайд:
    this.btnLeft.addEventListener('click', (ev) => {
        this.imgList.scrollBy({ left: this.imgList.clientWidth, behavior: 'smooth'})
    })
    // наступний слайд:
    this.btnRight.addEventListener('click', () => {
        const scrollAmount = -1 * this.imgList.clientWidth
        this.imgList.scrollBy({ left: scrollAmount, behavior: 'smooth'})
    })
}
handleSlideButtons() {
    this.btnLeft.style.display = this.imgList.scrollLeft <= 0 ? 'none' : 'block'
    this.btnRight.style.display = this.imgList.scrollLeft >= this.maxScroll ? 'none' : 'block'
}
init() {
    this.imgList.addEventListener('scroll', () => {
        this.handleSlideButtons()
    })
}
*/