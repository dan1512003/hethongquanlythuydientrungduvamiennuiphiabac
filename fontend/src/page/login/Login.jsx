import React,{useState,useEffect} from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import { login } from "../../redux/slice/auth";
import { useDispatch,useSelector} from 'react-redux';

const Login = () => {
  const[iserr,setiserr]=useState(false)
  const { loginStatus, error, token } = useSelector((state) => state.auth);
       const navigate = useNavigate();
const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
const dispatch = useDispatch();
  const handleChange = (e) => {
    setiserr(false)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
        
  };
   
 useEffect(() => {
   if (loginStatus === 'succeeded' && token) {
   
      alert('Login successful!');
      navigate("/")
    } 

 else if(loginStatus=== 'failed' && error ){
setiserr(true)
    }
  }, [loginStatus,error,token,navigate]);
 
    return (
        <div style={{ height: '100vh' }} className="container d-flex justify-content-center align-items-center">
      <form id="formLogin" style={{ width: '400px' }} onSubmit={handleSubmit}>
        <h3 className="text-center">Đăng nhập tài khoản</h3>
 {iserr && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
         
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Nhập Email or Username"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
 
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" style={{ width: '100%' }} className="btn btn-primary">Đăng nhập</button>
        </div>

        <p className="text-center mt-2">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </div>
    )
}

export default Login
