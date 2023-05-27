import "reset-default-style"
import "../../Global/font-face.scss"
import './App.scss';
import Introduction from "../Introduction/Introduction";
import About from "../About/About";


function App() {
  return (
    <div className="app">
      <Introduction />
      <About />
    </div>
  )
}

export default App;
