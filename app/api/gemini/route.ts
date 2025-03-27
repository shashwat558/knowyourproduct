import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
console.log(GEMINI_API_KEY + "this is api key")


const connectReviews = (reviews: string[]) => {
    let allReviews = ""
    for(let i=0; i<reviews.length; i++){

        allReviews = allReviews +  ` (${i}) ${reviews[i]}`


    }
    console.log(allReviews)
    return allReviews
}
export async function POST(req: NextRequest){
    const {reviews, productName} = await req.json()
    



    console.log("reached here")
    const ok = connectReviews(reviews.reviews);

    const defaultPrompt =`
    You are a product review analyst, specializing in summarizing and analyzing user feedback. Your task is to provide a clear, concise, and user-friendly review summary of a product based on the reviews it has received. 

    The product's name is '${productName}', and you will be provided with a series of reviews in the following format:

    Example:
    reviews = '(1) The product is great! It's very well designed and easy to use. (2) I'm not happy with the product, it stopped working after a week. (3) Overall, it's a decent product, but I wish it was more durable.'

    The actual reviews you will analyze are:
    reviews = '${ok}'.

    Please generate an overall summary of these reviews and leave some blank lines after each. Your summary should:
    - Include a brief overview of what users like about the product.
    - Mention any common concerns or issues raised by users.
    - Provide a final recommendation for potential buyers, based on the reviews.
    - Ensure the summary is structured in a clear and friendly way, making it easy to understand for someone considering purchasing this product.

    Make sure the tone is helpful, balanced, and professional, and avoid being too technical.`;
;

    console.log("hi");

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

        

      

        const result = await  model.generateContent({contents:[{role: 'user', parts: [{text:defaultPrompt}]}]});


        

        const output = result.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";


    console.log(output);

   return NextResponse.json({output})
        


    } catch (error) {
        console.log(error)
        
        
    }

}