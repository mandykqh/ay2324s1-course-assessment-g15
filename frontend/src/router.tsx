import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserAuthentication from './pages/UserAuthentication.js';
import QuestionPage from './pages/QuestionPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import HistoryPage from "./pages/HistoryPage.js";
import MorePage from "./pages/MorePage.js";
import LoadingPage from "./pages/LoadingPage.js";
import CollaboratePage from "./pages/CollaboratePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserAuthentication />,
    errorElement: <LoadingPage />
  },
  {
    path: "home",
    element: <QuestionPage />
  },
  {
    path: "profile",
    element: <UserProfilePage />
  },
  {
    path: "history",
    element: <HistoryPage />
  },
  {
    path: "collaborate",
    element: <CollaboratePage />
  },
  {
    path: "more",
    element: <MorePage />
  }
]);

export default router;