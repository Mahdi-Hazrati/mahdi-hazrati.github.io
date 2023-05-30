import "reset-default-style"
import "../../Global/font-face.scss"
import './App.scss';
import Introduction from "../Introduction/Introduction";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import Toggle from "../Toggle/Toggle";

function App() {
  return (
    <div className="app">
      <Toggle />
      <Introduction />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App;
