import React, { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load reviews from local storage on mount
    useEffect(() => {
        const storedReviews = localStorage.getItem(`reviews_${productId}`);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            // Default mock reviews for demo purposes
            setReviews([
                { id: 1, name: "Book Lover", rating: 5, comment: "Absolutely loved this book! Couldn't put it down.", date: "Feb 10, 2024" },
                { id: 2, name: "Daily Reader", rating: 4, comment: "Great story, but the pacing was a bit slow in the middle.", date: "Jan 25, 2024" }
            ]);
        }
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay
        setTimeout(() => {
            const review = {
                id: Date.now(),
                name: newReview.name || "Anonymous",
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };

            const updatedReviews = [review, ...reviews];
            setReviews(updatedReviews);
            localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));

            setNewReview({ rating: 5, comment: '', name: '' });
            setIsSubmitting(false);
        }, 600);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mt-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Review Form */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none transition transform hover:scale-110"
                                    >
                                        <Star
                                            size={24}
                                            className={`${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                required
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                            <textarea
                                required
                                rows={4}
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Share your thoughts..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </h3>

                    {reviews.length === 0 ? (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                                            <User size={16} className="text-gray-500" />
                                        </div>
                                        <span className="font-medium text-gray-900">{review.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
