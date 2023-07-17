import logo from './logo.svg';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'
import SearchingVisualizer from './searchingVisualizer/serachingVisualizer.jsx'

//add pathfinder solver and sudoku
function App() {
  return (
    <div className="App">
      <SearchingVisualizer></SearchingVisualizer>
    </div>
  );
}

export default App;
