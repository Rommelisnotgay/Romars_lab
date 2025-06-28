import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import App from "./App";
import Index from "./pages/Index";
import Grammar from "./pages/Grammar";
import Story from "./pages/Story";
import Vocabulary from "./pages/Vocabulary";
import Paragraphs from "./pages/Paragraphs";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Posts from "./pages/Posts";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

// مكونات القواعد
import PresentSimple from "./components/grammar/PresentSimple";
import PresentContinuous from "./components/grammar/PresentContinuous";
import PresentPerfect from "./components/grammar/PresentPerfect";
import PastSimple from "./components/grammar/PastSimple";
import PastContinuous from "./components/grammar/PastContinuous";
import PastPerfect from "./components/grammar/PastPerfect";
import PastPerfectContinuous from "./components/grammar/PastPerfectContinuous";
import FutureSimple from "./components/grammar/FutureSimple";
import FutureContinuous from "./components/grammar/FutureContinuous";
import FuturePerfect from "./components/grammar/FuturePerfect";
import ModalsDeduction from "./components/grammar/ModalsDeduction";
import RelativeClauses from "./components/grammar/RelativeClauses";
import ReportedSpeech from "./components/grammar/ReportedSpeech";
import AdjectivesAdverbs from "./components/grammar/AdjectivesAdverbs";
import UsedToWould from "./components/grammar/UsedToWould";
import CausativeVerbs from "./components/grammar/CausativeVerbs";
import Quantifiers from "./components/grammar/Quantifiers";

// مكونات القصة
import Chapter1 from "./components/story/Chapter1";
import Chapter2 from "./components/story/Chapter2";
import Chapter3 from "./components/story/Chapter3";
import Chapter4 from "./components/story/Chapter4";
import Chapter5 from "./components/story/Chapter5";
import Chapter6 from "./components/story/Chapter6";

// مكونات لوحة التحكم
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminPosts from "./pages/admin/Posts";
import AdminPinned from "./pages/admin/Pinned";
import AdminLikes from "./pages/admin/Likes";
import AdminNotifications from "./pages/admin/Notifications";
import AdminOnline from "./pages/admin/Online";
import { apiClient } from "./lib/apiClient";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // تحقق من وجود التوكن في أي من المكانين
        const token = localStorage.getItem("adminToken") || localStorage.getItem("auth_token");
        
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        
        const isValid = await apiClient.verifyToken();
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("Auth verification error:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);
  
  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "grammar",
        element: <Grammar />,
        children: [
          {
            path: "present-simple",
            element: <PresentSimple />,
          },
          {
            path: "present-continuous",
            element: <PresentContinuous />,
          },
          {
            path: "present-perfect",
            element: <PresentPerfect />,
          },
          {
            path: "past-simple",
            element: <PastSimple />,
          },
          {
            path: "past-continuous",
            element: <PastContinuous />,
          },
          {
            path: "past-perfect",
            element: <PastPerfect />,
          },
          {
            path: "past-perfect-continuous",
            element: <PastPerfectContinuous />,
          },
          {
            path: "future-simple",
            element: <FutureSimple />,
          },
          {
            path: "future-continuous",
            element: <FutureContinuous />,
          },
          {
            path: "future-perfect",
            element: <FuturePerfect />,
          },
          {
            path: "modals-deduction",
            element: <ModalsDeduction />,
          },
          {
            path: "relative-clauses",
            element: <RelativeClauses />,
          },
          {
            path: "reported-speech",
            element: <ReportedSpeech />,
          },
          {
            path: "adjectives-adverbs",
            element: <AdjectivesAdverbs />,
          },
          {
            path: "used-to-would",
            element: <UsedToWould />,
          },
          {
            path: "causative-verbs",
            element: <CausativeVerbs />,
          },
          {
            path: "quantifiers",
            element: <Quantifiers />,
          },
        ],
      },
      {
        path: "story",
        element: <Story />,
        children: [
          {
            path: "chapter1",
            element: <Chapter1 />,
          },
          {
            path: "chapter2",
            element: <Chapter2 />,
          },
          {
            path: "chapter3",
            element: <Chapter3 />,
          },
          {
            path: "chapter4",
            element: <Chapter4 />,
          },
          {
            path: "chapter5",
            element: <Chapter5 />,
          },
          {
            path: "chapter6",
            element: <Chapter6 />,
          },
        ],
      },
      {
        path: "vocabulary",
        element: <Vocabulary />,
      },
      {
        path: "paragraphs",
        element: <Paragraphs />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "search",
        element: <Search />,
      },
      // Admin Login
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      // Protected Admin Routes
      {
        path: "admin",
        element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "posts",
            element: <AdminPosts />,
          },
          {
            path: "pinned",
            element: <AdminPinned />,
          },
          {
            path: "likes",
            element: <AdminLikes />,
          },
          {
            path: "notifications",
            element: <AdminNotifications />,
          },
          {
            path: "online",
            element: <AdminOnline />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
