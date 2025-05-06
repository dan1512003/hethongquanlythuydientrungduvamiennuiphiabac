const pool =require('../model/connect');

exports.getApiDistrict= async (req,res)=>{

    const adm1_en  = req.body.selectedValue;
try{
    const query = `
    SELECT json_build_object(
'type', 'FeatureCollection',
'features', json_agg(
    json_build_object(
        'type', 'Feature',
        'properties', json_build_object(
           'adm2_vi', adm2_vi,
           'adm2_en', adm2_en
           
        )
    )
)
) AS geojson
FROM district
WHERE adm1_en =$1
`;

const result = await pool.query(query,[adm1_en]);
const geojson = result.rows[0].geojson;
const items = geojson.features;
res.json({data: items});
}catch(err){
    console.error(err);
    res.json({ message: 'Error saving user', type:'danger' });
}
}


exports.getDistrict=async (req, res) => {
    const {adm1_vi, adm1_en} = req.params;
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
                           'adm1_en', adm1_en,
                           'adm2_vi', adm2_vi,
                           'adm2_en', adm2_en
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,adm1_vi, adm1_en, adm2_vi, adm2_en
  FROM district
  WHERE adm1_en = $1 AND adm1_vi = $2
  ORDER BY gid
  LIMIT $3 OFFSET $4
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [adm1_en,adm1_vi,limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM district WHERE adm1_en = $1 AND adm1_vi = $2`;
        const totalItems = await pool.query(countQuery, [adm1_en,adm1_vi]);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;

        res.json({
            title:"District page",
            items:items,
            currentPage: page,
            totalPages: totalPages,
            skip:offset
        })


  
    } catch (err) {
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
  }


    exports.getUpdateDistrict= async(req,res)=>{

        const {id} = req.params;
        try{
            const query = `SELECT * FROM district WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
            res.json({
                title:'Update Page Province',
                country:db})
    
     
     
        }catch(err){
       
        console.error(err);
        }
    
    }

  exports.updateDistrict=async(req,res)=>{
    let id=req.params.id
    try{
        const query=`
        UPDATE district
SET adm2_en = $1,
    adm2_vi = $2,
    geom = ST_SetSRID(ST_GeomFromGeoJSON($3), 4326)
WHERE gid= $4;
        `;
        const {adm2_en,adm2_vi,geom} =req.body
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
           await pool.query(query, [adm2_en, adm2_vi,geojsonString,id]);
        
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.postDistrict= async(req,res)=>{
    try{
       const { adm2_en,adm2_vi,adm1_en,adm1_vi,geom} =req.body
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
       console.log(adm2_en)
       console.log(adm2_vi)
       const query = `
    INSERT INTO district(adm2_vi,adm2_en,adm1_en,adm1_vi,geom)
    VALUES ($1,$2,$3,$4,ST_SetSRID(ST_GeomFromGeoJSON($5), 4326))
  `;
  await pool.query(query, [adm2_vi, adm2_en,adm1_en,adm1_vi,geojsonString]);
      
  res.redirect(`/admin/getdistrict/${adm1_vi}/${adm1_en}`);
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }


    exports.deleteDistrict= async(req,res)=>{
        const {id} = req.params;
        try{
            const query = 'DELETE FROM district WHERE gid = $1';
            await pool.query(query, [id]);
        
         
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    