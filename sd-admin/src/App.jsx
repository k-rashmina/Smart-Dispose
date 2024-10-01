import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import AdminLayout from './components/common/AdminLayout';
import AdminPanel from './components/common/AdminPanel';
import InquiryReport from './components/inquiryReport'
import ProfileReport from './components/profileReport';
import BinDashboard from './components/binDashboard';
import Collectors from './components/collectors';

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/admin' element={<AdminPanel/>}/>
      <Route element={<AdminLayout page={'Inquiry'} menu={["Report"]}></AdminLayout>}>
        <Route path="admin/inquiry/report" element={<InquiryReport/>}/>
      </Route>

      <Route element={<AdminLayout page={'Bin'} menu={["Dashboard","Collectors"]}></AdminLayout>}>
        <Route path="admin/bin/dashboard" element={<BinDashboard/>}/>
        <Route path="admin/bin/collectors" element={<Collectors/>}/>
      </Route>

      <Route element={<AdminLayout page={'Profile'} menu={["Report"]}></AdminLayout>}>
        <Route path="admin/profile/report" element={<ProfileReport/>}/>
        
      </Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
