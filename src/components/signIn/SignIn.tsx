'use client';
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"; 
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const { setUser } = useUser(); 
  const router = useRouter(); 

  const handleLogin = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);


    if (typeof window !== "undefined") {
      const token = credentialResponse.credential;
      localStorage.setItem("google_token", token);

      try {
        const decoded: any = jwtDecode(token); 
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding the token", error);
      }
    }
    router.push("/home");
  };

  
  const handleLoginError = () => {

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="bg-white opacity-20 w-[500px] h-[500px] rounded-full absolute bottom-[-50px] right-[-100px] animate-pulse"></div>
        <div className="bg-white opacity-10 w-[400px] h-[400px] rounded-full absolute top-[-100px] left-[-100px] animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 animate-bounce">Welcome Back!</h2>
          <p className="text-lg text-gray-600">Sign in to access your account</p>
        </div>
        <div className="flex flex-col items-center">
          {/* GoogleLogin button component */}
          <GoogleLogin
            onSuccess={handleLogin} 
            onError={handleLoginError} 
            useOneTap
            theme="filled_blue"
            shape="pill"
            size="large"
          />
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
