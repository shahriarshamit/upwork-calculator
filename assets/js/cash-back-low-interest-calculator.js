
window.onload = function () {
    document.getElementById('cal-vehicle-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-down-payment').addEventListener('change', formatNumberValue);
    document.getElementById('cal-trade-in-value').addEventListener('change', formatNumberValue);
    document.getElementById('cal-rebate').addEventListener('change', formatNumberValue);
    document.getElementById('cal-sales-tax').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-cashback-interest-rate').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-reduced-interest-rate').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-loan-term-value').addEventListener('change', formatMonthYearValue);

    document.getElementById('cal-loan-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-loan-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateCashBackLowInterestCarLoan);
    document.getElementById('cal-accordion-btn').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-vehicle-price').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-down-payment').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-trade-in-value').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-rebate').addEventListener('keyup', showDollarSign);
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
    let expanded = this.getAttribute('aria-expanded');
    if (expanded == "false") {
        expanded = "true";
    } else {
        expanded = "false";
    }
    this.setAttribute('aria-expanded', expanded);
    var panel = this.parentNode.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.padding = '0px';
    } else {
        panel.style.maxHeight = (panel.scrollHeight + 30) + "px";
        panel.style.padding = '15px 0px';
    }
}

function calculateCashBackLowInterestCarLoan() {
    var validateVehiclePrice = true;
    var validateDownPayment = true;
    var validateTradeInValue = true;
    var validateSalesTax = true;
    var validateRebate = true;
    var validateCashbackInterestRate = true;
    var validateReducedInterestRate = true;
    var validateLoanTermValue = true;

    var inputVehiclePrice = document.getElementById('cal-vehicle-price');
    var inputDownPayment = document.getElementById('cal-down-payment');
    var inputTradeInValue = document.getElementById('cal-trade-in-value');
    var inputSalesTax = document.getElementById('cal-sales-tax');
    var inputRebate = document.getElementById('cal-rebate');
    var inputCashbackInterestRate = document.getElementById('cal-cashback-interest-rate');
    var inputReducedInterestRate = document.getElementById('cal-reduced-interest-rate');
    var inputLoanTermValue = document.getElementById('cal-loan-term-value');
    var inputLoanTermPeriod = document.querySelector('[name="cal-loan-term-period"]:checked');
    var calculateCashbackMonthlyResult = document.getElementById('cal-cashback-monthly-payment-value');
    var calculateCashbackTotalResult = document.getElementById('cal-cashback-total-cost-value');
    var calculateLowInterestMonthlyResult = document.getElementById('cal-low-interest-monthly-payment-value');
    var calculateLowInterestTotalResult = document.getElementById('cal-low-interest-total-cost-value');

    validateVehiclePrice = validateInputValue(inputVehiclePrice);
    validateDownPayment = validateInputValue(inputDownPayment);
    validateTradeInValue = validateInputValue(inputTradeInValue);
    validateSalesTax = validateInputValue(inputSalesTax);
    validateRebate = validateInputValue(inputRebate);
    validateCashbackInterestRate = validateInputValue(inputCashbackInterestRate);
    validateReducedInterestRate = validateInputValue(inputReducedInterestRate);
    validateLoanTermValue = validateInputValue(inputLoanTermValue);

    if (
        validateVehiclePrice === true &&
        validateDownPayment === true &&
        validateTradeInValue === true &&
        validateSalesTax === true &&
        validateRebate === true &&
        validateCashbackInterestRate === true &&
        validateReducedInterestRate === true &&
        validateLoanTermValue === true
    ) {
        var finalValueOne = 0;
        var finalValueTwo = 0;
        var finalValueThree = 0;
        var finalValueFour = 0;

        var valueVehiclePrice = calc_utilities.sanitize_num(inputVehiclePrice.value.trim());
        var valueDownPayment = calc_utilities.sanitize_num(inputDownPayment.value.trim());
        var valueTradeInValue = calc_utilities.sanitize_num(inputTradeInValue.value.trim());
        var valueSalesTax = calc_utilities.format_pct2decimal(inputSalesTax.value.trim());
        var valueRebate = calc_utilities.sanitize_num(inputRebate.value.trim());
        var valueCashbackInterestRate = calc_utilities.format_pct2decimal(inputCashbackInterestRate.value.trim());
        var valueReducedInterestRate = calc_utilities.format_pct2decimal(inputReducedInterestRate.value.trim());
        var valueLoanTermValue = calc_utilities.sanitize_num(inputLoanTermValue.value.trim());
        var valueLoanTermPeriod = inputLoanTermPeriod.value.trim();

        if (valueLoanTermPeriod === 'month') {
            var firstPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue - valueRebate);
            var secondPart = ((valueVehiclePrice - valueTradeInValue - valueRebate) * valueSalesTax);
            var thirdPart = (valueCashbackInterestRate / 12);
            var combineOne = ((firstPart + secondPart) * thirdPart);

            var fourthPart = (1 + valueCashbackInterestRate / 12);
            var fifthPart = (-valueLoanTermValue * 1);
            var sixthPart = Math.pow(fourthPart, fifthPart);
            var combineTwo = (1 - sixthPart);

            var finalValueOne = combineOne / combineTwo;
            var finalValueTwo = parseFloat(finalValueOne) * parseFloat(valueLoanTermValue) + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);

            var seventhPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue);
            var eigthPart = ((valueVehiclePrice - valueTradeInValue) * valueSalesTax);
            var ninthPart = (valueReducedInterestRate / 12);
            var combineThree = ((seventhPart + eigthPart) * ninthPart);

            var tenthPart = (1 + valueReducedInterestRate / 12);
            var eleventhPart = (-valueLoanTermValue * 1);
            var twelvethPart = Math.pow(tenthPart, eleventhPart);
            var combineFour = (1 - twelvethPart);

            var finalValueThree = combineThree / combineFour;
            var finalValueFour = parseFloat(finalValueThree) * parseFloat(valueLoanTermValue) + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);
        } else if (valueLoanTermPeriod === 'year') {
            var firstPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue - valueRebate);
            var secondPart = ((valueVehiclePrice - valueTradeInValue - valueRebate) * valueSalesTax);
            var thirdPart = (valueCashbackInterestRate / 12);
            var combineOne = ((firstPart + secondPart) * thirdPart);

            var fourthPart = (1 + valueCashbackInterestRate / 12);
            var fifthPart = (-valueLoanTermValue * 12);
            var sixthPart = Math.pow(fourthPart, fifthPart);
            var combineTwo = (1 - sixthPart);

            var finalValueOne = combineOne / combineTwo;
            var finalValueTwo = parseFloat(finalValueOne) * parseFloat(valueLoanTermValue) * 12 + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);

            var seventhPart = (valueVehiclePrice - valueDownPayment - valueTradeInValue);
            var eigthPart = ((valueVehiclePrice - valueTradeInValue) * valueSalesTax);
            var ninthPart = (valueReducedInterestRate / 12);
            var combineThree = ((seventhPart + eigthPart) * ninthPart);

            var tenthPart = (1 + valueReducedInterestRate / 12);
            var eleventhPart = (-valueLoanTermValue * 12);
            var twelvethPart = Math.pow(tenthPart, eleventhPart);
            var combineFour = (1 - twelvethPart);

            var finalValueThree = combineThree / combineFour;
            var finalValueFour = parseFloat(finalValueThree) * parseFloat(valueLoanTermValue) * 12 + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);
        }

        finalValueOne = String(calc_utilities.format_currency(finalValueOne));
        calculateCashbackMonthlyResult.innerHTML = calc_utilities.validate_input(finalValueOne, {
            showdollarsign: false,
            precision: 2
        });
        finalValueTwo = String(calc_utilities.format_currency(finalValueTwo));
        calculateCashbackTotalResult.innerHTML = calc_utilities.validate_input(finalValueTwo, {
            showdollarsign: false,
            precision: 2
        });
        finalValueThree = String(calc_utilities.format_currency(finalValueThree));
        calculateLowInterestMonthlyResult.innerHTML = calc_utilities.validate_input(finalValueThree, {
            showdollarsign: false,
            precision: 2
        });
        finalValueFour = String(calc_utilities.format_currency(finalValueFour));
        calculateLowInterestTotalResult.innerHTML = calc_utilities.validate_input(finalValueFour, {
            showdollarsign: false,
            precision: 2
        });
    }
}
