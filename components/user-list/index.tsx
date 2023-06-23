type UserProps = {
  avatar: string;
  bio: string;
  email: string;
  emailVerifiedAt: string;
  name: string;
  role: { _id: string; name: "admin"; permission: any[] };
  __v: number;
  _id: string;
};

interface UsersProps {
  users: UserProps[];
}

export default function UserList({
  users,
}: // onView,
// onViewUserDetail,
// onEdit,
// isEditing,
// isEditingIndex,
// onDelete,
// showAddUser,
// setShowAddUser,
// setShowModal,
UsersProps) {
  console.log(users);

  return users.map((user: any, index: number) => (
    <tr
      key={user.id}
      // className={`${isEditingIndex == index ? "bg-black/50" : ""}`}
    >
      <td className="p-2 border-2 border-black text-black">{index + 1}</td>
      <td className="p-2 border-2 border-black text-black">{user.name}</td>
      <td className="p-2 border-2 border-black text-black">{user.email}</td>
      <td className="p-2 border-2 border-black text-black">
        {user.jenis_kelamin}
      </td>
      <td className="p-2 border-2 border-black text-black">
        {user.tanggal_lahir}
      </td>
      <td className="p-2 border-2 border-black text-black">
        {user.tanggal_input}
      </td>

      {/* buttons */}
      <td className="p-2 border-2 border-black text-black">
        <div className="flex justify-center items-center space-x-2">
          <button
            // onClick={() => {
            //   onView(true);
            //   onViewUserDetail(user);
            // }}
            className="px-10 py-2 text-black rounded-full transition-all duration-500 bg-gradient-to-tl from-green-500 via-yellow-500 to-red-400 bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            View
          </button>

          <button
            // onClick={() => {
            //   onEdit([true, index]);

            //   setShowAddUser(!showAddUser);
            // }}
            className="px-10 py-2 hover:text-black rounded-full transition-all duration-500 bg-gradient-to-tl from-blue-500 via-lightblue-500 to-blue-100/50 bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            Edit
          </button>

          <button
            // onClick={() => onDelete()}
            className="px-10 py-2 text-black rounded-full transition-all duration-500 bg-gradient-to-tl from-pink-900 via-red-700 to-yellow-100 bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));
}
