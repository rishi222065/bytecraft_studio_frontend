import React, { useEffect, useState } from "react";
import Navbar from "../../../Component/Dashboard/Dashboardcomponents/Navbar";
import UserAccount from "../../../Component/Dashboard/Dashboardcomponents/LeftSide";
import RightIconBar from "../../../Component/Dashboard/Dashboardcomponents/RightIconBar";

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

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    blogName: "",
    blogDescription: "",
    authorName: "",
    category: "",
    blogImage: null,
  });

  useEffect(() => {
    loadStyle("/DashboardAssets/assets/vendor/bootstrap/css/bootstrap.min.css");
    loadStyle("/DashboardAssets/assets/vendor/font-awesome/css/font-awesome.min.css");
    loadStyle("/DashboardAssets/assets/css/main.css");
    loadStyle("/DashboardAssets/assets/css/blog.css");

    Promise.all([
      loadScript("/DashboardAssets/assets/bundles/libscripts.bundle.js"),
      loadScript("/DashboardAssets/assets/bundles/vendorscripts.bundle.js"),
    ]).catch((err) => console.error("Failed to load script:", err));

    fetch("http://localhost:3001/Blog-Post/user-blogs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch blogs");
        return response.json();
      })
      .then((data) => {
        setBlogs(data.blogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/Blog-Post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete blog");
        return response.json();
      })
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const handleUpdateClick = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      blogName: blog.blogName,
      blogDescription: blog.blogDescription,
      authorName: blog.authorName || "",
      category: blog.category || "",
      blogImage: null,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, blogImage: e.target.files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("blogName", formData.blogName);
    form.append("blogDescription", formData.blogDescription);
    form.append("authorName", formData.authorName);
    form.append("category", formData.category);
    if (formData.blogImage) form.append("blogImage", formData.blogImage);

    fetch(`http://localhost:3001/Blog-Post/update/${selectedBlog._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update blog");
        return response.json();
      })
      .then((updatedBlog) => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === updatedBlog._id ? updatedBlog : blog
          )
        ); setShowModal(false);
      setSelectedBlog(null);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wrapper" className="theme-cyan">
      <Navbar />
      <UserAccount />
      <RightIconBar />
      <div id="main-content" className="blog-page">
        <div className="container-fluid">
          <h2>Blog List</h2>
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 left-box">
              {blogs.map((blog) => (
                <div key={blog._id} className="card single_post">
                  <div className="body">
                    <div className="img-post">
                      <img
                        className="d-block img-fluid"
                        src={blog.blogImage ? `http://localhost:3001/${blog.blogImage.replace(/\\/g, "/")}` : "/placeholder.jpg"}
                        alt={blog.blogName}
                      />
                    </div>
                    <h3>{blog.blogName}</h3>
                    <p>{blog.blogDescription}</p>
                  </div>
                  <div className="footer">
                    <div className="actions">
                      <a href={`/blog-details/${blog._id}`} className="btn btn-outline-secondary">
                        Continue Reading
                      </a>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(blog._id)}>
                        Delete
                      </button>
                      <button className="btn btn-outline-dark" onClick={() => handleUpdateClick(blog)}>
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Blog</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="blogName" className="form-label">
                      Blog Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="blogName"
                      name="blogName"
                      value={formData.blogName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="authorName" className="form-label">
                      Author Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="authorName"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
  <select
    name="category"
    id="category"
    className="form-control show-tick"
    value={formData.category} // Bind the value to formData.category
    onChange={handleInputChange} // Handle changes to update the state
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
                  <div className="mb-3">
                    <label htmlFor="blogDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="blogDescription"
                      name="blogDescription"
                      rows="4"
                      value={formData.blogDescription}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="blogImage" className="form-label">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="blogImage"
                      name="blogImage"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogList;
