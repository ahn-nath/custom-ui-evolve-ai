import React from "react";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

const styles: {
  container: React.CSSProperties;
} = {
  container: {
    minHeight: "100vh",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "lightgray", 
    backgroundImage: `url('../../image.png')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    /*
    background:
      "url(https://asset.kindedemo.com/evolve-ai/bg.png) lightgray 50% / cover no-repeat",

    */  
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
