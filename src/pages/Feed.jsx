import { useEffect, useState } from "react"
import api from "../services/api"
import Skeleton from "../components/Skeleton"

import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaBell,
} from "react-icons/fa"

function Feed() {
  const [posts, setPosts] = useState([])
  const [liked, setLiked] = useState([])
  const [commentInput, setCommentInput] = useState({})
  const [comments, setComments] = useState({})
  const [notifications] = useState([
    "🔥 Your reel is trending",
    "💬 New comment on your post",
    "🤖 AI suggested better hashtags",
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)

        const response = await api.get("/posts?_limit=5")

        setPosts(response.data)
      } catch (err) {
        setError("Failed to load posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // LIKE BUTTON
  const toggleLike = (id) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((postId) => postId !== id))
    } else {
      setLiked([...liked, id])
    }
  }

  // COMMENTS
  const addComment = (id) => {
    if (!commentInput[id]) return

    setComments({
      ...comments,
      [id]: [...(comments[id] || []), commentInput[id]],
    })

    setCommentInput({
      ...commentInput,
      [id]: "",
    })
  }

  // =========================
  // ✅ ONLY CHANGE IS HERE
  // SKELETON LOADING UI ADDED
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">

        {/* HEADER SKELETON */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Skeleton height="h-10" />
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 p-5">

          {/* POSTS SKELETON */}
          <div className="lg:col-span-2 space-y-6">

            <Skeleton height="h-40" />
            <Skeleton height="h-40" />
            <Skeleton height="h-40" />
            <Skeleton height="h-40" />

          </div>

          {/* RIGHT SIDEBAR SKELETON */}
          <div className="space-y-6">

            <Skeleton height="h-32" />
            <Skeleton height="h-32" />

          </div>

        </div>

      </div>
    )
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-2xl">
        {error}
      </div>
    )
  }

  // EMPTY STATE
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        No posts available.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-5 z-50">
        <h1 className="text-4xl font-bold text-center">
          Social Feed 🌍
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 p-5">

        {/* POSTS SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111111] border border-gray-800 rounded-3xl p-5"
            >

              {/* USER */}
              <div className="flex items-center gap-4 mb-4">

                <img
                  src={`https://i.pravatar.cc/150?img=${post.id}`}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-bold text-lg">
                    User {post.userId}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    @creator{post.id}
                  </p>
                </div>

              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold mb-3 capitalize">
                {post.title}
              </h2>

              {/* CONTENT */}
              <p className="text-gray-300 leading-relaxed mb-5">
                {post.body}
              </p>

              {/* IMAGE */}
              <img
                src={`https://picsum.photos/600/400?random=${post.id}`}
                alt=""
                className="w-full h-72 object-cover rounded-2xl mb-5"
              />

              {/* ACTIONS */}
              <div className="flex justify-between items-center border-t border-gray-800 pt-4">

                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-2 text-lg"
                >
                  {liked.includes(post.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}

                  <span className="text-sm">
                    {liked.includes(post.id) ? "Liked" : "Like"}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-lg">
                  <FaComment />
                  <span className="text-sm">Comment</span>
                </button>

                <button className="flex items-center gap-2 text-lg">
                  <FaShare />
                  <span className="text-sm">Share</span>
                </button>

              </div>

              {/* COMMENTS */}
              <div className="mt-5">

                <div className="flex gap-3">

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInput[post.id] || ""}
                    onChange={(e) =>
                      setCommentInput({
                        ...commentInput,
                        [post.id]: e.target.value,
                      })
                    }
                    className="flex-1 bg-black border border-gray-700 p-3 rounded-xl outline-none"
                  />

                  <button
                    onClick={() => addComment(post.id)}
                    className="bg-white text-black px-5 rounded-xl font-semibold"
                  >
                    Post
                  </button>

                </div>

                {/* COMMENT LIST */}
                <div className="mt-4 space-y-3">

                  {(comments[post.id] || []).map((comment, index) => (
                    <div
                      key={index}
                      className="bg-black border border-gray-800 p-3 rounded-xl text-gray-300"
                    >
                      {comment}
                    </div>
                  ))}

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* USERS */}
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-5">

            <h2 className="text-2xl font-bold mb-5">
              Suggested Users 👥
            </h2>

            <div className="space-y-4">

              {posts.slice(0, 4).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3"
                >

                  <img
                    src={`https://i.pravatar.cc/150?img=${post.id + 10}`}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <p className="font-semibold">
                      User {post.userId}
                    </p>

                    <p className="text-gray-400 text-sm">
                      @creator{post.id}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-[#111111] border border-gray-800 rounded-3xl p-5">

            <div className="flex items-center gap-3 mb-5">
              <FaBell />
              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">

              {notifications.map((note, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 p-4 rounded-2xl"
                >
                  {note}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Feed