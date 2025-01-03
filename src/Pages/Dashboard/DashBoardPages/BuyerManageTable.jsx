import React, { useEffect, useState } from 'react';
import Navbar from '../../../Component/Dashboard/Dashboardcomponents/Navbar';
import UserAccount from '../../../Component/Dashboard/Dashboardcomponents/LeftSide';
import RightIconBar from '../../../Component/Dashboard/Dashboardcomponents/RightIconBar';
import axios from 'axios';

const loadStyle = (href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };
  
  // Utility function to dynamically load scripts
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

const BuyerManagement = () => {
const [loading, setLoading] = useState(true);

    // Simulate loading effect and load scripts/styles after component mounts
    useEffect(() => {
      setTimeout(() => {
        setLoading(false); // Set loading to false after the timeout
      }, 2000); // Example delay of 2 seconds
  
       // Load CSS files
       loadStyle('/DashboardAssets/assets/vendor/bootstrap/css/bootstrap.min.css');
       loadStyle('/DashboardAssets/assets/vendor/font-awesome/css/font-awesome.min.css');
       loadStyle('/DashboardAssets/assets/vendor/light-gallery/css/lightgallery.css');
       loadStyle('/DashboardAssets/assets/css/main.css');
  
      // Dynamically load external JS files from public folder
      Promise.all([
        loadScript('/DashboardAssets/assets/bundles/libscripts.bundle.js'),
        loadScript('/DashboardAssets/assets/bundles/vendorscripts.bundle.js'),
        loadScript('/DashboardAssets/assets/vendor/light-gallery/js/lightgallery-all.min.js'),
        // loadScript('/DashboardAssets/js/pages/medias/image-gallery.js'),
        // loadScript('/DashboardAssets/assets/bundles/mainscripts.bundle.js'),
      ]).then(() => {
        const email = sessionStorage.getItem('email'); // Fetch email from session storage
        if (email) {
          // toastr.success(`Welcome, ${email}!`, 'Hello!'); // Show welcome message with toastr
        }
      }).catch(err => console.error('Failed to load script:', err));
    }, []);


  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });


  // Fetch buyers on component mount
  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/buyers/get-Allbuyer');
      setBuyers(response.data);
    } catch (error) {
      console.error('Error fetching buyers:', error);
    }
  };

  const handleEditClick = (buyer) => {
    setSelectedBuyer(buyer);
    setFormData({ name: buyer.name, email: buyer.email });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBuyer = async () => {
    try {
      await axios.put(`http://localhost:3001/api/buyers/update-buyer/${selectedBuyer._id}`, formData);
      fetchBuyers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating buyer:', error);
    }
  };

  const handleDeleteBuyer = async (buyerId) => {
    if (window.confirm('Are you sure you want to delete this buyer?')) {
      try {
        await axios.delete(`http://localhost:3001/api/buyers/delete-buyer/${buyerId}`);
        fetchBuyers(); // Refresh buyers list after deletion
      } catch (error) {
        console.error('Error deleting buyer:', error);
      }
    }
  };


  return (
    <div id="wrapper" className="theme-cyan">
      <Navbar />
      <UserAccount />
      <RightIconBar />
      <div id="main-content">
        <div className="container-fluid">
          <h2>Buyer Management</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Wishlist</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr key={buyer._id}>
                    <td>{index + 1}</td>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    <td>{buyer.ordersCount || 0}</td>
                    <td>{buyer.wishlistCount || 0}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditClick(buyer)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteBuyer(buyer._id)}
                      >
                        Delete
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Updating Buyer */}
          {isModalOpen && (
            <div className="modal" style={{ display: 'block' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Buyer</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setIsModalOpen(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdateBuyer}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerManagement;
