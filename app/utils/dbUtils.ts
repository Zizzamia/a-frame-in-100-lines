// utils/dbUtils.js

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getClientAndDb } from "@/app/api/mongo/db";
import { getClientAndDb } from "../api/mongo/db";
import type { EpisodeProps } from "../../types";

async function getEpisodeData(episodeNumber: number) {
    const { client, db } = await getClientAndDb();
    const collection = db.collection("thedailygweiRecap");
    const episodeData = await collection.findOne({ episode_number: episodeNumber });
    await client.close();
    return episodeData;
  }
  
  export default getEpisodeData;
  