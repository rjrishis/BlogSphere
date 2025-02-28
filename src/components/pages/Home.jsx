import React, { useEffect, useState } from 'react'
import service from '../../appwrite/config'
import {Container , PostForm ,PostCard} from "../index"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPrompt from '../LoginPrompt';
function Home() {
    const navigate = useNavigate();
    const {status} = useSelector(state => state.authReducer)
    const [posts , setPosts] = useState([]);
    console.log(status)
    useEffect(() => {
        
      service.getPosts().then(posts=>{
        console.log(posts)
        if(posts){
            setPosts(posts.documents)
        }
      })
    }, [])

    if (status === false) {
       return <LoginPrompt/>
    }
    
    if (posts.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#6A7280]">
                <div className="mx-auto w-full max-w-2xl bg-[#515864] text-white p-12 rounded-2xl shadow-xl border border-[#848B98] flex flex-col items-center text-center">
                    <img
                        src="https://media.istockphoto.com/id/2182089944/photo/emotional-intelligence-concept.jpg?s=1024x1024&w=is&k=20&c=Oa-brWRjFJeLimsNx35BYyseOFhrDjmX7K4Jc2YWnYc="
                        alt="No Posts"
                        className="w-40 h-40 mb-6 rounded-full shadow-lg border-4 border-[#BFC5D2]"
                    />
                    <h1 className="text-4xl font-extrabold text-[#BFC5D2]">
                        No Active Posts Available 📭
                    </h1>
                    <p className="text-gray-300 mt-4 text-xl px-6">
                        It looks empty here! Start by adding some amazing posts and share your thoughts with the world.
                    </p>
                    <button
                        onClick={() => navigate("/add-posts")}
                        className="mt-8 px-8 py-4 bg-[#BFC5D2] hover:bg-[#6A7280] transition-all text-[#6A7280] hover:text-white font-semibold rounded-xl text-xl shadow-lg hover:shadow-2xl transform hover:scale-105"
                    >
                        Add a Post
                    </button>
                </div>
            </div>
        );
    }
    
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map(post=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard post = {post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home