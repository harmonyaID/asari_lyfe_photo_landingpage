import { AppSettingTag } from "@/setting/constants";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    revalidateTag(AppSettingTag)

    return NextResponse.json({ message: 'success' })
}