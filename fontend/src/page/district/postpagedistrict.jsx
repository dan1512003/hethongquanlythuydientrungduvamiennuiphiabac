import React, { useState} from 'react';
import { useDispatch} from 'react-redux';
import { adddistrict,getalldistrict} from "../../redux/slice/district";
import { useNavigate,useParams } from 'react-router-dom';
const Postpagedistrict = () => {
    const { adm1_vi,adm1_en } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
          
    const [formData, setFormData] = useState({
        adm1_en,
        adm1_vi,
        adm2_vi: '',
        adm2_en: '',
        geom: '',
      });
    const handleChange = (e) => {
            setFormData({ 
              ...formData, 
              [e.target.name]: e.target.value 
            });
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(adddistrict(formData));
            dispatch(getalldistrict({page:1,adm1_vi,adm1_en})); 
            navigate(`/admin/getdistrict/${adm1_vi}/${adm1_en}`);
          };
    
    return (
        <div>
             <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>ADD DISTRICT</h2>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <input type="hidden" name="adm1_en" value={adm1_en} />
                  <input type="hidden" name="adm1_vi" value={adm1_vi} />

                  <label>District detail:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adm2_vi"
                    onChange={handleChange}
                  />

                  <label>District:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="adm2_en"
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
                <button type="submit" className="btn btn-success" style={{ marginTop: '10px' }}>
                  Add
                </button>
              </form>
        </div>
    )
}

export default Postpagedistrict
