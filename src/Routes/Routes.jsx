import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import ImageEditor from "../Component/Dashboard/ImageCropping";
import About from "../Pages/About/About";
import StoreProduct from "../Pages/Store/StoreProduct";
import Blog from "../Pages/Blog/Blog";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Component/NotFound";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Career from "../Pages/Career/Career";
import CartPage from "../Pages/Cart/CartPage";
import Wishlist from "../Pages/WishList/Wishlist";
import Partners from "../Pages/Partners/Partners";
import HelpPage from "../Pages/HelpCenter/HelpPage";
import HelpSubPage from "../Pages/HelpCenter/HelpSubPage";
import TermsofServices from "../Pages/TermsAndCondition/TermsofServices";
import FAQPage from "../Pages/FAQPage/FAQPage";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer";
import Biddingpage from "../Pages/Art-Biding/BidingPage";
import WhyChooseUs from "../Pages/WhyChooseUs/WhyChooseUs";
import NFTCard from "../Pages/Art-Biding/NFTCard";
import AllComponent from "../Pages/AllComponent";
import StoreDetails from "../Component/Product-Details/StoreDetails";
import ArtistSupport from "../Pages/Artist/ArtistSupport";
import NewSlider from "../Component/newSlider/NewSlider";
import UserProfile from "../Component/Dashboard/UserProf";
import BlogForm from "../Pages/Dashboard/DashBoardPages/BlogPost";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AppInbox from "../Component/Dashboard/AppInbox";
import AppContact from "../Component/Dashboard/AppContact";
import AppChat from "../Component/Dashboard/AppChat";
import BlogDashboard from "../Pages/Dashboard/DashBoardPages/BlogDashboard";
import BlogPost from "../Pages/Dashboard/DashBoardPages/BlogPost";
import BlogList from "../Pages/Dashboard/DashBoardPages/BlogList";
import BlogDetails from "../Pages/Dashboard/DashBoardPages/BlogDetails";
import FileDashboard from "../Pages/Dashboard/DashBoardPages/FileDashboard";
import TradingPage from "../Pages/TradingPage/TradingPage";
import FileDocument from "../Pages/Dashboard/DashBoardPages/FileDocument";
import FileMedia from "../Pages/Dashboard/DashBoardPages/FileMedia";
import FileImages from "../Pages/Dashboard/DashBoardPages/FileImages";
import ForbiddonError from "../Pages/Dashboard/DashBoardPages/ForbiddonError";
import NotFoundError from "../Pages/Dashboard/DashBoardPages/NotFoundError";
import ImageGallery from "../Pages/Dashboard/DashBoardPages/ImageGallery";
import Invoices from "../Pages/Dashboard/DashBoardPages/Invoices";
import SearchResult from "../Pages/Dashboard/DashBoardPages/SearchResult";
import Maintenance from "../Pages/Dashboard/DashBoardPages/Maintenance";
import Teamboards from "../Pages/Dashboard/DashBoardPages/Teamboards";

import Trial from "../Pages/Trial";
import ArtistManagement from "../Pages/ArtistManagement";
import ArtistManageTable from "../Pages/Dashboard/DashBoardPages/ArtistManageTable";
import BuyerManageTable from "../Pages/Dashboard/DashBoardPages/BuyerManageTable";
import ArtistDetail from "../Pages/Dashboard/DashBoardPages//ArtistDetail";
import ProductUpload from "../Pages/Dashboard/DashBoardPages/productUploade";

import BlogRequest from "../Pages/Dashboard/DashBoardPages/BlogRequest";

import ResellPage from "../Pages/ResellPage/ResellPage";

const AppRoutes = () => {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<StoreProduct />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/career" element={<Career />} />
          <Route path="/partner" element={<Partners />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:title" element={<HelpSubPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsofServices />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/art" element={<NFTCard />} />
          <Route path="/why-artsays?" element={<WhyChooseUs />} />
          <Route path="/product-details" element={<StoreDetails />} />
          <Route path="/Allcom" element={<AllComponent />} />
          <Route path="/completeprofile" element={<UserProfile />} />
          <Route path="/Appinbox" element={<AppInbox />} />
          <Route path="/Appcontact" element={<AppContact />} />
          <Route path="/Appchat" element={<AppChat />} />
          <Route path="/Blogdashboard" element={<BlogDashboard />} />
          <Route path="/Blogpost" element={<BlogForm />} />
          <Route path="/Bloglist" element={<BlogList />} />
          <Route path="/Blogdetails" element={<BlogDetails />} />
          <Route path="/Filedashboard" element={<FileDashboard />} />
          <Route path="/Filedocs" element={<FileDocument />} />
          <Route path="/Filemedia" element={<FileMedia />} />
          <Route path="/Fileimages" element={<FileImages />} />
          <Route path="/imagegallery" element={<ImageGallery />} />
          <Route path="/invoice" element={<Invoices />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/teamboard" element={<Teamboards />} />
          <Route path="/ImageEditor" element={<ImageEditor />} />
          <Route path="/create-blog" element={<BlogPost />} />
          <Route path="/Bidding-page" element={<Biddingpage />} />
          <Route path="/Trading-page" element={<TradingPage />} />
          <Route path="/Resell-page" element={<ResellPage />} />
          <Route path="/Product-uploade" element={<ProductUpload />} />

          <Route path="/403" element={<ForbiddonError />} />
          <Route path="/404" element={<NotFoundError />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/Support" element={<ArtistSupport />} />
          <Route path="/new-slider" element={<NewSlider />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboardaccess" element={<Dashboard />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/artist" element={<ArtistManagement />} />
          <Route path="/ArtistManageTable" element={<ArtistManageTable />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/BlogRequest" element={<BlogRequest />} />
          <Route path="/BuyerManageTable" element={<BuyerManageTable />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation(); // Now inside the Router
  const hideHeaderFooterRoutes = [
    "/completeprofile",
    "/image-edit",
    "/artists/:id",
    "/ArtistManageTable", //superadmin ,admin
    "/BuyerManageTable", //superadmin ,admin
    "/teamboard", //superadmin ,admin
    "/maintenance", //superadmin ,admin
    "/search",
    "/imageeditor",
    "/invoice",
    "/imagegallery",
    "/Fileimages",
    "/403",
    "/404",
    "/Filemedia",
    "/Filedocs",
    "/create-blog",
    "/dashboardaccess",
    "/Bloglist", //superadmin ,admin
    "/Filedashboard",
    "/Blogdetails",
    "/Blogpost",
    "/Appinbox",
    "/Appcontact",
    "/Appchat",
    "/Blogdashboard",
    "/BlogRequest", //superadmin ,admin
    "/Product-uploade",
  ];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
