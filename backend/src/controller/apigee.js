var ee =require('@google/earthengine');
const { rejects } = require("assert");
require('dotenv').config();

exports.getApiGeeDrought = async (req, res) => {
   
  
  const  key=process.env.service_account_key
   
  try {
    // Đọc file JSON của Service Account
    const serviceAccountCredentials = JSON.parse(key)
  
   await ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
            var kbdi = ee.ImageCollection("UTOKYO/WTLAB/KBDI/v1");

            // Lọc ngày (ví dụ năm 2024)
            var kbdi2024 = kbdi.filterDate('2024-01-01', '2024-12-31');
            
            // Lấy ảnh mới nhất
            var latest = kbdi2024.sort('system:time_start', false).first();
            
            
            
            // Load biên giới Việt Nam
            var vietnam = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
                            .filter(ee.Filter.eq('country_na', 'Vietnam'));
            
            // Cắt ảnh theo ranh giới Việt Nam
            var kbdi_vn = latest.clip(vietnam);
            
            // Thông số hiển thị
            var visParams = {
              min: 0,
              max: 800, // KBDI thường từ 0 đến 800
              palette: ['blue', 'cyan', 'green', 'yellow', 'orange', 'red']
            };
            var imageGeom = vietnam.geometry();

            kbdi_vn.getMapId(visParams, function(map,error) {
              error ? rejects(new Error(error))   : 
              imageGeom.evaluate((result, error) =>
               error ? rejects(new Error(error)) : res.json({
                  urlFormat:map.urlFormat,
                  geojson:result,
                  palette: ['blue', 'cyan', 'green', 'yellow', 'orange', 'red']
                })   
              )
            });
    
 
 
         },
         (error) => rejects(new Error(error))
       ),
        (error) => {
            res.send('Authentication error:', error);
          }
   );

    
   
  
   
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
    }
  };

  exports.getApiNdwi = async (req, res) => {
   
  
    const  key=process.env.service_account_key
     
    try {
      // Đọc file JSON của Service Account
      const serviceAccountCredentials = JSON.parse(key)
    
     await ee.data.authenticateViaPrivateKey(
        serviceAccountCredentials,
        () =>
          ee.initialize(
            null,
            null,
            function(){
           
var vietnam = ee.FeatureCollection("FAO/GAUL/2015/level0")
.filter(ee.Filter.eq("ADM0_NAME", "Viet Nam"));
var ROI = vietnam;


var today = ee.Date(Date.now());
var nextMonth = today.advance(-1, 'month');


var sentinel2 =ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");

var image_vn = sentinel2
.filterBounds(ROI)
.filterDate(nextMonth, today)
// .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 20))
.sort("CLOUDY_PIXEL_PERCENTAGE",false)
.mosaic()
.clip(ROI);
var visParams ={min: -1, max: 0.5, palette: ['red', 'yellow', 'green', 'blue']};
var ndwi_vn = image_vn.normalizedDifference(['B3', 'B8']).rename("NDWI_Wet");

              var imageGeom = vietnam.geometry();
  
              ndwi_vn.getMapId(visParams, function(map,error) {
                error ? rejects(new Error(error))   : 
                imageGeom.evaluate((result, error) =>
                 error ? rejects(new Error(error)) : res.json({
                    urlFormat:map.urlFormat,
                    geojson:result
                  
                  })   
                )
              });
      
   
   
           },
           (error) => rejects(new Error(error))
         ),
          (error) => {
              res.send('Authentication error:', error);
            }
     );
  
      
     
    
     
      } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Authentication failed');
      }
    };


    exports.getApiRainfall = async (req, res) => {
   
  
      const  key=process.env.service_account_key
       
      try {
        // Đọc file JSON của Service Account
        const serviceAccountCredentials = JSON.parse(key)
      
       await ee.data.authenticateViaPrivateKey(
          serviceAccountCredentials,
          () =>
            ee.initialize(
              null,
              null,
              function(){
             

var vietnam = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filter(ee.Filter.eq("ADM0_NAME", "Viet Nam"));

var start = ee.Date('2024-01-01');
var end = ee.Date('2024-12-31');


var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
  .filterBounds(vietnam)
  .filterDate(start, end);

var totalRain = chirps.select('precipitation').sum().clip(vietnam);

var visParams =
{
  min: 894.4,
  max: 3858.8,
  palette: ['#d0f0fd', '#80cffa', '#2b9ee6', '#084081']
};

  
                var imageGeom = vietnam.geometry();
    
                totalRain.getMapId(visParams, function(map,error) {
                  error ? rejects(new Error(error))   : 
                  imageGeom.evaluate((result, error) =>
                   error ? rejects(new Error(error)) : res.json({
                      urlFormat:map.urlFormat,
                      geojson:result,
                      palette: ['#d0f0fd', '#80cffa', '#2b9ee6', '#084081']
                    
                    })   
                  )
                });
        
     
     
             },
             (error) => rejects(new Error(error))
           ),
            (error) => {
                res.send('Authentication error:', error);
              }
       );
    
        
       
      
       
        } catch (error) {
          console.error('Authentication error:', error);
          res.status(500).send('Authentication failed');
        }
      };