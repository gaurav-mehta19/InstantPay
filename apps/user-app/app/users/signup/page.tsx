import dynamicImport from "next/dynamic"

// Dynamic import signup component
const SignupComponent = dynamicImport(() => import("../../../components/signup").then(module => ({ default: module.SignupComponent })), {
  loading: () => (
    <div className="min-h-screen p-6 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column Skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="text-center mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
            <div className="bg-white/80 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          {/* Right Column Skeleton */}
          <div className="space-y-6 animate-pulse">
            <div className="text-center mb-8">
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
})

export default function Signup()  {
    return (   
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50"> 
            <SignupComponent/>  
        </div>
    )
}