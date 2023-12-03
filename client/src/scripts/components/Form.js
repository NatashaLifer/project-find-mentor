import CreateElement from "../utils/CreateElement.js";
import Api from "../utils/Api.js"

export default function Form(fields, dataset) {
  this.element = document.createElement('form')
  this.element.dataset.bodyelem = dataset
  this.inputFields = fields;
}

Form.prototype.render = function (nameForm) {
  this.element.className = nameForm
  if (this.element.className === 'form-signin') {
    this.element.classList.add('active')
  }

  this.inputFields.forEach((field) => {
    const input = new CreateElement('input', field)
    const fieldRender = input.render()
    this.element.append(fieldRender);
  });

  this.element.addEventListener("submit", this.onSave.bind(this));
  return this.element;
};
    
Form.prototype.onSave = async function (event) {
event.preventDefault()
const dataFields = this.serialize();
console.log(dataFields);

const apiLogin = new Api('http://localhost:8080/api/auth/')
// console.log(apiLogin);
  if (this.element.className === 'form-signin active') {
    const postReq = await apiLogin.postRequest('signin', dataFields)
    // console.log(postReq);
    
    if(postReq.message){
      const submitSignin = document.querySelector('.form-signin .btn-auth')
      const errorMessage = new CreateElement ('p', {className: 'error-message', textContent: postReq.message}).render()
      submitSignin.insertAdjacentElement('beforebegin', errorMessage)
    } else {
      const userData = {id: postReq.data._id, fullName: postReq.data.fullName}
      sessionStorage.setItem('userData', JSON.stringify(userData))
      // console.log(postReq.data._id);
      const modalWrap = document.querySelector('.modal-wrapper')
      modalWrap.classList.add('deactiveted')
      
      const signinLink = document.querySelector('.nav__title-auth')
      signinLink.textContent = `${postReq.data.fullName}`
      signinLink.classList.add('deactiveted-profile')
    }
  } else {
    const postReqRegistr = await apiLogin.postRequest('signup', dataFields)
    console.log(postReqRegistr);
    if(postReqRegistr.statusText === "Такой email уже существует"){
      const submitSignup = document.querySelector('.form-signup .btn-auth')
      const errorMessageSignup = new CreateElement ('p', {className: 'error-message', textContent: postReqRegistr.statusText}).render()
      submitSignup.insertAdjacentElement('beforebegin', errorMessageSignup)
    } else 
      if (postReqRegistr.statusText === "Thanks for registering.") {
      const userData = {email: postReqRegistr.email, fullName: postReqRegistr.fullName}
      sessionStorage.setItem('userData', JSON.stringify(userData))
        
      const modalWrap = document.querySelector('.modal-wrapper')
      modalWrap.classList.add('deactiveted')
        
      const popup = document.querySelector('.popup')
      const popupText = new CreateElement ('p', {className: 'popup-text', textContent: postReqRegistr.statusText}).render()
      popup.append(popupText)
      
      const signinLink = document.querySelector('.nav__title-auth')
      signinLink.textContent = `${postReqRegistr.fullName}`
      signinLink.classList.add('deactiveted-profile')
    }
  }
}


Form.prototype.serialize = function () {
  const fieldsData = {};
  const formData = new FormData(this.element)
  
  for(let [name] of formData){
    fieldsData[name] = formData.get(name)
  }
  return fieldsData;
}
