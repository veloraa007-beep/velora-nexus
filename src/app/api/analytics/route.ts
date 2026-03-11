import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Analytics";

  if (!apiKey || !sheetId) {
    return NextResponse.json({ error: "Google Sheets not configured" }, { status: 500 });
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 60 } }); // cache for 60s

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err?.error?.message ?? "Failed to fetch Google Sheets" }, { status: res.status });
    }

    const json = await res.json();
    const rows: string[][] = json.values ?? [];

    if (rows.length < 2) {
      return NextResponse.json({ headers: [], rows: [] });
    }

    const headers = rows[0];
    const data = rows.slice(1).map(row =>
      Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ""]))
    );

    return NextResponse.json({ headers, rows: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
