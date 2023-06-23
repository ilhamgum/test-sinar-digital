import { useEffect, useState } from "react";
import Layout from "@layout";
import UserList from "@components/user-list";
import { getUsers } from "@services/users";
import { useAuth } from "@authContext";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      getUsers().then((res) => {
        setUsers(res.data.docs);
      });
    }
  }, []);

  return (
    <Layout>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              No
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              Name
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              Email
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              P/W
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              Tanggal Lahir
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              Tanggal Input
            </th>
            <th className="p-2 border-2 text-black border-black rounded-xl">
              Aksi
            </th>
          </tr>
        </thead>

        <UserList users={users} />
      </table>
    </Layout>
  );
}
