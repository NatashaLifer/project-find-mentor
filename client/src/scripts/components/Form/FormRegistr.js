import Form, {formAuthApi} from "./Form.js"
import CreateElement from "../../utils/CreateElement.js"

export default class FormRegistr extends Form {
    constructor(fields, dataset) {
      super(fields)
      
      this.element.dataset.bodyelem = dataset
    }
  
    async onSave(event){
      const requestResult = super.onSave(event)
  
      if (this.element.classList.contains('form-signup') & this.element.classList.contains('active')) {
      const userReg = await formAuthApi.postRequest('signup', requestResult)
    
    // (userReg) => {
      if(userReg.statusText === "Такий email вже існує"){
        const submitSignup = document.querySelector('.form-signup .btn-auth')
        const errorMessageSignup = new CreateElement ('p', {className: 'error-message', textContent: userReg.statusText}).render()
        submitSignup.insertAdjacentElement('beforebegin', errorMessageSignup)
      } else 
        if (userReg.statusText === "Thanks for registering.") {
          const userData = {email: userReg.email, fullName: userReg.fullName}
          sessionStorage.setItem('userData', JSON.stringify(userData))
                
          const modalWrap = document.querySelector('.modal-wrapper')
          modalWrap.classList.add('deactiveted')
                
          const popup = document.querySelector('.popup')
          const popupText = new CreateElement ('p', {className: 'popup-text', textContent: userReg.statusText}).render()
          popup.append(popupText)
              
          const signinLink = document.querySelector('.nav__item-auth')
          signinLink.textContent = `${userReg.fullName}`
          signinLink.classList.add('deactiveted-profile')
      }
    } 
  }
}
