const router = require('express').Router();
const SaleController = require('../controllers/sale');
const validateToken = require('../middlewares/validateToken');
const validateRequestBody = require('../middlewares/validateRequestBody');

router.get('/debug', SaleController.getAllDebug);
router.get('/', validateToken, SaleController.getAllByUser);
router.get('/:id', SaleController.getByID);
router.put('/:id', validateToken, SaleController.changeOrderStatus);
router.post('/', validateRequestBody, validateToken, SaleController.create);

module.exports = router;
