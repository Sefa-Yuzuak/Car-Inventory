import { NavbarBrand, Image, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../asset/LogoKurum/logo_kurum.png'
import { useAuth } from '../comp_tools/auth'
import {useNavigate} from 'react-router-dom'

function NavComp() {

  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { 
    auth.logout()
    
    navigate('/LoginPage')
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" variant="secondary" className='NavBarStick'>
      
        <NavbarBrand href="/" className='ms-3 logo-box rounded-circle'><span><Image width={90} src={Logo} /></span></NavbarBrand>
        <NavbarToggle aria-controls="responsive-navbar-nav" />
        <NavbarCollapse id="responsive-navbar-nav inline-block">
          
          <Nav className="nav_bar_text align-items-center ">
             
              <Nav.Link  href="/"  style={{width: 180}} className=' text-center ms-3 border rounded-3 box-hover' ><i className="bi bi-house-fill"></i> Anasayfa </Nav.Link>
              <Nav.Link href="/birimiminaraclari " style={{width: 250}} className=' text-center  border rounded-3 box-hover' ><i className="bi bi-car-front"></i> Birimimin Araçları </Nav.Link>
              <Nav.Link href='/log'  style={{width: 180}} className='text-center border rounded-3 box-hover'><i className='bi bi-arrow-left-right '></i>İşlemler</Nav.Link>
          
          </Nav>
          
          <Container className='d-flex flex-row-reverse align-items-center text-center'>
            <Nav>
              <Nav.Link href="/Profil" className='box-hover rounded-3'> <i className="bi bi-person-bounding-box "></i> Profile</Nav.Link>
              <Nav.Link onClick={handleLogout} className='box-hover rounded-3'><i className="bi bi-box-arrow-right"></i> Çıkış</Nav.Link>
            </Nav>
          </Container>
        </NavbarCollapse>
    </Navbar>
  );
}

export default NavComp;