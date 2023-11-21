export default class Api {
    constructor(url) {
        this.ROOT_URL = url
    }
    async getRequest(routing) {
        const response = await fetch(this.ROOT_URL + routing, {
          method: 'GET',
          // headers: {
          // }
        })
        return await response.json();
    }
    async postRequest(routing, data = {}) {
        const response = await fetch((this.ROOT_URL + routing), {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
            // Autorization: `Bearer ${sessionStorage.getItem('token')}`
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

// export default function Api(baseURL) {
//     this.ROOT_URL = baseURL;
  
//     this.getRequest = async function (routing) {
//       const response = await fetch(this.ROOT_URL + routing, {
//         method: 'GET',
//         // headers: {
//         // }
//     })
//       return await response.json();
//     }; 
  
//     this.postRequest = async function(routing, data = {}) {
//       const response = await fetch((this.ROOT_URL + routing), {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-type': 'application/json',
//           // Autorization: `Bearer ${sessionStorage.getItem('token')}`
//         }
//       })
//       return await response.json()
//     }

//     this.putRequest = async function(routing, data = {}) {
//         const response = await fetch((this.ROOT_URL + routing), {
//           method: 'PUT',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-type': 'application/json',
//           }
//         })
//         return await response.json()
//     }
    
//     this.deleteRequest = async function(routing, data = {}) {
//         const response = await fetch((this.ROOT_URL + routing), {
//           method: 'DELETE',
//           body: JSON.stringify(data),
//           headers: {
//             'Content-type': 'application/json',
//           }
//         })
//         return await response.json()
//     }   
// }