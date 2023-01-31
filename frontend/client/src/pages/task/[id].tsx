import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getTaskId, getTaskData } from "@/api/task";
import { TASK } from "@/types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

interface STATICPROPS {
  staticTask: TASK
  id: number
}

const Task: NextPage<STATICPROPS> = ({ staticTask, id }) => {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/task-detail/${id}`,
    fetcher,
    {
      fallbackData: staticTask,
    }
  );
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }
  return (
    <div title={task.title}>
      <span>
        {"ID : "}
        {task.id}
      </span>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.created_at}</p>
      <Link href="/task">
        back to page
      </Link>
    </div>
  );
}
export default Task

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTaskId();
  return {
      paths,
      fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const staticTask = await getTaskData(ctx.params?.id as string)
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
}