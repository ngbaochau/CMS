import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountDetail from './pages/AccountPage/AccountDetail.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/account/:id" element={<AccountDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
