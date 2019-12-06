let express = require('express');
let router = express.Router();

const Item = require('../model/shoppingItem');

/**
 * @swagger
 * path:
 *  /items:
 *      get:
 *          description: use to request all items
 *          responses:
 *              '200':
 *              description: A successful response
 */
router.get('/items', (req, res, next) => {
    Item.find((err, items) => {
        if (err) {
            res.json(err)
        }
        res.json(items)
    })
});

router.post('/item', (req, res, next) => {
    let newShoppingItem = new Item({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBought: req.body.itemBought
    });

    newShoppingItem.save((err, item) => {
        if (err) {
            res.json(err)
        }
        res.json({msg: 'Item has been added to db'});
    });
});

router.get('/item/:id', (req, res, next) => {
    Item.findById(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })
});

router.put('/item/:id', (req, res, next) => {
    Item.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                itemName: req.body.itemName,
                itemQuantity: req.body.itemQuantity,
                itemBought: req.body.itemBought
            },
        },
        (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        }
    )
});

router.delete('/item/:id', (req, res, next) => {
    Item.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })
});

module.exports = router;
