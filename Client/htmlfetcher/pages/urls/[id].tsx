import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "..";
import { InferGetServerSidePropsType } from "next";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{ task: Task }> = async (
  context
) => {
  const { id } = context.params as { id: string };
  const response = await axios.get(`http://localhost:3000/urls/${id}`);
  const { task } = response.data;

  return { props: { task } };
};

const HtmlDetails = ({
  task,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <p>{task.url}</p>
      <p>{task.html}</p>
    </>
  );
};

export default HtmlDetails;
