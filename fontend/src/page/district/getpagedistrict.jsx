import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getalldistrict,deletedistrict} from "../../redux/slice/district";
import style from "./pagegetdistrict.module.css"
import {useNavigate,useParams } from 'react-router-dom';
const Getpagedistrict = () => {
    const { adm1_vi,adm1_en } = useParams();
    const navigate = useNavigate();
            const dispatch = useDispatch();
            const { districtdata, status, error, currentPage, totalPages } = useSelector((state) => state.district);
    useEffect(() => {
        dispatch(getalldistrict({page:currentPage,adm1_vi,adm1_en}));  
      }, [dispatch, currentPage,adm1_vi,adm1_en]);

      const handlePrevious = () => {
        if (currentPage > 1) {
          dispatch(getalldistrict({
            page: currentPage - 1,
            adm1_vi,
            adm1_en,
          }));
        }
      };
      const handleNext = () => {
        if (currentPage < totalPages) {
          dispatch(getalldistrict({
            page: currentPage + 1,
            adm1_vi,
            adm1_en,
          }));
        }
      };
    
      const handlePageClick = (page) => {
        dispatch(getalldistrict({page,adm1_vi,adm1_en})); 
      };
      const handleDelete= (id) => {
        dispatch(deletedistrict(id)); 
        dispatch(getalldistrict({currentPage,adm1_vi,adm1_en})); 
        navigate(`/admin/getdistrict/${adm1_vi}/${adm1_en}`);
        
      };
      if (status === 'loading') return <p>Loading...</p>;
      if (status === 'failed') return <p>Error: {error}</p>;
    
    return (
       <div>
      
      
             
            <div class="container-lg">
                               <div class="table-responsive">
                                   <div class="table-wrapper">
                                       <div class="table-title">
                                           <div class="row">
                                               <div class="col-sm-8"><h2>District</h2></div>
                                               <div class="col-sm-4">
                                                 
                                                   
                                               <button 
  onClick={() => navigate(`/admin/adddistrict/${adm1_vi}/${adm1_en}`)} 
  type="button" 
  className="btn btn-info add-new"
>
  <i className="fa fa-plus"></i> Add District
</button>
                                               </div>
                                           </div>
                                       </div>
                                     <table class="table table-bordered">
                                           <thead>
                                               <tr>
                                               <th>id</th>
                                             <th>Province </th>
                                             <th>District</th>
                                            <th>Actions</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                           {districtdata.map((row) => (
                                         <tr key={row.properties.id}>
                                            <td>{row.properties.id}</td>
                                             <td>{row.properties.adm1_vi}</td>
                                             <td>{row.properties.adm2_vi}</td>

                                               <td>
      
                                               <button  className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/updatedistrict/${adm1_vi}/${adm1_en}/${row.properties.id}`)}   data-toggle="tooltip">Update</button>
                                               <button  className="btn btn-sm btn-danger" onClick={()=>handleDelete(row.properties.id)} style={{ marginLeft: '10px' }} data-toggle="tooltip">Delete</button>
                    </td>
                  </tr>
                ))}
             
                                   
                                           </tbody>
                                       </table>
          
                           
            
             
             
                                   </div>
                               </div>
                           </div>  
      
      
                
      
      
      
      
                           <div className={style.pagination}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Trang trước
        </button>
      
        <div className={style.page}>
          {currentPage > 2 && (
            <>
              <button onClick={() => handlePageClick(1)}>1</button>
              {currentPage > 3 && <span>...</span>}
            </>
          )}
      
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) =>
              page === currentPage ||
              page === currentPage - 1 ||
              page === currentPage + 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={page === currentPage ? style.active : ''}
              >
                {page}
              </button>
            ))}
      
          {currentPage < totalPages -1 && (
            <>
              {currentPage < totalPages - 2 && <span>...</span>}
              <button onClick={() => handlePageClick(totalPages)}>
                {totalPages}
              </button>
            </>
          )}
        </div>
      
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>
          </div>
    )
}

export default Getpagedistrict
