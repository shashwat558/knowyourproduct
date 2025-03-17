"use client"
import axios from "axios";
import ProductImagesCarousel from "../components/magicui/ProductImagesCarousel";
import { useState } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Meteors } from "@/components/meteor";
import {Search} from "lucide-react"

export default function Home() {
  const [productLink, setProductLink] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch= async(link: string) => {
    const {data} = await axios.post("/api/scraper", {productUrl: link});
    console.log(data)
    const imgs = data.images;
    setImages(imgs)

    
    

  }



  
  return (
     <div className="flex flex-col w-screen min-h-screen justify-center items-center pt-8">
      <Meteors />
      
      <div className="flex flex-col text-center gap-3">

      <h1 className="text-8xl text-black font-bold">Proddy!</h1>
      <p className="text-xl text-gray-700 max-w-[500px]">Proddy helps you shop smarter with AI-generated reviews and lets you chat with your products!</p>

      </div>
      <div className="mx-20 mb-5 mt-20 border shadow-md shadow-gray-500 h-[50pc] w-2/4 rounded-2xl relative ">
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
      <BorderBeam duration={8} size={100} className="from-transparent via-purple-700 to-transparent brightness-200 blur-md"/>
      

     </div>
     </div>
    
  );
}
