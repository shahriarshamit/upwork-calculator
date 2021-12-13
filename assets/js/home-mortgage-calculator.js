
window.onload = function () {
    document.getElementById('cal-home-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-down-payment').addEventListener('change', formatNumberValue);
    document.getElementById('cal-loan-term-value').addEventListener('change', formatMonthYearValue);
    document.getElementById('cal-interest-rate').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-principal-interest').addEventListener('change', formatNumberValue);
    document.getElementById('cal-homeowner-insurance').addEventListener('change', formatNumberValue);
    document.getElementById('cal-property-tax').addEventListener('change', formatNumberValue);
    document.getElementById('cal-hoa-fees').addEventListener('change', formatNumberValue);

    document.getElementById('cal-loan-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-loan-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateHomeMortgage);
    document.getElementById('cal-accordion-heading').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-home-price').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-down-payment').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-principal-interest').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-homeowner-insurance').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-property-tax').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-hoa-fees').addEventListener('keyup', showDollarSign);
}

function formatNumberValue(event) {
    var targetInput = event.target;
    var inputPrefixId = null;
    if (targetInput.hasAttribute("data-prefix")) {
        inputPrefixId = targetInput.dataset.prefix;
    }
    if (targetInput.value !== '') {
        if (targetInput.classList && targetInput.classList.contains('is-invalid')) {
            targetInput.classList.remove('is-invalid');
        }
        targetInput.value = calc_utilities.validate_input(targetInput.value, {
            showdollarsign: false,
            precision: 2
        });
        if (inputPrefixId !== null) {
            if (targetInput.value !== '') {
                document.getElementById(inputPrefixId).innerHTML = '$';
            } else {
                document.getElementById(inputPrefixId).innerHTML = '';
            }
        }
    }
}

function formatPercentageValue(event) {
    var targetInput = event.target;
    if (targetInput.value !== '') {
        if (targetInput.classList && targetInput.classList.contains('is-invalid')) {
            targetInput.classList.remove('is-invalid');
        }
        targetInput.value = calc_utilities.validate_input(targetInput.value, {
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

function showDollarSign(event) {
    var inputElement = event.target;
    var inputPrefixId = inputElement.dataset.prefix;
    if (inputElement.value !== '') {
        document.getElementById(inputPrefixId).innerHTML = '$';
    } else {
        document.getElementById(inputPrefixId).innerHTML = '';
    }
}

function validateInputValue(inputText) {
    var validateInput = false;
    if (inputText.value.trim() === '') {
        validateInput = false;
        if (inputText.classList && !inputText.classList.contains('is-invalid')) {
            inputText.classList.add('is-invalid');
        }
    } else {
        validateInput = true;
        if (inputText.classList && inputText.classList.contains('is-invalid')) {
            inputText.classList.remove('is-invalid');
        }
    }
    return validateInput;
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

function calculateHomeMortgage() {
    var validateHomePrice = true;
    var validateDownPayment = true;
    var validateLoanTermValue = true;
    var validateInterestRate = true;
    var validateHomeownerInsurance = true;
    var validatePropertyTax = true;
    var validateHoaFees = true;

    var inputHomePrice = document.getElementById('cal-home-price');
    var inputDownPayment = document.getElementById('cal-down-payment');
    var inputLoanTermValue = document.getElementById('cal-loan-term-value');
    var inputLoanTermPeriod = document.querySelector('[name="cal-loan-term-period"]:checked');
    var inputInterestRate = document.getElementById('cal-interest-rate');
    var inputPrincipalInterest = document.getElementById('cal-principal-interest');
    var inputHomeownerInsurance = document.getElementById('cal-homeowner-insurance');
    var inputPropertyTax = document.getElementById('cal-property-tax');
    var inputHoaFees = document.getElementById('cal-hoa-fees');
    var calculateResult = document.getElementById('cal-monthly-payment-value');

    validateHomePrice = validateInputValue(inputHomePrice);
    validateDownPayment = validateInputValue(inputDownPayment);
    validateLoanTermValue = validateInputValue(inputLoanTermValue);
    validateInterestRate = validateInputValue(inputInterestRate);
    validateHomeownerInsurance = validateInputValue(inputHomeownerInsurance);
    validatePropertyTax = validateInputValue(inputPropertyTax);
    validateHoaFees = validateInputValue(inputHoaFees);

    if (
        validateHomePrice === true &&
        validateDownPayment === true &&
        validateLoanTermValue === true &&
        validateInterestRate === true &&
        validateHomeownerInsurance === true &&
        validatePropertyTax === true &&
        validateHoaFees === true
    ) {
        var finalValue = 0;
        var principalInterest = 0;
        var valueHomePrice = calc_utilities.sanitize_num(inputHomePrice.value.trim());
        var valueDownPayment = calc_utilities.sanitize_num(inputDownPayment.value.trim());
        var valueLoanTermValue = calc_utilities.sanitize_num(inputLoanTermValue.value.trim());
        var valueLoanTermPeriod = inputLoanTermPeriod.value.trim();
        var valueInterestRate = calc_utilities.format_pct2decimal(inputInterestRate.value.trim());
        var valueHomeownerInsurance = calc_utilities.sanitize_num(inputHomeownerInsurance.value.trim());
        var valuePropertyTax = calc_utilities.sanitize_num(inputPropertyTax.value.trim());
        var valueHoaFees = calc_utilities.sanitize_num(inputHoaFees.value.trim());

        if (valueLoanTermPeriod === 'month') {
            var firstPart = (valueHomePrice - valueDownPayment);
            var secondPart = (valueInterestRate / 12);
            var combineOne = firstPart * secondPart;

            var thirdPart = (1 + valueInterestRate / 12);
            var fourthPart = (-valueLoanTermValue * 1);
            var fifthPart = Math.pow(thirdPart, fourthPart);
            var combineTwo = (1 - fifthPart);

            principalInterest = parseFloat(combineOne / combineTwo);

            finalValue = parseFloat(principalInterest) + parseFloat(valueHomeownerInsurance) + parseFloat(valuePropertyTax) + parseFloat(valueHoaFees);
        } else if (valueLoanTermPeriod === 'year') {
            var firstPart = (valueHomePrice - valueDownPayment);
            var secondPart = (valueInterestRate / 12);
            var combineOne = firstPart * secondPart;

            var thirdPart = (1 + valueInterestRate / 12);
            var fourthPart = (-valueLoanTermValue * 12);
            var fifthPart = Math.pow(thirdPart, fourthPart);
            var combineTwo = (1 - fifthPart);

            principalInterest = parseFloat(combineOne / combineTwo);

            finalValue = parseFloat(principalInterest) + parseFloat(valueHomeownerInsurance) + parseFloat(valuePropertyTax) + parseFloat(valueHoaFees);
        }
        finalValue = String(calc_utilities.format_currency(finalValue));

        inputPrincipalInterest.value = principalInterest;
        inputPrincipalInterest.value = calc_utilities.validate_input(inputPrincipalInterest.value, {
            showdollarsign: false,
            precision: 2
        });
        var clickEvent = new Event('keyup');
        inputPrincipalInterest.dispatchEvent(clickEvent);
        calculateResult.innerHTML = calc_utilities.validate_input(finalValue, {
            showdollarsign: false,
            precision: 2
        });
    }
}
