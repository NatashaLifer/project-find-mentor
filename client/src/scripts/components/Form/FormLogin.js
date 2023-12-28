import Form, {formAuthApi} from "./Form.js"
import CreateElement from "../../utils/CreateElement.js"

export default class FormLogin extends Form {
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
  
    async onSave(event){
      const requestResult = super.onSave(event)
      // console.log(requestResult);
  
      if (this.element.classList.contains('form-signin') & this.element.classList.contains('active')) {
        const userLog = await formAuthApi.postRequest('signin', requestResult);
        
        // postRequest.then((userLog) => {
          if(userLog.message){
            const submitSignin = document.querySelector('.form-signin .btn-auth')
            const errorMessage = new CreateElement ('p', {className: 'error-message', textContent: userLog.message}).render()
            submitSignin.insertAdjacentElement('beforebegin', errorMessage)
          } else {
            const userData = {id: userLog.data._id, fullName: userLog.data.fullName}
                  sessionStorage.setItem('userData', JSON.stringify(userData))
    
                  const modalWrap = document.querySelector('.modal-wrapper')
                  modalWrap.classList.add('deactiveted')
                  
                  const signinLink = document.querySelector('.nav__item-auth')
                  signinLink.textContent = `${userLog.data.fullName}`
                  signinLink.classList.add('deactiveted-profile')
                }
        // })
      } 
      
    }
  }