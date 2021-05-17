class Cipher {
    constructor(firstLetter, lastLetter) {
        this.firstLetter = firstLetter.charCodeAt(0);
        this.lastLetter = lastLetter.charCodeAt(0);
    }

    //функция шифрования шифром Цезаря
    CaesarEncryption(stroke, letter){
        return stroke.split('').reduce((acc, elem) => {
            let a = elem.charCodeAt(0) + (letter.charCodeAt(0) - this.firstLetter + 1);
            if (/[.,!?\s]/.test(elem)){
                return acc += elem
            } else if (a > this.lastLetter) {
                a = this.firstLetter + (a - this.lastLetter - 1)
                return acc += String.fromCharCode(a)
            } else {
                return acc += String.fromCharCode(a)
            }
        },'');
    }

    //функция расшифрования шифра Цезаря
    CaesarDecryption(stroke, letter){
        return stroke.split('').reduce((acc, elem) => {
            let a = elem.charCodeAt(0) - (letter.charCodeAt(0) - this.firstLetter + 1);
            if (/[.,!?\s]/.test(elem)){
                return acc += elem
            } else if (a < this.firstLetter) {
                a = this.lastLetter - (this.firstLetter - a - 1)
                return acc += String.fromCharCode(a)
            } else {
                return acc += String.fromCharCode(a)
            }
        },'');
    }

    //функция шифрования методом Виженера
    VigenereEncryption(key, text) {
        let keys = '';
        let itog = '';
        while (keys.length <= text.length){
            keys += key;
        }
        text.split('').forEach((elem, index) => {
            if (/[.,!?\s]/.test(elem)) {
                keys = keys.slice(0, index) + " " + keys.slice(index);
                itog += elem
            } else {
                let a = elem.charCodeAt(0) + keys.charCodeAt(index)
                if (a > this.lastLetter){
                    a -= Math.floor(a/(this.lastLetter - this.firstLetter + 1)) * (this.lastLetter - this.firstLetter + 1);
                    itog += String.fromCharCode(a + this.firstLetter);
                } else {
                    itog += String.fromCharCode(a);
                }
            }
        })
        return itog;
    }

    //функция расшифрования шифра Виженера
    VigenereDecryption(key, text) {
        text = text.toLowerCase();
        let keys = '';
        let itog = '';
        while (keys.length <= text.length){
            keys += key;
        }
        text.split('').forEach((elem, index) => {
            if (/[.,!?\s]/.test(elem)) {
                keys = keys.slice(0, index) + " " + keys.slice(index);
                itog += elem
            } else {
                let a = elem.charCodeAt(0) - keys.charCodeAt(index)
                if (a < this.firstLetter){
                    a -= Math.floor(Math.abs(a/(this.lastLetter - this.firstLetter + 1))) * (this.lastLetter - this.firstLetter + 1);
                    itog += String.fromCharCode(Math.abs(a) + this.firstLetter);
                } else {
                    itog += String.fromCharCode(a);
                }
            }
        })
        return itog;
    }
}

let cipher = new Cipher('А', 'Я');
console.log('\t')
console.log('Шифр Цезаря с ключом 3')
console.log(`Зашифрованная строка: ${cipher.CaesarEncryption('СЪЕШЬ ЖЕ ЕЩЕ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЧАЮ.', 'В')}`);
console.log(`Расшифрованная строка: ${cipher.CaesarDecryption('ФЭИЫЯ ЙИ ИЬИ АХЛШ ПВЖНЛШ ЧУГРЩЦКФНЛШ ДЦОСН, ЗГ ЕЮТИМ ЪГБ.', 'В')}`);
console.log('\t')
console.log('Шифр Виженера с ключевым словом ЗАЩИТА:')
console.log(`Зашифрованная строка: ${cipher.VigenereEncryption("ЗАЩИТА", "ЗАШИФРОВАТЬ СТРОКУ МЕТОДОМ ВИЖЕНЕРА")}`);
console.log(`Расшифрованная строка: ${cipher.VigenereDecryption("ЗАЩИТА", "ОАСРЖРХВЩЪО СЩРЗТЕ ММТЗМАМ ЙИЯНЯЕЧА")}`);


//https://planetcalc.com/embed/?id=0F9BLe4qg6VXBVfrzT-76yjijelK2pwKYIVORBiHeXOtElZxWpxxLNHGTGRnftISSRsxG6mEMjnOybjq8p-9Wl6cR5_YpcXA&language_select=ru

