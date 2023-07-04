import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Author from "./pages/Author";
import About from "./pages/About";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AccountDashboard from "./components/AccountDashboard";
import AdminWorks from "./components/AdminWorks";
import AdminWorksList from "./components/AdminWorksList";
import AdminWorksAdd from "./components/AdminWorksAdd";
import AdminWorksUpdate from "./components/AdminWorksUpdate";
import AdminWorksDelete from "./components/AdminWorksDelete";

import { CurrentUserProvider } from "./contexts/CurrentUser";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/author" element={<Author />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />}>
              <Route index element={<AccountDashboard />} />
              <Route path="works" element={<AdminWorks />}>
                <Route index element={<AdminWorksList />} />
                <Route path="add" element={<AdminWorksAdd />} />
                <Route path=":id" element={<AdminWorksUpdate />} />
                <Route path="delete/:id" element={<AdminWorksDelete />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
        <Footer />
      </CurrentUserProvider>
    </div>
  );
}

export default App;
