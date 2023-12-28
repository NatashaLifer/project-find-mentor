export default class Api {
  constructor(url) {
    this.ROOT_URL = url
  }
  async getRequest(routing) {
    const response = await fetch(this.ROOT_URL + routing, {
      method: 'GET',
    })
    return await response.json();
  }
  async postRequest(routing, data = {}) {
    const response = await fetch((this.ROOT_URL + routing), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        // Autorization: `Bearer ${sessionStorage.getItem('tkn')}`
      }
    })
    return await response.json()
  }
  async putRequest(routing, data = {}) {
    const response = await fetch((this.ROOT_URL + routing), {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    })
    return await response.json()
  }
  async deleteRequest(routing, data = {}) {
    const response = await fetch((this.ROOT_URL + routing), {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    })
    return await response.json()
  }   
}