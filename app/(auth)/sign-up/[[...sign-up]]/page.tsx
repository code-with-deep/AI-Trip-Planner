import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary text-white hover:bg-primary/80",
          },
        }}
      />
    </div>
  );
}
