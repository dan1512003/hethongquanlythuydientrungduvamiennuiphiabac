const pool =require('../model/connect');


exports.getprovince=async (req, res) => {
    try {
        const query = `
                    SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(
                    json_build_object(
                        'type', 'Feature',
                        'properties', json_build_object(
                           'id', gid,
                           'adm1_vi', adm1_vi,
                           'adm1_en', adm1_en
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,adm1_vi, adm1_en
  FROM province
  ORDER BY gid
  LIMIT $1 OFFSET $2
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM province`;
        const totalItems = await pool.query(countQuery);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;

       res.json({
      title: "Province page",
      items: items,
      currentPage: page,
      totalPages: totalPages,
      skip: offset,
      totalCount: totalCount,
    });
    } catch (err) {
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
  }


    exports.getUpdateCountry= async(req,res)=>{

        let id= req.params.id
        try{
            const query = `SELECT * FROM province WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
      

            res.json({
              title:'Update Page Province',
              country:db,
            });
          
       
        }catch(err){
        console.error(err);
        }
    
    }

  exports.updateProvince=async(req,res)=>{
    let id=req.params.id
    console.log("id:",id)
    try{
        const query=`
        UPDATE province
SET adm1_en = $1,
    adm1_vi = $2,
    geom = ST_SetSRID(ST_GeomFromGeoJSON($3), 4326)
WHERE gid= $4;
        
        `;
        const {adm1_en,adm1_vn,geom} =req.body
        raw = geom.trim();
        if (raw.startsWith("'") && raw.endsWith("'")) {
          raw = raw.slice(1, -1);
        }
        const jsonStr = `[${raw}]`;
        const obj = JSON.parse(jsonStr);
    
        const coordinates = [
            obj
        ];
        const geojson = {
            type: "Polygon",
            coordinates: coordinates
          };
          
          const geojsonString = JSON.stringify(geojson);
        await pool.query(query, [adm1_en, adm1_vn,geojsonString, id]);
         console.log('ok')
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.postProvince= async(req,res)=>{
    try{
       const { adm1_en,adm1_vn,geom} =req.body
       raw = geom.trim();
       if (raw.startsWith("'") && raw.endsWith("'")) {
         raw = raw.slice(1, -1);
       }
       const jsonStr = `[${raw}]`;
       const obj = JSON.parse(jsonStr);
   
       const coordinates = [
           obj
       ];
       const geojson = {
           type: "Polygon",
           coordinates: coordinates
         };
         
         const geojsonString = JSON.stringify(geojson);
       const query = `
    INSERT INTO province(adm1_vi,adm1_en,geom)
    VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
  `;
  await pool.query(query, [adm1_vn, adm1_en,geojsonString]);
     
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }
    exports.deleteProvince= async(req,res)=>{
        let id =req.params.id
      
        try{
            const query = 'DELETE FROM province WHERE gid = $1';
            await pool.query(query, [id]);
        
     
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    