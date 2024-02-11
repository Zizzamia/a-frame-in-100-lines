import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientAndDb } from "../mongo/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  console.log("GET /api/episode");
  try {
    const { client, db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");

    const { searchParams } = req.nextUrl;
    const episodeNumberStr = searchParams.get("episode_number");

    if (episodeNumberStr !== null) {
      const episodeNumberInt = parseInt(episodeNumberStr, 10);
      // Fetch data from the collection based on episode number
      const data = await collection.findOne({
        episode_number: episodeNumberInt,
      });

      if (!data) {
        // If no data was found, return a 404 Not Found response
        return NextResponse.json({ status: 404, message: "Data not found" });
      }

      // Return the data in a standard response format
      return NextResponse.json({ status: 200, message: "Success", data: data });
    } else {
      // If no episode number was provided, return a 400 Bad Request response
      return NextResponse.json({ status: 400, message: "Bad Request" });
    }
  } catch (error: any) {
    console.error(error);

    // Return a 500 Internal Server Error response with the error message
    return NextResponse.json({ status: 500, message: error.message });
  }
}
