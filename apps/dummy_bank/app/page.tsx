import Home from "@/components/home";
import { Suspense } from "react";


export default function Landing() {
  return (
<Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
