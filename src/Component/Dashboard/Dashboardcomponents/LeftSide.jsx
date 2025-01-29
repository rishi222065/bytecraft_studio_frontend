import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LeftSidebar.css";

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const users = [
    {
      name: "Chris Fox",
      email: "chrisfox@gmail.com",
      avatar: "assets/images/xs/avatar1.jpg",
    },
    {
      name: "Joge Lucky",
      email: "jogelucky@gmail.com",
      avatar: "assets/images/xs/avatar2.jpg",
    },
    {
      name: "Isabella",
      email: "isabella@gmail.com",
      avatar: "assets/images/xs/avatar3.jpg",
    },
    {
      name: "Folisise Chosielie",
      email: "folisisechosielie@gmail.com",
      avatar: "assets/images/xs/avatar4.jpg",
    },
    {
      name: "Alexander",
      email: "alexander@gmail.com",
      avatar: "assets/images/xs/avatar5.jpg",
    },
  ];
  const [selectedFont, setSelectedFont] = useState("font-nunito");
  const [darkMode, setDarkMode] = useState(false);
  const [rtlMode, setRtlMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offline, setOffline] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Manage the active dropdown

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };
  const fonts = [
    { label: "Nunito Google Font", value: "font-nunito" },
    { label: "Ubuntu Font", value: "font-ubuntu" },
    { label: "Raleway Google Font", value: "font-raleway" },
    { label: "IBM Plex Google Font", value: "font-IBMplex" },
  ];

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };
  // Function to decode JWT
  const decodeJWT = (token) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token"); // Assume the token is stored in local storage
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    const decodedToken = decodeJWT(token);
    const userId = decodedToken.userId;

    try {
      const response = await fetch(`http://localhost:3001/auth/user/${userId}`); // Use the user ID to fetch user details   http://localhost:3001/auth/user/6712205e3afe3044c212bf0c
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data); // Assuming the API returns a user object
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div id="left-sidebar" className="sidebar">
      <button type="button" className="btn-toggle-offcanvas">
        <i className="fa fa-arrow-left"></i>
      </button>
      <div className="sidebar-scroll">
        <div className="user-account">
          {user && user.profilePhoto && (
            <img
              src={`http://localhost:3001${user.profilePhoto}`}
              className="rounded-circle user-photo"
              alt="User Profile Picture"
            />
          )}
          <div className="dropdown">
            <span>Welcome,</span>
            {user ? (
              <a
                href="#"
                className="dropdown-toggle user-name"
                data-toggle="dropdown"
              >
                <strong>{`${user.name} ${user.lastName}`}</strong>
              </a>
            ) : (
              <strong>Guest</strong>
            )}
            <ul className="dropdown-menu dropdown-menu-right account">
              <li>
                <Link to="/completeprofile">
                  <i className="icon-user"></i> My Profile
                </Link>
              </li>
              <li>
                <a href="app-inbox.html">
                  <i className="icon-envelope-open"></i> Messages
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-settings"></i> Settings
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="page-login.html">
                  <i className="icon-power"></i> Logout
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <ul className="row list-unstyled">
            <li className="col-4">
              <small>Sales</small>
              <h6>561</h6>
            </li>
            <li className="col-4">
              <small>Order</small>
              <h6>920</h6>
            </li>
            <li className="col-4">
              <small>Revenue</small>
              <h6>$23B</h6>
            </li>
          </ul>
        </div>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#menu">
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#Chat">
              <i className="fas fa-book-open"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#setting">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#question">
              <i className="fa fa-question-circle" aria-hidden="true"></i>
            </a>
          </li>
        </ul>

        <div className="tab-content padding-0">
          <div className="tab-pane active" id="menu">
            <nav id="left-sidebar-nav" className="sidebar-nav">
              <ul id="main-menu" className="metismenu li_animation_delay">
                <li className="active">
                  <Link to="/dashboardaccess" className="has-arrow">
                    <i className="fa fa-dashboard"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "blog" ? "active-dropdown" : ""
                    }`}
                  >
                    <a
                      href="#Blog"
                      onClick={() => toggleDropdown("blog")}
                      className="has-arrow"
                    >
                      <i className="fa fa-th-large"></i>
                      <span>Blog</span>
                      <i
                        className={`${
                          activeDropdown === "blog" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "blog" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link to="/Bloglist">Blog List</Link>
                      </li>
                      <li>
                        <Link to="/create-blog">Create Blog</Link>
                      </li>
                      <li>
                        <Link to="/Blogdetails">Blog Details</Link>
                      </li>
                      <li>
                        <Link to="/BlogRequest">Blog Requests</Link>
                      </li>
                      <li>
                        <Link to="/Blogdashboard">Blog Dashboard</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "widget" ? "active-dropdown" : ""
                    }`}
                  >
                    <a
                      href="#Widget"
                      onClick={() => toggleDropdown("widget")}
                      className="has-arrow"
                    >
                      <i className="fa fa-comments"></i>
                      <span>Chat</span>
                      <i
                        className={`${
                          activeDropdown === "widget" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "widget" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link to="/Appinbox">Inbox</Link>
                      </li>
                      <li>
                        <Link to="/Appcontact"> Contact</Link>
                      </li>
                      <li>
                        <Link to="/Appchat">Chat</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "artist-management"
                        ? "active-dropdown"
                        : ""
                    }`}
                  >
                    <a
                      href="#artist-management"
                      onClick={() => toggleDropdown("artist-management")}
                      className="has-arrow"
                    >
                      <i className="fa fa-comments"></i>
                      <span>Artist Details</span>
                      <i
                        className={`${
                          activeDropdown === "artist-management" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "artist-management" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link to="/artists/:id">artist products</Link>
                      </li>
                      <li>
                        <Link to="/ArtistManageTable">
                          Artist Artist Management
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "Product-management"
                        ? "active-dropdown"
                        : ""
                    }`}
                  >
                    <a
                      href="#Product-management"
                      onClick={() => toggleDropdown("Product-management")}
                      className="has-arrow"
                    >
                      <i className="fa fa-comments"></i>
                      <span>Product Details</span>
                      <i
                        className={`${
                          activeDropdown === "Product-management"
                            ? "up"
                            : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "Product-management" ? "show" : ""
                      }`}
                    >
                        <li>
                        <Link to="/Product-uploade">products-uploade</Link>
                      </li>
                      <li>
                        <Link to="/artists/:id">products</Link>
                      </li>
                      <li>
                        <Link to="/ArtistManageTable">
                          Product management table Artist Management
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "Buyer-management"
                        ? "active-dropdown"
                        : ""
                    }`}
                  >
                    <a
                      href="#Buyer-management"
                      onClick={() => toggleDropdown("Buyer-management")}
                      className="has-arrow"
                    >
                      <i className="fa fa-comments"></i>
                      <span>Buyer-management</span>
                      <i
                        className={`${
                          activeDropdown === "Buyer-management" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "Buyer-management" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link to="/BuyerManageTable">All Buyers</Link>
                      </li>
                      <li>
                        <Link to="/Appcontact">buyer orders</Link>
                      </li>
                      <li>
                        <Link to="/Appchat">buyer transactions </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <div
                    className={`dropdown ${
                      activeDropdown === "Documentation"
                        ? "active-dropdown"
                        : ""
                    }`}
                  >
                    <a
                      href="#Documentation"
                      onClick={() => toggleDropdown("Documentation")}
                      className="has-arrow"
                    >
                      <i className="fa fa-comments"></i>
                      <span>Documentation</span>
                      <i
                        className={`${
                          activeDropdown === "Documentation" ? "up" : "down"
                        } ml-2`}
                      ></i>
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === "Documentation" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link to="/Filedocs">File Docs</Link>
                      </li>
                      <li>
                        <Link to="/Filemedia">Media files</Link>
                      </li>
                      <li>
                        <Link to="/Fileimages">Image files</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <Link to="/teamboard" className="has-arrow">
                    <i className="fa fa-area-chart"></i>
                    <span>TeamBoard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/search" className="has-arrow">
                    <i className="fa fa-pencil"></i>
                    <span>Search</span>
                  </Link>
                </li>

                <li>
                  <Link to="/invoice" className="has-arrow">
                    <i className="fa fa-table"></i>
                    <span>Invoice</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="tab-pane" id="Chat">
            <form>
              <div className="input-group m-b-20">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="right_chat list-unstyled li_animation_delay">
              {users.map((user, index) => (
                <li key={index}>
                  <a href="#" className="media">
                    <img
                      className="media-object"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <div className="media-body">
                      <span className="name d-flex justify-content-between">
                        {user.name} <i className="fa fa-heart-o font-12"></i>
                      </span>
                      <span className="message">{user.email}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-pane" id="setting">
            <h6>Choose Skin</h6>
            <ul className="choose-skin list-unstyled">
              {[
                "purple",
                "blue",
                "cyan",
                "green",
                "orange",
                "blush",
                "red",
              ].map((color, index) => (
                <li key={index} data-theme={color}>
                  <div className={color}></div>
                </li>
              ))}
            </ul>

            <ul className="list-unstyled font_setting mt-3">
              {fonts.map((font, index) => (
                <li key={index}>
                  <label className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="font"
                      value={font.value}
                      checked={selectedFont === font.value}
                      onChange={handleFontChange}
                    />
                    <span className="custom-control-label">{font.label}</span>
                  </label>
                </li>
              ))}
            </ul>

            <ul className="list-unstyled mt-3">
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable Dark Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-rtl">
                  <input
                    type="checkbox"
                    checked={rtlMode}
                    onChange={() => setRtlMode(!rtlMode)}
                  />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable RTL Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-high-contrast">
                  <input
                    type="checkbox"
                    checked={highContrastMode}
                    onChange={() => setHighContrastMode(!highContrastMode)}
                  />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable High Contrast Mode!</span>
              </li>
            </ul>

            <hr />
            <h6>General Settings</h6>
            <ul className="setting-list list-unstyled">
              <li>
                <label className="fancy-checkbox">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <span>Allowed Notifications</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input
                    type="checkbox"
                    checked={offline}
                    onChange={() => setOffline(!offline)}
                  />
                  <span>Offline</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input
                    type="checkbox"
                    checked={locationPermission}
                    onChange={() => setLocationPermission(!locationPermission)}
                  />
                  <span>Location Permission</span>
                </label>
              </li>
            </ul>

            <a
              href="https://themeforest.net/item/iconic-boostrap-admin-dashboard-html-template/33511081"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-block btn-primary"
            >
              Buy this item
            </a>
            <a
              href="https://themeforest.net/user/wrraptheme/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-block btn-secondary"
            >
              View portfolio
            </a>
          </div>
          <div className="tab-pane" id="question">
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="list-unstyled question">
              <li className="menu-heading">HOW-TO</li>
              <li>
                <a href="#">How to Create Campaign</a>
              </li>
              <li>
                <a href="#">Boost Your Sales</a>
              </li>
              <li>
                <a href="#">Website Analytics</a>
              </li>
              <li className="menu-heading">ACCOUNT</li>
              <li>
                <a href="#">Create New Account</a>
              </li>
              <li>
                <a href="#">Change Password?</a>
              </li>
              <li>
                <a href="#">Privacy &amp; Policy</a>
              </li>
              <li className="menu-heading">BILLING</li>
              <li>
                <a href="#">Payment info</a>
              </li>
              <li>
                <a href="#">Auto-Renewal</a>
              </li>
              <li className="menu-button mt-3">
                <a
                  href="https://wrraptheme.com/templates/iconic/docs/index.html"
                  className="btn btn-primary btn-block"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
