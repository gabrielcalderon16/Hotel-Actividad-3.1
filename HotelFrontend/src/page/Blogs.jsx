import WrapperContainer from '../components/WrapperContainer'
import './Blogs.css'
import 'animate.css';
import { useEffect, useState } from 'react';
import { HotelApi } from '../api/api';
import { Article } from '../components/Article';

const Blogs = () => {

  const [Blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogs()
  }, [])
  

  const getBlogs = async () =>{
    const resp = await HotelApi.get(`/posts`)
    .then( resp => {
      setBlogs(resp.data.posts)
     })
  }


  return (
    <div className="bg-[#0B8185]">
      <WrapperContainer>
      <div className="py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap gap">
    {
      Blogs.map(post => (
          <Article key={post.uid} post={post} />
      )
      )
    }

  </div>
</div>
      </WrapperContainer>
    </div>
  )
}

export default Blogs;
