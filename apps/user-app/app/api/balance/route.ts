import { getBalance } from "../../../lib/utils/blance"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const balance = await getBalance()
        return NextResponse.json({ balance })
    } catch (error) {
        console.error('Balance API error:', error)
        return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
    }
}