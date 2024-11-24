import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBNavbarBrand,
  MDBCarousel,
  MDBCarouselItem
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import img from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate } from '../js/validate';
import Button from 'react-bootstrap/Button';
import { registerAPI, loginAPI } from '../Services/allAPI'; // Adjust import based on actual API paths

function Auth({ register }) {
  const isRegisterForm = register ? true : false;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle validation
  const handleValidation = () => {
    const formType = isRegisterForm ? 'register' : 'login';
    const validationErrors = validate(formType, userData);

    console.log('Validation Errors:', validationErrors); // Debugging: Check the validation errors

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // Handle register logic
  const registerData = async () => {
    console.log('Registering with data:', userData); // Debugging: Check if data is correct

    if (!handleValidation()) {
      console.log('Validation failed'); // Debugging: Check validation errors
      return;
    }
    console.log("User Data being sent to API:", userData);
    try {

      const result = await registerAPI(userData);
      console.log('Register API result:', result); // Debugging: Check API response

      if (result.status === 201) {
        toast.success("Successfully registered", {
          closeButton: <Button variant="outline-light">OK</Button>,
          onClose: () => navigate('/login')
        });
      } else {
        toast.error("Registration failed", {
          closeButton: <Button variant="outline-light">OK</Button>,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error); // Debugging: Catch API errors
      toast.error("An error occurred during registration", {
        closeButton: <Button variant="outline-light">OK</Button>,
      });
    }
  };

  // Handle login logic
  const loginData = async () => {
    console.log('Logging in with data:', userData); // Debugging: Check if data is correct

    if (!handleValidation()) {
      console.log('Validation failed'); // Debugging: Check validation errors
      return;
    }

    try {
      const result = await loginAPI(userData);
      console.log('Login API result:', result); // Debugging: Check API response

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        toast.success("Login successful", {
          closeButton: <Button variant="outline-light">OK</Button>,
          onClose: () => window.location.href = '/main'
        });
      } else {
        toast.error(result.response.data, {
          closeButton: <Button variant="outline-light">OK</Button>,
        });
      }
    } catch (error) {
      console.error('Error during login:', error); // Debugging: Catch API errors
      toast.error("An error occurred during login", {
        closeButton: <Button variant="outline-light">OK</Button>,
      });
    }
  };

  return (
    <div>
      <MDBContainer fluid>
        <MDBRow>
          {/* Form Section */}
          <MDBCol className="auth-column px-5" sm="6" style={{ backgroundColor: '#2E3B4E' }}>
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBNavbarBrand href="/" style={{ color: '#e6e6ea' }}>
                <img
                  src="https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-book-icon-vector-image-png-image_6552370.png"
                  height="80"
                  alt="User Icon"
                  className="me-3"
                  loading="lazy"
                />
                <span className="h2 fw-bold auth-heading pt-5">
                  Book Review App
                </span>
              </MDBNavbarBrand>
            </div>

            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-2">
              <h3
                className={`fw-normal my-4 ps-5 pb-1 ${!isRegisterForm ? 'py-5' : ''}`}
                style={{ letterSpacing: '3px', color: '#FBFEF9' }}
              >
                {isRegisterForm ? 'Register Here' : 'Login Here'}
              </h3>
              <form autoComplete="off">
                {/* Form fields for username, email, password, etc. */}
                {isRegisterForm && (
                  <>
                    {errors.name && <p className="validation text-danger ms-5">{errors.name}</p>}
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="Username"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      id="formControlLg"
                      type="text"
                      size="lg"
                    />
                  </>
                )}
                {errors.email && <p className="validation text-danger ms-5">{errors.email}</p>}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Email address"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                {errors.password && <p className="validation text-danger ms-5">{errors.password}</p>}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Password"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                {isRegisterForm && (
                  <>
                    {errors.confirmPassword && <p className="validation text-danger ms-5">{errors.confirmPassword}</p>}
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="Confirm Password"
                      value={userData.confirmPassword}
                      onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                      id="formControlLg"
                      type="password"
                      size="lg"
                    />
                  </>
                )}
                <div>
                  {isRegisterForm ? (
                    <button className="glow-on-hover mx-5 my-3" type="button" onClick={registerData}>
                      Register
                    </button>
                  ) : (
                    <button className="glow-on-hover mx-5 my-3" type="button" onClick={loginData}>
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </MDBCol>

          {/* Carousel Section */}
          <MDBCol sm="6" className="d-none d-sm-block px-0" style={{ height: "120vh" }}>
            <div className="carousel-wrapper h-100">
              <MDBCarousel className="carousel h-100">
                {[{ image: img, title: "Slide 1", description: "Explore books!" },
                  { image: img2, title: "Slide 2", description: "Discover reviews!" },
                  { image: img3, title: "Slide 3", description: "Join discussions!" }].map((slide, index) => (
                    <MDBCarouselItem key={index} itemId={index + 1} interval={3000} style={{ height: "120vh" }}>
                      <div className="carousel-item-content" style={{ maxHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={slide.image} className="d-block w-100" alt={slide.title} style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }} />
                        <div className="form-overlay">
                          <div className="form-overlay-content">
                            <h2 className="text-white">{slide.title}</h2>
                            <p className="text-white">{slide.description}</p>
                          </div>
                        </div>
                      </div>
                    </MDBCarouselItem>
                  ))}
              </MDBCarousel>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default Auth;
