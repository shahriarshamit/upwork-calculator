
window.onload = function () {
    document.getElementById('cal-vehicle-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-down-payment').addEventListener('change', formatNumberValue);
    document.getElementById('cal-trade-in-value').addEventListener('change', formatNumberValue);
    document.getElementById('cal-sales-tax').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-interest-rate').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-loan-term-value').addEventListener('change', formatMonthYearValue);
    document.getElementById('cal-loan-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-loan-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateCarLoan);
    document.getElementById('cal-accordion-heading').addEventListener('click', toggleDisclaimer);
}

function formatNumberValue(event) {
    var targetInput = event.target;
    if (targetInput.value !== '') {
        if (targetInput.classList && targetInput.classList.contains('is-invalid')) {
            targetInput.classList.remove('is-invalid');
        }
        calc_utilities.validate_input(targetInput, {
            showdollarsign: false,
            precision: 2
        });
    }
}

function formatPercentageValue(event) {
    var targetInput = event.target;
    if (targetInput.value !== '') {
        if (targetInput.classList && targetInput.classList.contains('is-invalid')) {
            targetInput.classList.remove('is-invalid');
        }
        calc_utilities.validate_input(targetInput, {
            showprecentagesign: true,
            minNum: 0.1,
            maxNum: 100.00,
            precision: 2
        });
    }
}

function formatMonthYearValue(event) {
    var targetInput = document.querySelector('[name="cal-loan-term-value"]');
    var checkedRadio = document.querySelector('[name="cal-loan-term-period"]:checked');
    if (targetInput.value !== '') {
        if (targetInput.classList && targetInput.classList.contains('is-invalid')) {
            targetInput.classList.remove('is-invalid');
        }
        if (checkedRadio.value === 'month') {
            targetInput.value = calc_utilities.sanitize_num(targetInput.value);
        } else if (checkedRadio.value === 'year') {
            targetInput.value = calc_utilities.sanitize_num(targetInput.value);
        }
    }
}

function calculateCarLoan() {
    var validateVehiclePrice = true;
    var validateDownPayment = true;
    var validateTradeInValue = true;
    var validateSalesTax = true;
    var validateInterestRate = true;
    var validateLoanTermValue = true;
    var inputVehiclePrice = document.getElementById('cal-vehicle-price');
    var inputDownPayment = document.getElementById('cal-down-payment');
    var inputTradeInValue = document.getElementById('cal-trade-in-value');
    var inputSalesTax = document.getElementById('cal-sales-tax');
    var inputInterestRate = document.getElementById('cal-interest-rate');
    var inputLoanTermValue = document.getElementById('cal-loan-term-value');
    var inputLoanTermPeriod = document.querySelector('[name="cal-loan-term-period"]:checked');
    var calculateResult = document.getElementById('cal-monthly-payment-value');
    if (inputVehiclePrice.value.trim() === '') {
        validateVehiclePrice = false;
        if (inputVehiclePrice.classList && !inputVehiclePrice.classList.contains('is-invalid')) {
            inputVehiclePrice.classList.add('is-invalid');
        }
    } else {
        validateVehiclePrice = true;
        if (inputVehiclePrice.classList && inputVehiclePrice.classList.contains('is-invalid')) {
            inputVehiclePrice.classList.remove('is-invalid');
        }
    }
    if (inputDownPayment.value.trim() === '') {
        validateDownPayment = false;
        if (inputDownPayment.classList && !inputDownPayment.classList.contains('is-invalid')) {
            inputDownPayment.classList.add('is-invalid');
        }
    } else {
        validateDownPayment = true;
        if (inputDownPayment.classList && inputDownPayment.classList.contains('is-invalid')) {
            inputDownPayment.classList.remove('is-invalid');
        }
    }
    if (inputTradeInValue.value.trim() === '') {
        validateTradeInValue = false;
        if (inputTradeInValue.classList && !inputTradeInValue.classList.contains('is-invalid')) {
            inputTradeInValue.classList.add('is-invalid');
        }
    } else {
        validateTradeInValue = true;
        if (inputTradeInValue.classList && inputTradeInValue.classList.contains('is-invalid')) {
            inputTradeInValue.classList.remove('is-invalid');
        }
    }
    if (inputSalesTax.value.trim() === '') {
        validateSalesTax = false;
        if (inputSalesTax.classList && !inputSalesTax.classList.contains('is-invalid')) {
            inputSalesTax.classList.add('is-invalid');
        }
    } else {
        validateSalesTax = true;
        if (inputSalesTax.classList && inputSalesTax.classList.contains('is-invalid')) {
            inputSalesTax.classList.remove('is-invalid');
        }
    }
    if (inputInterestRate.value.trim() === '') {
        validateInterestRate = false;
        if (inputInterestRate.classList && !inputInterestRate.classList.contains('is-invalid')) {
            inputInterestRate.classList.add('is-invalid');
        }
    } else {
        validateInterestRate = true;
        if (inputInterestRate.classList && inputInterestRate.classList.contains('is-invalid')) {
            inputInterestRate.classList.remove('is-invalid');
        }
    }
    if (inputLoanTermValue.value.trim() === '') {
        validateLoanTermValue = false;
        if (inputLoanTermValue.classList && !inputLoanTermValue.classList.contains('is-invalid')) {
            inputLoanTermValue.classList.add('is-invalid');
        }
    } else {
        validateLoanTermValue = true;
        if (inputLoanTermValue.classList && inputLoanTermValue.classList.contains('is-invalid')) {
            inputLoanTermValue.classList.remove('is-invalid');
        }
    }
    if (
        validateVehiclePrice === true &&
        validateDownPayment === true &&
        validateTradeInValue === true &&
        validateSalesTax === true &&
        validateInterestRate === true &&
        validateLoanTermValue === true
    ) {
        var finalValue = 0;
        var valueVehiclePrice = calc_utilities.sanitize_num(inputVehiclePrice.value.trim());
        var valueDownPayment = calc_utilities.sanitize_num(inputDownPayment.value.trim());
        var valueTradeInValue = calc_utilities.sanitize_num(inputTradeInValue.value.trim());
        var valueSalesTax = calc_utilities.format_pct2decimal(inputSalesTax.value.trim());
        var valueInterestRate = calc_utilities.format_pct2decimal(inputInterestRate.value.trim());
        var valueLoanTermValue = calc_utilities.sanitize_num(inputLoanTermValue.value.trim());
        var valueLoanTermPeriod = inputLoanTermPeriod.value.trim();
        if (valueLoanTermPeriod === 'month') {
            var firstPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue);
            var secondPart = ((valueVehiclePrice - valueTradeInValue) * valueSalesTax);
            var thirdPart = (valueInterestRate / 12);
            var combineOne = ((firstPart + secondPart) * thirdPart);

            var fourthPart = (1 + valueInterestRate / 12);
            var fifthPart = (-valueLoanTermValue * 1);
            var sixthPart = Math.pow(fourthPart, fifthPart);
            var combineTwo = (1 - sixthPart);

            finalValue = combineOne / combineTwo;
        } else if (valueLoanTermPeriod === 'year') {
            var firstPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue);
            var secondPart = ((valueVehiclePrice - valueTradeInValue) * valueSalesTax);
            var thirdPart = (valueInterestRate / 12);
            var combineOne = ((firstPart + secondPart) * thirdPart);

            var fourthPart = (1 + valueInterestRate / 12);
            var fifthPart = (-valueLoanTermValue * 12);
            var sixthPart = Math.pow(fourthPart, fifthPart);
            var combineTwo = (1 - sixthPart);

            finalValue = combineOne / combineTwo;
        }
        calculateResult.innerHTML = calc_utilities.format_currency(finalValue);
    }
}

function toggleDisclaimer(event) {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.padding = '0px';
    } else {
        panel.style.maxHeight = (panel.scrollHeight + 30) + "px";
        panel.style.padding = '15px 0px';
    }
}

var calc_utilities = {
    format_currency: function (num) {
        num = Math.round(num * 100) / 100;
        return num;
    },
    format_pct2decimal: function (num) {
        num = num.replace(/\%/, '');
        return num / 100;
    },
    filter_input: function (e, elem, options) {
        var inputvalue = elem.value;
        var combinedinput;
        var enteredChar;
        var maxNum;
        var minNum;
        var precision;
        var decimals;
        inputvalue = inputvalue.replace(/\$|,|\%/g, "");
        options = (typeof options !== 'undefined') ? options : {};
        maxNum = (typeof options.maxNum !== 'undefined') ? options.maxNum : null;
        minNum = (typeof options.minNum !== 'undefined') ? options.minNum : null;
        precision = (typeof options.precision !== 'undefined') ? options.precision : 2;
        if (typeof e === 'undefined' && window.event) {
            e = window.event;
        }
        if (e.keyCode === 13) {
            elem.blur();
        } else {
            enteredChar = this.getChar(e || window.event);
            if (!enteredChar) {
                return;
            }
            combinedinput = inputvalue + enteredChar;
            console.log(combinedinput);
            if (window.getSelection().toString() == inputvalue) {
                combinedinput = enteredChar;
            }
            decimals = combinedinput.toString().split('.');
            decimals = (typeof decimals[1] !== 'undefined') ? decimals[1] : '';
            if (isNaN(combinedinput)
                || (null != maxNum && combinedinput > maxNum)
                || (null != minNum && combinedinput < minNum)
                || (decimals.length > precision)) {
                e.preventDefault();
                return;
            }
        }
    },
    validate_input: function (elem, options) {
        var inputvalue = elem.value;
        inputvalue = inputvalue.replace(/\$|,|\%/g, "");
        if (typeof options.maxNum !== 'undefined' && parseInt(inputvalue) > options.maxNum) {
            elem.value = options.maxNum;
        }
        if (typeof options.minNum !== 'undefined' && parseInt(inputvalue) < options.minNum) {
            elem.value = options.minNum;
        }
        elem.value = this.process_input(elem.value, options);
    },
    process_input: function (num, options) {
        "use strict";
        var sign,
            decimals,
            dec_precision = 0,
            missingdecplaces = 0,
            retVal,
            n,
            i;
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
        var inputvalue = elem.value;
        inputvalue = inputvalue.replace(/\$|,|\%/g, "");
        inputvalue = parseInt(inputvalue);
        elem.value = this.sanitize_num(inputvalue);
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
