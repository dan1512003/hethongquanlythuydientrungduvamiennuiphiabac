const pool =require('../model/connect');
exports.getriver=async (req, res) => {
    try {
        const query = `
                    SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(
                    json_build_object(
                        'type', 'Feature',
                        'properties', json_build_object(
                           'id', gid,
                           'name', name
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,name
  FROM river
  ORDER BY gid
  LIMIT $1 OFFSET $2
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM river`;
        const totalItems = await pool.query(countQuery);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;

        res.json({  
            title:"River page",
            items:items,
            currentPage: page,
            totalPages: totalPages,
            skip:offset,
         });
     
    } catch (err) {
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
  }

    exports.getUpdateRiver= async(req,res)=>{

        let id= req.params.id
        try{
            const query = `SELECT * FROM river WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
      
            res.json({  
                title:'Update Page River',
                country:db
             });
    
        }catch(err){

        console.error(err);
        }
    
    }

  exports.updateRiver=async(req,res)=>{
    let id=req.params.id
    try{
        const query=`
        UPDATE river
SET  name = $1,
     geom = ST_SetSRID(ST_GeomFromGeoJSON($2), 4326)
WHERE gid= $3;
        
        `;
        const { name,geom} =req.body
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
           await pool.query(query, [name, geojsonString, id]);
            
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.postRiver= async(req,res)=>{
  
  
    
    try{
       const { name,geom} =req.body
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
     INSERT INTO river (name, geom)
     VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326))
  `;
  await pool.query(query, [name, geojsonString]);
      
      
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }
    exports.deleteRiver= async(req,res)=>{
        let id =req.params.id
      
        try{
            const query = 'DELETE FROM river WHERE gid = $1';
            await pool.query(query, [id]);
        
          
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    