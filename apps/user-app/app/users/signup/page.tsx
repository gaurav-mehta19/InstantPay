import dynamicImport from "next/dynamic";

const SignupComponent = dynamicImport(
  () =>
    import("../../../components/signup").then((module) => ({
      default: module.SignupComponent,
    })),
  {
    loading: () => (
      <div className="app-bg min-h-screen flex items-center justify-center">
        <div className="panel w-full max-w-xl animate-pulse">
          <div className="h-5 w-40 rounded bg-neutral-200" />
          <div className="mt-5 space-y-3">
            <div className="h-11 rounded bg-neutral-200" />
            <div className="h-11 rounded bg-neutral-200" />
            <div className="h-11 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

export default function Signup() {
  return (
    <div className="app-bg min-h-screen">
      <SignupComponent />
    </div>
  );
}
