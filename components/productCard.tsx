import React from 'react';

import ProductImagesCarousel from './magicui/ProductImagesCarousel';

import { productDetailsType } from '@/app/page';
import AiReviewCard from './AiReviewCard';

const ProductCard = ({ productDetails, productReviews }: { productDetails: productDetailsType , productReviews: string[]}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-3 transition-all duration-500 ease-out animate-fade-in">
      <div className="w-full lg:w-[55%] rounded-2xl flex-col-reverse shadow-sm border border-gray-100 overflow-hidden bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
        <div className="h-[400px] lg:h-[500px]">
          <ProductImagesCarousel images={productDetails.images} />
        </div>
      </div>

      <div className="w-full lg:w-[45%] rounded-2xl flex flex-col-reverse gap-6">
        <div className="flex-1 p-8 flex flex-col gap-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-2">
            
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 animate-title-fade-in">
              {productDetails.productName}
            </h1>
            <p className="text-gray-500 italic">{productDetails.titleText}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium">
              Seller
            </div>
            <span className="text-lg text-gray-700 font-medium">{productDetails.seller}</span>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Original Price</p>
                <p className="text-xl font-semibold text-gray-400 line-through">{productDetails.mrp}</p>
              </div>

              {productDetails.price && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Special Price</p>
                  <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-500">
                    {productDetails.price}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex gap-4">
              <button className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-white font-medium transition-all duration-300 hover:shadow-lg hover:from-gray-800 hover:to-gray-600 active:scale-[0.98]">
                Buy Now
              </button>
              
            </div>
          </div>
        </div>
        
        {/* AI Reviews section with white to light blue background transition */}
        <AiReviewCard reviews={productReviews} productName={productDetails.productName}/>
      </div>
    </div>
  );
};
  


export default ProductCard;