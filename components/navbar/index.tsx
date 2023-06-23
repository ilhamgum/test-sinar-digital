import { logout } from "@services/auth";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    logout().then((res) => {
      router.push("/login");
    });
  };

  return (
    <div className="h-[50px] flex justify-between items-center px-4 py-2 shadow">
      <h1>Navbar</h1>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
