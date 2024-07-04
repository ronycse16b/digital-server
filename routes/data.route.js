import express from 'express';
import * as dataController from '../controller/data.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/wards").get(dataController.wardGetDataController);
router.post("/create", protect, dataController.wardDataMakeController);
router.route("/ward-data-count/:id").get(dataController.wardWaysDataController);
router.route("/all-data-by-ward/:id").get(dataController.getDataController);
router.route("/full-data").get(dataController.fullDataController);
router.route("/search").get(dataController.searchDataController);
router.route("/tax-register").get(dataController.TaxRegisterGetController);
router.route("/tax-register-for-collection").get(dataController.TaxRegisterForCollection);
router.route("/tax-register-sort").get(dataController.TaxRegisterGetController);
router.route("/tax-reg-search").get(dataController.TaxRegisterSearchController);
router.route("/all-data-search").get(dataController.AllDataSearchController);
router.route("/view/:id").get(dataController.DataViewControllerByQRCode);
router.route("/payment-view/:taxId").get(dataController.paymentViewControllerByQRCode);
router.post("/tax-pay", protect, dataController.taxPaymentController);
router.put("/update/:id", protect, dataController.updateController);
router.put("/update-qr/:id", dataController.updateQrController);
router.delete("/delete/:id", protect, dataController.deleteDataController);
router.route("/single-data/:id").get(dataController.SingleData);
router.route("/all-search").get(dataController.searchAllDataController);
router.route("/all-ward-data").get(dataController.allWardsDataController);
router.route("/all-data-calculate/:id").get(dataController.allDataCalculateController);
router.route("/all-data-calculate").get(dataController.allCalculateController);
router.route("/filter").get(dataController.ReportDataController);
router.route("/village/:id").get(dataController.villageDataController);
// Create a new business
router.post('/businesses', dataController.createBusiness);

// Get all businesses
router.get('/businesses', dataController.getAllBusinesses);

// Get business by ID
router.get('/businesses/:id', dataController.getBusinessById);

// Update business by ID
router.put('/form-update/:id', dataController.updateBusiness);

// Delete business by ID
router.delete('/form-delete/:id', dataController.deleteBusiness);

// Search businesses
router.route("/business-search").get(dataController.searchBusinesses)
// router.route("/test").get(dataController.searchBusinesses)
// router.get('/businesses/search', dataController.searchBusinesses);

export default router;
