import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import SignIn from './components/SignIn'
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";
import Me from "./components/Me";
import Header from "./components/Header";




function App() {

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        
        <Route path = "/" element = {<Me/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/send" element={<SendMoney/>} />
      </Routes>
    
    </BrowserRouter>
    </>
    
  
  )
}

export default App
