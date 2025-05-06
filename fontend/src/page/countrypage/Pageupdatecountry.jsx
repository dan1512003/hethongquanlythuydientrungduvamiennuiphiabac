import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getupdateProvinces, updateProvinces } from '../../redux/slice/province';

const Pageupdatecountry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data,status,error } = useSelector((state) => state.province);

  const [formData, setFormData] = useState({
         adm1_en: '',
         adm1_vn: '',
         geom: '',
       });
     

  useEffect(() => {
    dispatch(getupdateProvinces(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (data && data.adm1_en) {
      setFormData({
        adm1_en: data.adm1_en || '',
        adm1_vi: data.adm1_vn || '',
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
    dispatch(updateProvinces({ data: formData, id }));
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    navigate('/admin');
  };

  return (
    <div className="container mt-4">
      <h2>UPDATE PROVINCE</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Province Detail (VI):</label>
          <input
            type="text"
            className="form-control"
            name="adm1_vn"
            value={formData.adm1_vn}
            onChange={handleChange}
          />
          <label>Province (EN):</label>
          <input
            type="text"
            className="form-control"
            name="adm1_en"
            value={formData.adm1_en}
            onChange={handleChange}
          />
          <label>Geometry:</label>
          <input
            type="text"
            className="form-control"
            name="geom"
            value={formData.geom}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Pageupdatecountry;
