import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BookMarks from "./pages/BookMarks";
import ContestSolutionForm from "./components/ContestLinkForm.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
       
        <Route path="/bookmarks" element={<Layout />}>
          <Route index element={<BookMarks />} />
        </Route>
        <Route path="/add-contest-link" element={<Layout />} >
        <Route index element={<ContestSolutionForm />} />
        </Route>
      
      </Routes>
    </Router>
  );
};

export default App;
