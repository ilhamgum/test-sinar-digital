import { useAuth } from "@authContext";
import AuthHead from "@components/heads/auth";
import { login } from "@services/auth";
import { useRouter } from "next/router";
import { use } from "react";

export default function Login() {
  const router = useRouter();

  const { setIsLoggedIn, setUserData } = useAuth();

  const onSubmit = (e: any) => {
    e.preventDefault();

    login("admin@admin.com", "password")
      .then((res) => {
        if (res.statusCode == 201 || res.statusCode == 200) {
          const data = res.data;

          console.log(data);

          localStorage.setItem("_accessToken", data.access_token);
          localStorage.setItem("_refreshToken", data.refresh_token);

          setIsLoggedIn(true);
          setUserData({
            avatar: data.avatar,
            bio: data.bio,
            email: data.email,
            id: data.id,
            name: data.name,
          });

          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <>
      <AuthHead />

      <body className="antialiased bg-slate-200 h-[100vh]">
        <div className="h-full flex justify-center items-center">
          <div className="w-[400px] bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl text-center font-medium">Login</h1>

            <p className="mt-2 text-slate-500 text-center">
              Hi, Welcome back 👋
            </p>

            <form className="my-10">
              <div className="flex flex-col space-y-5">
                <label htmlFor="email">
                  <p className="font-medium text-slate-700 pb-2">
                    Email address
                  </p>
                  <input
                    value={"admin@admin.com"}
                    id="email"
                    name="email"
                    type="email"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address"
                  />
                </label>

                <label htmlFor="password">
                  <p className="font-medium text-slate-700 pb-2">Password</p>
                  <input
                    value={"password"}
                    id="password"
                    name="password"
                    type="password"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter your password"
                  />
                </label>

                <button
                  onClick={onSubmit}
                  className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </body>
    </>
  );
}
