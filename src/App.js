import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar/navbar';
import FileUploader from './Components/dataScraping/FileUploader';
import Home from './Components/Home_page/Home'
import './App.css';

const EmailValidators = () => <div>Email Validators Page</div>;

const DataScraping = () => <FileUploader />; 

const App = () => {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email-validators" element={<EmailValidators />} />
        <Route path="/data-scraping" element={<DataScraping />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
