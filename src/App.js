import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Signup from './Component/Signup';
import Login from './Component/Login';
import ResetPassword from './Component/ResetPassword';
import Home from './Component/Home';
import Profile from './Component/Profile';
import Protect from './Component/Protect';
import Bookbus from './Component/Bookbus';
import Busdetail from './Component/Busdetail';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
            <Routes>
              {/* <Route path='/' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forgot' element={<ResetPassword/>}/>
              <Route path='/home' element={<Protect Child={Home}/>}/>
              <Route path='/profile' element={<Protect Child={Profile}/>}/>
              <Route path='/bus' element={<Protect Child={Bookbus}/>}/>
              <Route path='/busdetails/:busid' element={<Protect Child={Busdetail}/>}/> */}

            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={ <Protect Child={Home}/>  }/>
            <Route path='/profile' element={ <Protect Child={Profile}/>  }/>
            <Route path='/bus' element={<Protect Child={Bookbus}/>}/>
            <Route path='/busdetail/:busid' element={<Protect Child={Busdetail}/>}/>
            </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
