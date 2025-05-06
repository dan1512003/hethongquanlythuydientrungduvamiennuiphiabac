const pool =require('../model/connect');
exports.getlake=async (req, res) => {
    try {
        const query = `
                    SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(
                    json_build_object(
                        'type', 'Feature',
                        'properties', json_build_object(
                           'id', gid,
                           'name', name,
                           'dead_water_level', dead_water_level,
                           'normal_water_level', normal_water_level,
                            'hydroelectrictplant',  hydroelectrictplant
                           
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,name,dead_water_level,normal_water_level,hydroelectrictplant
  FROM lake
  ORDER BY gid
  LIMIT $1 OFFSET $2
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM lake`;
        const totalItems = await pool.query(countQuery);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;
        res.json({  
            title:"Lake page",
            items:items,
            currentPage: page,
            totalPages: totalPages,
            skip:offset,
        })
   
    } catch (err) {
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
  }
  exports.getPostLake=async(req,res)=>{
    try{
    const query1=` 
    SELECT json_build_object(
     'type', 'FeatureCollection',
     'features', json_agg(
         json_build_object(
             'type', 'Feature',
             'properties', json_build_object(
               'name', name
             )
         )
     )
 ) AS geojson
 FROM hydroelectricplant
 WHERE type = 'Reservoir Hydro'
 
 ;
 `

 const result1 = await pool.query(query1);
 const geojson1 = result1.rows[0].geojson;
 const items1 = geojson1.features;
 res.json({  
    title:'Get Post Lake page',
    hydroelectrictplant: items1
})
  
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }


    }

    exports.getUpdateLake= async(req,res)=>{

        let id= req.params.id
        try{
            const query1=` 
            SELECT json_build_object(
             'type', 'FeatureCollection',
             'features', json_agg(
                 json_build_object(
                     'type', 'Feature',
                     'properties', json_build_object(
                       'name', name
                     )
                 )
             )
         ) AS geojson
         FROM hydroelectricplant
         WHERE type = 'Reservoir Hydro'
         
         ;
         `
        
         const result1 = await pool.query(query1);
         const geojson1 = result1.rows[0].geojson;
         const items1 = geojson1.features;

            const query = `SELECT * FROM lake WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
      
   
     
       
        res.json({  
            title:'Update Page Lake',
            country:db,
            hydroelectrictplant: items1})

        }catch(err){
  
        console.error(err);
        }
    
    }

  exports.updateLake=async(req,res)=>{
    let id=req.params.id
    try{
        const query=`
        UPDATE lake
SET  name = $1,
     dead_water_level =$2,
     normal_water_level = $3,
     longitude = $4,
     latitude = $5,
     hydroelectrictplant = $6,
     geom = ST_SetSRID(ST_GeomFromGeoJSON($7), 4326)
WHERE gid= $8;
        
        `;
        const {name,geom,dead_water_level,normal_water_level,longitude,latitude,hydroelectrictplant} =req.body
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
          await pool.query(query, [name,dead_water_level,normal_water_level,Number(longitude),Number(latitude),hydroelectrictplant, geojsonString,id]);
          
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.postLake= async(req,res)=>{
  
  
    
    try{
       const { name,geom,dead_water_level,normal_water_level,longitude,latitude,hydroelectrictplant} =req.body
      
      console.log(hydroelectrictplant)
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
     INSERT INTO lake (name, dead_water_level,normal_water_level,longitude,latitude,hydroelectrictplant, geom)
     VALUES ($1,$2,$3,$4,$5,$6, ST_SetSRID(ST_GeomFromGeoJSON($7), 4326))
  `;
  await pool.query(query, [name,dead_water_level,normal_water_level,Number(longitude),Number(latitude),hydroelectrictplant, geojsonString]);
      
     
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }
    exports.deleteLake= async(req,res)=>{
        let id =req.params.id
      
        try{
            const query = 'DELETE FROM lake WHERE gid = $1';
            await pool.query(query, [id]);
        
         
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    