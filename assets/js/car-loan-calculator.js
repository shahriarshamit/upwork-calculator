
window.onload = function () {
    /* Input Dollar Sign Animation */
    document.getElementById('cal-vehicle-price').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-down-payment').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-trade-in-value').addEventListener('keyup', showDollarSign);

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

    validateVehiclePrice = validateInputValue(inputVehiclePrice);
    validateDownPayment = validateInputValue(inputDownPayment);
    validateTradeInValue = validateInputValue(inputTradeInValue);
    validateSalesTax = validateInputValue(inputSalesTax);
    validateInterestRate = validateInputValue(inputInterestRate);
    validateLoanTermValue = validateInputValue(inputLoanTermValue);

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
        finalValue = String(calc_utilities.format_currency(finalValue));
        
        calculateResult.innerHTML = calc_utilities.validate_input(finalValue, {
            showdollarsign: false,
            precision: 2
        });
    }
}
