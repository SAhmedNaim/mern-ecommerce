import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";

function App() {
    return (
        <Router>
            <div className="container container-fluid">
                <Header />
                <Route path="/" component={Home} exact />
                <Route path="/search/:keyword" component={Home} />
                <Route path="/product/:id" component={ProductDetails} exact />
                
                <Route path="/login" component={Login} exact />
            </div>
            <Footer />
        </Router>
    );
}

export default App;
