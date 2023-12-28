import CreateElement from "../utils/CreateElement.js";

export default class Card{
    constructor(props){
        const { _id, category, imgUrl, title, description, rating, location, price } = props
        this.id = _id
        this.category = category
        this.image = imgUrl || 'https://i.pravatar.cc'
        // 'https://via.placeholder.com/150'
        this.title = title
        this.description = description
        this.rating = rating
        this.location = location
        this.price = price
    }

    render (container) {
        const wrapperItem = new CreateElement('div', {className: 'item', dataset:{id: this.id, bodyelem: this.category}}).render()

        const pic = new CreateElement ('picture', {className: 'item-pic'}).render()
        const img = new CreateElement ('img', {src: this.image, alt: 'photo', className: 'item-pic-photo'}).render()
        
        const title = new CreateElement ('h2', {textContent: this.title, className: 'item-mentor-name'}).render()
        
        const wrapRating = new CreateElement ('div', {className: 'item-rating'}).render()
        const starsBox = new CreateElement ('div', {className: 'item-rating-box'}).render()
        let starsWidth = this.rating*100/250
        const stars = new CreateElement ('div', {className: 'item-rating-stars', style: `width: ${starsWidth}%;`}).render()
        const ratingCount = new CreateElement ('div', {textContent: `(${this.rating})`, className: 'item-rating-count'}).render()
        // const ratingCount = new CreateElement ('div', {textContent: this.category, className: 'item-rating-count'}).render()
        
        const description = new CreateElement ('div', {textContent: this.description, className: 'item-stack'}).render()
        const location = new CreateElement ('div', {textContent: this.location, className: 'item-language-country'}).render()
        
        const btn = new CreateElement ('button', {className: 'item-booking'}).render()
        const btnLink = new CreateElement('a', {textContent: 'Book Time', className: 'item-booking-link', href: '#'}).render()
        const btnPrice = new CreateElement('span', {className: "item-booking-cost", textContent: `${this.price}$/ hours`}).render()
        
        pic.append(img)
        starsBox.append(stars)
        wrapRating.append(starsBox, ratingCount)
        btn.append(btnLink, btnPrice)
        wrapperItem.append(pic, title, wrapRating, description, location, btn)
        container.append(wrapperItem)
    }
} 
