import itemData from "./itemData.json";
import { NextResponse } from "next/server";

type Spot = {
  ID: number;
  ComCode: string;
  Bid: number;
  Ask: number;
  BidAskDate: string;
  NyTradeDate: string;
  Update_Date: string;
};

type SpotData = {
  Spots: Spot[];
  IsAfterHours: "YES" | "NO";
  IsClosed: "YES" | "NO";
};

export type CurrentProduct = (typeof itemData)[0] & {
  currentPrice: number;
};

export const dynamic = "force-dynamic";

export async function GET() {
  const spotPrices = await fetch("https://site-proxy.onrender.com/market").then(
    (res) => res.json() as Promise<SpotData>,
  );
  const prices = {
    GOLD: spotPrices.Spots[0]?.Ask ?? 0,
    SILVER: spotPrices.Spots[1]?.Ask ?? 0,
    PLATINUM: spotPrices.Spots[2]?.Ask ?? 0,
    PALLADIUM: spotPrices.Spots[3]?.Ask ?? 0,
  };

  const products = itemData.map((item) => {
    console.log(typeof item.images);
    console.log("hello");

    return {
      ...item,
      currentPrice:
        item.weight_grams *
        (prices[item.material as keyof typeof prices] / 31.1),
    };
  });

  return NextResponse.json(products);
}
