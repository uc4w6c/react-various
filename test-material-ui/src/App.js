import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Album from './components/pages/Album';
import HoverText from './components/pages/HoverText';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/album" element={<Album />} />
          <Route path="/hover-text" element={<HoverText />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
