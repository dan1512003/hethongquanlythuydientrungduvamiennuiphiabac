import React, { useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { gethydrologicalstation,deletehydrologicalstation} from "../../redux/slice/hydrologicalstation";
import { useNavigate } from 'react-router-dom';
import style from './getpagehydrologicalstation.module.css'

const Getpagehydrologicalstation = () => {
    const navigate = useNavigate();
        const dispatch = useDispatch();
        const { hydrologicalstationdata, status, error, currentPage, totalPages } = useSelector((state) => state.hydrologicalstation);

  useEffect(() => {
    dispatch(gethydrologicalstation(currentPage));  
  }, [dispatch, currentPage]);
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(gethydrologicalstation(currentPage - 1)); 
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(gethydrologicalstation(currentPage + 1)); 
    }
  };

  const handlePageClick = (page) => {
    dispatch(gethydrologicalstation(page)); 
  };
  const handleDelete= (id) => {
    dispatch(deletehydrologicalstation(id)); 
    navigate(`/admin/gethydrologicalstation`);
    dispatch(gethydrologicalstation()); 
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
                                               <div class="col-sm-8"><h2>Province</h2></div>
                                               <div class="col-sm-4">
                                                 
                                                   
                                                   <button onClick={() => navigate(`/admin/addhydrologicalstation`)} type="button" class="btn btn-info add-new" ><i class="fa fa-plus"></i> Add HydroLogical Station</button>
                                               </div>
                                           </div>
                                       </div>
                                     <table class="table table-bordered">
                                           <thead>
                                               <tr>
                                               <th>ID</th>
      <th>Name</th>
      <th>Water Flow</th>
      <th>Water Level</th>
      <th>Actions</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                           {hydrologicalstationdata.map((row, index) => (
      <tr key={row.properties.id}>
        <td>{row.properties.id}</td> 
        <td><p>{row.properties.name}</p></td>
        <td><p>{row.properties.water_flow}</p></td>
        <td><p>{row.properties.water_level}</p></td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/admin/updatehydrologicalstation/${row.properties.id}`)}
            title="Update"
          >
            Update
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.properties.id)}
            title="Delete"
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
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

export default Getpagehydrologicalstation
