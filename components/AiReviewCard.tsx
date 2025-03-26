import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown"

const AiReviewCard = ({ reviews, productName }: { reviews: string[], productName: string }) => {
    const [aiGeneratedReview, setAiGeneratedReview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAiReview = async () => {
            try {
                const response = await fetch("/api/gemini", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({reviews, productName})
                })
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setAiGeneratedReview(data.output);

                }
                
            } catch (error) {
                console.error("Error generating AI review:", error);
                setAiGeneratedReview("Error generating AI review.");
            } finally {
                setLoading(false);
            }
        };

        fetchAiReview();
    }, [reviews, productName]);

    if (loading) {
        return (
            <div className="p-8 rounded-2xl shadow-sm border border-gray-100 bg-gradient-to-b from-white to-blue-50 transition-all duration-300 hover:shadow-md max-h-[25pc] overflow-scroll">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Reviews</h3>
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-2xl shadow-sm border border-gray-100 bg-gradient-to-b from-white to-blue-50 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Reviews</h3>
            <p className="text-gray-600">
                <ReactMarkdown >{aiGeneratedReview}</ReactMarkdown>
            </p>
        </div>
    );
}

export default AiReviewCard;
