// import { NextRequest, NextResponse } from "next/server";
// import puppeteer from "puppeteer";

import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";


// export async function POST(req: NextRequest){
//     const {productUrl} = await req.json();

//     const browser = await puppeteer.launch({
//         headless: true,
//         args: ["--disable-blink-features=AutomationControlled",
            
//         ]
//     }
        
//     );
//     const page = await browser.newPage();
//     await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

// await page.evaluate(() => {
//     Object.defineProperty(navigator, "webdriver", { get: () => false });
// });


//     await page.goto(productUrl, {
//         waitUntil: "networkidle2"
//     });

//     await page.setViewport({width: 1024, height: 1080})
//     await page.waitForSelector(".pdp-title")
//     const titleElement = await  page.$(".pdp-title");
//     const titleText = await page.evaluate(el => el?.textContent, titleElement);
    
//     await page.waitForSelector(".pdp-name");
//     const productNameElement = await page.$(".pdp-name");
//     const productName = await page.evaluate(el => el?.textContent, productNameElement)

//     await page.waitForSelector(".pdp-price");
//     const priceElement = await page.$(".pdp-price");
//     const price = await page.evaluate(el => el?.textContent, priceElement);

//     await page.waitForSelector(".pdp-mrp");
//     const originalMrpElement = await page.$(".pdp-mrp");
//     const mrp = await page.evaluate(el => el?.textContent, originalMrpElement);

//     await page.waitForSelector(".supplier-productSellerName");
//     const sellerElement = await page.$(".supplier-productSellerName");
//     const seller = await page.evaluate(el => el?.textContent, sellerElement);



//     await page.waitForSelector(".image-grid-imageContainer");
//     const images = await page.$$eval(".image-grid-image", elements => 
//         elements.map((el) => {
//             const style = el.getAttribute("style");
//             const match = style?.match(/url\("(.+?)"\)/);
//             return match ? match[1] : null
//         })
//     )

//     console.log(images);

//     // await page.waitForSelector(".expiryDate-container");
//     // const expireyDateElement = await page.$(".expiryDate-container");
//     // const expiryDate = await page.evaluate(el => el?.textContent, expireyDateElement);

//     await page.waitForSelector(".detailed-reviews-allReviews");
//     const allreviewElement = await page.$(".detailed-reviews-allReviews");
//     await allreviewElement?.click()

//     console.log("clicked");

//     await page.waitForSelector(".detailed-reviews-userReviewsContainer", { timeout: 60000 });

// const reviews = await page.$$eval(".user-review-reviewTextWrapper", elements => 
//     elements.map(el => el.textContent?.trim() || "")
// );

// console.log(reviews);

//     console.log(reviews)

    

    



//     return NextResponse.json({titleText, productName, price, mrp, images, seller, reviews})


// }

export async function POST(req:NextRequest){
    const { productUrl } = await req.json();

    const browser = await puppeteer.launch({
        headless: true,

        args: ["--disable-blink-features=AutomationControlled"],
    })

    try {

        const page = await browser.newPage();
        await setPage(page);
        await page.goto(productUrl, {waitUntil: "networkidle2"});

        const [titleText, productName, price, mrp,  seller, images, reviews] = await Promise.all([
            getTextContent(page, ".pdp-title"),
            getTextContent(page, ".pdp-name"),
            getTextContent(page, ".pdp-price"),
            getTextContent(page, ".pdp-mrp"),
            getTextContent(page, ".supplier-productSellerName"),
            getImages(page, ".image-grid-imageContainer"),
            // getImages(page, ".expiryDate-container"),
            getReviews(page)
        ])

        return NextResponse.json({titleText, productName, price, mrp, seller, images, reviews})

        
    } catch (error) {
       console.log(error) 
    }
}


const setPage = async (page: Page) => {
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

await page.evaluate(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
});


    

    await page.setViewport({width: 1024, height: 1080})
}


const getTextContent = async (page: Page, selector: string): Promise<string> => {
   try{ await page.waitForSelector(selector);
    const textElement = await page.$(selector);
    if(!textElement) return "N/A"
    const text = await page.evaluate((el) => el?.textContent || "N/A", textElement);


    return text ?? "";
} catch(error){
    console.log(error)
    return "N/A"
}


}

const getImages = async(page: Page, selector: string) => {
     await page.waitForSelector(selector);
    const images = await page.$$eval(".image-grid-image", elements => 
        elements.map((el) => {
            const style = el.getAttribute("style");
            const match = style?.match(/url\("(.+?)"\)/);
            return match ? match[1] : null
        })
    )

    return images

   


}

const getReviews = async (page: Page) => {

    try{
        const allReviewsButton = await page.$(".detailed-reviews-allReviews");
        if(allReviewsButton){
            await allReviewsButton?.click()
            console.log("clicked");

            await page.waitForSelector(".detailed-reviews-userReviewsContainer", {
                timeout: 6000
            });



        } else {
            console.log("all reviews button not found searching for reviews on the same page")
        }

        const reviews = await page.$$eval(".user-review-reviewTextWrapper", 
            elements => 
                elements.map(el => el.textContent?.trim() || "")
        )

        return reviews
    } catch(error){
        console.log(error)
    }
// 
    // const allreviewElement = await page.waitForSelector(".detailed-reviews-allReviews");
    //  if(allreviewElement){
// 
    // const allreviewButton = await page.$(".detailed-reviews-allReviews");
    // await allreviewButton?.click()
// 
    // console.log("clicked");
    // await page.waitForSelector(".detailed-reviews-userReviewsContainer", { timeout: 60000 });
// 
    // const reviews = await page.$$eval(".user-review-reviewTextWrapper", elements => 
    // elements.map(el => el.textContent?.trim() || "")
// 
    // )
    // return reviews
// 
// 
// 
    // }
// 
    // const reviews = await page.$$eval(".user-review-reviewTextWrapper", elements => 
    // elements.map(el => el.textContent?.trim() || "")
// 
// 
//    
// 


    





}

const getProductDetails = async() => {

}