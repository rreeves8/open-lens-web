import { type ActionFunction, json, defer } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import runCmd from "~/utils/runCmd";
import {
  parseContextTable,
  parseNamespaceList,
} from "~/utils/parseContextTable";
import handleAction from "~/utils/handleAction";
import Contexts from "~/components/Contexts";
import Header from "~/components/Header";
import Pods from "~/components/Pods";
import sanatize from "~/utils/sanatize";
import useHandleActionData from "~/components/elements/useHandleAction";
import { StreamResult } from "~/components/elements/stream";
import { Loader } from "~/components/elements/Loading";

export type Context = {
  namespace: string;
  authInfo: string;
  cluster: string;
  name: string;
};

export const loader = async () => {
  return defer({
    contexts: await runCmd("kubectl config get-contexts").then(
      parseContextTable
    ),
    namespaces: runCmd("kubectl describe ns").then(parseNamespaceList),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const context = {
    namespace: formData.get("namespace") as string,
    authInfo: formData.get("authInfo") as string,
    cluster: formData.get("cluster") as string,
    name: formData.get("name") as string,
  };
  try {
    sanatize(context.name);
    return await handleAction(
      runCmd(`kubectl config use-context ${context.name}`)
    );
  } catch (error) {
    return json({ error: "failed XSS" });
  }
};

export default function Index() {
  const { contexts, namespaces } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const setActive = (context: Context) => {
    submit({ ...context, method: "setContext" }, { method: "POST" });
  };

  return (
    <div className="w-full">
      <Header />
      <div className="w-full flex justify-center mt-20">
        <div className="w-5/6">
          <Contexts contexts={contexts} setActive={setActive} />
          <StreamResult
            defererd={namespaces}
            View={({ data }) => <Pods namespaces={data} />}
            Loader={() => <Loader isLoading />}
          />
        </div>
      </div>
    </div>
  );
}
