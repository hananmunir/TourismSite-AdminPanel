import React, { useState, lazy } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPackages } from "../../Actions/packages";
const PackagesTable = lazy(() =>
  import("../../components/dashboard/PackagesTable.js")
);
function Packages() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPackages());
  });
  return (
    <>
      <PackagesTable />
    </>
  );
}

export default Packages;
