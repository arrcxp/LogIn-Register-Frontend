import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DataContext from '../components/DataContext';

function SignIn() {
  const { onSetID } = useContext(DataContext);
  const [infoList, setInfoList] = useState([]);
  const [emailFill, setEmailFill] = useState('');
  const [passwFill, setPasswFill] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await Axios.get('https://login-register-backend-production.up.railway.app/information');
        setInfoList(res.data);
      } catch (err) {
        console.error('Fetching error: ', err);
      }
    }
    fetchData();
  }, [])

  const checkData = async () => {
      try{
        const user = infoList.find((data) => data.email === emailFill && data.password === passwFill);
        if(user){
          onSetID(user._id);
          navigate('/information');
        } else {
          alert('Email or Password not Matching, Please try again')
        }
      } catch (err) {
        console.error(err);
      }
  } 

  return (
    <main className='container-fluid '>
        <section className='container'>
            <form className='form px-5 py-4' onSubmit={checkData}>
                <h1 className='mb-3'>Sign In</h1>
                <div className='position-relative'>
                    <i className='position-absolute bi bi-envelope-fill pt-2 ps-3'></i>
                    <input 
                        type="email"
                        name="email"
                        placeholder='email@xxxmail.com'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setEmailFill(e.target.value)} 
                    />
                </div>

                <div className='position-relative py-3'>
                    <i className='position-absolute bi bi-key-fill pt-2 ps-3'></i>
                    <input 
                        type="password"
                        name="password"
                        placeholder='password'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setPasswFill(e.target.value)} 
                    />
                </div>

                <div className='btn-container row m-0 p-0 w-100 d-flex align-items-center'>
                    <div className="col-md-6 text-start">
                        <Link 
                            to='/SignUp'
                            className='text-decoration-none'
                        >Create Account</Link>
                    </div>
                    <div className="col-md-6 text-end">
                        <button 
                            type='submit' 
                            className='btn text-white px-4'
                            >Sign In</button>
                    </div>
                </div>
                
            </form>
        </section>
    </main>
  )
}

export default SignIn