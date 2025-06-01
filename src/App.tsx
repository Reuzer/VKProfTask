import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesConfig } from './config/config';
import Header from './components/header/Header';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routesConfig.map(item => 
          <Route key={item.path} path={item.path} Component={item.Component} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App

/* 
id
name
factory
price
category
quantity
antd
*/