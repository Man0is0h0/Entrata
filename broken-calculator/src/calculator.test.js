const { calculateTotal } = require('./calculator');

describe('Broken Calculator Logic', () => {

    test('should calculate normally without discount and tax', () => {
        const result = calculateTotal(100, 0, 0, 1);
        expect(result.subtotal).toBe(100);
        expect(result.discountAmount).toBe(0);
        expect(result.discountedAmount).toBe(100);
        expect(result.taxAmount).toBe(0);
        expect(result.finalPrice).toBe(100);
    });

    test('should calculate normally with quantity greater than 1', () => {
        const result = calculateTotal(50, 0, 0, 3);
        expect(result.subtotal).toBe(150);
        expect(result.finalPrice).toBe(150);
    });

    test('should calculate normally without tax', () => {
        const result = calculateTotal(100, 10, 0, 1);
        expect(result.discountAmount).toBe(10);
        expect(result.discountedAmount).toBe(90);
        expect(result.finalPrice).toBe(90);
    });

    test('should calculate with decimal prices', () => {
        const result = calculateTotal(99.99, 0, 0, 1);
        expect(result.subtotal).toBe(99.99);
        expect(result.finalPrice).toBe(99.99);
    });

    // BUG REPRODUCTION SCENARIO
    test('BUG REPRODUCTION: Calculates tax on original subtotal instead of discounted amount', () => {
        // Example provided in the spec:
        // Original: 100, Qty: 1, Discount: 10%, Tax: 18%
        const result = calculateTotal(100, 10, 18, 1);
        
        expect(result.subtotal).toBe(100);
        expect(result.discountAmount).toBe(10);
        expect(result.discountedAmount).toBe(90);
        
        // --- THE BUG ---
        // Expecting 16.20 mathematically (90 * 0.18), but the bug makes it 18 (100 * 0.18)
        expect(result.taxAmount).toBe(18); // This proves the bug exists!
        expect(result.finalPrice).toBe(108); // Mathematical correct answer should be 106.20
    });
});
