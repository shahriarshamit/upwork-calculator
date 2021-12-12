
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
            if (targetInput.value !== ''/* && inputElement.value === 0 && inputElement.value === 0.00*/) {
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
    if (inputElement.value !== ''/* && inputElement.value === 0 && inputElement.value === 0.00*/) {
        document.getElementById(inputPrefixId).innerHTML = '$';
    } else {
        document.getElementById(inputPrefixId).innerHTML = '';
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
        finalValue = String(calc_utilities.format_currency(finalValue));
        calculateResult.innerHTML = calc_utilities.validate_input(finalValue, {
            showdollarsign: false,
            precision: 2
        });
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
