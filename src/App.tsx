import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import routesConfig from './config/routes'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routesConfig.map(item =>
          <Route path={item.path} Component={item.Component} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
