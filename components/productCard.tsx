import { productDetailsType } from '@/app/page'
import React from 'react'
import ProductImagesCarousel from './magicui/ProductImagesCarousel'

const ProductCard = ({productDetails}: {
    productDetails: productDetailsType
}) => {
  return (
    <div className='w-full h-full p-4 flex gap-6'>
        <div className='w-[55%] rounded-2xl shadow-lg border border-gray-200 p-6'>
            <div className='flex flex-col gap-6'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold mb-2'>{productDetails.productName}</h1>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='text-gray-600'>Company:</span>
                                <span className='text-lg font-medium'>{productDetails.titleText}</span>
                            </div>
                            <div className='w-px h-6 bg-gray-200'></div>
                            <div className='flex items-center gap-2'>
                                <span className='text-gray-600'>Seller:</span>
                                <span className='text-lg font-medium'>{productDetails.seller}</span>
                            </div>
                        </div>
                        
                        <div className='flex items-center justify-center gap-4 mt-4'>
                            <div className='flex items-center gap-3'>
                                <span className='text-xl font-semibold'>{productDetails.mrp}</span>
                                {productDetails.price && (
                                    <>
                                        <div className='w-px h-6 bg-gray-200'></div>
                                        <span className='text-xl font-semibold'>{productDetails.price}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-[45%] rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
            <ProductImagesCarousel images={productDetails.images}/>
        </div>
    </div>
  )
}

export default ProductCard