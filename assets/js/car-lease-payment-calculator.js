
window.onload = function () {
    document.getElementById('cal-lease-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-down-payment').addEventListener('change', formatNumberValue);
    document.getElementById('cal-trade-in-value').addEventListener('change', formatNumberValue);
    document.getElementById('cal-residual-amount').addEventListener('change', formatNumberValue);
    document.getElementById('cal-sales-tax').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-lease-rate').addEventListener('change', formatPercentageValue);
    document.getElementById('cal-lease-term-value').addEventListener('change', formatMonthYearValue);

    document.getElementById('cal-lease-term-period-month').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-lease-term-period-year').addEventListener('click', formatMonthYearValue);
    document.getElementById('cal-calculate-submit').addEventListener('click', calculateCarLeasePayment);
    document.getElementById('cal-accordion-btn').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-lease-price').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-down-payment').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-trade-in-value').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-residual-amount').addEventListener('keyup', showDollarSign);
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
    var targetInput = document.querySelector('[name="cal-lease-term-value"]');
    var checkedRadio = document.querySelector('[name="cal-lease-term-period"]:checked');
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

function calculateCarLeasePayment() {
    var validateLeasePrice = true;
    var validateDownPayment = true;
    var validateTradeInValue = true;
    var validateResidualAmount = true;
    var validateSalesTax = true;
    var validateLeaseRate = true;
    var validateLeaseTermValue = true;

    var inputLeasePrice = document.getElementById('cal-lease-price');
    var inputDownPayment = document.getElementById('cal-down-payment');
    var inputTradeInValue = document.getElementById('cal-trade-in-value');
    var inputResidualAmount = document.getElementById('cal-residual-amount');
    var inputSalesTax = document.getElementById('cal-sales-tax');
    var inputLeaseRate = document.getElementById('cal-lease-rate');
    var inputLeaseTermValue = document.getElementById('cal-lease-term-value');
    var inputLeaseTermPeriod = document.querySelector('[name="cal-lease-term-period"]:checked');
    var calculateMonthlyPaymentResult = document.getElementById('cal-monthly-payment-value');
    var calculateTotalCostResult = document.getElementById('cal-total-cost-value');

    validateLeasePrice = validateInputValue(inputLeasePrice);
    validateDownPayment = validateInputValue(inputDownPayment);
    validateTradeInValue = validateInputValue(inputTradeInValue);
    validateResidualAmount = validateInputValue(inputResidualAmount);
    validateSalesTax = validateInputValue(inputSalesTax);
    validateLeaseRate = validateInputValue(inputLeaseRate);
    validateLeaseTermValue = validateInputValue(inputLeaseTermValue);

    if (
        validateLeasePrice === true &&
        validateDownPayment === true &&
        validateTradeInValue === true &&
        validateResidualAmount === true &&
        validateSalesTax === true &&
        validateLeaseRate === true &&
        validateLeaseTermValue === true
    ) {
        var finalValueOne = 0;
        var finalValueTwo = 0;
        var valueLeasePrice = calc_utilities.sanitize_num(inputLeasePrice.value.trim());
        var valueDownPayment = calc_utilities.sanitize_num(inputDownPayment.value.trim());
        var valueTradeInValue = calc_utilities.sanitize_num(inputTradeInValue.value.trim());
        var valueResidualAmount = calc_utilities.sanitize_num(inputResidualAmount.value.trim());
        var valueSalesTax = calc_utilities.format_pct2decimal(inputSalesTax.value.trim());
        var valueLeaseRate = calc_utilities.format_pct2decimal(inputLeaseRate.value.trim());
        var valueLeaseTermValue = calc_utilities.sanitize_num(inputLeaseTermValue.value.trim());
        var valueLeaseTermPeriod = inputLeaseTermPeriod.value.trim();

        if (valueLeaseTermPeriod === 'month') {
            var depricationCharge = (valueLeasePrice - valueDownPayment - valueTradeInValue - valueResidualAmount) / (valueLeaseTermValue * 1);
            var leaseFee = (parseFloat(valueLeasePrice) - parseFloat(valueDownPayment) - parseFloat(valueTradeInValue) + parseFloat(valueResidualAmount)) * (valueLeaseRate / 24);
            var usageTax = (depricationCharge + leaseFee) * valueSalesTax;
            finalValueOne = depricationCharge + leaseFee + usageTax;
            finalValueTwo = finalValueOne * parseFloat(valueLeaseTermValue) * 1 + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);
        } else if (valueLeaseTermPeriod === 'year') {
            var depricationCharge = (valueLeasePrice - valueDownPayment - valueTradeInValue - valueResidualAmount) / (valueLeaseTermValue * 12);
            var leaseFee = (parseFloat(valueLeasePrice) - parseFloat(valueDownPayment) - parseFloat(valueTradeInValue) + parseFloat(valueResidualAmount)) * (valueLeaseRate / 24);
            var usageTax = (depricationCharge + leaseFee) * valueSalesTax;
            finalValueOne = depricationCharge + leaseFee + usageTax;
            finalValueTwo = finalValueOne * parseFloat(valueLeaseTermValue) * 12 + parseFloat(valueDownPayment) + parseFloat(valueTradeInValue);
        }
        finalValueOne = String(calc_utilities.format_currency(finalValueOne));
        calculateMonthlyPaymentResult.innerHTML = calc_utilities.validate_input(finalValueOne, {
            showdollarsign: false,
            precision: 2
        });
        finalValueTwo = String(calc_utilities.format_currency(finalValueTwo));
        calculateTotalCostResult.innerHTML = calc_utilities.validate_input(finalValueTwo, {
            showdollarsign: false,
            precision: 2
        });
    }
}
