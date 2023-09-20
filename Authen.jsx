import App from "./src/App.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAlbum from "./src/addAlbum.jsx";
import SignInSide from "./src/SignInSide.jsx";
import SignUp from "./src/SignUp.jsx";
// import { useAppContext } from "./AppContext.jsx";
import EditCardPage from "./src/EditCardPage.jsx";
function Authen() {
  //   const { isAuthentication } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/add' element={<AddAlbum />} />
        <Route path='/login' element={<SignInSide />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/edit/:cardId' element={<EditCardPage />} />
      </Routes>
    </Router>
  );
}

export default Authen;
