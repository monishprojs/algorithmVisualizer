import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import SearchingVisualizer from './searchingVisualizer/searchingVisualizer.jsx';
import SudokuVisualizer from './sudokuVisualizer/sudokuVisualizer';
import PathfindingVisualizer from './pathfindingVisualizer/pathfindingVisualizer';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//add pathfinder solver and sudoku
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />

          <Route path="/sorting" element={<SortingVisualizer />} />

          <Route path="/sudoku" element={<SudokuVisualizer />} />

          <Route path="/searching" element={<SearchingVisualizer />} />

          <Route path="/" element={<Navigate replace to="/pathfinding" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
