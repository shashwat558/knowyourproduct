"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';


// const images = [
//    { imgUrl: 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29877398/2024/6/12/ba2d72e5-0358-4939-8ee1-e41be9bcb4c11718183133058-ZEVORA-Men-Accessory-Gift-Set-of-4441718183132932-12.jpg', alt: 'smartWatch'},
//    { imgUrl: '/assets/images/hero-2.svg', alt: 'smartWatch'},
//    { imgUrl: '/assets/images/hero-3.svg', alt: 'smartWatch'},
//    { imgUrl: '/assets/images/hero-4.svg', alt: 'smartWatch'},
//    { imgUrl: '/assets/images/hero-5.svg', alt: 'smartWatch'},




// ]

const ProductImagesCarousel= ({images}) => {
  return (
    <div className='hero-carousel overflow-hidden'>
        <Carousel
       showThumbs={false}
       autoPlay
       
       showArrows={false}
       showStatus={false}
       infiniteLoop     
    
    >
      {images.map((image, index) => (
        <Image key={index} src={image} alt={"okay"} width={500} height={500} objectFit='cover' className=''/>
      ))}
       </Carousel>
       <Image  
       className='max-xl:hidden absolute -left-[15%] bottom-0'

       src={"/assets/icons/hand-drawn-arrow.svg"} alt='hand-drawn-arrow' width={175} height={175}/>
    </div>
  )
}

export default ProductImagesCarousel