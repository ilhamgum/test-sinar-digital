import { useAuth } from "@authContext";
import DefaultHead from "@components/heads";
import Navbar from "@components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactChildren, useEffect } from "react";

export default function Layout({ children }: ReactChildren | any | unknown) {
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <DefaultHead />

      <nav>
        <Navbar />
      </nav>

      <main>{children}</main>

      <footer></footer>
    </>
  );
}
