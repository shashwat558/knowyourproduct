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

    const parts = productUrl.split("/");
    const productId = parts[parts.length - 2];
    console.log(productId)

    const browser = await puppeteer.launch({
        headless: true,

        args: ["--disable-blink-features=AutomationControlled"],
    })

    try {

        const page = await browser.newPage();
        await setPage(page);
        await page.goto(productUrl, {waitUntil: "domcontentloaded"});
        await page.setRequestInterception(true)
        page.on("request", (req) => {
            if(req.resourceType() == "stylesheet" || req.resourceType() == "font"){
                req.abort()
            } else {
                req.continue()
            } 

        })

        const [titleText, productName, price, mrp,  seller, images] = await Promise.all([
            getTextContent(page, ".pdp-title"),
            getTextContent(page, ".pdp-name"),
            getTextContent(page, ".pdp-price"),
            getTextContent(page, ".pdp-mrp"),
            getTextContent(page, ".supplier-productSellerName"),
            getImages(page, ".image-grid-imageContainer"),
            // getImages(page, ".expiryDate-container"),
            
        ])

        return NextResponse.json({titleText, productName, price, mrp, seller, images})

        
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
    //   await page.waitForNavigation({ waitUntil: 'load' });
    const images = await page.$$eval(".image-grid-image", elements => 
        elements.map((el) => {
            const style = el.getAttribute("style");
            const match = style?.match(/url\("(.+?)"\)/);
            return match ? match[1] : null
        })
    )

    return images

   


}




export const delay = () => {
    return new Promise(function(resolve){
        setTimeout(resolve, 1500)
    })
}




// const getProductDetails = async() => {

// }