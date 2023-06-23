import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MyContainer, Loader} from "./components";
import { useMyContract } from "./hooks";

function App() {
  const { myContract } = useMyContract();

  if (!myContract) return <Loader message="Loading app..." />

  return (
    <Routes>
      <Route index element={<MyContainer />}/>
      <Route path="/home" element={<MyContainer />}/>
    </Routes>
  )
}

export default App;