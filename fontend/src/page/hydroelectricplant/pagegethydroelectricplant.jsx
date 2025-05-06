import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gethydroelectricplant, deletehydroelectricplant } from '../../redux/slice/hydroelectrictplant';
import { useNavigate } from 'react-router-dom';
import style from './pagegethydroelectrictplant.module.css'
const PageGetHydroelectricPlant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hydroelectrictplantdata , status, error, currentPage, totalPages } = useSelector((state) => state.hydroelectrictplant);

  useEffect(() => {
    dispatch(gethydroelectricplant(currentPage));

  }, [dispatch,currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(gethydroelectricplant(currentPage - 1)); 
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(gethydroelectricplant(currentPage + 1)); 
    }
  };

  const handlePageClick = (page) => {
    dispatch(gethydroelectricplant(page)); 
  };
    const handleDelete= (id) => {
      dispatch(deletehydroelectricplant(id)); 
      navigate(`/admin/gethydroelectricplant`);
      dispatch(gethydroelectricplant()); 
    };
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
  
  return (
    <div className="container-lg">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8"><h2>Hydroelectrict Plant</h2></div>
              <div className="col-sm-4">
                <button onClick={() => navigate(`/admin/addhydroelectricplant`)} className="btn btn-info add-new">
                  <i className="fa fa-plus"></i> Add HydroElectrict Plant
                </button>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
              <th>id</th>
                                             <th>Name </th>
                                             <th>Province</th>
                                             <th>District</th>
                                             <th>Capacity(MW)</th>
                                             <th>Electricity_output(kWh/year)</th>
                                             <th>Generating_units</th>
                                             <th>River</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {hydroelectrictplantdata.map((row) => (
                <tr key={row.properties.id}>
                   <td>{row.properties.id}</td>
                                             <td><p>{row.properties.name}</p></td>
                                             <td><p>{row.properties.province}</p></td>
                                             <td><p>{row.properties.district}</p></td>
                                             <td><p>{row.properties.capacity}</p></td>
                                             <td><p>{row.properties.electricity_output}</p></td>
                                             <td><p>{row.properties.generating_units}</p></td>
                                             <td><p>{row.properties.river}</p></td>
                  <td>
                    <button  className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/updatehydroelectricplant/${row.properties.id}`)}>Update</button>
                    <button  className="btn btn-sm btn-danger" onClick={() => handleDelete(row.properties.id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

      
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
        
      </div>
    </div>
  );
};

export default PageGetHydroelectricPlant;
