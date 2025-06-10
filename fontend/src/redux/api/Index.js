import axios from "axios";

export const getprovince = (page = 1) => {

  return axios.get(`http://localhost:3000/admin/getprovince?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const addprovince = (data) => {

  return axios.post(`http://localhost:3000/admin/postprovince`,data)
    .catch(error => {
      throw error;  
    });
};
export const getupdateprovince = (id) => {

  return axios.get(`http://localhost:3000/admin/updateprovince/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updateprovince = (data,id) => {

  return axios.post(`http://localhost:3000/admin/updateprovince/${id}`,data)
    .catch(error => {
      throw error;  
    });
};
export const deleteprovince = (id) => {

  return axios.get(`http://localhost:3000/admin/deleteprovince/${id}`) 
    .catch(error => {
      throw error;  
    });
};


export const gethydroelectricplant = (page = 1) => {

  return axios.get(`http://localhost:3000/admin/hydroelectricplant?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const getaddhydroelectrictplant = () => {
  return axios.get(`http://localhost:3000/admin/posthydroelectricplant`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const addhydroelectrictplant = (data) => {
  return axios.post(`http://localhost:3000/admin/posthydroelectricplant`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).catch(error => {
    throw error;
  });
};
export const getupdatehydroelectrictplant = (id) => {

  return axios.get(`http://localhost:3000/admin/updatehydroelectricplant/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updatehydroelectrictplant = (data, id) => {

  return axios.post(`http://localhost:3000/admin/updatehydroelectricplant/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .catch(error => {
    throw error;
  });
};
export const deletehydroelectrictplant= (id) => {

  return axios.get(`http://localhost:3000/admin/deletehydroelectricplant/${id}`) 
    .catch(error => {
      throw error;  
    });
};
export const getapidistrict= (value) => {

  return axios.post(`http://localhost:3000/admin/getapidistrict`,{selectedValue: value})
     .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};



export const getdistrict = (page = 1, adm1_vi, adm1_en) => {

  return axios.get(`http://localhost:3000/admin/getdistrict/${adm1_vi}/${adm1_en}?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};

export const adddistrict = (data) => {
  return axios.post(`http://localhost:3000/admin/postdistrict`, data)
  .catch(error => {
    throw error;
  });
};
export const getupdatedistrict= (id) => {

  return axios.get(`http://localhost:3000/admin/updatedistrict/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updatedistrict= (data, id) => {

  return axios.post(`http://localhost:3000/admin/updatedistrict/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .catch(error => {
    throw error;
  });
};
export const deletedistrict= (id) => {

  return axios.get(`http://localhost:3000/admin/deletedistrict/${id}`) 
    .catch(error => {
      throw error;  
    });
};




export const getlake = (page = 1) => {

  return axios.get(`http://localhost:3000/admin/getlake?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const getaddlake = () => {
  return axios.get(`http://localhost:3000/admin/postlake`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const addlake = (data) => {

  return axios.post(`http://localhost:3000/admin/postlake`,data)
    .catch(error => {
      throw error;  
    });
};
export const getupdatelake = (id) => {

  return axios.get(`http://localhost:3000/admin/updatelake/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updatelake = (data,id) => {

  return axios.post(`http://localhost:3000/admin/updatelake/${id}`,data)
    .catch(error => {
      throw error;  
    });
};
export const deletelake = (id) => {

  return axios.get(`http://localhost:3000/admin/deletelake/${id}`) 
    .catch(error => {
      throw error;  
    });
};

export const getriver = (page = 1) => {

  return axios.get(`http://localhost:3000/admin/getriver?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const addriver= (data) => {

  return axios.post(`http://localhost:3000/admin/postriver`,data)
    .catch(error => {
      throw error;  
    });
};
export const getupdateriver = (id) => {

  return axios.get(`http://localhost:3000/admin/updateriver/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updateriver= (data,id) => {

  return axios.post(`http://localhost:3000/admin/updateriver/${id}`,data)
    .catch(error => {
      throw error;  
    });
};
export const deleteriver = (id) => {

  return axios.get(`http://localhost:3000/admin/deleteriver/${id}`) 
    .catch(error => {
      throw error;  
    });
};

export const gethydrologicalstation = (page = 1) => {

  return axios.get(`http://localhost:3000/admin/gethydrologicalstation?page=${page}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const addhydrologicalstation= (data) => {

  return axios.post(`http://localhost:3000/admin/posthydrologicalstation`,data)
    .catch(error => {
      throw error;  
    });
};
export const getupdatehydrologicalstation = (id) => {

  return axios.get(`http://localhost:3000/admin/updatehydrologicalstation/${id}`)
    .then(response => response.data)  
    .catch(error => {
      throw error;  
    });
};
export const updatehydrologicalstation= (data,id) => {

  return axios.post(`http://localhost:3000/admin/updatehydrologicalstation/${id}`,data)
    .catch(error => {
      throw error;  
    });
};
export const deletehydrologicalstation = (id) => {

  return axios.get(`http://localhost:3000/admin/deletehydrologicalstation/${id}`) 
    .catch(error => {
      throw error;  
    });
};
export const login= (data) => {

  return axios.post(`http://localhost:8080/user/login`,data)
  
};
export const register= (data) => {

  return axios.post(`http://localhost:8080/user/register`,data)
};
export const loginadmin= (data) => {

  return axios.post(`http://localhost:8080/admin/login`,data)
  
};
export const registeradmin= (data) => {

  return axios.post(`http://localhost:8080/admin/register`,data)
};