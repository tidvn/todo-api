const express = require("express");
const GatewayController = require("../controllers/GatewayController");
const jwtMiddleware = require('../middleware/jwt');

const router = express.Router();
router.use(jwtMiddleware)
// router.route("/").get(GatewayController.getAllGateways)
router.route("/gateway/create").post(GatewayController.createPayment);
router.route("/gateway/query").post(GatewayController.queryPayment);
// router.route("/:id").get(GatewayController.getGatewayById)
// router.route("/:id").put(GatewayController.updateGateway)
// router.route("/:id").delete(GatewayController.deleteGateway);

module.exports = router;
