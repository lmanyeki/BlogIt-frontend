import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogListing from './pages/BlogListing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Profile from './pages/Profile';
import BlogDetail from './pages/BlogDetail';
// import Protected from './components/Protected';
// import MyBlogsPage from './pages/MyBlogsPage';
import Write from './pages/BlogEditor';
import MyBlogs from './pages/MyBlogs';
import ArticlePage from './pages/ArticlePage';
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/bloglisting" element={<BlogListing />} />
          <Route path="/write" element={<Write />} />
          <Route path="/blogss" element={<MyBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} /> 
          <Route path="/article" element={<ArticlePage />} />
     



          {/* <Route 
            path="/bloglisting"
            element={
              <Protected>
                <BlogListing />
              </Protected>
            }
            />
          <Route 
            path="/myblogs"
            element={
              <Protected>
                <MyBlogsPage />
              </Protected>
            }
            />
          <Route 
            path="/article/:id"
            element={
              <Protected>
                <Article />
              </Protected>
            }
            />
          <Route 
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
            />
          <Route 
            path="/write"
            element={
              <Protected>
                <Write />
              </Protected>
            }
            /> */}
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;