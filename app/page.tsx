"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Meteors } from "@/components/meteor";
import {Search} from "lucide-react"
import ProductCard from "@/components/productCard";
import {ClimbingBoxLoader} from "react-spinners";


export type productDetailsType = {
   titleText: string,
   productName: string, 
   price: string,
   mrp: string,  
   seller: string, 
   images: string[], 
   reviews: string[]
}



export default function Home() {
  const [productLink, setProductLink] = useState("");
  const [prodcutDetails, setProductDetails] = useState<productDetailsType | null>(null);
  const [items, setItems] = useState<productDetailsType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false)
  

  const handleSearch= async(link: string) => {
    setIsLoading(true)
    // const myntraRegex = /^https:\/\/www\.myntra\.com\/[\w-]+\/[\w+-]+\/[\w+-]+\/\d+\/buy$/;


    
    // const validLink = link.match(myntraRegex);
    // if(!validLink){
    //   alert("Please enter only valid mytra product link")
    // }
    const {data} = await axios.post("/api/scraper", {productUrl: link});
    console.log(data)
    if(data){
      setProductDetails(data)
      setIsLoading(false)
      setItems((prevItems) => {
        const newItems = [...prevItems, data];
        localStorage.setItem("userItems", JSON.stringify(newItems))
        return newItems

      })
      

      
    }

    
    

  }

  useEffect(() => {
    const storedItems = localStorage.getItem("userItems");

    if(storedItems){
      setItems(JSON.parse(storedItems))
    }
  } ,[])



  
  return (
     <div className="flex flex-col w-screen min-h-screen justify-center items-center pt-8">
      <Meteors />
      
      <div className="flex flex-col text-center gap-3">

      <h1 className="text-8xl text-black font-bold">Proddy!</h1>
      <p className="text-xl text-gray-700 max-w-[500px]">Proddy helps you shop smarter with AI-generated reviews and lets you chat with your products!</p>

      </div>
      <div className="mx-20 mb-5 mt-20 border shadow-md shadow-gray-500 min-h-[50pc] max-h-max w-2/3 rounded-2xl relative flex max-sm:flex flex-col max-sm:mx-3 max-sm:min-w-[100vw]">
      <form 
        onSubmit={(e) =>{ 
          e.preventDefault()

          handleSearch(productLink)}}
        className="min-w-full max-w-xl transform transition-all p-2" 
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-6 py-4 text-lg text-gray-700 bg-white rounded-2xl shadow-md outline-none transition-all duration-20 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100 focus:shadow-lg border border-gray-200 hover:border-gray-300"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 bg-blue-500 text-white rounded-full
                     transition-all duration-200 hover:bg-blue-600
                     focus:outline-none focus:ring-2 focus:ring-blue-300
                     active:scale-95"
          >
            <Search size={24} className="stroke-[2]" />
          </button>
        </div>
      </form>
      
        {prodcutDetails ? <ProductCard productDetails={prodcutDetails}/> : (
          !isLoading ? (
            <div className="w-full h-full flex justify-center items-center text-center">
              <h1 className="text-4xl font-bold">Looks like you are just browsing... Go ahead, search for something cool!</h1>
            </div>
          ) : (
            <ClimbingBoxLoader color="#030303"/>
          )
        )}
        
      
      
      <BorderBeam duration={8} size={100} className="from-transparent via-purple-700 to-transparent brightness-200 blur-md"/>
      

     </div>
     </div>
    
  );
}
