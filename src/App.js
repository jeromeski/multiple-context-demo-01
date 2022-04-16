import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import CustomNavbar from "./components/CustomNavbar";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRef } from "react";
import { UserProvider } from "./context/user.context";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function CustomApp() {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  );
}
