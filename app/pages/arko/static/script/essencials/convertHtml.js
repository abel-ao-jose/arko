import { doc } from "../editing/ws.js"

function elementToObject(element) {
    if (element.nodeType === Node.TEXT_NODE)
        return { textNode: element.textContent }
    else if ((element.nodeType !== Node.ELEMENT_NODE))
        return

    let structure = {
        tag: element.tagName.toLowerCase(),
        attributes: {},
        childNodes: []
    }

    Array.from(element.attributes).forEach(attribute => {
        structure.attributes[attribute.name] = attribute.value
    })

    Array.from(element.childNodes).forEach(childNode => {
        structure.childNodes.push(elementToObject(childNode))
    })

    return structure
}

function objToElement(object) {
    if (object.hasOwnProperty('textNode'))
        return doc.createTextNode(object.textNode)

    let element = doc.createElement(object.tag)

    Object.keys(object.attributes).forEach(key => {
        console.log('setting atribute ', key
        ,'\nvalue ', object.attributes[key])
        element.setAttribute(key, object.attributes[key])
    })

    object.childNodes.forEach(child => {
        console.log('add child', child)
        element.appendChild(objToElement(child))
    })

    return element
}

export let convertHtmlElement = {
    /* convert html to string */

    toStr: function (element) {
        return JSON.stringify(elementToObject(element))
    },

    /* convert html to object */

    toObject: elementToObject,

    /* convert html from object */

    fromObject: objToElement,

    /* convert html from string */

    fromStr: function (str) {
        return objToElement(JSON.parse(str))
    },
}
