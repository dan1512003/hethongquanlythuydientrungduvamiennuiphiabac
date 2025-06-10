import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import style from "./main.module.css";
import Icon1 from "../../components/Icon/Icon1";
import Icon2 from "../../components/Icon/Icon2";
import Icon3 from "../../components/Icon/Icon3";
import Icon4 from "../../components/Icon/Icon4"
import layer from "../../assets/layer.PNG"; 
import { RMap, RMarker ,RNavigationControl,RPopup, gradientMarkerPopupOffset,RSource,RLayer} from "maplibre-react-components";
import { useState,useEffect} from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {   
  setCheckFind,
  setCheckFilter,
  setFilterRiver,
  setFilterProvince,
 
} from '../../redux/slice/filter'

function Main() {
   const {    
    location, 
    river, 
    filterRiver, 
    filterProvincer, 
    checkFind
  } = useSelector(state => state.filter)
  const{
    hydroelectricplant,
     findactive
  
  }=useSelector(state => state.findhydroelectrictplant)
   const dispatch = useDispatch()
  const [showPopup, setShowPopup] = useState({});
  const mountain = [104.193703,22.131194];  
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [lakeData, setLakeData] = useState([]);
  const [riverData, setRiverData] = useState([]);
  const [hydroelectricplantData, setHydroelectricplantData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [geojson4, setGeojsonData4] = useState(null);
  const [geojson2, setGeojsonData2] = useState(null);
  const [geojson3, setGeojsonData3] = useState(null);
  const [urlformat, setUrlformat] = useState(null);
  const [haslayerdrought,setHasLayerDrought]=useState(false);
  const [haslayerndwi,setHasLayerNdwi]=useState(false);
  const [haslayerrainfall,setHasLayerRainfall]=useState(false);
 const[ palette,setpalette]=useState([])
const [findhep,setfindhep]=useState(false)
  const [isOpen, setIsOpen] = useState(true);
  const [findValue, setFindValue] = useState('');
  const [hydrologicalstationData, setHydrologicalstationData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); 
  const [hasFilterRiver, setHasFilterRiver] = useState(false); 
  const [hasFilterProvince, setHasFilterProvince] = useState(false);
  const [dataFilterRiver, setDataFilterRiver] = useState([]);
  const [dataFilterProvince ,setDataFilterProvince] = useState([]); 

 const [geojon2River, setGeojson2River] = useState([]);
 const [geojon2Province, setGeojson2Province] = useState([]);
  const[latitude, setLatitude] = useState([]);
  const[longitude, setLongitude] = useState([]);
 const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const fetchGeojsonData = async () => {
    try{
      const response = await fetch('http://localhost:3000/admin/getapihydroelectricplant');
      const data = await response.json();
      setGeojsonData4(data.geojson4);
      setGeojsonData2(data.geojson2);
      setGeojsonData3(data.geojson3);

      console.log('GeoJSON data:', data.geojson);
    } catch (error) {
   console.error('Error fetching geojson data:', error);
    }
  
  };

 useEffect(() => {
if(findactive){
setfindhep(findactive);
setHasSearched(false);
setHasFilterRiver(false);
setHasFilterProvince(false);
}
 }, [findactive,dispatch]);
useEffect(() => {
fetchGeojsonData();
  
}, [])
  useEffect(() => {
  
    
    const fetchData = async () => {
      try {
        if (filterRiver) {
          fetch(`http://localhost:3000/admin/filterriver?river=${river}`)
            .then(res => res.json())
            .then(data => {
        ;


setHasFilterRiver(filterRiver);
setDataFilterRiver(data.geojson?.features || []);

setfindhep(false)
setGeojson2River(data.geojson2?.features || []);
setHasSearched(false);
setLatitude(data.latitude);
setLongitude(data.longitude);
             
            });
        }
       if (filterProvincer) {
        fetch(`http://localhost:3000/admin/filterprovinces?location=${location}`)
          .then(res => res.json())
          .then(data => {
            setHasFilterProvince(filterProvincer);
            setDataFilterProvince(data.geojson?.features || []);
       

            setGeojson2Province(data.geojson2?.features || []);
            setfindhep(false)
            setHasSearched(false); 
            setLatitude(data.latitude);
            setLongitude(data.longitude);
          });
      }
        
      
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
  
      fetchData();
 


  }, [location, river, filterRiver, filterProvincer]);
useEffect(() => {
 
    console.log('Palette:', palette);
  
}, [palette]);




const changeLayer= async (layer) => {
  console.log(layer)
  try{
    if(layer==='ndwi'){
      const response =await fetch('http://localhost:3000/admin/apigeendwi');
      const data = await response.json();
      setUrlformat(data.urlFormat)
    
      setHasLayerDrought(false);
      setHasLayerNdwi(prevState => !prevState)
      console.log(haslayerndwi)
      setHasLayerRainfall(false)
    }
    if(layer==='drought'){
      const response =await fetch('http://localhost:3000/admin/apigeedrought');
      const data = await response.json();
      setUrlformat(data.urlFormat)
      setpalette(data.palette)
      setHasLayerDrought(prevState => !prevState);
      setHasLayerNdwi(false)
      setHasLayerRainfall(false)
    }
    if(layer==='rainfall'){
      const response =await fetch('http://localhost:3000/admin/apigeerainfall');
      const data = await response.json();
      setUrlformat(data.urlFormat)
       setpalette(data.palette)
      setHasLayerDrought(false);
      setHasLayerNdwi(false)
      setHasLayerRainfall(prevState => !prevState)
    }

 
    
    
  

  } catch (error) {
 console.error('Error fetching geojson data:', error);
  }

};

 function handleSpanClick  (e) {
 
  const span = e.currentTarget.querySelector('span');
  const text = span?.innerText || '';

    setKeyword(text); 
  
};
const handleClick= () => {
 dispatch(setCheckFilter(false));
 dispatch(setCheckFind(true));
 
 
   
  };
 const handleKeyDown = async(e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 

    fetch('http://localhost:3000/admin/search', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ keyword: keyword })  
    })
      .then(res => res.json())  
      .then(data => {
     
        const features = data.geojson?.features || [];
        setFindValue(data.find);
        setResults(features);
        setHasSearched(true); 
        setFilterProvince(false);
        setFilterRiver(false);
        setfindhep(false);
        console.log(results)
      })
      .catch(error => {
        console.error('Lỗi khi tìm kiếm:', error);
      });
 
  }
};


useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedKeyword(keyword);
  }, 500); 

  return () => clearTimeout(timer); 
}, [keyword]);

useEffect(() => {
  if (!debouncedKeyword.trim()) return; 
  fetch('http://localhost:3000/admin/find', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword: debouncedKeyword }),
  })
    .then(res => res.json())
    .then(data => {
      const hydroelectricplant = data.resulthydroelectricplant?.slice(0, 5) || [];
      const lake = data.resultlake?.slice(0, 5 - hydroelectricplant.length) || [];
      const hydrologicalstation = data.resulthydrologicalstation?.slice(0, 5 - hydroelectricplant.length - lake.length) || [];
      const province = data.resultprovincer?.slice(0, 5 - hydroelectricplant.length - lake.length - hydrologicalstation.length) || [];
      const district = data.resultdistrict?.slice(0, 5 - hydroelectricplant.length - lake.length - hydrologicalstation.length - province.length) || [];
      const river = data.resultriver?.slice(0, 5 - hydroelectricplant.length - lake.length - hydrologicalstation.length - province.length - district.length) || [];

      setHydroelectricplantData(hydroelectricplant);
      setProvinceData(province);
      setDistrictData(district);
      setLakeData(lake);
      setRiverData(river);
      setHydrologicalstationData(hydrologicalstation);
    })
    .catch(error => console.error('Lỗi khi tìm kiếm:', error));
}, [debouncedKeyword]);

const handleKeyChange = (e) => {
  e.preventDefault();
  setKeyword(e.target.value);
};


const togglePopup = (id,name) => {
  setShowPopup((prevState) => ({
    [id]: !prevState[id], 
    [name]: !prevState[name]
  }));
};
const handleToggle = () => {
  setIsOpen(prev => !prev);
};
const townFillPaint = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(0,0,0,0.3)",
};


  if (!geojson2) {
    return <div>Loading...</div>;
  }


    return(
        <div  className={style.homeContainer}>

<div className={`${style.navbarContainer} ${isOpen ? style.open : style.closed}`}>
  <Outlet />
</div>
           <div className={style.mapContainer}>
     
 { findhep  && (
          

    <RMap


      minZoom={6}
      initialCenter={[Number(hydroelectricplant.longitude), Number(hydroelectricplant.latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      >
      
      <RMarker
                 
                 longitude={Number(hydroelectricplant.longitude)}
                 latitude={Number(hydroelectricplant.latitude)}
                 onClick={(e) => {
                   e.stopPropagation();
                   togglePopup(hydroelectricplant.gid,hydroelectricplant.name); 
                 }}
               >
         {hydroelectricplant.type === 'Reservoir Hydro'? <Icon3/>:<Icon2/>
         } 
                </RMarker>
                {showPopup[hydroelectricplant.gid] && showPopup[hydroelectricplant.name] && (
                   <RPopup
                   longitude={Number(hydroelectricplant.longitude)}
                   latitude={Number(hydroelectricplant.latitude)}
                    offset={gradientMarkerPopupOffset}
                   >
                    
                 <div style={{ maxWidth: '250px' }}>
           <h3>{hydroelectricplant.name}</h3>
           <p><strong>Tỉnh:</strong> {hydroelectricplant.province}</p>
           <p><strong>Dòng sông:</strong> {hydroelectricplant.river}</p>
           <p><strong>Vĩ độ:</strong> {hydroelectricplant.latitude}</p>
           <p><strong>Kinh độ:</strong> {hydroelectricplant.longitude}</p>
           <p><strong>Loại thuỷ điện:</strong>{hydroelectricplant.type}</p>
           <Link to={`/info/${hydroelectricplant.gid}`}>
  Bấm vào đây để xem chi tiết
</Link>
           
       
                   
           </div>
                   </RPopup>
           )}
             {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
  <React.Fragment>
    <RSource
      id="gee-tiles"
      key={urlformat}
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles"
      type="raster"
    />
  </React.Fragment>
)}
      </RMap>
      
          



       
           )}




           { hasSearched  && (
          
          results.map((feature)=>{
          


       
     
if(feature.geometry.type === "Point"){
  if(findValue ==='hydroelectricplant'){
 
    return(
    <RMap


      minZoom={6}
      initialCenter={[Number(feature.properties.longitude), Number(feature.properties.latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
      >
      
      <RMarker
                 
                 longitude={Number(feature.properties.longitude)}
                 latitude={Number(feature.properties.latitude)}
                 onClick={(e) => {
                   e.stopPropagation();
                   togglePopup(feature.properties.id,feature.properties.name); 
                 }}
               >
         { feature.properties.type === 'Reservoir Hydro'? <Icon3/>:<Icon2/>
         } 
                </RMarker>
                {showPopup[feature.properties.id] && showPopup[feature.properties.name] && (
                   <RPopup
                   longitude={Number(feature.properties.longitude)}
                   latitude={Number(feature.properties.latitude)}
                    offset={gradientMarkerPopupOffset}
                   >
                    
                 <div style={{ maxWidth: '250px' }}>
           <h3>{feature.properties.name}</h3>
           <p><strong>Tỉnh:</strong> {feature.properties.province}</p>
           <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
           <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
           <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
           <p><strong>Loại thuỷ điện:</strong>{feature.properties.type}</p>
           <Link to={`/info/${feature.properties.id}`}>
  Bấm vào đây để xem chi tiết
</Link>
           
       
                   
           </div>
                   </RPopup>
           )}
             {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
  <React.Fragment>
    <RSource
      id="gee-tiles"
      key={urlformat}
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles"
      type="raster"
    />
  </React.Fragment>
)}
      </RMap>
      )

  }else{
    return(
      <RMap


minZoom={6}
initialCenter={[Number(feature.properties.longitude), Number(feature.properties.latitude)]}
mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
>

<RMarker
           
           longitude={Number(feature.properties.longitude)}
           latitude={Number(feature.properties.latitude)}
           onClick={(e) => {
             e.stopPropagation();
             togglePopup(feature.properties.id,feature.properties.name); 
           }}
         >
          <Icon1/>
          </RMarker>
          {showPopup[feature.properties.id] && showPopup[feature.properties.name] &&  (
             <RPopup
             longitude={Number(feature.properties.longitude)}
             latitude={Number(feature.properties.latitude)}
              offset={gradientMarkerPopupOffset}
             >
              
           <div style={{ maxWidth: '250px' }}>
     <h3>{feature.properties.name}</h3>
     <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
     <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
     <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
     <p><strong>Lưu lượng nước:</strong>{feature.properties.water_flow}</p>
     <p> <strong>Mực nước</strong>{feature.properties.water_level}</p>
    
     </div>
             </RPopup>
     )}
       {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
  <React.Fragment>
    <RSource
      id="gee-tiles"
      key={urlformat}
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles"
      type="raster"
    />
  </React.Fragment>
)}
</RMap>
    )

  }
}
else{
if(findValue ==='lake'){
          const featureId = feature.properties.id;
          const sourceId = `town-${featureId }`;
          const layerId = `town-fill-${featureId }`;
          const borderLayerId = `town-border-${featureId }`;
  return(

    <RMap


minZoom={6}
initialCenter={[Number(feature.properties.longitude), Number(feature.properties.latitude)]}
mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
>
<RMarker
        longitude={Number(feature.properties.longitude)}
        latitude={Number(feature.properties.latitude)}
        onClick={(e) => {
          e.stopPropagation();
          togglePopup(featureId, feature.properties.name);
        }}
      ><Icon4/></RMarker>

      {showPopup[featureId] && showPopup[feature.properties.name] && (
        <RPopup
          longitude={Number(feature.properties.longitude)}
          latitude={Number(feature.properties.latitude)}
          offset={gradientMarkerPopupOffset}
        >
          <div style={{ maxWidth: '250px' }}>
            <h3>{feature.properties.name}</h3>
            <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
            <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
            <p><strong>Mực nước chết:</strong> {feature.properties.dead_water_level}</p>
            <p><strong>Mực nước dâng bình thường:</strong> {feature.properties.normal_water_level}</p>
          </div>
        </RPopup>
      )}

<RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
              
             
              <RLayer
                key={layerId}
                id={layerId}
                source={sourceId}
                type="fill"
                paint={townFillPaint}
              />
  
           
              <RLayer
                key={borderLayerId}
                id={borderLayerId}
                source={sourceId}
                type="line"
                paint={{
                  'line-color': '#000000',
                  'line-width': 2,
                  'line-opacity': 1
                }}
              />
              {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
          <React.Fragment>
          <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
          </React.Fragment>
        )}
</RMap>
  )



}else {
  const featureId = feature.properties.id;
  const sourceId = `town-${featureId }`;
  const layerId = `town-fill-${featureId }`;
  const borderLayerId = `town-border-${featureId }`;
  return(
    <RMap


minZoom={6}
initialCenter={[Number(feature.properties.longitude), Number(feature.properties.latitude)]}
mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
>
<RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
              
             
              <RLayer
                key={layerId}
                id={layerId}
                source={sourceId}
                type="fill"
                paint={townFillPaint}
              />
  
           
              <RLayer
                key={borderLayerId}
                id={borderLayerId}
                source={sourceId}
                type="line"
                paint={{
                  'line-color': '#000000',
                  'line-width': 2,
                  'line-opacity': 1
                }}
              />

{(haslayerndwi || haslayerdrought || haslayerrainfall) && (
          <React.Fragment>
           <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
          </React.Fragment>
        )}
</RMap>
  )

}
}

    

          })
       
           )}




      { !hasSearched && !hasFilterRiver && !hasFilterProvince && (
       <RMap
 
       minZoom={6}
      initialCenter={mountain}  
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
  
>
      <RNavigationControl />
      {geojson4.features.map((feature) => {
  const featureId = feature.properties.id;
  const sourceId = `town-${featureId}`;
  const layerId = `town-fill-${featureId}`;

  return (
    <React.Fragment key={featureId}>
      <RMarker
        longitude={Number(feature.properties.longitude)}
        latitude={Number(feature.properties.latitude)}
        onClick={(e) => {
          e.stopPropagation();
          togglePopup(featureId, feature.properties.name);
        }}
      ><Icon4/></RMarker>

      {showPopup[featureId] && showPopup[feature.properties.name] && (
        <RPopup
          longitude={Number(feature.properties.longitude)}
          latitude={Number(feature.properties.latitude)}
          offset={gradientMarkerPopupOffset}
        >
          <div style={{ maxWidth: '250px' }}>
            <h3>{feature.properties.name}</h3>
            <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
            <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
            <p><strong>Mực nước chết:</strong> {feature.properties.dead_water_level}</p>
            <p><strong>Mực nước dâng bình thường:</strong> {feature.properties.normal_water_level}</p>
          </div>
        </RPopup>
      )}

      <RSource id={sourceId} type="geojson" data={feature} />
      <RLayer
        id={layerId}
        source={sourceId}
        type="fill"
        paint={townFillPaint}
      />
    </React.Fragment>
  );
})}

 {geojson3.features.map((feature) => {
        
        return (
      
      <React.Fragment  key={feature.properties.id}>
      
          <RMarker
           
            longitude={Number(feature.properties.longitude)}
            latitude={Number(feature.properties.latitude)}
            onClick={(e) => {
              e.stopPropagation();
              togglePopup(feature.properties.id,feature.properties.name); // Toggle popup visibility for each feature
            }}
          >
           <Icon1/>
           </RMarker>
           {showPopup[feature.properties.id] && showPopup[feature.properties.name] &&  (
              <RPopup
              longitude={Number(feature.properties.longitude)}
              latitude={Number(feature.properties.latitude)}
               offset={gradientMarkerPopupOffset}
              >
               
            <div style={{ maxWidth: '250px' }}>
      <h3>{feature.properties.name}</h3>
      <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
      <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
      <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
      <p><strong>Lưu lượng nước:</strong>{feature.properties.water_flow}</p>
      <p> <strong>Mực nước</strong>{feature.properties.water_level}</p>
     
      </div>
              </RPopup>
      )}
           </React.Fragment>
          
       
        );
      })}


{geojson2.features.map((feature) => {
        
        return (
      
      <React.Fragment  key={feature.properties.id}>
      
          <RMarker
           
            longitude={Number(feature.properties.longitude)}
            latitude={Number(feature.properties.latitude)}
            onClick={(e) => {
              e.stopPropagation();
              togglePopup(feature.properties.id,feature.properties.name); 
            }}
          >
    { feature.properties.type === 'Reservoir Hydro'? <Icon3/>:<Icon2/>
    } 
           </RMarker>
           {showPopup[feature.properties.id] && showPopup[feature.properties.name] && (
              <RPopup
              longitude={Number(feature.properties.longitude)}
              latitude={Number(feature.properties.latitude)}
               offset={gradientMarkerPopupOffset}
              >
               
            <div style={{ maxWidth: '250px' }}>
      <h3>{feature.properties.name}</h3>
      <p><strong>Tỉnh:</strong> {feature.properties.province}</p>
      <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
      <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
      <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
      <p><strong>Loại thuỷ điện:</strong>{feature.properties.type}</p>
      <Link to={`/info/${feature.properties.id}`}>
  Bấm vào đây để xem chi tiết
</Link>
      
  
              
      </div>
              </RPopup>
      )}
           </React.Fragment>
          
       
        );
      })}
  {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
  <React.Fragment>
  <RSource
  id="gee-tiles-source"
  type="raster"
  tiles={urlformat ? [urlformat] : []}
  tileSize={256}
/>
<RLayer
  id="gee-tiles-layer"
  source="gee-tiles-source"
  type="raster"
  layout={{
    visibility: urlformat ? 'visible' : 'none'
  }}
/>
  </React.Fragment>
)}
</RMap>
  ) }
      
  {hasFilterProvince && !filterRiver && (
  (dataFilterProvince.length > 0 ? (
    <RMap
      minZoom={6}
      initialCenter={[Number(longitude), Number(latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
      <RNavigationControl />

      {dataFilterProvince.map((feature, index) => {
        const id = feature.properties.id || index;
        const lng = parseFloat(feature.properties.longitude);
        const lat = parseFloat(feature.properties.latitude);
        const sourceId = `town-${id}`;
        const fillLayerId = `town-fill-${id}`;
        const borderLayerId = `town-border-${id}`;

        return (
          <React.Fragment key={id}>
            <RMarker
              longitude={lng}
              latitude={lat}
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(id, feature.properties.name);
              }}
            >
              {feature.properties.type === 'Reservoir Hydro' ? <Icon3 /> : <Icon2 />}
            </RMarker>

            {showPopup[id] && showPopup[feature.properties.name] && (
              <RPopup
                longitude={lng}
                latitude={lat}
                offset={gradientMarkerPopupOffset}
              >
                <div style={{ maxWidth: '250px' }}>
                  <h3>{feature.properties.name}</h3>
                  <p><strong>Tỉnh:</strong> {feature.properties.province}</p>
                  <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
                  <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
                  <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
                  <p><strong>Loại thuỷ điện:</strong> {feature.properties.type}</p>
                  <Link to={`/info/${feature.properties.id}`}>
  Bấm vào đây để xem chi tiết
</Link>
                </div>
              </RPopup>
            )}

            <RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
            <RLayer
              key={fillLayerId}
              id={fillLayerId}
              source={sourceId}
              type="fill"
              paint={townFillPaint}
            />
            <RLayer
              key={borderLayerId}
              id={borderLayerId}
              source={sourceId}
              type="line"
              paint={{
                'line-color': '#000000',
                'line-width': 2,
                'line-opacity': 1
              }}
            />
          </React.Fragment>
        );
      })}

      {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
        <React.Fragment>
        <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
        </React.Fragment>
      )}
    </RMap>
  ) : (
    <RMap
      minZoom={6}
      initialCenter={[Number(longitude), Number(latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
      <RNavigationControl />

      {geojon2Province.map((feature, index) => {
        const sourceId = `town-${index}`;
        const fillLayerId = `town-fill-${index}`;
        const borderLayerId = `town-border-${index}`;

        return (
          <React.Fragment key={index}>
            <RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
            <RLayer
              key={fillLayerId}
              id={fillLayerId}
              source={sourceId}
              type="fill"
              paint={townFillPaint}
            />
            <RLayer
              key={borderLayerId}
              id={borderLayerId}
              source={sourceId}
              type="line"
              paint={{
                'line-color': '#000000',
                'line-width': 2,
                'line-opacity': 1
              }}
            />
          </React.Fragment>
        );
      })}

      {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
        <React.Fragment>
        <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
        </React.Fragment>
      )}
    </RMap>
  ))
)}

{hasFilterRiver && !filterProvincer && (
  dataFilterRiver.length > 0 ? (
    <RMap
      minZoom={6}
      initialCenter={[Number(longitude), Number(latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
      <RNavigationControl />

      {dataFilterRiver.map((feature, index) => {
        const id = feature.properties.id || index;
        const lng = parseFloat(feature.properties.longitude);
        const lat = parseFloat(feature.properties.latitude);
        const sourceId = `town-${id}`;
        const fillLayerId = `town-fill-${id}`;
        const borderLayerId = `town-border-${id}`;

        return (
          <React.Fragment key={id}>
            <RMarker
              longitude={lng}
              latitude={lat}
              onClick={(e) => {
                e.stopPropagation();
                togglePopup(id, feature.properties.name);
              }}
            >
              {feature.properties.type === 'Reservoir Hydro' ? <Icon3 /> : <Icon2 />}
            </RMarker>

            {showPopup[id] && showPopup[feature.properties.name] && (
              <RPopup
                longitude={lng}
                latitude={lat}
                offset={gradientMarkerPopupOffset}
              >
                <div style={{ maxWidth: '250px' }}>
                  <h3>{feature.properties.name}</h3>
                  <p><strong>Tỉnh:</strong> {feature.properties.province}</p>
                  <p><strong>Dòng sông:</strong> {feature.properties.river}</p>
                  <p><strong>Vĩ độ:</strong> {feature.properties.latitude}</p>
                  <p><strong>Kinh độ:</strong> {feature.properties.longitude}</p>
                  <p><strong>Loại thuỷ điện:</strong> {feature.properties.type}</p>
                  <Link to={`/info/${feature.properties.id}`}>
  Bấm vào đây để xem chi tiết
</Link>
                </div>
              </RPopup>
            )}

            <RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
            <RLayer
              key={fillLayerId}
              id={fillLayerId}
              source={sourceId}
              type="fill"
              paint={townFillPaint}
            />
            <RLayer
              key={borderLayerId}
              id={borderLayerId}
              source={sourceId}
              type="line"
              paint={{
                'line-color': '#000',
                'line-width': 2,
                'line-opacity': 1
              }}
            />
          </React.Fragment>
        );
      })}

      {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
        <React.Fragment>
          <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
        </React.Fragment>
      )}
    </RMap>
  ) : (
    <RMap
      minZoom={6}
      initialCenter={[Number(longitude), Number(latitude)]}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
      <RNavigationControl />

      {geojon2River.map((feature, index) => {
        const id = feature.properties.id || index;
        const sourceId = `town-${id}`;
        const fillLayerId = `town-fill-${id}`;
        const borderLayerId = `town-border-${id}`;

        return (
          <React.Fragment key={id}>
            <RSource key={sourceId} id={sourceId} type="geojson" data={feature} />
            <RLayer
              key={fillLayerId}
              id={fillLayerId}
              source={sourceId}
              type="fill"
              paint={townFillPaint}
            />
            <RLayer
              key={borderLayerId}
              id={borderLayerId}
              source={sourceId}
              type="line"
              paint={{
                'line-color': '#000',
                'line-width': 2,
                'line-opacity': 1
              }}
            />
          </React.Fragment>
        );
      })}

     {(haslayerndwi || haslayerdrought || haslayerrainfall) && (
        <React.Fragment>
             <RSource
      id="gee-tiles-source"
      type="raster"
      tiles={[urlformat]}
      tileSize={256}
    />
    <RLayer
      id="gee-tiles-layer"
      source="gee-tiles-source"
      type="raster"
      paint={{ 'raster-opacity': 0.6 }}
    />
        </React.Fragment>
      )}
    </RMap>
  )
)}


        <div className={style.findMap}>

          <input 
          className={style.inputMap} 
          type="text" 
          value={keyword}
          onChange={handleKeyChange}
          onKeyDown={handleKeyDown}
          placeholder="Tìm địa điểm..." 
          onClick={handleClick} 
          
          />


        </div>
<div  onClick={handleToggle} style={{ cursor: 'pointer' }} className={style.door}>
 {isOpen ? (
  <FontAwesomeIcon icon={faChevronLeft} />
) : (
  <FontAwesomeIcon icon={faChevronRight} />
)}
</div>

        <div className={style.container}>
  <div className={style.layer}>
    <img src={layer} alt="logo" />
  </div>

  <div className={style.showlayer}>
  <div className={style.iteam}>
  <img src={layer} alt="ndwi" onClick={() => changeLayer('ndwi')} />
  <span className={style.textiteam}>NDWI</span>
</div>

<div className={style.iteam}>
  <img src={layer} alt="luongmua" onClick={() => changeLayer('rainfall')} />
  <span className={style.textiteam}>Lượng mưa</span>
</div>

<div className={style.iteam}>
  <img src={layer} alt="hanhan" onClick={() => changeLayer('drought')} />
  <span className={style.textiteam}>Mức độ hạn hán</span>
</div>
  </div>
 
</div>
{haslayerdrought&&(
  <div className={style.palettecontainer}>
    <span style={{ fontWeight: 'bold' }}>Thang đo mức độ hạn hán</span>
      <div className={style.paletteSpan}>
          
          <span style={{ marginRight: "20px" }}> Ẩm ướt</span>
   {palette.map((bg, i) => (
        <span
          key={i}
          style={{
            background: bg,
            width: 50,        
            height: 25,       
            display: 'inline-block',
            border: '1px solid #333',
          }}
        />
      ))}
        <span style={{ marginLeft:"20px" }}>Hạn hán</span>
      </div>
    </div>
)}
  
  {haslayerrainfall&&(
  <div className={style.palettecontainer}>
    <span style={{ fontWeight: 'bold' }}>Thang đo lượng mưa</span>
      <div className={style.paletteSpan}>
          
          <span style={{ marginRight: "20px" }}> Ít mưa</span>
   {palette.map((bg, i) => (
        <span
          key={i}
          style={{
            background: bg,
            width: 75,        
            height: 25,       
            display: 'inline-block',
            border: '1px solid #333',
          }}
        />
      ))}
        <span style={{ marginLeft:"20px" }}>Mưa nhiều</span>
      </div>
    </div>
)}
  
{hydroelectricplantData.length ===0 && provinceData.length ===0 && districtData.length ===0 && riverData.length ===0 ? null:
 ( 
  checkFind  &&( <div className={style.resultfind}>
    {
  hydroelectricplantData.length > 0 &&
  hydroelectricplantData.map((item, index) => (
    <div className={style.recomand} onClick={handleSpanClick} key={index}>
      <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
      <span className={style.spantext}>{item.name}</span>,{item.province},{item.district},{item.river}
    </div>
  ))
   
  }
  
     {provinceData.length > 0 &&
    provinceData.map((item, index) => (
      <div className={style.recomand} onClick={handleSpanClick} key={index}>
        <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
        <span className={style.spantext}>{item.adm1_vi}</span>
      </div>
    ))
     
  
    
    }
      {
          districtData.length > 0 &&
          districtData.map((item, index) => (
            <div className={style.recomand} onClick={handleSpanClick} key={index}>
              <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
              <span className={style.spantext}>{item.adm2_vi}</span>,{item.adm1_vi}
            </div>
          ))
      }
         {
        riverData.length > 0 &&
          riverData.map((item, index) => (
            <div className={style.recomand} onClick={handleSpanClick} key={index}>
              <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
              <span className={style.spantext}>{item.name}</span>
            </div>
          ))
      }
         {
        lakeData.length > 0 &&
          lakeData.map((item, index) => (
            <div className={style.recomand} onClick={handleSpanClick} key={index}>
              <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
              <span className={style.spantext}>{item.name}</span>,{item.hydroelectrictplant}
            </div>
          ))
      }
       {
        hydrologicalstationData.length > 0 &&
          hydrologicalstationData.map((item, index) => (
            <div className={style.recomand} onClick={handleSpanClick} key={index}>
              <FontAwesomeIcon className={style.icon} icon={faLocationDot} />
              <span className={style.spantext}>{item.name}</span>,{item.province},{item.district},{item.river}
            </div>
          ))
      }
          </div>
          )
 )

}

        
            </div>
            
       </div>
   
    );
}
export default Main;;