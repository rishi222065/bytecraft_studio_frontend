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
function FileDocument() {
    const [loading, setLoading] = useState(true);

    // Simulate loading effect and load scripts/styles after component mounts
    useEffect(() => {
      setTimeout(() => {
        setLoading(false); // Set loading to false after the timeout
      }, 2000); // Example delay of 2 seconds
  
       // Load CSS files
       loadStyle('/DashboardAssets/assets/vendor/bootstrap/css/bootstrap.min.css');
       loadStyle('/DashboardAssets/assets/vendor/font-awesome/css/font-awesome.min.css');
       loadStyle('/DashboardAssets/assets/css/main.css');
  
      // Dynamically load external JS files from public folder
      Promise.all([
        loadScript('/DashboardAssets/assets/bundles/libscripts.bundle.js'),
        loadScript('/DashboardAssets/assets/bundles/vendorscripts.bundle.js'),
        // loadScript('/DashboardAssets/assets/bundles/mainscripts.bundle.js'),
      ]).then(() => {
        const email = sessionStorage.getItem('email'); // Fetch email from session storage
        if (email) {
          // toastr.success(`Welcome, ${email}!`, 'Hello!'); // Show welcome message with toastr
        }
      }).catch(err => console.error('Failed to load script:', err));
    }, []);
  return (
    <div id="wrapper" className="theme-cyan">
     <Navbar/>
     <UserAccount/>
     <RightIconBar/>
        <div id="main-content" className="file_manager">
        <div className="container-fluid">
            <div className="block-header">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2>Documents</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="fa fa-dashboard"></i></a></li>                            
                            <li className="breadcrumb-item">App</li>
                            <li className="breadcrumb-item active">File Manager</li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="d-flex flex-row-reverse">
                            <div className="page_action">
                                <button type="button" className="btn btn-primary">Generate Report</button>
                                <button type="button" className="btn btn-secondary">Upload new</button>
                            </div>
                            <div className="p-2 d-flex">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row clearfix">
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 42KB <span className="date text-muted">Nov 02, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>                
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 89KB <span className="date text-muted">Dec 15, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>                
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 89KB <span className="date text-muted">Dec 15, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2018.xls</p>
                                    <small>Size: 68KB <span className="date text-muted">Dec 12, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2018.xls</p>
                                    <small>Size: 68KB <span className="date text-muted">Dec 12, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-success"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">asdf  hhkj.pdf</p>
                                    <small>Size: 3MB <span className="date text-muted">Aug 18, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-success"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">asdf  hhkj.pdf</p>
                                    <small>Size: 3MB <span className="date text-muted">Aug 18, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-success"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">asdf  hhkj.pdf</p>
                                    <small>Size: 3MB <span className="date text-muted">Aug 18, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-success"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">asdf  hhkj.pdf</p>
                                    <small>Size: 3MB <span className="date text-muted">Aug 18, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2018.xls</p>
                                    <small>Size: 68KB <span className="date text-muted">Dec 12, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2019.xls</p>
                                    <small>Size: 103KB <span className="date text-muted">Jan 24, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2018.xls</p>
                                    <small>Size: 68KB <span className="date text-muted">Dec 12, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 42KB <span className="date text-muted">Nov 02, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 89KB <span className="date text-muted">Dec 15, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-bar-chart text-warning"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Report2019.xls</p>
                                    <small>Size: 103KB <span className="date text-muted">Jan 24, 2018</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="file">
                            <a href="#">
                                <div className="hover">
                                    <button type="button" className="btn btn-icon btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-file text-info"></i>
                                </div>
                                <div className="file-name">
                                    <p className="m-b-5 text-muted">Document_2019.doc</p>
                                    <small>Size: 89KB <span className="date text-muted">Dec 15, 2019</span></small>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default FileDocument
