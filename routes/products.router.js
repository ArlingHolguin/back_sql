const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, } = require('../schemas/product.schema');
// const faker = require('faker');

const router = express.Router();
const service = new ProductsService();

//http://localhost:3000/api/v1/
// GET /products
router.get('/', async(req, res) => {
    const products = await service.find();
    res.json(products);
});


//GET products/filter
router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

// GET /products/:id - find one
router.get('/:id', validatorHandler(getProductSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            if (product) {
                res.status(302).json(product);

            } else {
                res.status(404).json({
                    message: 'Product not found',
                });
            }

        } catch (error) {
            next(error);

        }


    });



//POST Create | /products
router.post('/', validatorHandler(createProductSchema, 'body'),
    async(req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    });

//PATCH actualizar los productos
router.patch('/:id', validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);

        } catch (error) {
            next(error);


        }

    });

//DELETE /products/:id
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
});




module.exports = router;
