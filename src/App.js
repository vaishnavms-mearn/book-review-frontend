import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth';
import Main from './Pages/Main';
import MyBooks from './Pages/MyBooks';
import AddBook from './Components/Addbook';
import ViewBook from './Components/ViewBook';


function App() {
  return (
    <div className="App">
 <Routes>
        <Route path='/login' element={<Auth />}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/main' element={<Main/>}></Route>
        <Route path='/my-books' element={<MyBooks/>}></Route>
        <Route path='/add-book' element={<AddBook/>}></Route>
        <Route path='/view-book/:id' element={<ViewBook/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
