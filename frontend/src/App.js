import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
    return (
        <Router>
            <div className="container container-fluid">
                <Header />
                <Route path="/" component={Home} exact />
            </div>
            <Footer />
        </Router>
    );
}

export default App;
