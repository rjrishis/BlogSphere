import React, { useEffect, useState } from 'react'
import {Container , PostForm} from "../index"
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/config'

function EditPost() {
    const [post , setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      if(slug){
        service.getPost(slug).then((post)=>{
            if(post){
                setPost(post)
            }
        })
      }else{
        navigate("/")
      }
    }, [slug,navigate])
    console.log(post)
    
  return post? (
    <div className='py-8'>
    <Container>
        <PostForm post = {post}/>
    </Container>
</div>
  ):null
}

export default EditPost