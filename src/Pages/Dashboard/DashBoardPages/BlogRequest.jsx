import React, { useEffect, useState } from 'react';
import Navbar from '../../../Component/Dashboard/Dashboardcomponents/Navbar';
import UserAccount from '../../../Component/Dashboard/Dashboardcomponents/LeftSide';
import RightIconBar from '../../../Component/Dashboard/Dashboardcomponents/RightIconBar';

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

    

const BlogRequest = () => {

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
  return (
    <div id="wrapper" classNameName="theme-cyan">
    <Navbar />
    <UserAccount />
    <RightIconBar />
    <div id="main-content">
<div className="container-fluid">
    <div className="block-header">
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
                <h2>Professors Leave</h2>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html"><i className="fa fa-dashboard"></i></a></li>                            
                    <li className="breadcrumb-item">Professors</li>
                    <li className="breadcrumb-item active">Leave</li>
                </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="d-flex flex-row-reverse">
                    <div className="page_action">
                        <button type="button" className="btn btn-primary"><i className="fa fa-download"></i> Download report</button>
                        <button type="button" className="btn btn-secondary"><i className="fa fa-send"></i> Send report</button>
                        <a href="javascript:void(0);" className="btn btn-primary" data-toggle="modal" data-target="#Leave_Request">Add Leave</a>
                    </div>
                    <div className="p-2 d-flex">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="row clearfix">
        <div className="col-lg-12">
            <div className="card">
                <div className="header">
                    <h2>Professors List</h2>
                </div>
                <div className="body">
                    <div className="table-responsive">
                        <table className="table table-hover js-basic-example dataTable table-custom m-b-0 c_list">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                   
                                    <th>Date</th>
                                   <th>Blog View</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="width45">                                           
                                        <img src="../assets/images/xs/avatar1.jpg" className="rounded-circle avatar" alt=""/>
                                    </td>
                                    <td>
                                        <h6 className="mb-0">Marshall Nichols</h6>                                            
                                    </td>
                                    <td><span>LA-0215</span></td>
                                  
                                    <td><button className="btn btn-sm btn-success">View</button></td>
                                    <td>20 July, 2018 to 26 July, 2018</td>
                                    
                                    <td>
                                        <button type="button" className="btn btn-sm btn-success w-2" title="Approved"><i className="fa fa-check"></i></button>
                                        <button type="button" className="btn btn-sm btn-outline-danger js-sweetalert" title="Declined" data-type="confirm"><i className="fa fa-ban"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="width45">                                           
                                        <img src="../assets/images/xs/avatar2.jpg" className="rounded-circle avatar" alt=""/>
                                    </td>
                                    <td>
                                        <h6 className="mb-0">Maryam Amiri</h6>                                            
                                    </td>
                                    <td><span>LA-0215</span></td>
                                    <td><button className="btn btn-sm btn-success">View</button></td>
                                    <td>21 July, 2018 to 26 July, 2018</td>
                                   
                                    <td>
                                        <button type="button" className="btn btn-sm btn-success w-2" title="Approved"><i className="fa fa-check"></i></button>
                                        <button type="button" className="btn btn-sm btn-outline-danger js-sweetalert" title="Declined" data-type="confirm"><i className="fa fa-ban"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="width45">                                           
                                        <img src="../assets/images/xs/avatar2.jpg" className="rounded-circle avatar" alt=""/>
                                    </td>
                                    <td>
                                        <h6 className="mb-0">Gary Camara</h6>                                            
                                    </td>
                                    <td><span>LA-0215</span></td>
                                    <td><button className="btn btn-sm btn-success">View</button></td>
                                    <td>20 July, 2018 to 26 July, 2018</td>
                                    
                                    <td>
                                        <button type="button" className="btn btn-sm btn-success w-2" title="Approved"><i className="fa fa-check"></i></button>
                                        <button type="button" className="btn btn-sm btn-outline-danger js-sweetalert" title="Declined" data-type="confirm"><i className="fa fa-ban"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="width45">                                           
                                        <img src="../assets/images/xs/avatar2.jpg" className="rounded-circle avatar" alt=""/>
                                    </td>
                                    <td>
                                        <h6 className="mb-0">Frank Camly</h6>                                            
                                    </td>
                                    <td><span>LA-0215</span></td>
                                    <td><button className="btn btn-sm btn-success">View</button></td>
                                    <td>11 Aug, 2018 to 21 Aug, 2018</td>
                                   
                                    <td>
                                        <button type="button" className="btn btn-sm btn-success w-2" title="Approved"><i className="fa fa-check"></i></button>
                                        <button type="button" className="btn btn-sm btn-outline-danger js-sweetalert" title="Declined" data-type="confirm"><i className="fa fa-ban"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
  )
}

export default BlogRequest