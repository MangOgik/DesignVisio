import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./layout/PrivateRoute";
import ArchitectList from "./Pages/Architect/ArchitectList";
import Playlist from "./Pages/UTS";
import PlaylistDetails from "./Pages/UTS/PlaylistDetails";
import CompanyDetails from "./Pages/Company/CompanyDetails";
import CompanyList from "./Pages/Company/CompanyList";
import ArchitectDetails from "./Pages/Architect/ArchitectDetails";
import ProjectList from "./Pages/Projects/ProjectList";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Registration from "./Pages/Auth/Registration";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Account from "./Pages/Account/Account";
import Home from "./Pages/Home/Home";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import BookingList from "./Pages/Booking/BookingList";
import ProjectHistoryList from "./Pages/Projects/ProjectHistoryList";

function App() {
  return (
    <>
      <div className="scrollbar-thin">
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="auth" element={<Auth />}>
              <Route exact path="login" element={<Login />} />
              <Route exact path="registration" element={<Registration />} />
            </Route>
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="home"
              element={<PrivateRoute components={<Home />} authUser="all" />}
            />
            <Route
              exact
              path="company"
              element={
                <PrivateRoute components={<CompanyList />} authUser="client" />
              }
            />
            <Route
              // exact
              path="company/:companySlug"
              element={
                <PrivateRoute
                  components={<CompanyDetails />}
                  authUser="client"
                />
              }
            />
            <Route
              path="company/:companySlug/:architectSlug"
              element={
                <PrivateRoute
                  components={<ArchitectDetails />}
                  authUser="client"
                />
              }
            />
            <Route
              // exact
              path="architect"
              element={
                <PrivateRoute
                  components={<ArchitectList />}
                  authUser="client"
                />
              }
            />
            <Route
              // exact
              path="architect/:architectSlug"
              element={
                <PrivateRoute
                  components={<ArchitectDetails />}
                  authUser="client"
                />
              }
            />
            <Route
              // exact
              path="project"
              element={
                <PrivateRoute components={<ProjectList />} authUser="all" />
              }
            />
            <Route
              // exact
              path="project/:projectSlug"
              element={
                <PrivateRoute components={<ProjectDetails />} authUser="all" />
              }
            />
            <Route
              // exact
              path="history"
              element={
                <PrivateRoute
                  components={<ProjectHistoryList />}
                  authUser="all"
                />
              }
            />
            <Route
              // exact
              path="history/:projectSlug"
              element={
                <PrivateRoute components={<ProjectDetails />} authUser="all" />
              }
            />
            <Route
              // exact
              path="account"
              element={<PrivateRoute components={<Account />} authUser="all" />}
            />
            <Route
              // exact
              path="booking"
              element={
                <PrivateRoute components={<BookingList />} authUser="all" />
              }
            />
            <Route
              exact
              path="uts"
              element={
                <PrivateRoute components={<Playlist />} authUser="all" />
              }
            >
              <Route exact path=":playlistName" element={<PlaylistDetails />} />
            </Route>
          </Routes>
        </AuthProvider>
        <Toaster />
      </div>
    </>
  );
}

export default App;
