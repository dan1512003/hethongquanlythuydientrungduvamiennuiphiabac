const pool =require('../model/connect');
exports.gethydrologicalstation=async (req, res) => {
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
                           'water_level', water_level,
                           'water_flow', water_flow
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,name,water_level,water_flow
  FROM hydrologicalstation
  ORDER BY gid
  LIMIT $1 OFFSET $2
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM hydrologicalstation`;
        const totalItems = await pool.query(countQuery);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;
        res.json({ 
            title:"pageg ethydrologicalstation page",
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


    exports.getUpdateHydrologicalStation= async(req,res)=>{

        let id= req.params.id
        try{
            const query = `SELECT * FROM hydrologicalstation WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
      
            res.json({ 
                title:'Update pageupdatehydrologicalstation',
                country:db,
            })
    
    
        }catch(err){

        console.error(err);
        }
    
    }

  exports.updateHydroLogicalStation=async(req,res)=>{
    let id=req.params.id
    try{
        const query=`
        UPDATE hydrologicalstation
SET  name = $1,
     water_level = $2,
     water_flow = $3,
     longitude = $4,
     latitude = $5,
    geom = ST_SetSRID(ST_MakePoint($4,$5), 4326)
WHERE gid= $6;
        
        `;
        const { name,water_flow,water_level,longitude,latitude} =req.body
       
           await pool.query(query, [name, water_level, water_flow, Number(longitude), Number(latitude),id]);
      
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.postHydroLogicalStation= async(req,res)=>{
  
  
    
    try{
        const { name,water_flow,water_level,longitude,latitude} =req.body
       const query = `
     INSERT INTO hydrologicalstation (name, water_level, water_flow, longitude, latitude, geom)
     VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($4,$5), 4326))
  `;
  await pool.query(query, [name, water_level, water_flow, Number(longitude), Number(latitude)]);
      
       
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }
    exports.deleteHydroLogicalStation= async(req,res)=>{
        let id =req.params.id
      
        try{
            const query = 'DELETE FROM hydrologicalstation WHERE gid = $1';
            await pool.query(query, [id]);
        
          
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    