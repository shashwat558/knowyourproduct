import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from './ui/button';

const AiReviewCard = ({ productLink, productName }: { productLink: string, productName: string }) => {
     

    
     
     
    const [aiGeneratedReview, setAiGeneratedReview] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    // const [reviews, setReviews] = useState<string[]|null>([]);

    useEffect(() => {

        const fetchReviews = async() => {
            try {
                const response = await axios.post("/api/scraper/reviews", {productUrl:productLink});
                const data = response.data;
                console.log(data);
                // setReviews(data)
                fetchAiReview(data)
            } catch (error) {
                console.log(error)
            }
        }

        const fetchAiReview = async (reviews: string[]) => {
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

        if(productLink){
            fetchReviews()
        }

        
    }, [productName, productLink]);

    if (loading) {
        return (
            <div className="p-8 rounded-2xl shadow-sm border border-gray-100 bg-gradient-to-b from-white to-blue-300 transition-all duration-300 hover:shadow-md max-h-[20pc] overflow-scroll">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Reviews</h3>
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-2xl shadow-sm border border-gray-100 bg-gradient-to-b from-white to-blue-50 transition-all duration-300 hover:shadow-md overflow-scroll">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Reviews</h3>
            <p className="text-gray-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]} >{aiGeneratedReview}</ReactMarkdown>
            </p>
            <Button>Chat with me!</Button>
        </div>
    );
}

export default AiReviewCard;
