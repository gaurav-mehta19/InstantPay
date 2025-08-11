import { getBalanceHistory } from "../../../../lib/utils/blance"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const balanceHistory = await getBalanceHistory()
        return NextResponse.json({ balanceHistory })
    } catch (error) {
        console.error('Balance history API error:', error)
        return NextResponse.json({ error: 'Failed to fetch balance history' }, { status: 500 })
    }
}