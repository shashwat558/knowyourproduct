import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";


export async function POST(req: NextRequest){
    const {productUrl} = await req.json();

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-blink-features=AutomationControlled",
            "--proxy-server=http://your-proxy:port"
        ]
    }
        
    );
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

await page.evaluate(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
});


    await page.goto(productUrl, {
        waitUntil: "networkidle2"
    });

    await page.setViewport({width: 1024, height: 1080})
    await page.waitForSelector(".pdp-title")
    const titleElement = await  page.$(".pdp-title");
    const titleText = await page.evaluate(el => el?.textContent, titleElement);

    return NextResponse.json(titleText);


}