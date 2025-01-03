import React, { useState, useEffect } from "react";
import Navbar from "../../../Component/Dashboard/Dashboardcomponents/Navbar";
import UserAccount from "../../../Component/Dashboard/Dashboardcomponents/LeftSide";
import RightIconBar from "../../../Component/Dashboard/Dashboardcomponents/RightIconBar";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";

// Utility functions to dynamically load CSS and scripts
const loadStyle = (href) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

function BlogPost() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    blogName: "",
    blogAuthor: "",
    blogImage: null,
    category: "",
  });
  const [content, setContent] = useState(""); // For Froala Editor content
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);

    // Load CSS files
    loadStyle("/DashboardAssets/assets/vendor/bootstrap/css/bootstrap.min.css");
    loadStyle(
      "/DashboardAssets/assets/vendor/font-awesome/css/font-awesome.min.css"
    );
    loadStyle("/DashboardAssets/assets/css/main.css");

    // Load scripts
    loadScript("/DashboardAssets/assets/bundles/libscripts.bundle.js").catch(
      (err) => console.error("Failed to load script:", err)
    );
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "blogImage") {
      setFormData({ ...formData, blogImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    const formDataObj = new FormData();

    console.log("Form Data:", { ...formData, blogDescription: content }); // Debugging log

    // Append all form data including the blog description
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    formDataObj.append("blogDescription", content);

    try {
      const response = await fetch("http://localhost:3001/Blog-Post/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setErrorMessage("");
      setFormData({
        blogName: "",
        blogAuthor: "",
        blogImage: null,
        category: "",
      });
      setContent(""); // Clear editor content
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.message);
    }
  };

  return (
    <div id="wrapper" className="theme-cyan">
      <Navbar />
      <UserAccount />
      <RightIconBar />
      <div id="main-content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h2>Create Blog Post</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="fa fa-dashboard"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">App</li>
                  <li className="breadcrumb-item active">Blog</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card">
                <div className="body">
                  {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="blogName"
                        value={formData.blogName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Blog Title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="blogAuthor"
                        value={formData.blogAuthor}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Author Name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-control show-tick"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Photography">Photography</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="file"
                        name="blogImage"
                        onChange={handleChange}
                        className="form-control-file"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <FroalaEditor
                        model={content}
                        onModelChange={(newContent) => {
                          console.log("Editor content:", newContent); // Debugging log
                          setContent(newContent);
                        }}
                        config={{
                          placeholderText: "Enter your blog content here.",
                          charCounterCount: true,
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block btn-primary mt-3"
                    >
                      Post Blog
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
