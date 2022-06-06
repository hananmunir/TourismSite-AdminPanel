import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import { logout } from "../Actions/auth";
import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.Auth.user;
  });
  console.log(user);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogout = () => {
    console.log("Logging Out");
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <Navbar color='dark' dark expand='md'>
      <div className='d-flex align-items-center'>
        <NavbarBrand href='/' className='d-lg-none'>
          <LogoWhite />
        </NavbarBrand>
        <Button
          color='dark'
          className='d-lg-none'
          onClick={() => showMobilemenu()}
        >
          <i className='bi bi-list'></i>
        </Button>
      </div>
      <div className='hstack gap-2'>
        <Button
          color='dark'
          size='sm'
          className='d-sm-block d-md-none'
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className='bi bi-x'></i>
          ) : (
            <i className='bi bi-three-dots-vertical'></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className='me-auto' navbar>
          <NavItem>
            <a
              href='https://tourism-web-project.netlify.app/'
              className='nav-link'
            >
              User Website
            </a>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color='dark'>
            <span
              style={{
                padding: "0 1rem",
                fontSize: "1.1rem",
                color: "#fff",
                opacity: "0.9",
              }}
            >
              {user?.name}
            </span>
            <img
              src={user1}
              alt='profile'
              className='rounded-circle'
              width='30'
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
