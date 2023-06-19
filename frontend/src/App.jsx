import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Author from "./pages/Author";
import About from "./pages/About";
import Account from "./pages/Account";
import Login from "./pages/Login";

import Footer from "./components/Footer";
import Header from "./components/Header";

import { CurrentUserLogProvider } from "./contexts/CurrentUserLog";
import { CurrentUserStatusProvider } from "./contexts/CurrentUserStatus";
import { CurrentUserIdProvider } from "./contexts/CurrentUserId";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <CurrentUserLogProvider>
        <CurrentUserStatusProvider>
          <CurrentUserIdProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/author" element={<Author />} />
                <Route path="/about" element={<About />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>
            <Footer />
          </CurrentUserIdProvider>
        </CurrentUserStatusProvider>
      </CurrentUserLogProvider>
    </div>
  );
}

export default App;
