import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserAuthentication from './pages/UserAuthentication.js';
import QuestionPage from './pages/QuestionPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import LoadingPage from "./pages/LoadingPage.js";
import CollaboratePage from "./pages/CollaboratePage.js";
import CodingPage from "./pages/CodingPage.js";

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
    path: "collaborate",
    element: <CollaboratePage />
  },
  {
    path: "collaborate/code",
    element: <CodingPage />
  },
]);

export default router;