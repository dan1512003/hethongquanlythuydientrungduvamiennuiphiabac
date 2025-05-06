import React, { useState, useEffect } from 'react';
import './pageposthydroelectricplant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getaddHydroElectricplant,getdistrict,addHydroElectricplant,gethydroelectricplant} from '../../redux/slice/hydroelectrictplant';
const Pageposthyrdroelectricplant  = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const { province,district,river } = useSelector((state) => state.hydroelectrictplant);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    electricity_output: '',
    generating_units: '',
    image: '',
    latitude: '',
    longitude: '',
    investor: '',
    build_state: '',
    description: '',
    river: '',
    province: '',
    district: '',
    type: ''

  });
useEffect(() => {
dispatch(getaddHydroElectricplant())
  }, [dispatch]);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData((prev) => ({ ...prev, province: selectedProvince }));
   
    dispatch(getdistrict(selectedProvince))
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
  
    dispatch(addHydroElectricplant(payload));
    dispatch(gethydroelectricplant(1))
    navigate('/admin/gethydroelectricplant');

  };

  return (

    <form onSubmit={handleSubmit} encType="multipart/form-data" className="container mt-3">
    <h2>ADD HYDROELECTRIC PLANT</h2>
  
    <label htmlFor="name">Name:</label>
    <input name="name" className="form-control my-2" placeholder="Name" onChange={handleChange} required />
  
    <label htmlFor="capacity">Capacity:</label>
    <input name="capacity" className="form-control my-2" placeholder="Capacity" onChange={handleChange} required />
  
    <label htmlFor="electricity_output">Electricity Output:</label>
    <input name="electricity_output" className="form-control my-2" placeholder="Electricity Output" onChange={handleChange} required />
  
    <label htmlFor="generating_units">Generating Units:</label>
    <input name="generating_units" className="form-control my-2" placeholder="Generating Units" onChange={handleChange} required />
  
    <label htmlFor="image">Image:</label>
    <input name="image" type="file" className="form-control my-2" onChange={handleChange} required />
  
    <label htmlFor="latitude">Latitude:</label>
    <input name="latitude" className="form-control my-2" placeholder="Latitude" onChange={handleChange} required />
  
    <label htmlFor="longitude">Longitude:</label>
    <input name="longitude" className="form-control my-2" placeholder="Longitude" onChange={handleChange} required />
  
    <label htmlFor="investor">Investor:</label>
    <input name="investor" className="form-control my-2" placeholder="Investor" onChange={handleChange} required />
  
    <label htmlFor="build_state">Build State:</label>
    <input name="build_state" className="form-control my-2" placeholder="Build State" onChange={handleChange} required />
  
    <label htmlFor="description">Description:</label>
    <textarea name="description" className="form-control my-2" placeholder="Description" onChange={handleChange}></textarea>
  
    <label htmlFor="river">River:</label>
    <select name="river" className="form-control my-2" onChange={handleChange}>
      <option value="">-- Select River --</option>
      {river.map((r, i) => (
        <option key={i} value={r.properties.name}>
          {r.properties.name}
        </option>
      ))}
    </select>
  
    <label htmlFor="province">Province:</label>
    <select className="form-control my-2" onChange={handleProvinceChange}>
      <option value="">-- Select Province --</option>
      {province.map((p, i) => (
        <option key={i} value={p.properties.adm1_en}>
          {p.properties.adm1_vi}
        </option>
      ))}
    </select>
  
    <label htmlFor="district">District:</label>
    <select name="district" className="form-control my-2" onChange={handleChange}>
      <option value="">-- Select District --</option>
      {district.map((d, i) => (
        <option key={i} value={d.properties.adm2_en}>
          {d.properties.adm2_vi}
        </option>
      ))}
    </select>
  
    <label htmlFor="type">Type:</label>
    <select name="type" className="form-control my-2" onChange={handleChange}>
      <option value="">-- Select Type --</option>
      <option value="Reservoir Hydro">Reservoir Hydro</option>
      <option value="Run-of-River Hydro">Run-of-River Hydro</option>
    </select>
  
    <button type="submit" className="btn btn-success">Add</button>
  </form>

  );
}

export default Pageposthyrdroelectricplant
