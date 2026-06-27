import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { Review } from "./components/Review";
import { Manage } from "./components/Manage";
import { CardForm } from "./components/CardForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/review",
    Component: Review,
  },
  {
    path: "/manage",
    Component: Manage,
  },
  {
    path: "/card/new",
    Component: CardForm,
  },
  {
    path: "/card/edit/:id",
    Component: CardForm,
  },
]);
