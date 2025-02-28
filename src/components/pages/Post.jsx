import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/config";
import { Container, Button } from "../index";
import authService from "../../appwrite/auth";

function Post() {
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const fetchedPost = await service.getPost(slug);
        if (!fetchedPost) {
          navigate("/");
          return;
        }
        setPost(fetchedPost);

        const user = await authService.getCurrentUser();
        setUserData(user);

        // Check if the logged-in user is the author
        setIsAuthor(user && fetchedPost.userId === user.$id);
      } catch (error) {
        console.error("Error fetching post or user:", error);
        navigate("/");
      }
    }

    fetchData();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;

    try {
      const status = await service.deletePost(post.$id);
      if (status) {
        await service.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full max-h-[60vw] flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-2xl object-contain"
          />
        </div>

        {isAuthor && (
          <div className="absolute right-6 top-6 mr-24 mt-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor={"bg-green-500"} className="mr-3 mt-16">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
