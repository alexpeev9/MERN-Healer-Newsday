import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Error from './pages/Error';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
     <div id="container">
     <Header />
     <main id="site-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="*" element={<Error />} />
       </Routes>
     </main>
     <Footer />
 </div>
  );
}

export default App;
