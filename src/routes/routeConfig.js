//React router navigation
import { Dashboard } from "../pages/dashboard/dashboard";
import { UserManagement } from "../pages/dashboard/userManagement";
import { Redirect } from "react-router-dom";
import { ChangePassword } from "../pages/auth/changePassword";
import { OrderListing } from "../pages/dashboard/orderListing";
import { ContentManagement } from "../pages/dashboard/contentManagement";
import { DiscountManagement } from "../pages/dashboard/discountManagement";
import { HomeManagement } from "../pages/dashboard/homeManagement";
import { TestimonialManagement } from "../pages/dashboard/testimonialManagement";
import { FAQManagement } from "../pages/dashboard/faqManagement";


const routes = [
  {
    path: "/",
    component: () => <Redirect to="/dashboard" />,
    exact: true,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    component: UserManagement,
  },
  {
    path: "/Change-Password",
    component: ChangePassword,
  },
  {
    path: "/order-Listing",
    component: OrderListing,
  },
  {
    path: "/content",
    component: ContentManagement,
  },
  {
    path: "/discount",
    component: DiscountManagement,
  },
  {
    path: "/home",
    component: HomeManagement,
  },
  {
    path: "/testimonial",
    component: TestimonialManagement,
  },
  {
    path: "/faq",
    component: FAQManagement,
  },
];

export default routes;
