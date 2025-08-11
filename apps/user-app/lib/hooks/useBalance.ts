"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// API route to fetch balance data
async function fetchBalanceData() {
  const response = await axios.get('/api/balance')
  return response.data
}

// API route to fetch balance history
async function fetchBalanceHistory() {
  const response = await axios.get('/api/balance/history')
  return response.data
}

export function useBalance() {
  return useQuery({
    queryKey: ['balance'],
    queryFn: fetchBalanceData,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  })
}

export function useBalanceHistory() {
  return useQuery({
    queryKey: ['balance-history'],
    queryFn: fetchBalanceHistory,
    staleTime: 60000, // 1 minute
    gcTime: 600000, // 10 minutes
  })
}