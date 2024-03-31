/* ws - WorkSpace */

let iframe = document.querySelector('iframe')

let wsDocument =
    iframe.contentWindow.document || iframe.contentDocument

export {wsDocument as doc}