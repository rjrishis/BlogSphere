import React, { useEffect, useState } from 'react';
import { PostCard, Container } from "../index";
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            console.log(posts);
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length > 0) {
        return (
            <div className='w-full py-12 min-h-screen' style={{ backgroundColor: "#6A7280" }}>
                <Container>
                    <h1 className="text-4xl font-bold text-center text-white mb-8">Latest Posts</h1>
                    <div className='flex flex-wrap justify-center gap-6'>
                        {posts.map(post => (
                            <div key={post.$id} className='p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-all duration-300 hover:scale-105'>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="relative flex flex-col items-center justify-center h-screen" style={{ backgroundColor: "#6A7280" }}>
                
                {/* Image Section */}
                <img 
                    src="https://www.shutterstock.com/shutterstock/photos/85288510/display_1500/stock-vector-paper-stickers-error-oops-no-photo-available-85288510.jpg"
                    alt="No Posts Available"
                    className="w-72 mb-6 rounded-lg shadow-lg opacity-90"
                />

                {/* Glassmorphism Card */}
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-400 text-center max-w-lg">
                    <h1 className="text-3xl font-bold text-white">No Posts Available</h1>
                    <p className="text-gray-200 mt-2 text-lg">
                        Start sharing your thoughts by creating your first post!
                    </p>

                    {/* Call-to-Action Button */}
                    <button
                        onClick={() => navigate('/add-posts')}
                        className="mt-6 px-8 py-3 text-white text-lg font-semibold rounded-full shadow-md"
                        style={{
                            backgroundColor: "#5A6170",
                            transition: "all 0.3s ease-in-out"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#4A5160"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#5A6170"}
                    >
                        ➕ Add a Post
                    </button>
                </div>
            </div>
        );
    }
}

export default AllPosts;
