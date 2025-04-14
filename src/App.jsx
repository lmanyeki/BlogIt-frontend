import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './pages/Profile';
// import Article from './pages/Article';
import Protected from './components/Protected';
// import MyBlogsPage from './pages/MyBlogsPage';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/article" element={<Article />} /> */}
          {/* <Route 
            path="myblogs"
            element={
              <Protected>
                <MyBlogsPage />
              </Protected>
            }
            /> */}
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;