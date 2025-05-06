
const express = require('express');
require('dotenv').config();
const provinceController = require('../controller/province');
const districtController = require('../controller/district');
const riverController = require('../controller/river');
const lakeController = require('../controller/lake');
const hydroElectricPlantController= require("../controller/hydroelectricplant")
const hydroLogicalStationController= require("../controller/hydrologicalstation")
const geeController =require('../controller/apigee')
const router = express.Router();
const multer = require('multer');
const fs =require('fs');
const upload=multer();
const uploadDir = 'src/upload';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir); 
      }
  
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"_"+Date.now() +"_"+file.originalname); 
    }
  });
  
  
  var uploads = multer({
    storage:storage,
  }).single("image")


router.get("/apigeedrought",geeController.getApiGeeDrought)
router.get("/apigeendwi",geeController.getApiNdwi)
router.get("/apigeerainfall",geeController.getApiRainfall)

router.post("/getapidistrict",districtController.getApiDistrict)
router.get("/getdistrict/:adm1_vi/:adm1_en",districtController.getDistrict)
router.get("/deletedistrict/:id",districtController.deleteDistrict);
router.post("/postdistrict",upload.none(),districtController.postDistrict);
router.get("/updatedistrict/:id",districtController.getUpdateDistrict);
router.post("/updatedistrict/:id",upload.none(),districtController.updateDistrict);

router.get("/getprovince",provinceController.getprovince)
router.get("/deleteprovince/:id",provinceController.deleteProvince);
// router.get("/postprovince",provinceController.getPostProvince);
router.post("/postprovince",upload.none(),provinceController.postProvince);
router.get("/updateprovince/:id",provinceController.getUpdateCountry);
router.post("/updateprovince/:id",upload.none(),provinceController.updateProvince);

router.get("/getriver",riverController.getriver)
router.get("/deleteriver/:id",riverController.deleteRiver);
router.post("/postriver",upload.none(),riverController.postRiver);
router.get("/updateriver/:id",riverController.getUpdateRiver);
router.post("/updateriver/:id",upload.none(),riverController.updateRiver);

router.get("/getlake",lakeController.getlake)
router.get("/deletelake/:id",lakeController.deleteLake);
router.get("/postlake",lakeController.getPostLake);
router.post("/postlake",upload.none(),lakeController.postLake);
router.get("/updatelake/:id",lakeController.getUpdateLake);
router.post("/updatelake/:id",upload.none(),lakeController.updateLake);


router.get("/gethydrologicalstation",hydroLogicalStationController.gethydrologicalstation)
router.get("/deletehydrologicalstation/:id",hydroLogicalStationController.deleteHydroLogicalStation);
router.post("/posthydrologicalstation",upload.none(),hydroLogicalStationController.postHydroLogicalStation);
router.get("/updatehydrologicalstation/:id",hydroLogicalStationController.getUpdateHydrologicalStation);
router.post("/updatehydrologicalstation/:id",upload.none(),hydroLogicalStationController.updateHydroLogicalStation);

router.get("/filterprovinces",hydroElectricPlantController.filterProvince)
router.get("/filterriver",hydroElectricPlantController.filterRiver)
router.get("/filter",hydroElectricPlantController.filter)
router.get("/getapihydroelectricplant",hydroElectricPlantController.getapihydroelectricplant)
router.post("/findcard",hydroElectricPlantController.findcard)
router.post("/find",hydroElectricPlantController.findkeyword)
router.post("/search",hydroElectricPlantController.findhydroelectricplant)
router.get("/hydroelectricplant",hydroElectricPlantController.gethydroelectricplant)
router.get("/deletehydroelectricplant/:id",hydroElectricPlantController.deleteHydroElectricPlant);
router.get("/posthydroelectricplant",hydroElectricPlantController.getPostHydroElectricPlant);
router.post("/posthydroelectricplant",uploads,hydroElectricPlantController.posthydroelectricplant);
router.get("/updatehydroelectricplant/:id",hydroElectricPlantController.getUpdateHydroElectricPlant);
router.post("/updatehydroelectricplant/:id",uploads,hydroElectricPlantController.updateHydroElectricPlant);
// Export router
module.exports = router;