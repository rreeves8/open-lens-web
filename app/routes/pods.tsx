import { redirect, type LoaderFunction, json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { parseContextTable } from "~/utils/parseContextTable";
import runCmd from "~/utils/runCmd";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const namespace = params.get("ns");
  const pod = params.get("pod");

  if (namespace) {
    try {
      const pods = await runCmd(`kubectl get pods -n ${namespace}`);
      return json({
        pods: parseContextTable(pods),
        pod: pod ? pod : false,
        ns: namespace,
      });
    } catch (error) {
      console.error(error);
      return redirect("/");
    }
  } else {
    return redirect("/");
  }
};

export default function Pods() {
  const { pods, pod , ns} = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const header = pods[0];
  const body = pods.slice(1, pods.length - 1);

  const trClick = (lineNum: number) => {
    navigate({
      pathname: "/pods/logs",
      search: `?ns=${ns}&pod=${body[lineNum][0]}`,
    });
  };

  return (
    <div role="tablist" className="tabs tabs-bordered pl-3 w-full">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="All Pods"
        defaultChecked={pod ? false : true}
      />
      <div
        role="tabpanel"
        className="tab-content p-10 bg-base-100 border-base-300 rounded-box"
      >
        <table className="table">
          <thead>
            <tr>
              {header.map((head: string, i: number) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((line: string[], i: number) => (
              <tr key={i} className="hover" onClick={() => trClick(i)}>
                {line.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {body.map((item: string[], i: number) => (
        <>
          <input
            key={i}
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab w-fit"
            aria-label={"Pod " + (i + 1).toString()}
            defaultChecked={pod && pod === item[0]}
          />
          <div
            role="tabpanel"
            className="tab-content p-10 bg-base-200 border-base-300 rounded-box w-full"
          >
            <Outlet />
          </div>
        </>
      ))}
    </div>
  );
}
