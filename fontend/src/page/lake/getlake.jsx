import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getlake, deletelake } from '../../redux/slice/lake'; 
import { useNavigate } from 'react-router-dom';
import style from './getlake.module.css'
const Getlake = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lakedata, status, error, currentPage, totalPages } = useSelector((state) => state.lake);
  
    useEffect(() => {
      dispatch(getlake(currentPage));
    }, [dispatch, currentPage]);
  
    const handlePrevious = () => {
      if (currentPage > 1) {
        dispatch(getlake(currentPage - 1));
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        dispatch(getlake(currentPage + 1));
      }
    };
  
    const handlePageClick = (page) => {
      dispatch(getlake(page));
    };
  
    const handleDelete = (id) => {
      dispatch(deletelake(id));
      dispatch(getlake(currentPage));
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
                                                       <div class="col-sm-8"><h2>Lake</h2></div>
                                                       <div class="col-sm-4">
                                                         
                                                           
                                                           <button onClick={() => navigate(`/admin/addlake`)} type="button" class="btn btn-info add-new" ><i class="fa fa-plus"></i> Add Lake</button>
                                                       </div>
                                                   </div>
                                               </div>
                                             <table class="table table-bordered">
                                                   <thead>
                                                       <tr>
                                                       <th>id</th>
                                             <th>LAKE</th>
                                             <th>Dead Water Level </th>
                                             <th>Normal Water Level</th>
                                             <th>Hydroelectrictplant</th>
                                             <th>Actions</th>
                                                       </tr>
                                                   </thead>
                                                   <tbody>
                                                   {lakedata.map((row) => (
                                                 <tr key={row.properties.id}>
                                                    <td>{row.properties.id}</td>
                                                     <td>{row.properties.name}</td>
                                                     <td>{row.properties.dead_water_level}</td>
                                                     <td>{row.properties.normal_water_level}</td>
                                                     <td>{row.properties.hydroelectrictplant}</td>

                                                       <td>
              
                                                       <button  className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/updatelake/${row.properties.id}`)}   data-toggle="tooltip">Update</button>
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

export default Getlake
