import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registeradmin} from "../../redux/slice/auth";

const Registeradmin = () => {
  const dispatch = useDispatch();
    const { registerStatus, error } = useSelector((state) => state.auth);
  const[iserr,setiserr]=useState(false)
    const [formData, setFormData] = useState({
      adminName: '',
      email: '',
      password: '',
      rePassword: '',
    });
  
    const handleChange = (e) => {
      setiserr(false)
      setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(registeradmin(formData));
    };
  
    useEffect(() => {
      if (registerStatus === 'succeeded') {
        alert('Đăng ký thành công!');
      }else if(registerStatus === 'failed' && error ){
  setiserr(true)
      }
    }, [registerStatus,error]);
  
    return (
      <div style={{ height: '100vh' }} className="container d-flex justify-content-center align-items-center">
        <form id="formRegister" style={{ width: '400px' }} onSubmit={handleSubmit}>
          <h3 className="text-center">Đăng ký tài khoản</h3>
  
          {iserr && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
  
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Tên tài khoản</label>
            <input
              type="text"
              name="userName"
              className="form-control"
              id="userName"
              placeholder="Tên tài khoản"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              placeholder="Nhập Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">Nhập lại mật khẩu</label>
            <input
              type="password"
              name="rePassword"
              className="form-control"
              id="rePassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.rePassword}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <button type="submit" style={{ width: '100%' }} className="btn btn-primary">
              Đăng ký
            </button>
          </div>
  
          <p className="text-center mt-2">
            Bấm vào đây để chuyển đến trang đăng nhập <Link to="/loginadmin">Đăng nhập</Link>
          </p>
        </form>
      </div>
    );
}

export default Registeradmin
