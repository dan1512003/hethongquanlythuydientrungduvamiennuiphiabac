import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getupdatedistrict, updatedistrict,getalldistrict } from '../../redux/slice/district';

const UpdateDistrict = () => {
  const { id, adm1_vi, adm1_en } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status } = useSelector(state => state.district);

  const [formData, setFormData] = useState({
    adm2_vi: '',
    adm2_en: '',
    geom: '',
  });

  useEffect(() => {
    dispatch(getupdatedistrict(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setFormData({
        adm2_vi: data.adm2_vi || '',
        adm2_en: data.adm2_en || '',
        geom: '', 
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedistrict({data:formData,id}))
    dispatch(getalldistrict({page:1,adm1_vi,adm1_en})); 
            navigate(`/admin/getdistrict/${adm1_vi}/${adm1_en}`);
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>UPDATE DISTRICT</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
       

        <div className="form-group" style={{ marginTop: '20px' }}>
          <label>District detail:</label>
          <input
            type="text"
            className="form-control"
            name="adm2_vi"
            value={formData.adm2_vi}
            onChange={handleChange}
          />

          <label>District:</label>
          <input
            type="text"
            className="form-control"
            name="adm2_en"
            value={formData.adm2_en}
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

        <button style={{ marginTop: '10px' }} type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateDistrict;