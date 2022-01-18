
window.onload = function () {
    document.getElementById('cal-present-value').addEventListener('change', formatNumberValue);
    document.getElementById('cal-rate-of-return').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-investment-term-value').addEventListener('change', formatMonthYearValue);

    document.getElementById('cal-investment-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-investment-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateinvestmentWorth);
    document.getElementById('cal-accordion-heading').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-present-value').addEventListener('keyup', showDollarSign);
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
    var targetInput = document.querySelector('[name="cal-investment-term-value"]');
    var checkedRadio = document.querySelector('[name="cal-investment-term-period"]:checked');
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

function calculateinvestmentWorth() {
    var validatePresentValue = true;
    var validateRateOfReturn = true;
    var validateinvestmentTermValue = true;

    var inputPresentValue = document.getElementById('cal-present-value');
    var inputRateOfReturn = document.getElementById('cal-rate-of-return');
    var inputinvestmentTermValue = document.getElementById('cal-investment-term-value');
    var inputinvestmentTermPeriod = document.querySelector('[name="cal-investment-term-period"]:checked');
    var calculateResult = document.getElementById('cal-monthly-payment-value');

    validatePresentValue = validateInputValue(inputPresentValue);
    validateRateOfReturn = validateInputValue(inputRateOfReturn);
    validateinvestmentTermValue = validateInputValue(inputinvestmentTermValue);

    if (
        validatePresentValue === true &&
        validateRateOfReturn === true &&
        validateinvestmentTermValue === true
    ) {
        var finalValue = 0;
        var valuePresentValue = calc_utilities.sanitize_num(inputPresentValue.value.trim());
        var valueRateOfReturn = calc_utilities.format_pct2decimal(inputRateOfReturn.value.trim());
        var valueinvestmentTermValue = calc_utilities.sanitize_num(inputinvestmentTermValue.value.trim());
        var valueinvestmentTermPeriod = inputinvestmentTermPeriod.value.trim();
        
        if (valueinvestmentTermPeriod === 'month') {
            var firstPart = 1 + valueRateOfReturn;
            var secondPart = valueinvestmentTermValue / 12;
            var thirdPart = Math.pow(firstPart, secondPart);
            var finalValue = valuePresentValue * thirdPart;
        } else if (valueinvestmentTermPeriod === 'year') {
            var firstPart = 1 + valueRateOfReturn;
            var secondPart = valueinvestmentTermValue;
            var thirdPart = Math.pow(firstPart, secondPart);
            var finalValue = valuePresentValue * thirdPart;
        }
        finalValue = String(calc_utilities.format_currency(finalValue));
        calculateResult.innerHTML = calc_utilities.validate_input(finalValue, {
            showdollarsign: false,
            precision: 2
        });
    }
}
