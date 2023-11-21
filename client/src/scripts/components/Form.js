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

const apiLogin = new Api('https://dummyjson.com/auth/')
const postReq = await apiLogin.postRequest('login', dataFields)

sessionStorage.setItem('tkn', postReq.token)
}

Form.prototype.serialize = function () {
  const fieldsData = {};
  const formData = new FormData(this.element)
  
  for(let [name] of formData){
    fieldsData[name] = formData.get(name)
  }
  return fieldsData;
}
