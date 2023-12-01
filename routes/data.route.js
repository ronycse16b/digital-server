const express = require("express");
const { wardGetDataController, wardDataMakeController,TaxRegisterGetDataController, wardWaysDataController, getDataController, searchDataController,taxPaymentController, DataViewControllerByQRCode,paymentViewControllerByQRCode,fullDataController,SingleData,updateController ,deleteDataController,allWardsDataController,searchAllDataController,ReportDataController,villageDataController,updateQrController,TaxRegisterSearchController,AllDataSearchController} = require("../controller/data.controller");
const {IsAuthenticUser, isAdmin} = require("../hook/middelware");



const router = express.Router();

router.get("/wards",  wardGetDataController);
router.post("/create",wardDataMakeController);
router.get("/ward-data-count/:id",wardWaysDataController);
router.get("/all-data-by-ward/:id",getDataController);
router.get("/full-data",fullDataController);
router.get("/search",searchDataController);
router.get("/tax-register",TaxRegisterGetDataController);
router.get("/tax-reg-search",TaxRegisterSearchController);
router.get("/all-data-search",AllDataSearchController);
router.get("/view/:id",DataViewControllerByQRCode);
router.get("/payment-view/:taxId",paymentViewControllerByQRCode);
router.post("/tax-pay",taxPaymentController);
router.put("/update/:id",updateController);
router.put("/update-qr/:id",updateQrController);
router.delete("/delete/:id",deleteDataController);
router.get("/single-data/:id",SingleData);
router.get("/all-search",searchAllDataController);
router.get("/all-ward-data",allWardsDataController);
router.get("/filter",ReportDataController);
router.get("/village/:id",villageDataController);

router.get('/test',IsAuthenticUser,  (req,res)=>{
    res.send('protected route')

})

module.exports = router;    