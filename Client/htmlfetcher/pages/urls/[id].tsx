import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "..";

const HtmlDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState<Task | undefined>(undefined);
  console.log(task);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/urls/${id}`)
      .then((response) => setTask(response.data.task));
  }, [id]);

  if (!task) {
    return null;
  }
  return (
    <>
      <p>{task.url}</p>
      <p>{task.html}</p>
    </>
  );
};

export default HtmlDetails;
