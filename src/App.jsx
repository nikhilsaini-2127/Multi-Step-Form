import MultiStepForm from "./pages/MultiStepForm";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewData from "./pages/ViewData";
import EditData from "./pages/EditData";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/form" element={
        <div className="flex flex-row justify-around">
      <MultiStepForm />
      <div className="hidden md:block w-[60%] h-full p-2">
        <img src="/hero1.svg" className="mx-auto " alt="Hero illustration" />
      </div>
    </div>
      }/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/:id" element={<ViewData/>}/>
    <Route path="/edit/:id" element={<EditData/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
