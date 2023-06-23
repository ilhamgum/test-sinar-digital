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

  const { isLoggedIn } = useAuth();

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
  }, []);

  return (
    <Layout>
      <UserList users={users} handleShowUserDetails={handleShowUserDetails} />

      {showUserDetailsModal ? (
        // <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0">
        <UserDetails
          user={selectedUser}
          handleCloseUserDetails={handleCloseUserDetails}
        />
      ) : // </div>
      null}
    </Layout>
  );
}
