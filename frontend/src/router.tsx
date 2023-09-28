import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DummyLoginPage from './pages/DummyLoginPage.js';
import QuestionPage from './pages/QuestionPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import HistoryPage from "./pages/HistoryPage.js";
import MorePage from "./pages/MorePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DummyLoginPage />
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
    path: "more",
    element: <MorePage />
  }
]);

export default router;