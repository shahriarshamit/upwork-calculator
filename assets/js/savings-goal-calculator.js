
window.onload = function () {
    document.getElementById('cal-savings-goal').addEventListener('change', formatNumberValue);
    document.getElementById('cal-rate-of-return').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-savings-term-value').addEventListener('change', formatMonthYearValue);

    document.getElementById('cal-savings-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-savings-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateSavingsGoal);
    document.getElementById('cal-accordion-heading').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-savings-goal').addEventListener('keyup', showDollarSign);
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
    var targetInput = document.querySelector('[name="cal-savings-term-value"]');
    var checkedRadio = document.querySelector('[name="cal-savings-term-period"]:checked');
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

function calculateSavingsGoal() {
    var validateSavingsGoal = true;
    var validateRateOfReturn = true;
    var validateSavingsTermValue = true;

    var inputSavingsGoal = document.getElementById('cal-savings-goal');
    var inputRateOfReturn = document.getElementById('cal-rate-of-return');
    var inputSavingsTermValue = document.getElementById('cal-savings-term-value');
    var inputSavingsTermPeriod = document.querySelector('[name="cal-savings-term-period"]:checked');
    var calculateResult = document.getElementById('cal-monthly-payment-value');

    validateSavingsGoal = validateInputValue(inputSavingsGoal);
    validateRateOfReturn = validateInputValue(inputRateOfReturn);
    validateSavingsTermValue = validateInputValue(inputSavingsTermValue);

    if (
        validateSavingsGoal === true &&
        validateRateOfReturn === true &&
        validateSavingsTermValue === true
    ) {
        var finalValue = 0;
        var valueSavingsGoal = calc_utilities.sanitize_num(inputSavingsGoal.value.trim());
        var valueRateOfReturn = calc_utilities.format_pct2decimal(inputRateOfReturn.value.trim());
        var valueSavingsTermValue = calc_utilities.sanitize_num(inputSavingsTermValue.value.trim());
        var valueSavingsTermPeriod = inputSavingsTermPeriod.value.trim();

        if (valueSavingsTermPeriod === 'month') {
            var firstPart = 1 + valueRateOfReturn;
            var secondPart = valueSavingsTermValue / 12;
            var thirdPart = Math.pow(firstPart, secondPart);
            var finalValue = valueSavingsGoal/ thirdPart;
        } else if (valueSavingsTermPeriod === 'year') {
            var firstPart = 1 + valueRateOfReturn;
            var secondPart = valueSavingsTermValue;
            var thirdPart = Math.pow(firstPart, secondPart);
            var finalValue = valueSavingsGoal / thirdPart;
        }
        finalValue = String(calc_utilities.format_currency(finalValue));
        calculateResult.innerHTML = calc_utilities.validate_input(finalValue, {
            showdollarsign: false,
            precision: 2
        });
    }
}
