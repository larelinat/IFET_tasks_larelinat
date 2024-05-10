import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

const decode = (element, translations) => {
    const decoded = {}
    Object.entries(element).forEach(([key, value]) => {
            if(key !== 'groupId' && key.toLowerCase().endsWith('id')){
                decoded[key] = translations[value];
            }
            else{
                decoded[key] = value;
            }
        }
    )
    return decoded
}

const findUnique = (arr) => {
    const uniqueIds = new Set();
    arr.forEach(element => {
        Object.entries(element).forEach(([key, value]) => {
            if(key !== 'groupId' && key.toLowerCase().endsWith('id') && value){
                uniqueIds.add(value);
            }
        })
    })
    return [...uniqueIds];
}

const decoded = encoded.map((element) => decode(element, translations));
const uniqueId = findUnique(encoded);
console.log(decoded)
console.log(uniqueId)
