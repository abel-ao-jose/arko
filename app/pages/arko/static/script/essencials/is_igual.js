export function isEqualObjects(object1, object2) {

    let isEqual = true
    if (typeof object1 !== 'object'
        || typeof object2 !== 'object')
        return false

    for(let key of Object.keys(object1)) {
        if (!object2.hasOwnProperty(key)
            || !isEqualValues(object1[key], object2[key]))
            {isEqual = false; break}
    }
    console.log('comparantion of objects\n'
        , object1, '\n'
        , object2, '\n'
        , 'is .. ', isEqual, '\n\n')
    return isEqual
}

function isEqualValues(value1, value2) {
    let isEqual
    if (typeof value1 === 'object'
        || typeof value2 === 'object')
        isEqual = isEqualObjects(value1, value2)
    else
        isEqual = value1 === value2

    console.log('comparantion of values\n'
        , value1, '\n'
        , value2, '\n'
        , 'is .. ', isEqual, '\n\n')
    return isEqual
}