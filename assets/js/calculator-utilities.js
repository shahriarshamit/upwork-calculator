
var calc_utilities = {
    format_currency: function (num) {
        num = Math.round(num * 100) / 100;
        return num;
    },

    format_pct2decimal: function (num) {
        num = num.replace(/\%/, '');
        return num / 100;
    },

    validate_input: function (elem, options) {
        var inputvalue = elem.trim();
        inputvalue = inputvalue.replace(/\$|,|\%/g, "");
        if (typeof options.maxNum !== 'undefined' && parseInt(inputvalue) > options.maxNum) {
            inputvalue = options.maxNum;
        }
        if (typeof options.minNum !== 'undefined' && parseInt(inputvalue) < options.minNum) {
            inputvalue = options.minNum;
        }
        return this.process_input(inputvalue, options);
    },

    process_input: function (num, options) {
        "use strict";
        var sign, decimals, dec_precision = 0, missingdecplaces = 0, retVal, n, i;
        var num = num.toString().replace(/\$|\,|\%/g, '');
        options = (typeof options !== 'undefined') ? options : {};
        dec_precision = (typeof options.precision !== 'undefined') ? options.precision : dec_precision;
        if (isNaN(num)) {
            num = "0.00";
        }
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * Math.pow(10, dec_precision) + 0.50000000001);
        decimals = num % Math.pow(10, dec_precision);
        decimals = (decimals == '0') ? "" : decimals;
        num = Math.floor(num / Math.pow(10, dec_precision)).toString();
        missingdecplaces = (dec_precision - decimals.toString().length);
        for (n = 0; n < missingdecplaces; n++) {
            decimals = "0" + decimals;
        }
        for (i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        }
        retVal = num;
        if (typeof options.showdollarsign !== 'undefined' && true === options.showdollarsign) {
            retVal = '$' + retVal;
        }
        retVal = (((sign) ? '' : '-') + retVal + ((decimals > 0 || dec_precision > 0) ? '.' + decimals : ''));
        if (typeof options.showprecentagesign !== 'undefined' && true === options.showprecentagesign) {
            retVal = retVal + '%';
        }
        return retVal;
    },

    check_term: function (elem) {
        var inputvalue = elem.trim();
        inputvalue = inputvalue.replace(/\$|,|\%/g, "");
        inputvalue = parseInt(inputvalue);
        return this.sanitize_num(inputvalue);
    },

    sanitize_num: function (num) {
        "use strict";
        num = num.toString().replace(/\$|\,|\%/g, '');
        if (isNaN(num)) {
            num = 0;
        }
        return num;
    },
    
    getChar: function (event) {
        if (event.which === null) {
            return String.fromCharCode(event.keyCode);
        } else if (event.which !== 0 && event.charCode !== 0) {
            return String.fromCharCode(event.which);
        } else {
            return null;
        }
    }
};
