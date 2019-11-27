const mongoose = require('mongoose');

/**
 * @swagger
 *  components:
 *    schemas:
 *      shoppingItem:
 *        type: object
 *        required:
 *          - itemName
 *          - itemQuantity
 *          - itemBought
 *        properties:
 *          itemName:
 *            type: string
 *          itemQuantity:
 *            type: number
 *            description: Number of fruits.
 *          itemBought:
 *            type: boolean
 *        example:
 *           itemName: Apples
 *           itemQuantity: 5
 *           itemBought: false
 */

const shoppingItemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemBought: {
        type: Boolean,
        required: true,
    },
});

const Item = module.exports = mongoose.model('Item', shoppingItemSchema);
