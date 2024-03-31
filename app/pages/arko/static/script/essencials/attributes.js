// organize id

import { doc } from "../editing/ws.js";
import { convertHtmlElement } from "./convertHtml.js";
import workTree from "./htmlTree.js";

function idFactory(element) {
    element = convertHtmlElement.toObject(element)

    let ids = []
    let id = 0

    function deep(listOfElements) {
        console.log('elements list to id .. '
            , listOfElements)
        listOfElements.forEach(el => {

            if (el.tag === element.tag) {
                let regExp = new RegExp(`^${element.tag}(\\d+)$`)
                let idExp = el.attributes.id.match(regExp)
                
                console.log('element [el]..', el,
                '\nReg Expression [regExp]..', regExp,
                    '\nid encontrado [idExp]..', idExp)

                if (idExp) {
                    ids.push(new Number(idExp[1]))
                }
            }
            deep(el.childNodes || [])
        })
    }
    deep(workTree.tree)
    console.log('work tree state .. ', workTree.tree)

    ids = ids.sort((a, b) => a - b)

    for (let index = 0; index <= ids.length; index++) {
        if (ids?.find(value => value !== index))
            id = index;
    }

    console.log('ids ..', ids,
        '\nnew id .. ', id)

    if (id < 100)
        id = String(id).padStart(3, '0')

    element.attributes.id = `${element.tag}${id}`

    console.log('element id .. ',
        element.attributes.id, element)

    return convertHtmlElement.fromObject(element)
}

function standardClass(element) {
    element = convertHtmlElement.toObject(element)

    let classes = ''

    classes += ''

    element.attributes.class = classes

    return convertHtmlElement.fromObject(element)
}

export function elementFactory(tagName) {
    let element = doc.createElement(tagName)

    element = idFactory(element)
    element = standardClass(element)

    return element
}