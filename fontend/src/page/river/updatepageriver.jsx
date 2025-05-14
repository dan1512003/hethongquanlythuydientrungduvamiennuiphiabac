import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getupdateriver,
  updateriver,
  getriver
} from '../../redux/slice/river'; 

const Updatepageriver = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data} = useSelector((state) => state.river); 
  const [formData, setFormData] = useState({
    name: '',
    geom: '',
  });

  useEffect(() => {
    dispatch(getupdateriver(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        geom: '', 
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
    dispatch(updateriver({ id, data: formData }));



    dispatch(getriver(1));
    navigate('/admin/getRiver');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>UPDATE RIVER</h2>
        <div style={{ marginTop: '20px' }} className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="geom">Geometry</label>
          <input
            type="text"
            className="form-control"
            name="geom"
            value={formData.geom}
            onChange={handleChange}
          />
        </div>
        <button style={{ marginTop: '10px' }} type="submit" className="btn btn-success">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Updatepageriver;