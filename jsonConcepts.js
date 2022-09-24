// STRING
const texto = '{name: "eduardo"}';
// JSON STRING
const textoJson = '{"name": "eduardo"}';
// JSON OBJECT
const objetoJson = {name: "Eduardo"};
// MAP
const mapa = {"name": "Eduardo"};

// METODO JSON STRING TO JSON OBJECT (deserealización)
let objetoJ = JSON.parse(textoJson);
// METODO JSON OBJECT TO JSON STRING (serialización)
const textoJ = JSON.stringify(objetoJson);


console.log(textoJ);

// 2 concepts pending... re.json() / json text file
