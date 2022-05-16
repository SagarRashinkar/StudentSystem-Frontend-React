import { ToastContainer } from 'react-toastify';
import './App.css';
import Appbar from './components/Appbar';
import Student from './components/Student'

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Appbar />
      <Student />
    </div>
  );
}

export default App;
