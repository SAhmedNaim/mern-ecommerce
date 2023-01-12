const ListReviews = ({ reviews }) => {
    /**
     product.reviews.map((review, key) => (
     <p key={key}>{review.comment}</p>
     ))
     */

    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr/>

            {reviews.map((review, key) => (
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.name}</p>
                    <p className="review_comment">{review.comment}</p>
                    <hr/>
                </div>
            ))}

        </div>
    );
};

export default ListReviews;