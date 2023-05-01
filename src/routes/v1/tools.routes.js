const { Router } = require('express');
const { ToolsController } = require('../../controllers');
const router = Router();

router
    .route('/geo-ip/:ip')
    .get(
        ToolsController.geoIp,
    );

router
    .route('/geo-ip-v2/:ip')
    .get(
        ToolsController.geoIpv2,
    );

router
    .route('/phone-verified/:phone')
    .get(
        ToolsController.phoneVerified,
    );

 module.exports = router;