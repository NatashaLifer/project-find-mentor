import CreateElement from "../utils/CreateElement.js";
import Api from "../utils/Api.js"

export default class Form {
  constructor(fields, findForm) {
  this.element = document.querySelector(findForm) || document.createElement('form')
  this.inputFields = fields || [];
  }

render(nameForm) {
  this.element.className = nameForm
  if (this.element.classList.contains('form-signin')) {
    this.element.classList.add('active')
  }
  this.inputFields.forEach((field) => {
    const input = new CreateElement('input', field)
    const fieldRender = input.render()
    this.element.append(fieldRender);
  });

  this.element.addEventListener("submit", this.onSave.bind(this));
  return this.element;
}


serialize() {
    const fieldsData = {};
    const formData = new FormData(this.element)
    
    for(let [name] of formData){
      fieldsData[name] = formData.get(name)
    }
    return fieldsData;
}

onSave(event) {
  event.preventDefault()
  const dataFields = this.serialize();
  return dataFields
}

}

export class FormLogin extends Form {
  constructor(fields, dataset) {
    super(fields)
    this.element.dataset.bodyelem = dataset
  }
  
  // render() {
  //   super.render()
  //   if (this.element.classList.contains('form-signin')) {
  //     this.element.classList.add('active')
  //   }
  // }

  onSave(event){
    const requestResult = super.onSave(event)
  
    const apiLogin = new Api('http://localhost:8080/api/auth/')

    if (this.element.classList.contains('form-signin') & this.element.classList.contains('active')) {
      const postRequest = apiLogin.postRequest('signin', requestResult);
  
      postRequest.then((userLog) => {
        if(userLog.message){
          const submitSignin = document.querySelector('.form-signin .btn-auth')
          const errorMessage = new CreateElement ('p', {className: 'error-message', textContent: userLog.message}).render()
          submitSignin.insertAdjacentElement('beforebegin', errorMessage)
        } else {
          const userData = {id: userLog.data._id, fullName: userLog.data.fullName}
                sessionStorage.setItem('userData', JSON.stringify(userData))
  
                const modalWrap = document.querySelector('.modal-wrapper')
                modalWrap.classList.add('deactiveted')
                
                const signinLink = document.querySelector('.nav__title-auth')
                signinLink.textContent = `${userLog.data.fullName}`
                signinLink.classList.add('deactiveted-profile')
              }
      })
    } else {
      const postRequest = apiLogin.postRequest('signup', requestResult)
      
      postRequest.then((userReg) => {
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
                
            const signinLink = document.querySelector('.nav__title-auth')
            signinLink.textContent = `${userReg.fullName}`
            signinLink.classList.add('deactiveted-profile')
        }
      }) 
    }
  }
}