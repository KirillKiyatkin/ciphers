class Cipher {
    constructor(firstLetter, lastLetter) {
        this.firstLetter = firstLetter.charCodeAt(0);
        this.lastLetter = lastLetter.charCodeAt(0);
    }

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

    VigenereEncryption(key, text) {
        let keys = '';
        let itog = '';
        while (keys.length <= text.length){
            keys += key;
        }
        text.split('').forEach((elem, index) => {
            if (/[.,!?\s]/.test(elem)) {
                keys = keys.slice(0, index) + " " + keys.slice(index);
                itog += ' '
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

    VigenereDecryption(key, text) {
        let keys = '';
        let itog = '';
        while (keys.length <= text.length){
            keys += key;
        }
        text.split('').forEach((elem, index) => {
            if (/[.,!?\s]/.test(elem)) {
                keys = keys.slice(0, index) + " " + keys.slice(index);
                itog += ' '
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

let cipher = new Cipher('а', 'я');
console.log(cipher.CaesarEncryption('съешь же еще этих мягких французских булок, да выпей чаю.', 'в'));
console.log(cipher.CaesarDecryption('фэиыя йи иьи ахлш пвжнлш чугрщцкфнлш дцосн, зг еютим ъгб.', 'в'));
console.log(cipher.VigenereEncryption("ЗАЩИТА", "ЗАШИФРОВАТЬ СТРОКУ МЕТОДОМ ВИЖЕНЕРА"));
console.log(cipher.VigenereDecryption("ЗАЩИТА", "оасржрхвщъо сщрзте ммтзмам йияняеча"));


//https://planetcalc.com/embed/?id=0F9BLe4qg6VXBVfrzT-76yjijelK2pwKYIVORBiHeXOtElZxWpxxLNHGTGRnftISSRsxG6mEMjnOybjq8p-9Wl6cR5_YpcXA&language_select=ru

