import Form from "./components/Form";
import DisplayData from "./components/DisplayData";
import { Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./store/dataSlice";

function App() {
  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()
  useEffect(
    () => {
      const getData = async () => {

        const response = await fetch('https://auth-7fa28-default-rtdb.firebaseio.com/users.json');
        const data = await response.json()
        const userdata = []
        for (const key in data) {

          userdata.push({
            id: data[key].id,
            firstName: data[key].firstNameValue,
            lastName: data[key].lastNameValue,
            email: data[key].emailValue,
            password: data[key].passwordValue,
            confirmPassword: data[key].confirmPasswordValue,
          })
        }
        dispatch(dataActions.storeData(userdata))
      }
      getData()
    }, [])

  useEffect(
    () => {
      const getAdminData = async () => {

        const response = await fetch('https://auth-7fa28-default-rtdb.firebaseio.com/admin.json');
        const data = await response.json()
        const admindata = []
        for (const key in data) {

          admindata.push({
            id: data[key].id,
            firstName: data[key].firstNameValue,
            lastName: data[key].lastNameValue,
            email: data[key].emailValue,
            password: data[key].passwordValue,
            confirmPassword: data[key].confirmPasswordValue,
          })
        }
        if (data) {
          dispatch(dataActions.setAdmin())
        } else {
          dispatch(dataActions.storeAdmin(admindata))
        }
      }
      getAdminData()
    }, [])




  return (
    <div className="App" >
      <Home>

        <Routes>
          {/* <Route exact path='/' element={<Home />} /> */}
          <Route path='/signup' element={<Form />} />
          <Route path='/data' element={<DisplayData />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Home>
    </div>
  );
}

export default App;
