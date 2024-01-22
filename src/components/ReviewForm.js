import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {addReviewAsync, backClick} from '../features/MoviesSlice';
const ReviewForm = () => {
    const navigate = useNavigate();
    const {reviewflag, reviewid, reviewname} = useSelector((store)=>store.movie);
    const isLogin = useSelector((store)=>store.modal.islogin);
    const profile = useSelector((store)=>store.user.profile);
    const dispatch = useDispatch();
    const [review, setReview] = useState({
        movieId: "",
        rating: "",
        comments: "",
      });

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        dispatch(addReviewAsync({...review, movieId:reviewid, name:reviewname, mail:profile.email}));
        console.log("Review submitted:", review);  
        //dispatch(afterreview()); 
        setReview({
          movieId: "",
          rating: "",
          comments: "",
        });
        
      };
      console.log(reviewflag, 'first');
    return ( 
        <div>
        {reviewflag && (
            <div className="review-form">
            <h2>Write a Review</h2>
            <form onSubmit={handleReviewSubmit}>
                <label>
                Rating:
                <input
                    type="number"
                    value={review.rating}
                    placeholder="1-5"
                    onChange={(e) => setReview({ ...review, rating: e.target.value })}
                    required
                />
                </label>
                <label>
                Comments:
                <textarea
                    value={review.comments}
                    placeholder="comments"
                    onChange={(e) => setReview({ ...review, comments: e.target.value })}
                    required
                />
                </label>
                <button type="submit">Submit Review</button>
            </form>
            <div className='back-button-container'>
          <button onClick={()=>dispatch(backClick())} >Back to Home</button>
        </div>
            </div>
            )}
            </div>
     );
}
 
export default ReviewForm;