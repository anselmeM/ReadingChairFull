/**
 * Adds a product to the cart or increments quantity if it already exists.
 * @param {Array} cart - Current cart state
 * @param {Object} product - Product to add
 * @returns {Array} Updated cart
 */
export const addItem = (cart, product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        return cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
    }
    return [...cart, { ...product, quantity: 1 }];
};

/**
 * Removes a product from the cart.
 * @param {Array} cart - Current cart state
 * @param {string|number} productId - ID of the product to remove
 * @returns {Array} Updated cart
 */
export const removeItem = (cart, productId) => {
    return cart.filter(item => item.id !== productId);
};

/**
 * Updates the quantity of a product in the cart.
 * @param {Array} cart - Current cart state
 * @param {string|number} productId - ID of the product to update
 * @param {number} quantity - New quantity
 * @returns {Array} Updated cart
 */
export const updateItemQuantity = (cart, productId, quantity) => {
    if (quantity < 1) return cart;
    return cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
    );
};

/**
 * Calculates the total price of the cart.
 * @param {Array} cart - Current cart state
 * @returns {number} Total price
 */
export const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
