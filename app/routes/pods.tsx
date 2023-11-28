import { redirect, type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parseContextTable } from "~/utils/parseContextTable";
import runCmd from "~/utils/runCmd";

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const namespace = params.get("ns");

  if (namespace) {
    try {
      const pods = await runCmd(`kubectl get pods -n ${namespace}`);
      return json({ pods: parseContextTable(pods) });
    } catch (error) {
      console.error(error);
      return redirect("/");
    }
  } else {
    return redirect("/");
  }
};

export default function Pods() {
  const { pods } = useLoaderData<typeof loader>();

  const header = pods[0];
  const body = pods.slice(1, pods.length - 1);

  console.log(body);

  const trClick = (lineNum: number) => {};

  return (
    <div role="tablist" className="tabs tabs-bordered pl-3">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Tab 1"
        checked
      />
      <div
        role="tabpanel"
        className="tab-content p-10 bg-base-200 border-base-300 rounded-box"
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
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label={"Tab " + (i + 2).toString()}
          />
          <div
            role="tabpanel"
            className="tab-content p-10 bg-base-200 border-base-300 rounded-box"
          >
            <table className="table">
              <thead>
                <tr>
                  {header.map((head: string, i: number) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </>
      ))}
    </div>
  );
}
