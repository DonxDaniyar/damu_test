import { Loader } from "@mantine/core";
import * as React from "react";
import { ReactNode } from "react";
import TopHeader from "./Header";

const Footer = React.lazy(() => import("./Footer"));

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopHeader />
      <main>{children}</main>
      <React.Suspense fallback={<Loader />}>
        <Footer />
      </React.Suspense>
    </>
  );
};

export default Layout;
