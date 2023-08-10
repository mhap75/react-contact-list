import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Container/Layout/Layout";
import {Home} from "./Pages/Home";
import ContactList from "./Pages/ContactList";
import ContactDetail from "./Components/ContactDetail";

function App() {
    return (<BrowserRouter>
        <Layout>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/contacts/:id" element={<ContactDetail/>}/>
                <Route path="/contacts" element={<ContactList/>}/>
            </Routes>
        </Layout>
    </BrowserRouter>);
}

export default App;
