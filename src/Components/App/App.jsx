import {useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import Introduction from "../Introduction/Introduction";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import Toggle from "../Toggle/Toggle";
import "reset-default-style"
import "../../Global/darkmode.scss"
import "../../Global/responsive.scss"
import "../../Global/font-face.scss"
import './App.scss';

function App() {
  const theme = useContext(ThemeContext)
  const darkmode = theme.state.darkMode
  return (
    <div className={darkmode ? "app dark":"app"}>
        <Toggle />
        <Introduction />
        <About />
        <Projects />
        <Contact />
    </div>
  )
}

export default App;
