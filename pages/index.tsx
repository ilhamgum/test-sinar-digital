import Layout from "@layout";
import { useEffect, useState } from "react";
import UserList, { UserProps } from "@components/user-list";
import UserDetails from "@components/user-details";
import { getUsers } from "@services/users";
import { useAuth } from "@authContext";

export default function Home() {
  const [users, setUsers] = useState([]);

  // for user details
  const [showUserDetailsModal, setShowUserDetailsModal] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { isLoggedIn, refresher } = useAuth();

  const handleShowUserDetails = (user: UserProps) => {
    setShowUserDetailsModal(true);
    setSelectedUser(user);
  };

  const handleCloseUserDetails = () => {
    setShowUserDetailsModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUsers().then((res) => {
        setUsers(res.data.docs);
      });
    }
  }, [refresher]);

  return (
    <Layout>
      <div
        className="flex overflow-hidden"
        style={{ maxHeight: "calc(100vh - 50px)" }}
      >
        <div className="basis-1/3">
          <UserList
            users={users}
            handleShowUserDetails={handleShowUserDetails}
          />
        </div>

        <div className="flex flex-col items-center basis-2/3">
          <div className="w-full h-[300px]">
            <img
              className="h-full w-full object-top"
              src={selectedUser?.avatar}
              alt="Image"
            />
          </div>

          <div className="mt-4 w-full px-4">
            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Name
            </label>
            <input
              disabled
              id="name"
              value={selectedUser?.name}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Email
            </label>
            <input
              disabled
              id="email"
              value={selectedUser?.email}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              type="email"
            />

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Bio
            </label>
            <input
              disabled
              id="email"
              value={selectedUser?.bio}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              type="email"
            />
          </div>
        </div>
      </div>

      {/* {showUserDetailsModal ? (
        <UserDetails
          user={selectedUser}
          handleCloseUserDetails={handleCloseUserDetails}
        />
      ) : null} */}
    </Layout>
  );
}
