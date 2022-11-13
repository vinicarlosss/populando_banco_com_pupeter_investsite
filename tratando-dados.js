function tratarNumero(numero){
    let string = ''
    for(let i = 0; i<numero.length; i++){
        switch (numero[i]) {
            case 'M':

                string += numero[i]
                break
            
            case 'B':
                
                string += numero[i]
                break
            
            case 'm':

                string += numero[i]
                break
            
            case 'i':

                string += numero[i]
                break

            case 'l':

                string += numero[i]
                break
            case 'T':

                string += numero[i]
                break
            
            default:
                break
        }
    }
    numero = numero.replaceAll(' ', '')
    numero = numero.replaceAll('B', '')
    numero = numero.replaceAll('M', '')
    numero = numero.replaceAll('mil', '')
    numero = numero.replaceAll(',', '.')
    numero = parseFloat(numero)
    switch (string) {
        case 'mil':
            numero *= 1000
            break;
        
        case 'M':

            numero*= 1000000
            break

        case 'B':

            numero *= 1000000000
            break
        
        case 'T':
            numero *= 1000000000000
            break

        default:
            break;
    }
    return numero
}
module.exports = { tratarNumero }