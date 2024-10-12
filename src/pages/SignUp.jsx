import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [infoList, setInfoList] = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bday, setBday]   = useState();
  const [bmonth, setBmonth] = useState('');
  const [byear, setByear] = useState();
  const [tel, setTel]     = useState();
  const [email, setEmail] = useState('');
  const [password, setPassw] = useState('');

  const navigate = useNavigate();
  const days = Array.from({length: 31}, (_, i) => i + 1)
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
  
  const isFormValid = () => {
    // Check if all fields are filled
    const allFieldsFilled = fname && lname && bday && bmonth && byear && tel && email && password;
  
    // Define regex patterns
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validate against patterns
    const isPhoneValid = phonePattern.test(tel);
    const isPasswordValid = passwordPattern.test(password);
    const isEmailValid = emailPattern.test(email);
  
    // If any validation fails, return false
    if (!allFieldsFilled) {
      alert('Please fill in all fields.');
      return false;
    }
  
    if (!isEmailValid) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    if (!isPhoneValid) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }
  
    if (!isPasswordValid) {
      alert('Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long.');
      return false;
    }
  
    return true;
  };
    
  const postData = async (e) =>{
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Please fill in all fields.');
      return;
    }

    try{
      Axios.post('https://login-register-backend-production.up.railway.app/information', {
        fname, lname, bday, bmonth, byear, tel, email, password
      }).then(() => {
        setInfoList([...infoList, {
        fname, lname, bday, bmonth, byear, tel, email, password
        }])
      })
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }    

  return (
    <main className='container-fluid '>
        <section className='container'>
            <form className='form px-5 py-4'>
                <h1 className='mb-3'>Create Account</h1>
                <div className='row mb-3'>
                  <div className='position-relative col-md-6'>
                      <i className='position-absolute bi bi-person-fill pt-2 ps-3'></i>
                      <input 
                          type="text"
                          name="fname"
                          placeholder='First Name'
                          autoComplete='off'
                          required
                          className='form-control px-5'
                          onChange={(e) => setFname(e.target.value)} 
                          value={fname}
                      />
                  </div>

                  <div className='col-md-6'>
                    <input 
                        type="text"
                        name="lname"
                        id='lname'
                        placeholder='Last Name'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setLname(e.target.value)} 
                        value={lname}
                    />
                </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <select 
                        name="bdaySelect" 
                        className='form-select px-5' 
                        onChange={(e) => setBday(e.target.value)}
                        value={bday}>
                      <option value="" disabled selected>Day</option>
                      {days.map((day, idx) => (
                        <option key={idx} 
                                value={day}
                                > {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select 
                        name="bmonSelect" 
                        id="bmonSelect"
                        className='form-select px-5'
                        onChange={(e) => setBmonth(e.target.value)}
                        value={bmonth}>
                          <option value="" disabled selected>Month</option>
                          {months.map((month, idx) => (
                            <option key={idx} 
                                    value={month}
                                    > {month}
                            </option>
                          ))}
                        </select>
                  </div>
                  <div className="col-md-4">
                    <input 
                          type="text"
                          name="byear"
                          placeholder='year'
                          autoComplete='off'
                          required
                          className='form-control px-5'
                          onChange={(e) => setByear(e.target.value)}
                          value={byear} 
                      />
                  </div>
                </div>
                
                <div className='position-relative w-100'>
                    <i className='position-absolute bi bi-telephone-fill pt-2 ps-3'></i>
                    <input 
                        type="tel"
                        name="tel"
                        placeholder='(+66) Phone Number'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setTel(e.target.value)} 
                        value={tel}
                    />
                </div>

                <div className='position-relative w-100 mt-3'>
                    <i className='position-absolute bi bi-envelope-fill pt-2 ps-3'></i>
                    <input 
                        type="email"
                        name="email"
                        placeholder='email@xxxmail.com'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}                     
                    />
                </div>

                <div className='position-relative mt-3 w-100'>
                    <i className='position-absolute bi bi-key-fill pt-2 ps-3'></i>
                    <input 
                        type="password"
                        name="password"
                        placeholder='password'
                        autoComplete='off'
                        required
                        className='form-control px-5'
                        onChange={(e) => setPassw(e.target.value)}
                        value={password}
                    />
                    <p>*Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long</p>
                </div>

                <div className='btn-container row m-0 p-0 w-100 d-flex align-items-center'>
                    <div className="col-md-6 text-start">
                        <Link 
                            to='/'
                            className='text-decoration-none'
                        >Back</Link>
                    </div>
                    <div className="col-md-6 text-end">
                        <button
                          type='submit' 
                          className='btn text-white px-4'
                          onClick={postData}
                          >Create</button>
                    </div>
                    
                </div>
            </form>
        </section>
    </main>
  )
}

export default SignUp