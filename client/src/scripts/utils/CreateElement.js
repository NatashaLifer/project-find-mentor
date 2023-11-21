export default class CreateElement {
    constructor(tagName, params) {
        this.tagName = tagName
        this.params = params
    }
    render() {
        const element = document.createElement(this.tagName)
        for (let key in this.params) {
            switch (key) {
                case 'dataset':
                    for (let dataKey in this.params[key]) {
                        element.dataset[dataKey] = this.params[key][dataKey]
                    }
                    break
                default:
                    element[key] = this.params[key]
            }
        }
        return element
    }
}

// export default function CreateElement(tagName, params) {
//     this.tagName = tagName // 'div'
//     this.params = params // {class:'wrapper', dataset:{id:1}}
// }

// CreateElement.prototype.render = function () {
//     const element = document.createElement(this.tagName)
//     for (let key in this.params) {
//         switch (key) {
//             case 'dataset':
//                 for (let dataKey in this.params[key]) {
//                     element.dataset[dataKey] = this.params[key][dataKey]
//                 }
//                 break
//             default:
//                 element[key] = this.params[key]
//         }
//     }
//     return element
// }