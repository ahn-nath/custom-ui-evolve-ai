import React from "react";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

const styles: {
  container: React.CSSProperties;
} = {
  container: {
    minHeight: "100vh",
    color: "#151414",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#000", 
    backgroundImage: `url('../../image.png')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
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
