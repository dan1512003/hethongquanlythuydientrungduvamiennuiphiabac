import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getupdatehydrologicalstation, updatehydrologicalstation,gethydrologicalstation } from '../../redux/slice/hydrologicalstation';

const Updatepagehydrologicalstation = () => {
    const dispatch = useDispatch();
      const navigate = useNavigate();
      const { id } = useParams();
    
      const { data} = useSelector((state) => state.hydrologicalstation);
      const [formData, setFormData] = useState({
        name: '',
        water_flow: '',
        water_level: '',
        longitude: '',
        latitude: '',
      });
    
       useEffect(() => {
          dispatch(getupdatehydrologicalstation(id));
        }, [dispatch, id]);
        
      useEffect(() => {
        if (data) {
          setFormData({
            name: data.name || '',
            water_flow: data.water_flow || '',
            water_level: data.water_level || '',
            longitude: data.longitude || '',
            latitude: data.latitude || '',
          });
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
          dispatch(updatehydrologicalstation({ data: formData, id }));
        
            dispatch(gethydrologicalstation(1)); 
                     navigate(`/admin/gethydrologicalstation`);
        };
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>UPDATE HYDROLOGICAL STATION</h2>
      <div style={{ marginTop: '20px' }} className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="water_flow">Water flow</label>
        <input
          type="text"
          className="form-control"
          name="water_flow"
          value={formData.water_flow}
          onChange={handleChange}
        />

        <label htmlFor="water_level">Water level</label>
        <input
          type="text"
          className="form-control"
          name="water_level"
          value={formData.water_level}
          onChange={handleChange}
        />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          className="form-control"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />

        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          className="form-control"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
      </div>

      <button style={{ marginTop: '10px' }} type="submit" className="btn btn-success">
        UPDATE
      </button>
    </form>
    </div>
  )
}

export default Updatepagehydrologicalstation
