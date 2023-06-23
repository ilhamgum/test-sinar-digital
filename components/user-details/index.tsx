import { useState, useEffect, useRef } from "react";
import { UserProps } from "@components/user-list";
import { addUser } from "@services/users";

type UserType = {
  user?: UserProps;
  isAdd?: boolean;
  handleCloseUserDetails: () => void;
};

export default function UserDetails({
  user,
  handleCloseUserDetails,
  isAdd,
}: UserType) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const avatar = "https://picsum.photos/seed/picsum/200/300";
  const roleId = "648c4a358f6c1f606c750c1d";

  const handleAddUser = () => {
    addUser(
      nameRef.current?.value!,
      emailRef.current?.value!,
      passwordRef.current?.value!,
      bioRef.current?.value!,
      avatar,
      roleId
    )
      .then((res) => {
        console.log(res);

        handleCloseUserDetails();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div
      className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          {isAdd ? null : (
            <img
              className="w-30 h-30 rounded-full"
              src={user?.avatar}
              alt="Image"
            />
          )}

          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            {isAdd ? "Add User" : "User Information"}
          </h1>

          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Name
          </label>
          <input
            ref={nameRef}
            disabled={!isAdd}
            id="name"
            defaultValue={user?.name}
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="James"
          />

          <label
            htmlFor="email"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Email
          </label>
          <input
            ref={emailRef}
            disabled={!isAdd}
            id="email"
            defaultValue={user?.email}
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="james@gmail.com"
            type="email"
          />

          {isAdd ? (
            <>
              <label
                htmlFor="password"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                disabled={!isAdd}
                id="password"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="*******"
                type="password"
              />

              <label
                htmlFor="bio"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Bio
              </label>
              <input
                ref={bioRef}
                disabled={!isAdd}
                id="bio"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Pariatur ipsum culpa aliquip culpa esse proident deserunt laborum exercitation nisi proident eu mollit. Occaecat ea eiusmod ullamco laborum laboris est. Sint quis non eu deserunt. Minim sint proident ipsum pariatur ea excepteur."
              />
            </>
          ) : null}

          <div className="flex items-center justify-start w-full">
            {isAdd ? (
              <button
                onClick={handleAddUser}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Add
              </button>
            ) : (
              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                Edit
              </button>
            )}

            <button
              className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
              onClick={handleCloseUserDetails}
            >
              Close
            </button>
          </div>

          {/* close */}
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={handleCloseUserDetails}
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
