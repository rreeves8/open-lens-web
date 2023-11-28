import { useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

type ActionResult<T> = {
  error: unknown;
  data: T;
};

export default function useHandleActionData<T>() {
  const actionData = useActionData();
  const [resultData, setData] = useState<T | null>(null);

  useEffect(() => {
    console.log(actionData);
    if (actionData) {
      const { error, data } = actionData as ActionResult<T>;
      console.log(error);
      if (error) {
        console.log(error);
      } else {
        setData(data);
      }
    }
  }, [actionData]);

  return resultData;
}
