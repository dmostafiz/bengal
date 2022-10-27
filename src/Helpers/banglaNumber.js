const banglaNumber = (number) =>{

    var finalEnglishToBanglaNumber = {
        0: "০",
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
     };

    
    String.prototype.convertBanglaNumber = function () {
        var retStr = this;
        for (var x in finalEnglishToBanglaNumber) {
           retStr = retStr.replace(
              new RegExp(x, "g"),
              finalEnglishToBanglaNumber[x]
           );
        }
        return retStr;
     }

    //  var stringNumber = number.toString()

    // alert(number)
    return number?.toString()?.convertBanglaNumber()

//    return stringNumber.convertBanglaNumber()
}

export default banglaNumber 
 
//  var english_number = "123456";
 
//  var bangla_converted_number = english_number.getDigitBanglaFromEnglish();
 
 //outputs : ১২৩৪৫৬
 
//  console.log(bangla_converted_number);