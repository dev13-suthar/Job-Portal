import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { RecoilRoot } from 'recoil'
import Setprofile from './pages/setProfile/Setprofile'
import Layout from './pages/layout'
import Feed from './pages/feed/Feed'
import NewJob from './pages/NewJob/NewJob'
import { Toaster } from 'sonner'
import SingleJob from './pages/job.id/SingleJob'
import MyApplications from './pages/MyApplications/MyApplications'
import MyProfile from './pages/profilePage/MyProfile'
import MyJobInfo from './pages/MyjobsInfo/MyJobInfo'
import EditJob from './pages/EditJobs/EditJob'


function App() {

  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Toaster
          position='top-right'
          duration={2000}
          />
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<Layout/>}>
              <Route path='setProfile' element={<Setprofile/>}/>
              <Route path='feed' element={<Feed/>}/>
              <Route path='newJob' element={<NewJob/>}/>
              <Route path='job/:id' element={<SingleJob/>}/>
              <Route path='myApplication' element={<MyApplications/>}/>
              <Route path='me' element={<MyProfile isMe={true}/>}/>
              <Route path='user/:id' element={<MyProfile isMe={false}/>}/>
              <Route path='edit/:id' element={<EditJob/>}/>
              <Route path='myJobinfo/:id' element={<MyJobInfo/>}/>
            </Route>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App
