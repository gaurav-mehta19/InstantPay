export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 animate-pulse">
      <div className="w-full">
        {/* Header Skeleton */}
        <div className="bg-white/80 backdrop-blur-md border-b border-primary-100 px-6 py-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-10 bg-gray-200 rounded-lg mb-2 w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6">
          {/* Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 rounded-3xl p-8 h-96">
              <div className="h-8 bg-gray-200 rounded-lg mb-4 w-1/2"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-100 rounded-lg"></div>
                <div className="h-12 bg-gray-100 rounded-lg"></div>
                <div className="h-20 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
            <div className="bg-white/80 rounded-3xl p-8 h-96">
              <div className="h-8 bg-gray-200 rounded-lg mb-4 w-1/2"></div>
              <div className="space-y-6">
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Chart Section */}
          <div className="bg-white/80 rounded-3xl p-8 h-96">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/3"></div>
            <div className="h-64 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TransactionSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-10 bg-gray-200 rounded-lg mb-8 w-1/3"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* P2P Transactions */}
          <div className="bg-white/80 rounded-3xl p-8">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/2"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>

          {/* OnRamp Transactions */}
          <div className="bg-white/80 rounded-3xl p-8">
            <div className="h-8 bg-gray-200 rounded-lg mb-6 w-1/2"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ComponentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-8 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-100 h-4 rounded"></div>
        <div className="bg-gray-100 h-4 rounded w-4/5"></div>
        <div className="bg-gray-100 h-4 rounded w-3/5"></div>
      </div>
    </div>
  )
}