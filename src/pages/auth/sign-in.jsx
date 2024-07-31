import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import loginImg from '../../images/login-img.jpg';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://tradesphere-backend.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard/home");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error.message);

      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] ">
      <section className="w-full lg:w-3/5 flex flex-col items-center justify-center rounded-3xl h-[100vh] ">
        <div className="w-full lg:w-3/5 mt-24 ">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Sign In
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Enter your email and password to Sign In.
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleSignIn}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            {error && (
              <Typography variant="paragraph" className="text-red-500 mt-4">
                {error}
              </Typography>
            )}

            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Not registered?{" "}
              <Link to="/auth/sign-up" className="text-gray-900 ml-1">
                Create account
              </Link>
            </Typography>
          </form>
        </div>
      </section>
      <div className="w-[50%]  h-[100vh] hidden lg:block relative   " style={{ borderRadius: '3rem 0 0 3rem' }}>
        <img
          src={loginImg}
          className="h-full w-full object-cover"
          alt="Pattern"
          style={{ borderRadius: '3rem 0 0 3rem' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-center text-white bg-black bg-opacity-50 p-4 rounded-md"
            style={{ animation: "fadeIn 1s ease-in forwards" }}
          >
            <h1
              className="text-3xl font-bold"
              style={{ animation: "fadeIn 1s ease-out .0s forwards" }}
            >
              Welcome to Tradespharehub
            </h1>
            <p className="text-lg mt-2" style={{ animation: "fadeIn 1s ease-in .0s  forwards" }}>
              <Link to="/auth/sign-in">Login</Link> or <Link to="/auth/sign-up">Register now</Link>
            </p>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default SignIn;
