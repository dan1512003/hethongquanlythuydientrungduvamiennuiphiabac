const pool =require('../model/connect');


exports.filterRiver=async(req,res)=>{
  const { river } = req.query;
  console.log(river)  
  try{
    const query = `
   
 
 SELECT json_build_object(
     'type', 'FeatureCollection',
     'features', json_agg(
         json_build_object(
             'type', 'Feature',
             'geometry', ST_AsGeoJSON(song.geom)::json,
             'properties', json_build_object(
                 'id', hep.gid,
                 'name', hep.name,
                 'province', hep.province,
                 'district', hep.district,
                 'generating_units', hep.generating_units,
                 'capacity', hep.capacity,
                 'electricity_output', hep.electricity_output,
                 'river', hep.river,
                 'longitude', hep.longitude,
                 'latitude', hep.latitude,
                 'investor', hep.investor,
                 'build_state', hep.build_state,
                 'description', hep.description,
                 'type', hep.type
           
             )
         )
     )
 ) AS geojson
 FROM hydroelectricplant hep
 JOIN river song
   ON ST_Intersects(hep.geom, song.geom)
 WHERE song.name = $1
          `;
          const result = await pool.query(query,[river]);
          const geojson = result.rows[0].geojson;
          console.log(geojson)
          const query1 = `
   SELECT * 
   FROM river
   WHERE name = $1
 `;
           const result1 = await pool.query(query1,[river]);  
          const db = result1.rows[0];
          console.log(db)
          
          const query2 = `
          SELECT 
            json_build_object(
              'type', 'FeatureCollection',
              'features', json_agg(   
              json_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(geom)::json
              )
           )
         ) AS geojson
            FROM river
            WHERE name = $1
        `;
        const result2 = await pool.query(query2,[river]);
        const geojson2 = result2.rows[0].geojson;
           console.log(geojson2)
      
          res.json({ 
             geojson:geojson,
             longitude:db.longitude,
             latitude:db.latitude,
             geojson2:geojson2
          
          });
}catch(err){


  res.json({ message: 'Error saving user', type:'danger' });
}
}
exports.filterProvince=async(req,res)=>{

  const {location} = req.query;
  console.log(location)
  try{
    const query = `
   
 
 SELECT json_build_object(
     'type', 'FeatureCollection',
     'features', json_agg(
         json_build_object(
             'type', 'Feature',
             'geometry', ST_AsGeoJSON(tinh.geom)::json,
             'properties', json_build_object(
                 'id', hep.gid,
                 'name', hep.name,
                 'province', hep.province,
                 'district', hep.district,
                 'generating_units', hep.generating_units,
                 'capacity', hep.capacity,
                 'electricity_output', hep.electricity_output,
                 'river', hep.river,
                 'longitude', hep.longitude,
                 'latitude', hep.latitude,
                 'investor', hep.investor,
                 'build_state', hep.build_state,
                 'description', hep.description,
                 'type', hep.type
           
             )
         )
     )
 ) AS geojson
 FROM hydroelectricplant hep
 JOIN province tinh
   ON ST_Intersects(hep.geom, tinh.geom)
 WHERE tinh.adm1_en = $1
          `;
          const result = await pool.query(query,[location]);
          const geojson = result.rows[0].geojson;
          console.log(geojson)
         const query1 = `
  SELECT * 
  FROM province 
  WHERE adm1_en = $1
`;
          const result1 = await pool.query(query1,[location]);  
         const db = result1.rows[0];
         console.log(db)
         
         const query2 = `
         SELECT 
           json_build_object(
             'type', 'FeatureCollection',
             'features', json_agg(   
             json_build_object(
               'type', 'Feature',
               'geometry', ST_AsGeoJSON(geom)::json
             )
          )
        ) AS geojson
           FROM province 
           WHERE adm1_en = $1
       `;
       const result2 = await pool.query(query2,[location]);
       const geojson2 = result2.rows[0].geojson;
          console.log(geojson2)
    
         

         res.json({ 
            geojson:geojson,
            longitude:db.longitude,
            latitude:db.latitude,
            geojson2:geojson2
          
         });
}catch(err){


  res.json({ message: 'Error saving user', type:'danger' });
}
}

exports.filter=async(req,res)=>{

      try{
  
      const   query = `
        SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
        json_build_object(
            'type', 'Feature',
            'properties', json_build_object(
               'adm1_vi', adm1_vi,
               'adm1_en', adm1_en
               
            )
        )
    )
) AS geojson
FROM  province

`;
     
const result = await pool.query(query);
const geojsonprovince= result.rows[0].geojson;
console.log(geojsonprovince)

const query1 = `
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
FROM  river

`;
const result1 = await pool.query(query1);
const geojsonriver= result1.rows[0].geojson;
console.log(geojsonriver)

res.json({ 
  geojsonriver: geojsonriver,
  geojsonprovince: geojsonprovince
 
});
 }catch(err){

  
      res.json({ message: 'Error saving user', type:'danger' });
 }
}


exports.findcard=async(req,res)=>{
  const keyword= req.body.keyword
  console.log(keyword)
      try{
  
        const query = `
      SELECT * FROM hydroelectricplant AS thuydien
        WHERE GREATEST(
                similarity(regexp_replace(unaccent(lower(thuydien.name)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.province)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.district)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.river)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g'))
            ) > 0.2
        ORDER BY 
            GREATEST(
                similarity(regexp_replace(unaccent(lower(thuydien.name)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.province)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.district)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
                similarity(regexp_replace(unaccent(lower(thuydien.river)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g'))
            ) DESC
        `;
  
        const result = await pool.query(query,[keyword]);
        const data = result.rows;
        console.log(data)
        res.json({ 
          data
        });
       
     
 }catch(err){

  
      res.json({ message: 'Error saving user', type:'danger' });
 }
}





exports.getapihydroelectricplant=async (req, res) => {

    try{
 
const query2 = `


SELECT 
   json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
        json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geom)::json,
            'properties', json_build_object(
                'id', gid,
                'name', name,
                'province', province,
                'district', district,
                'generating_units', generating_units,
                'capacity', capacity,
                'electricity_output', electricity_output,
                'river', river,
                'longitude', longitude,
                'latitude', latitude,
                'investor', investor,
                'build_state', build_state,
                'description', description,
                'type', type
             
            )
        )
    )
) AS geojson
FROM hydroelectricplant
`;
const result2 = await pool.query(query2);
const geojson2 = result2.rows[0].geojson;

const query3 = `
SELECT 
   json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
        json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(thuyvan.geom)::json,
            'properties', json_build_object(
                'id', thuyvan.gid,
                'name', thuyvan.name,
                'longitude', thuyvan.longitude,
                'latitude', thuyvan.latitude,
                'water_flow', thuyvan.water_flow,
                'water_level', thuyvan.water_level,
				        'river', song.name

            )
        )
    )
) AS geojson
FROM hydrologicalstation AS thuyvan
JOIN river AS song
ON ST_Intersects(
           song.geom,
           ST_Transform(
             ST_Buffer(
               ST_Transform(thuyvan.geom, 3857),  
               5000                           
             ),
             4326                            
           )
       )
`;
const result3 = await pool.query(query3);
const geojson3 = result3.rows[0].geojson;

const query4 = `
SELECT 
   json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(
        json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(ho.geom)::json,
            'properties', json_build_object(
                'id', ho.gid,
                'name', ho.name,
                'longitude', ho.longitude,
                'latitude',  ho.latitude,
                'dead_water_level', ho.dead_water_level,
                'normal_water_level', ho.normal_water_level,
                'hydroelectrictplant', ho.hydroelectrictplant,
                'water_level', thuyvan.water_level
            )
        )
    )
) AS geojson
FROM lake AS ho
JOIN hydrologicalstation AS thuyvan
  ON ST_Intersects(
         ho.geom,
         ST_Transform(
           ST_Buffer(
             ST_Transform(thuyvan.geom, 3857),  
             5000
           ),
           4326
         )
     );
`;
const result4 = await pool.query(query4);
const geojson4 = result4.rows[0].geojson;

res.json({ 
    geojson2: geojson2,
    geojson3: geojson3,
    geojson4: geojson4

});

    }catch(err){
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
}
exports.findkeyword=async(req,res)=>{
    const keyword= req.body.keyword
    console.log(keyword)
    const query1=`SELECT * FROM province AS tinh
    WHERE similarity(
      regexp_replace(unaccent(lower(tinh.adm1_vi)), '[^a-z]', '', 'g'),
      regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
  ) > 0.2
  ORDER BY 
  similarity(
      regexp_replace(unaccent(lower(tinh.adm1_vi)), '[^a-z]', '', 'g'),
      regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
    )DESC
  LIMIT 5`
  const result1 = await pool.query(query1,[keyword]);
  const geojson1 = result1.rows;
 
  const query2=`SELECT * FROM district AS huyen
  WHERE similarity(
    regexp_replace(unaccent(lower(huyen.adm2_vi)), '[^a-z]', '', 'g'),
    regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
) > 0.2
ORDER BY 
similarity(
    regexp_replace(unaccent(lower(huyen.adm2_vi)), '[^a-z]', '', 'g'),
    regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
  )DESC
LIMIT 5`
const result2 = await pool.query(query2,[keyword]);
const geojson2 = result2.rows;

const query3=`SELECT * FROM river AS song
WHERE similarity(
  regexp_replace(unaccent(lower(song.name)), '[^a-z]', '', 'g'),
  regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
) > 0.2
ORDER BY 
similarity(
  regexp_replace(unaccent(lower(song.name)), '[^a-z]', '', 'g'),
  regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
)DESC
LIMIT 5`
const result3= await pool.query(query3,[keyword]);
const geojson3 = result3.rows;

const query4 = `
SELECT * 
FROM hydroelectricplant AS thuydien
WHERE GREATEST(
        similarity(
          regexp_replace(unaccent(lower(thuydien.name)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.province)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.district)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.river)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        )
      ) > 0.2
ORDER BY GREATEST(
        similarity(
          regexp_replace(unaccent(lower(thuydien.name)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.province)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.district)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(thuydien.river)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        )
      ) DESC
LIMIT 5
`;

const result4= await pool.query(query4,[keyword]);
const geojson4 = result4.rows;
console.log(geojson4)


const query5=`
SELECT * 
FROM lake AS ho
WHERE GREATEST(
        similarity(
          regexp_replace(unaccent(lower(ho.name)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(ho.hydroelectrictplant)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        )
        
      ) > 0.2
ORDER BY GREATEST(
        similarity(
          regexp_replace(unaccent(lower(ho.name)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        ),
        similarity(
          regexp_replace(unaccent(lower(ho.hydroelectrictplant)), '[^a-z]', '', 'g'),
          regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
        )
     
      ) DESC
LIMIT 5;
`

const result5= await pool.query(query5,[keyword]);
const geojson5 = result5.rows;
console.log(geojson5)


const query6=`
WITH joined_data AS (
  SELECT 
    tv.*, 
    d.adm2_en AS district, 
    d.adm1_vi AS province, 
    r.name AS river
  FROM hydrologicalstation AS tv
  JOIN district AS d ON ST_Intersects(tv.geom, d.geom)
  JOIN river AS r ON ST_Intersects(tv.geom, r.geom)
)
SELECT *
FROM joined_data
WHERE GREATEST(
  similarity(regexp_replace(unaccent(lower(name)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(province)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(district)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(river)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g'))
) > 0.2
ORDER BY GREATEST(
  similarity(regexp_replace(unaccent(lower(name)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(province)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(district)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')),
  similarity(regexp_replace(unaccent(lower(river)), '[^a-z]', '', 'g'),
             regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g'))
) DESC
LIMIT 5;
`

const result6= await pool.query(query6,[keyword]);
const geojson6= result6.rows;
console.log(geojson5)
res.json({ 
    resultprovincer: geojson1,
    resultdistrict: geojson2,
    resultriver: geojson3,
    resulthydroelectricplant: geojson4,
    resultlake: geojson5,
    resulthydrologicalstation: geojson6
});

}
exports.findhydroelectricplant=async(req,res)=>{
const keyword= req.body.keyword
console.log(keyword)
    try{




        const query1 = `
  SELECT 
    json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(feature)
    ) AS geojson,
    COUNT(*) AS total
  FROM (
    SELECT 
      json_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(tinh.geom)::json,
        'properties', json_build_object(
          'id', tinh.gid,
          'name', tinh.adm1_vi,
          'longitude', tinh.longitude,
          'latitude', tinh.latitude
        )
      ) AS feature
    FROM province AS tinh
    WHERE similarity(
      regexp_replace(unaccent(lower(tinh.adm1_vi)), '[^a-z]', '', 'g'),
      regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
    ) > 0.5
    ORDER BY 
      similarity(
        regexp_replace(unaccent(lower(tinh.adm1_vi)), '[^a-z]', '', 'g'),
        regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
      ) DESC
    LIMIT 1
  ) AS subquery;
`;
       const result1 = await pool.query(query1,[keyword]);
       const geojson1 = result1.rows[0].geojson;
       console.log(geojson1)
       console.log(geojson1.features)


       const query2 = `
  SELECT 
    json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(feature)
    ) AS geojson,
    COUNT(*) AS total
  FROM (
    SELECT 
      json_build_object(
        'type', 'Feature',
        'geometry', ST_AsGeoJSON(huyen.geom)::json,
        'properties', json_build_object(
          'id', huyen.gid,
          'name', huyen.adm2_vi,
          'longitude', huyen.longitude,
          'latitude', huyen.latitude
        )
      ) AS feature
    FROM district AS huyen
    WHERE similarity(
      regexp_replace(unaccent(lower(huyen.adm2_vi)), '[^a-z]', '', 'g'),
      regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
    ) > 0.5
    ORDER BY 
      similarity(
        regexp_replace(unaccent(lower(huyen.adm2_vi)), '[^a-z]', '', 'g'),
        regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
      ) DESC
    LIMIT 1
  ) AS subquery;
`;
              const result2 = await pool.query(query2,[keyword]);
              const geojson2 = result2.rows[0].geojson;
              console.log(geojson2)
              console.log(geojson2.features)

              const query3 = `
              SELECT 
                json_build_object(
                  'type', 'FeatureCollection',
                  'features', json_agg(feature)
                ) AS geojson,
                COUNT(*) AS total
              FROM (
                SELECT 
                  json_build_object(
                    'type', 'Feature',
                    'geometry', ST_AsGeoJSON(song.geom)::json,
                    'properties', json_build_object(
                      'id', song.gid,
                      'name', song.name,
                      'longitude', song.longitude,
                      'latitude', song.latitude
                    )
                  ) AS feature
                FROM river AS song
                WHERE similarity(
                  regexp_replace(unaccent(lower(song.name)), '[^a-z]', '', 'g'),
                  regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                ) > 0.5
                ORDER BY 
                  similarity(
                    regexp_replace(unaccent(lower(song.name)), '[^a-z]', '', 'g'),
                    regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                  ) DESC
                LIMIT 1
              ) AS subquery;
            `;
                     const result3= await pool.query(query3,[keyword]);
                     const geojson3 = result3.rows[0].geojson;
                     console.log(geojson3)
                     console.log(geojson3.features)
                     

                     const query4 = `

                 
                        SELECT 
                       json_build_object(
                         'type', 'FeatureCollection',
                         'features', json_agg(feature)
                       ) AS geojson,
                       COUNT(*) AS total
                     FROM (
                       SELECT 
                         json_build_object(
                           'type', 'Feature',
                           'geometry', ST_AsGeoJSON(hep.geom)::json,
                           'properties', json_build_object(
                           'id', hep.gid,
                           'name', hep.name,
                            'province', hep.province,
                            'district', hep.district,
                             'generating_units', hep.generating_units,
                             'capacity', hep.capacity,
                             'electricity_output', hep.electricity_output,
                             'river', hep.river,
                              'longitude', hep.longitude,
                             'latitude', hep.latitude,
                              'investor', hep.investor,
                               'build_state', hep.build_state,
                               'description', hep.description,
                               'type', hep.type
                           )
                         ) AS feature
                       FROM hydroelectricplant AS hep
                       WHERE similarity(
                         regexp_replace(unaccent(lower(hep.name)), '[^a-z]', '', 'g'),
                         regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                       ) > 0.5
                       ORDER BY 
                         similarity(
                           regexp_replace(unaccent(lower(hep.name)), '[^a-z]', '', 'g'),
                           regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                         ) DESC
                       LIMIT 1
                     ) AS subquery;
 
                   `;
                   const result4= await pool.query(query4,[keyword]);
                   const geojson4 = result4.rows[0].geojson;
                   console.log(geojson4)
                   console.log(geojson4.features)
                   

                   const query5 = `
                   SELECT 
                     json_build_object(
                       'type', 'FeatureCollection',
                       'features', json_agg(feature)
                     ) AS geojson,
                     COUNT(*) AS total
                   FROM (
                     SELECT 
                       json_build_object(
                         'type', 'Feature',
                         'geometry', ST_AsGeoJSON(ho.geom)::json,
                         'properties', json_build_object(
                           'id', ho.gid,
                           'name', ho.name,
                           'longitude', ho.longitude,
                           'latitude', ho.latitude,
                           'dead_water_level', ho.dead_water_level,
                           'normal_water_level', ho.normal_water_level,
                           'hydroelectrictplant', ho.hydroelectrictplant,
                           'water_level', thuyvan.water_level
                         )
                       ) AS feature
                     FROM lake AS ho
                     JOIN hydrologicalstation AS thuyvan
                       ON ST_Intersects(
                            ho.geom,
                            ST_Transform(
                              ST_Buffer(ST_Transform(thuyvan.geom, 3857), 5000),
                              4326
                            )
                          )
                     WHERE similarity(
                       regexp_replace(unaccent(lower(ho.name)), '[^a-z]', '', 'g'),
                       regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                     ) > 0.5
                     ORDER BY 
                       similarity(
                         regexp_replace(unaccent(lower(ho.name)), '[^a-z]', '', 'g'),
                         regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                       ) DESC
                     LIMIT 1
                   ) AS subquery;
                   `;
                       const result5= await pool.query(query5,[keyword]);
                          const geojson5 = result5.rows[0].geojson;
                          console.log(geojson5)
                          console.log(geojson5.features)

                           const query9 = `
                   SELECT 
                     json_build_object(
                       'type', 'FeatureCollection',
                       'features', json_agg(feature)
                     ) AS geojson,
                     COUNT(*) AS total
                   FROM (
                     SELECT 
                       json_build_object(
                         'type', 'Feature',
                         'geometry', ST_AsGeoJSON(thuyvan.geom)::json,
                         'properties', json_build_object(
                          'id', thuyvan.gid,
                         'name', thuyvan.name,
                         'longitude', thuyvan.longitude,
                         'latitude', thuyvan.latitude,
                          'water_flow', thuyvan.water_flow,
                          'water_level', thuyvan.water_level,
				                  'river', song.name
                         )
                       ) AS feature
                     FROM hydrologicalstation AS thuyvan
                     JOIN river AS song
                     ON ST_Intersects(
                      song.geom,
                        ST_Transform(
                       ST_Buffer(
                      ST_Transform(thuyvan.geom, 3857),  
                      5000                           
                     ),
                     4326                            
                     )
                      )
                     WHERE similarity(
                       regexp_replace(unaccent(lower(thuyvan.name)), '[^a-z]', '', 'g'),
                       regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                     ) > 0.5
                     ORDER BY 
                       similarity(
                         regexp_replace(unaccent(lower(thuyvan.name)), '[^a-z]', '', 'g'),
                         regexp_replace(unaccent(lower($1)), '[^a-z]', '', 'g')
                       ) DESC
                     LIMIT 1
                   ) AS subquery;
                 `;
                          const result9= await pool.query(query9,[keyword]);
                          const geojson9 = result9.rows[0].geojson;
                          console.log(geojson9)
                          console.log(geojson9.features)
if(result1.rows[0].total != 0){
    res.json({ 
        geojson: geojson1,
    find:'province'
    });
}else if(result2.rows[0].total !=0){
    res.json({ 
      geojson: geojson2,
     find:'district'
    });
}else if(result3.rows[0].total !=0){
    res.json({ 
      geojson: geojson3,
       find:'river'
    });
}else if(result4.rows[0].total !=0){

res.json({ 
  geojson: geojson4,
  find:'hydroelectricplant'
});

   
  
}else if(result5.rows[0].total !=0){
res.json({ 
        geojson: geojson5,
        find:'lake'
    });
  }
  else if(result9.rows[0].total !=0){
    res.json({
      geojson: geojson9,
      find:'hydrologicalstation'
    })
  }
else{
    res.json({ 
        resultprovincer: [],
        find:'province'
    });
}

    

    }catch(err){
        console.error(err);
        res.json({ message: 'Error saving user', type:'danger' });
    }
}

exports.gethydroelectricplant=async (req, res) => {
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
                           'province', province,
                           'district', district,
                           'generating_units', generating_units,
                           'capacity', capacity,
                           'electricity_output', electricity_output,
                           'river', river
                           
                        )
                    )
                )
            ) AS geojson
            FROM  (
  SELECT gid,name, province, district, generating_units, capacity, electricity_output, river
  FROM hydroelectricplant
  ORDER BY gid
  LIMIT $1 OFFSET $2
) AS subquery
           
        `;

        const page = parseInt(req.query.page) || 1;
        const limit = 2;
        const offset= (page - 1) * limit;
        const result = await pool.query(query, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM  hydroelectricplant`;
        const totalItems = await pool.query(countQuery);
        const totalCount = parseInt(totalItems.rows[0].count);
         console.log(totalCount);
        const totalPages = Math.ceil(totalCount / limit);
        console.log(totalPages);
        console.log(page);
        const geojson = result.rows[0].geojson;
        const items = geojson.features;
        res.json({
          title:"Hydroelectricplant page",
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
  exports.getPostHydroElectricPlant=async(req,res)=>{
try{
    const query1=` 
    SELECT json_build_object(
     'type', 'FeatureCollection',
     'features', json_agg(
         json_build_object(
             'type', 'Feature',
             'properties', json_build_object(
                 'adm1_vi', adm1_vi,
                 'adm1_en',adm1_en
             )
         )
     )
 ) AS geojson
 FROM province;
 `
 const query2=` 
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
FROM river;
`
 const result1 = await pool.query(query1);
 const geojson1 = result1.rows[0].geojson;
 const items1 = geojson1.features;

 const result2 = await pool.query(query2);
 const geojson2 = result2.rows[0].geojson;
 const items2 = geojson2.features;

 res.json({
  title:'Get Post HydroElectricPlant page',
  country:items1,
  river:items2})

}catch(err){
        console.error(err);
        }
   
    }

    exports.getUpdateHydroElectricPlant= async(req,res)=>{

        let id= req.params.id
        try{
            const query1=` 
        SELECT json_build_object(
         'type', 'FeatureCollection',
         'features', json_agg(
             json_build_object(
                 'type', 'Feature',
                 'properties', json_build_object(
                     'adm1_vi', adm1_vi,
                     'adm1_en',adm1_en
                 )
             )
         )
     ) AS geojson
     FROM province;
     `
     const query2=` 
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
    FROM river;
    `
     const result1 = await pool.query(query1);
     const geojson1 = result1.rows[0].geojson;
     const items1 = geojson1.features;
    
     const result2 = await pool.query(query2);
     const geojson2 = result2.rows[0].geojson;
     const items2 = geojson2.features;

            const query = `SELECT * FROM hydroelectricplant WHERE gid = $1`;
            const result = await pool.query(query, [id]);
            const db = result.rows[0]; 
      
       console.log(db)
  
        res.json({
            title:'Update Page Hydroelectrictplant',
            data:db,
            country:items1,
            river:items2
        })
        }catch(err){
 
        console.error(err);
        }
    
    }

  exports.updateHydroElectricPlant=async(req,res)=>{
    let id=req.params.id
    try{
      const {name,capacity,electricity_output,generating_units,description,river,province,district,longitude,latitude,investor,build_state,type} =req.body 
 
        const query=`
        UPDATE  hydroelectricplant
SET name = $1,
    image = $2,
    description =$3,
    district = $4,
    province = $5,
    generating_units =$6,
    capacity = $7,
    electricity_output= $8,
    river =$9,
    longitude = $10,
    latitude = $11,
    investor = $12,
    build_state = $13,
    type = $14,
    geom = ST_SetSRID(ST_MakePoint($15,$16), 4326)
    
WHERE gid= $17;
        
        `;
      
         
         console.log(Number(longitude))
         console.log(Number(latitude))
         await pool.query(query, [name,req.file.filename,description,district,province,generating_units,capacity,electricity_output,river,longitude,latitude,investor,build_state,type,Number(longitude),Number(latitude),id]);
console.log("ok")
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}
exports.posthydroelectricplant= async(req,res)=>{
    try{
       const {name,capacity,electricity_output,generating_units,description,river,province,district,longitude,latitude,investor,build_state,type} =req.body


    const query = `
    INSERT INTO hydroelectricplant(name,image,description,district,province,generating_units,capacity,electricity_output,river,longitude,latitude,investor,build_state,type,geom)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9 , $10, $11, $12, $13,$14,ST_SetSRID(ST_MakePoint($15,$16), 4326))
  `;
  await pool.query(query, [name,req.file.filename,description,district,province,generating_units,capacity,electricity_output,river,longitude,latitude,investor,build_state,type,Number(longitude),Number(latitude)]);
 
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }
    
    exports.deleteHydroElectricPlant= async(req,res)=>{
        let id =req.params.id
      
        try{
            const query = 'DELETE FROM hydroelectricplant WHERE gid = $1';
            await pool.query(query, [id]);
        
      
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving user', type:'danger' });
        }
    
    }
    