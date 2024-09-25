import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../../APIs/postsApis";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faAdd,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
import { Link } from "react-router-dom";

function Home() {
  const allPosts = useSelector((state) => state.postsData.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPosts()).then(() => setLoading(false));
  }, []);

  const handleCloseModal = () => setShow(false);
  // console.log(newPost)

  const handleAddPost = () => {
    if (newPost.title && newPost.body) {
      if (newPost.title.length >= 10 && newPost.title.length <= 150) {
        if (newPost.body.length >= 50 && newPost.body.length <= 300) {
          dispatch(addPost(newPost)).then(() => {
            setNewPost({
              title: "",
              body: "",
            });
            toast.success("Your post has been added successfully");
          });
        } else {
          toast.error("body must be between 50 and 300 characters");
        }
      } else {
        toast.error("title must be  between 10 and 150 characters");
      }
    } else if (!newPost.title && !newPost.body) {
      toast.error(" title and body are required");
    } else if (!newPost.title) {
      toast.error(" title  is required");
    } else if (!newPost.body) {
      toast.error(" body  is required");
    }
  };

  const isButtonDisabled = !newPost.title || !newPost.body;

  const handleShowModal = (post) => {
    //  console.log(post);
    setShow(true);
    setCurrentPost(post);
  };

  // const handelViewPost = (post) => {
  //   setCurrentPost(post);
  // };
  const handleUpdatePost = () => {
    const updatedPostData = {
      title: currentPost.title,
      body: currentPost.body,
    };
    dispatch(
      updatePost({ id: currentPost.id, updatedData: updatedPostData })
    ).finally(() => {
      handleCloseModal();
      toast.success("Your post has been Updated successfully");
    });
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ id: currentPost.id })).then(() => {
      toast.success("Your post has been deleted successfully");
      dispatch(fetchPosts());
    });
  };
  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {allPosts.map((post) => (
                <div className="card post-item" key={post.id}>
                  <div className="card-body">
                    <h5>
                      {post.id} - {post.title}
                    </h5>
                    <p className="card-text">{post.body}</p>
                    <div className="postControlButtons">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleShowModal(post);
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faEdit} />
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeletePost();
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>

                      <Link
                        className="btn btn-success"
                        to={`/details/${post.id}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                <button
                  className="btn btn-success"
                  onClick={handleAddPost}
                  disabled={isButtonDisabled}
                >
                  <FontAwesomeIcon icon={faAdd} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateModal
        show={show}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangedData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
    </>
  );
}

export default Home;
