import { test, describe } from 'node:test';
import assert from 'node:assert';
import { addItem, removeItem, updateItemQuantity, calculateTotal } from './cartUtils.js';

describe('Cart Utilities', () => {
    const mockProduct = { id: 1, name: 'Book 1', price: 10 };
    const mockProduct2 = { id: 2, name: 'Book 2', price: 20 };

    test('addItem should add a new product to an empty cart', () => {
        const cart = [];
        const updatedCart = addItem(cart, mockProduct);
        assert.strictEqual(updatedCart.length, 1);
        assert.strictEqual(updatedCart[0].id, 1);
        assert.strictEqual(updatedCart[0].quantity, 1);
    });

    test('addItem should increment quantity if product already in cart', () => {
        const cart = [{ ...mockProduct, quantity: 1 }];
        const updatedCart = addItem(cart, mockProduct);
        assert.strictEqual(updatedCart.length, 1);
        assert.strictEqual(updatedCart[0].quantity, 2);
    });

    test('addItem should add multiple different products', () => {
        let cart = [];
        cart = addItem(cart, mockProduct);
        cart = addItem(cart, mockProduct2);
        assert.strictEqual(cart.length, 2);
        assert.strictEqual(cart[0].id, 1);
        assert.strictEqual(cart[1].id, 2);
    });

    test('removeItem should remove a product from the cart', () => {
        const cart = [{ ...mockProduct, quantity: 1 }, { ...mockProduct2, quantity: 1 }];
        const updatedCart = removeItem(cart, 1);
        assert.strictEqual(updatedCart.length, 1);
        assert.strictEqual(updatedCart[0].id, 2);
    });

    test('removeItem should do nothing if item not in cart', () => {
        const cart = [{ ...mockProduct, quantity: 1 }];
        const updatedCart = removeItem(cart, 999);
        assert.strictEqual(updatedCart.length, 1);
        assert.strictEqual(updatedCart[0].id, 1);
    });

    test('removeItem should work on empty cart', () => {
        const cart = [];
        const updatedCart = removeItem(cart, 1);
        assert.strictEqual(updatedCart.length, 0);
    });

    test('updateItemQuantity should update the quantity of a product', () => {
        const cart = [{ ...mockProduct, quantity: 1 }];
        const updatedCart = updateItemQuantity(cart, 1, 5);
        assert.strictEqual(updatedCart[0].quantity, 5);
    });

    test('updateItemQuantity should set quantity to 1 if it is the new quantity', () => {
        const cart = [{ ...mockProduct, quantity: 5 }];
        const updatedCart = updateItemQuantity(cart, 1, 1);
        assert.strictEqual(updatedCart[0].quantity, 1);
    });

    test('updateItemQuantity should not update quantity if less than 1', () => {
        const cart = [{ ...mockProduct, quantity: 1 }];
        const updatedCart = updateItemQuantity(cart, 1, 0);
        assert.strictEqual(updatedCart[0].quantity, 1);

        const updatedCartNegative = updateItemQuantity(cart, 1, -5);
        assert.strictEqual(updatedCartNegative[0].quantity, 1);
    });

    test('updateItemQuantity should do nothing if item not in cart', () => {
        const cart = [{ ...mockProduct, quantity: 1 }];
        const updatedCart = updateItemQuantity(cart, 999, 5);
        assert.strictEqual(updatedCart.length, 1);
        assert.strictEqual(updatedCart[0].id, 1);
    });

    test('calculateTotal should return the correct sum', () => {
        const cart = [
            { id: 1, price: 10, quantity: 2 },
            { id: 2, price: 20, quantity: 1 }
        ];
        const total = calculateTotal(cart);
        assert.strictEqual(total, 40);
    });

    test('calculateTotal should return 0 for an empty cart', () => {
        const cart = [];
        const total = calculateTotal(cart);
        assert.strictEqual(total, 0);
    });

    test('calculateTotal should handle float prices', () => {
        const cart = [
            { id: 1, price: 10.5, quantity: 2 },
            { id: 2, price: 20.25, quantity: 1 }
        ];
        const total = calculateTotal(cart);
        assert.strictEqual(total, 41.25);
    });
});
