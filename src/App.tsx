
// import './App.css'
import {Navbar} from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Contacts} from "./pages/Contacts.tsx";
import {About} from "./pages/About.tsx";
import {Store} from "./pages/Store.tsx";
import {Container} from "react-bootstrap";
import {ShoppingCartProvider} from "./context/ShoppingCartContext.tsx";
import Item1 from "./pages/Item1.tsx";


function App() {


  return (
    <ShoppingCartProvider>
      <Navbar />

        <Container>

      <Routes>

        <Route path= "/" element={<Home />}/>
        <Route path= "/contacts" element={<Contacts/>}/>
        <Route path= "/about" element={<About />}/>
        <Route path= "/store" element={<Store />}/>
        <Route path= "/products/:id" element={<Item1 />}/>

      </Routes>

    </Container>

    </ShoppingCartProvider>
  )
}

export default App
