import React from "react";
import TopSales from "../components/TopSales.js";
import Catalog from "../components/Catalog.js";

export default function HomePage() {
  return (
    <React.Fragment>
      <TopSales />
      <Catalog />
    </React.Fragment>
  );
}