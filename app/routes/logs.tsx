import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Terminal } from "~/components/elements/TerminalView";
import runCmd from "~/utils/runCmd";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const namespace = params.get("ns");
  const podName = params.get("pod");

  const logs = await runCmd(
    `kubectl logs ${podName} -n ${namespace}`
  );

  return json({ logs });
};

export default function Logs() {
  const { logs } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <div className="terminal">
        <div className="terminal__line">{logs}</div>
      </div>
    </div>
  );
}
