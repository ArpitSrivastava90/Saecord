import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

type Props = {
  params: {
    serverId: string;
  };
};

const page = ({ params }: Props) => {
  return <div>ServerIdPage {params.serverId}</div>;
};

export default page;
