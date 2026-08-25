document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const errorContainer = document.getElementById('error-message');
    const resultsContainer = document.getElementById('results');

    // Result elements
    const elSubtotal = document.getElementById('res-subtotal');
    const elDiscountAmt = document.getElementById('res-discount-amt');
    const elDiscountedAmt = document.getElementById('res-discounted-amt');
    const elTaxAmt = document.getElementById('res-tax-amt');
    const elFinal = document.getElementById('res-final');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const showError = (message) => {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
    };

    const hideError = () => {
        errorContainer.textContent = '';
        errorContainer.classList.add('hidden');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hideError();

        // 1. Gather inputs
        const priceInput = document.getElementById('price').value;
        const qtyInput = document.getElementById('quantity').value;
        const discountInput = document.getElementById('discount').value;
        const taxInput = document.getElementById('tax').value;

        // 2. Validate empty inputs (though HTML required catches most)
        if (!priceInput || !discountInput || !taxInput) {
            return showError('Please fill in all required fields.');
        }

        const price = parseFloat(priceInput);
        const quantity = qtyInput ? parseInt(qtyInput, 10) : 1;
        const discount = parseFloat(discountInput);
        const tax = parseFloat(taxInput);

        // 3. Mathematical Validations
        if (isNaN(price) || isNaN(quantity) || isNaN(discount) || isNaN(tax)) {
            return showError('All inputs must be valid numbers.');
        }

        if (price < 0) {
            return showError('Original price cannot be negative.');
        }

        if (quantity <= 0 || quantity > 10000) {
            return showError('Quantity must be between 1 and 10,000.');
        }

        if (price > 100000000) {
            return showError('Original price is too large.');
        }

        if (discount < 0 || discount > 100) {
            return showError('Discount percentage must be between 0 and 100.');
        }

        if (tax < 0 || tax > 100) {
            return showError('Tax percentage must be between 0 and 100.');
        }

        // 4. Perform calculation (Delegated to our pure logic module)
        try {
            // Because calculateTotal is globally attached in index.html (window.calculateTotal)
            const result = window.calculateTotal(price, discount, tax, quantity);

            // 5. Render results
            elSubtotal.textContent = formatCurrency(result.subtotal);
            elDiscountAmt.textContent = '-' + formatCurrency(result.discountAmount);
            elDiscountedAmt.textContent = formatCurrency(result.discountedAmount);
            elTaxAmt.textContent = '+' + formatCurrency(result.taxAmount);
            elFinal.textContent = formatCurrency(result.finalPrice);

            resultsContainer.classList.remove('hidden');
        } catch (err) {
            showError('An unexpected error occurred during calculation.');
            console.error(err);
        }
    });
});
