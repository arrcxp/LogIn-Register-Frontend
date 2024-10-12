import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import DataContext from '../components/DataContext';
import { Link, useNavigate } from 'react-router-dom' 

function Information() {
  const { userID } = useContext(DataContext);
  const [ infoList, setInfoList ] = useState([]);
  const [ newFname, setNewFname ] = useState();
  const [ newLname, setNewLname ] = useState();
  const [ newBday,   setNewBday ] = useState();
  const [ newBmonth, setNewBmonth ] = useState();
  const [ newByear,  setNewByear ] = useState();
  const [ newTel, setNewTel ] = useState();
  const [ isShowEdFLname, setIsShowEdFLname] = useState(false);
  const [ isShowEdBD, setIsShowEdBD] = useState(false);
  const [ isShowEdTel, setIsShowEdTel] = useState(false);
  const [ isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const days = Array.from({length: 31}, (_, i) => i + 1);
  const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ] 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`https://login-register-backend-production.up.railway.app/information/${userID}`)
        setInfoList(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userID])

  const deleteInfo = async (e) => {
    e.preventDefault();
    try{
      await Axios.delete(`https://login-register-backend-production.up.railway.app/information/${userID}`);
      alert('Delete Account Success!')
      
    } catch (err) {
      console.error(err);
    }
    navigate('/');
  }

  const edfname = async (e) => {
    e.preventDefault();

    try{
      await Axios.put(`https://login-register-backend-production.up.railway.app/information/${userID}`, {fname: newFname});
      alert('Edit First Name Successfully!');

      const res = await Axios.get(`https://login-register-backend-production.up.railway.app/information/${userID}`);
      setInfoList(res.data);
      setNewFname('');

    } catch (err) {
      console.error(err);
    }
  }
  
  const edlname = async (e) => {
    e.preventDefault();

    try{
      await Axios.put(`https://login-register-backend-production.up.railway.app/information/${userID}`, {lname: newLname});
      alert('Edit Last Name Successfully!');

      const res = await Axios.get(`https://login-register-backend-production.up.railway.app/information/${userID}`);
      setInfoList(res.data);
      setNewLname('');

    } catch (err) {
      console.error(err);
    }
  }
  
  const isFormValid = () => {
    const phonePattern = /^\d{10}$/
    const isPhoneValid = phonePattern.test(newTel);
    
    if (!isPhoneValid) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  }

  const edtel = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await Axios.put(`https://login-register-backend-production.up.railway.app/information/${userID}`, { tel: newTel });
      alert('Edit Phone Number Successfully!');
  
      const res = await Axios.get(`https://login-register-backend-production.up.railway.app/information/${userID}`);
      setInfoList(res.data);
      setNewTel('');

    } catch (err) {
      console.error(err);
    }
  }

  const edbd = async (e) => {
    e.preventDefault();

    try {
      await Axios.put(`https://login-register-backend-production.up.railway.app/information/${userID}`, {
        bday: newBday,
        bmonth: newBmonth,
        byear: newByear
      });
      alert('Edit Birthday Date Successfully!');
      
      const res = await Axios.get(`https://login-register-backend-production.up.railway.app/information/${userID}`);
      setInfoList(res.data);
      setNewBday('');
      setNewBmonth('');
      setNewByear('');
   
    } catch (err) {
      console.error(err);
    }
  }

  const showEdFLname = () =>{
    setIsShowEdFLname(!isShowEdFLname);
  }
  
  const showEdTel = () => {
    setIsShowEdTel(!isShowEdTel);
  }

  const showEdBD = () => {
    setIsShowEdBD(!isShowEdBD);
  }

  return (
    <main className='d-flex flex-column'>
      {isLoading ? (
        <p className='text-white'>Loading ... </p>
      ) : (
        <section className='info-sec container h-50'>
          <div className='form-box px-5 py-3'>
          <h2 className='pt-3 text-center'>User Information</h2>

            <div className='box-container position-relative mt-3'>
              <i className='position-absolute bi bi-person-fill mt-2 ms-4'></i>
              <i className='position-absolute bi bi-pencil-square end-0 me-4 mt-2' onClick={showEdFLname}></i>
              <div className='box ps-5 pe-3 py-1'>
                {infoList.fname} {infoList.lname}
              </div>
              {isShowEdFLname && (
                <div className='d-flex flex-column'>
                  <div className='d-flex mt-1'>
                    <button onClick={edfname} className='btn btn-primary'>Edit</button>
                    <input 
                      type="text" 
                      name='newFname'
                      value={newFname}
                      placeholder='New First Name'
                      className='form-control ms-1'
                      autoComplete='off'
                      onChange={(e) => setNewFname(e.target.value)}
                    />
                  </div>

                  <div className='d-flex mt-1'>
                    <button onClick={edlname} className='btn btn-primary'>Edit</button>
                    <input 
                      type="text" 
                      name='newLname'
                      value={newLname}
                      placeholder='New Last Name'
                      className='form-control ms-1'
                      autoComplete='off'
                      onChange={(e) => setNewLname(e.target.value)}
                    />
                  </div>
                </div>
              )}         
            </div>
          
            <div className='box-container position-relative mt-3'>
              <i className='position-absolute bi bi-cake2 mt-2 ms-4'></i>
              <i className='position-absolute bi bi-pencil-square end-0 me-4 mt-2' onClick={showEdBD}></i>
              <div className='box ps-5 py-1'>
                {infoList.bday} {infoList.bmonth} {infoList.byear}
              </div>
              {isShowEdBD && (
                <div>
                  <div className='row d-flex mt-2'>
                    <div className="col-md-4 m-0">
                      <select 
                        name="bdaySelect" 
                        value={newBday} 
                        className='form-select'
                        onChange={(e) => setNewBday(e.target.value)}>
                        <option value="" selected disabled>Day</option>
                        {days.map((day, idx) => (
                          <option key={idx} value={day}
                                  >{day}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <select 
                        name="bmonthSelect" 
                        value={newBmonth}
                        id='newBmonth' 
                        className='form-select'
                        onChange={(e) => setNewBmonth(e.target.value)}>
                        <option value="" selected disabled>Month</option>
                        {months.map((month, idx) => (
                          <option key={idx} value={month}
                                  >{month}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4 m-0">
                      <input 
                        type="number" 
                        name='newbyear'
                        value={newByear}
                        placeholder='Year'
                        onChange={(e) => setNewByear(e.target.value)}
                        className='form-control'
                        autoComplete='off'
                        />
                    </div>
                  </div>

                  <button className='btn btn-primary w-100 mt-2' onClick={edbd}>Edit</button>
                </div>
              )}
              
            </div>

            <div className='box-container position-relative mt-3'>
              <i className='position-absolute bi bi-telephone-fill mt-2 ms-4'></i>
              <i className='position-absolute bi bi-pencil-square end-0 mt-2 me-4' onClick={showEdTel}></i>
              <div className='box ps-5 py-1'>
                (+66){infoList.tel}
              </div>
              
              {isShowEdTel && (
                <div className='d-flex mt-1'>
                  <button onClick={edtel} className='btn btn-primary '>Edit</button>
                  <input 
                    type="tel" 
                    name='newtel'
                    value={newTel}
                    placeholder='New Phone Number'
                    onChange={(e) => setNewTel(e.target.value)}
                    className='form-control ms-1'
                    autoComplete='off'
                    />
                </div>
              )}

            </div>

            <div className='box-container position-relative mt-3'>
              <i className='position-absolute bi bi-envelope-fill mt-2 ms-4'></i>
              <div className='box ps-5 py-1'>
                {infoList.email}
              </div>
            </div>

            <div className='box-container position-relative mt-3'>
              <i className='position-absolute bi bi-key-fill mt-2 ms-4'></i>
              <div className='box ps-5 py-1 mb-3'>
                {infoList.password}
              </div>
            </div>

            <div className='info-btn-container row m-0 p-0 w-100 d-flex '>
              <div className="col-md-6 text-start">
                  <button 
                    className='btn btn-danger'
                    onClick={deleteInfo}> 
                      Del-Acc
                  </button>
              </div>
              <div className="col-md-6 text-end">
                  <Link to='/'
                        className='btn-logout btn text-white mb-3'
                        style={{color: '#fff !important'}}>
                    Log Out
                  </Link>
              </div>
            </div>

          </div>
      </section>
      )}
    </main>
  );
}

export default Information;