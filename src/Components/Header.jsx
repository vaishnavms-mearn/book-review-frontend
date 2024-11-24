import React from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
function Header() {
  const location = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    location('/login')
  }
  return (
    <div>
      <MDBNavbar light bgColor='black'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/main' style={{color:"white",fontFamily:'revert'}}>
          <img
                  src="https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-book-icon-vector-image-png-image_6552370.png"
                  height="60"
                  alt="User Icon"
                  className="me-3"
                  loading="lazy"
                />
            Book Review App
          </MDBNavbarBrand>
          <button type="button" onClick={logout} class="btn btn-danger">Logout</button>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header