import { URLProps } from "@/types";
import React from "react";

const page = async ({ params, searchParams }: URLProps) => {
  return <div>{params.id}</div>;
};
export default page;
