import { useAuth } from "@authContext";
import AuthHead from "@components/heads/auth";
import { resetPassword } from "@services/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const { setIsLoggedIn, setUserData } = useAuth();

  const onSubmit = (e: any) => {
    e.preventDefault();

    resetPassword("admin@admin.com")
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
            <h1 className="text-4xl text-center font-medium">Reset Password</h1>

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

                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/login");
                    }}
                    className="w-full py-3 font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-600 duration-300 hover:text-white rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <span>Back</span>
                  </button>

                  <button
                    onClick={onSubmit}
                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </body>
    </>
  );
}
