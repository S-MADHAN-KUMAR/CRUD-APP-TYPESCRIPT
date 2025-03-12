import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import CreateUser from "./components/CreateUser"
import UsersList from "./components/UsersList"

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/users" element={<UsersList/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App