import CreateElement from "../../utils/CreateElement.js";
import Api from "../../utils/Api.js"

export const formAuthApi = new Api('http://localhost:8080/api/auth/')

export default class Form {
constructor(fields, form) {
  this.element = document.querySelector(form) || document.createElement('form')
  this.inputFields = fields || [];
}

render(nameForm) {
  this.element.className = nameForm
  if (this.element.classList.contains('form-signin')) {
    this.element.classList.add('active')
  }  
  if(this.inputFields){
    this.inputFields.forEach((field) => {
      const input = new CreateElement('input', field)
      const fieldRender = input.render()
      this.element.append(fieldRender);
    });
  }
  this.element.addEventListener("submit", this.onSave.bind(this));
  return this.element;
}

handleForm(){
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
  event.target.reset()
  return dataFields
}

}

