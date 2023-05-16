import BudgetPage from './components/BudgetPage';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import MonthlyBudgetCreator from './components/MonthlyBudgetCreator';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BudgetPage />} />
        <Route path="create-budget" element={<MonthlyBudgetCreator />} />
      </Routes>
    </div>
  );
}

export default App;
