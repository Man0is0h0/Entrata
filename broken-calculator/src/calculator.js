/**
 * Calculates the total price including discount and tax.
 * 
 * @param {number} originalPrice - The original price of a single item
 * @param {number} discountPercentage - The discount to apply (0-100)
 * @param {number} taxPercentage - The tax to apply (0-100)
 * @param {number} quantity - Number of items (defaults to 1)
 * @returns {Object} A breakdown of the calculation
 */
function calculateTotal(originalPrice, discountPercentage, taxPercentage, quantity = 1) {
    // 1. Calculate subtotal
    const subtotal = originalPrice * quantity;

    // 2. Calculate discount amount
    const discountAmount = subtotal * (discountPercentage / 100);

    // 3. Calculate discounted amount
    const discountedAmount = subtotal - discountAmount;

    // 4. Calculate tax amount
    // BUG INTRODUCED HERE: Tax is calculated on the subtotal instead of the discounted amount
    const taxAmount = subtotal * (taxPercentage / 100);

    // 5. Calculate final price
    const finalPrice = discountedAmount + taxAmount;

    // Helper to round to 2 decimal places
    const round2 = (num) => Math.round(num * 100) / 100;

    return {
        subtotal: round2(subtotal),
        discountAmount: round2(discountAmount),
        discountedAmount: round2(discountedAmount),
        taxAmount: round2(taxAmount),
        finalPrice: round2(finalPrice)
    };
}

// Export for Node.js (Jest testing) and Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateTotal };
} else {
    window.calculateTotal = calculateTotal;
}
