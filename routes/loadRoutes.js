const router = require('express').Router();
const ctrl = require('../controllers/loadController');
const role = require('../middleware/roleMiddleware');
const { verifyToken } = require("../middleware/authMiddleware");


router.post('/', verifyToken, role(['BUYSELL','TRANSPORTER']), ctrl.createLoad);

router.get('/', verifyToken, ctrl.getLoads);

router.delete('/:id', verifyToken, role(['ADMIN']), ctrl.deleteLoad);

module.exports = router;