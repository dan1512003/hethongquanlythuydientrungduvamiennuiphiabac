import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getupdatelake,
  updatelake,
 getlake,
} from '../../redux/slice/lake'; 
const Updatelake = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, hydroelectrictplantdata } = useSelector((state) => state.lake);
    const [formData, setFormData] = useState({
        name: '',
        dead_water_level: '',
        normal_water_level: '',
        longitude: '',
        latitude: '',
        geom: '',
        hydroelectrictplant: '',
      });
    
      useEffect(() => {
        dispatch(getupdatelake(id));
      }, [dispatch, id]);
    
      useEffect(() => {
        if (data) {
          setFormData((prev) => ({
            name: data.name || '',
            dead_water_level: data.dead_water_level || '',
            normal_water_level: data.normal_water_level || '',
            longitude: data.longitude || '',
            latitude: data.latitude || '',
            geom: '', 
            hydroelectrictplant: data.hydroelectrictplant || '',
          }));
        }
      }, [data]);

      const handleChange = (e) => {
          setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }));
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          dispatch(updatelake({ id, data: formData }));
               dispatch(getlake(1)); 
                            navigate(`/admin/getlake`);
        };
      
  return (
    <div>
       <form onSubmit={handleSubmit} className="container mt-3">
      <h2>Update Lake</h2>

      <label>Name</label>
      <input name="name" className="form-control my-2" value={formData.name} onChange={handleChange} required />

      <label>Dead Water Level</label>
      <input name="dead_water_level" className="form-control my-2" value={formData.dead_water_level} onChange={handleChange} required />

      <label>Normal Water Level</label>
      <input name="normal_water_level" className="form-control my-2" value={formData.normal_water_level} onChange={handleChange} required />

      <label>Longitude</label>
      <input name="longitude" className="form-control my-2" value={formData.longitude} onChange={handleChange} required />

      <label>Latitude</label>
      <input name="latitude" className="form-control my-2" value={formData.latitude} onChange={handleChange} required />

      <label>Geometry</label>
      <input name="geom" className="form-control my-2" value={formData.geom} onChange={handleChange} />

      <label>Hydroelectric Plant</label>
      <select
        name="hydroelectrictplant"
        className="form-control my-2"
        value={formData.hydroelectrictplant}
        onChange={handleChange}
      >
        <option value="">-- Select HydroElectrict Plant --</option>
        {hydroelectrictplantdata.map((plant, i) => (
          <option key={i} value={plant.properties.name}>
            {plant.properties.name}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-success mt-3">Update</button>
    </form>
    </div>
  )
}

export default Updatelake
