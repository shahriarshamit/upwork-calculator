
window.onload = function () {
    document.getElementById('cal-share-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-purchase-price').addEventListener('change', formatNumberValue);
    document.getElementById('cal-sell-price').addEventListener('change', formatNumberValue);

    document.getElementById('cal-commission-type-dollar').addEventListener('click', formatDollarPercentageValue);
    document.getElementById('cal-commission-type-percentage').addEventListener('click', formatDollarPercentageValue);

    document.getElementById('cal-buy-commission-dollar').addEventListener('change', formatNumberValue);
    document.getElementById('cal-sell-commission-dollar').addEventListener('change', formatNumberValue);

    document.getElementById('cal-calculate-submit').addEventListener('click', calculateSavingsGoal);
    document.getElementById('cal-accordion-heading').addEventListener('click', toggleDisclaimer);

    /* Input Dollar Sign Animation */
    document.getElementById('cal-purchase-price').addEventListener('keyup', showDollarSign);
    document.getElementById('cal-sell-price').addEventListener('keyup', showDollarSign);
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

function formatDollarPercentageValue(event) {
    var targetInput = document.querySelectorAll('.field-switch');
    var checkedRadio = document.querySelector('[name="cal-commission-type"]:checked');
    if (checkedRadio.value === 'dollar') {
        for (var i = 0; i < targetInput.length; i++) {
            var targetValue = targetInput[i];
            if (targetValue.id === 'field-switch-dollar') {
                targetValue.classList.remove('display-hide');
                targetValue.classList.add('display-show');
                document.getElementById(targetValue.dataset.input).addEventListener('change', formatNumberValue);
                document.getElementById(targetValue.dataset.input).addEventListener('keyup', showDollarSign);
            }
            if (targetValue.id === 'field-switch-percentage') {
                targetValue.classList.remove('display-show');
                targetValue.classList.add('display-hide');
            }
        }
    } else if (checkedRadio.value === 'percentage') {
        for (var i = 0; i < targetInput.length; i++) {
            var targetValue = targetInput[i];
            if (targetValue.id === 'field-switch-percentage') {
                targetValue.classList.remove('display-hide');
                targetValue.classList.add('display-show');
                document.getElementById(targetValue.dataset.input).addEventListener('change', formatPercentageValue);
            }
            if (targetValue.id === 'field-switch-dollar') {
                targetValue.classList.remove('display-show');
                targetValue.classList.add('display-hide');
            }
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
    var validateSharePrice = true;
    var validatePurchasePrice = true;
    var validateSellPrice = true;

    var inputSharePrice = document.getElementById('cal-share-price');
    var inputPurchasePrice = document.getElementById('cal-purchase-price');
    var inputSellPrice = document.getElementById('cal-sell-price');
    var inputCommissionType = document.querySelector('[name="cal-commission-type"]:checked');
    var inputBuyCommissionDollar = document.getElementById('cal-buy-commission-dollar');
    var inputSellCommissionDollar = document.getElementById('cal-sell-commission-dollar');
    var inputBuyCommissionPercentage = document.getElementById('cal-buy-commission-percentage');
    var inputSellCommissionpercentage = document.getElementById('cal-sell-commission-percentage');

    var calculateResultOne = document.getElementById('cal-profit-loss-value');
    var calculateResultTwo = document.getElementById('cal-return-on-investment-value');

    validateSharePrice = validateInputValue(inputSharePrice);
    validatePurchasePrice = validateInputValue(inputPurchasePrice);
    validateSellPrice = validateInputValue(inputSellPrice);

    if (
        validateSharePrice === true &&
        validatePurchasePrice === true &&
        validateSellPrice === true
    ) {
        var finalValueOne = 0;
        var finalValueTwo = 0;
        var valueSharePrice = calc_utilities.sanitize_num(inputSharePrice.value.trim());
        var valuePurchasePrice = calc_utilities.sanitize_num(inputPurchasePrice.value.trim());
        var valueSellPrice = calc_utilities.sanitize_num(inputSellPrice.value.trim());
        var valueCommissionType = inputCommissionType.value.trim();
        if (valueCommissionType === 'dollar') {
            var valueBuyCommissionDollar = calc_utilities.sanitize_num(inputBuyCommissionDollar.value.trim());
            var valueSellCommissionDollar = calc_utilities.sanitize_num(inputSellCommissionDollar.value.trim());
            var purchasedFor = parseFloat(valueSharePrice) * parseFloat(valuePurchasePrice) + parseFloat(valueBuyCommissionDollar);
            var soldFor = parseFloat(valueSharePrice) * parseFloat(valueSellPrice) - parseFloat(valueSellCommissionDollar);
            finalValueOne = parseFloat(soldFor) - parseFloat(purchasedFor);
            finalValueTwo = ((parseFloat(soldFor) - parseFloat(purchasedFor)) / parseFloat(purchasedFor));
        } else if (valueCommissionType === 'percentage') {
            var valueBuyCommissionPercentage = calc_utilities.format_pct2decimal(inputBuyCommissionPercentage.value.trim());
            var valueSellCommissionpercentage = calc_utilities.format_pct2decimal(inputSellCommissionpercentage.value.trim());
            var purchasedFor = (parseFloat(valueSharePrice) * parseFloat(valuePurchasePrice)) * (1 + parseFloat(valueBuyCommissionPercentage));
            var soldFor = (parseFloat(valueSharePrice) * parseFloat(valueSellPrice)) * (1 - parseFloat(valueSellCommissionpercentage));
            finalValueOne = parseFloat(soldFor) - parseFloat(purchasedFor);
            finalValueTwo = ((parseFloat(soldFor) - parseFloat(purchasedFor)) / parseFloat(purchasedFor));
        }
        finalValueOne = String(calc_utilities.format_currency(finalValueOne));
        calculateResultOne.innerHTML = calc_utilities.validate_input(finalValueOne, {
            showdollarsign: false,
            precision: 2
        });
        finalValueTwo = String(calc_utilities.format_percentage(finalValueTwo));
        calculateResultTwo.innerHTML = calc_utilities.validate_input(finalValueTwo, {
            showprecentagesign: true,
            precision: 2
        });
    }
}
