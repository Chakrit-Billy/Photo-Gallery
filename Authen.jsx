import App from "./src/App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAlbum from "./src/AddAlbum2.jsx";
import SignInSide from "./src/SignInSide.jsx";
import SignUp from "./src/SignUp.jsx";
// import { useAppContext } from "./AppContext.jsx";
import EditCardPage from "./src/EditCardPage.jsx";
import Gallery from "./src/Gallery.jsx";
import EmailInput from "./src/EmailInput.jsx";
import ResetPassword from "./src/ResetPassword.jsx";
function Authen() {
  //   const { isAuthentication } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<SignUp />} />
        <Route path='/main' element={<App />} />
        <Route path='/add' element={<AddAlbum />} />
        <Route path='/' element={<SignInSide />} />
        <Route path='/edit/:cardId' element={<EditCardPage />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/forgot-password' element={<EmailInput />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default Authen;
