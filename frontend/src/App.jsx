import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// Static imports
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Login from "./components/Login";

// Static admin imports
import HomeEditor from "./components/editor_components/HomeEditor";
import AboutEditor from "./components/editor_components/AboutEditor";
import ContactEditor from "./components/editor_components/ContactEditor";
import GalleryEditor from "./components/editor_components/GalleryEditor";
import ProjectsEditor from "./components/editor_components/ProjectsEditor";
import LayoutsEditor from "./components/editor_components/LayoutsEditor";
import ServicesEditor from "./components/editor_components/ServicesEditor";
import CreateAdmin from "./components/CreateAdmin";
import MessagesList from "./components/MessagesList";
import About1 from "./components/about_components/About1";
import Message from "./components/about_components/Message";
import About2 from "./components/about_components/About2";
import Team from "./components/about_components/Team";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About />,
          
         },
         {
          path: "about/company-profile",
          element:<About1 />,
        },
        {
          path: "about/message",
          element:<Message />,
        },
        {
          path: "about/story",
          element:<About2 />,
        },
        {
          path: "about/team",
          element:<Team />,
        },
        { path: "contact", element: <Contact /> },
        { path: "gallery", element: <Gallery /> },
        { path: "projects", element: <Projects /> },
        {
          path: "services",
          element: <Services />,
          children: [
            {
              path: ":serviceSlug",
              element: <Services />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <PrivateRoute element={<AdminLayout />} />,
      children: [
        { path: "", element: <HomeEditor /> },
        { path: "home", element: <HomeEditor /> },
        { path: "about", element: <AboutEditor /> },
        { path: "contact", element: <ContactEditor /> },
        { path: "gallery", element: <GalleryEditor /> },
        { path: "projects", element: <ProjectsEditor /> },
        { path: "layouts", element: <LayoutsEditor /> },
        { path: "services", element: <ServicesEditor /> },
        {
          path: "services/:serviceSlug",
          element: <ServicesEditor />,
        },
        { path: "create-admin", element: <CreateAdmin /> },
        { path: "messages-list", element: <MessagesList /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
