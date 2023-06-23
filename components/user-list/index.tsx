import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export type UserProps = {
  avatar: string;
  bio: string;
  email: string;
  emailVerifiedAt: string;
  name: string;
  role: { _id: string; name: "admin"; permission: any[] };
  __v: number;
  _id: string;
};

export interface UsersProps {
  users: UserProps[];
  handleShowUserDetails: (user: UserProps) => void;
}

export default function UserList({ users, handleShowUserDetails }: UsersProps) {
  console.log(users);

  return (
    <div className="py-2 px-4 max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="mt-3 flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Users List
        </h3>
      </div>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user: any) => (
          <li key={user.id} className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.avatar}
                  alt="Neil image"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </p>
              </div>

              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white space-x-4">
                <button onClick={() => handleShowUserDetails(user)}>
                  <AiOutlineEye style={{ fontSize: 20 }} />
                </button>
                <button>
                  <AiOutlineEdit style={{ fontSize: 20 }} />
                </button>
                <button>
                  <AiOutlineDelete style={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
