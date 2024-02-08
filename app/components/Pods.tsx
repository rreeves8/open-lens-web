import { Link, Outlet } from "@remix-run/react";

export default function Pods({ namespaces }: { namespaces: Array<string> }) {
  return (
    <div className="pl-10 pt-20">
      <article className="prose mb-8">
        <h2>Pods</h2>
      </article>
      <div className="flex flex-row w-full items-start">
        <ul className="menu bg-base-200 w-56 rounded-box ">
          {namespaces.map((namespace, i) => (
            <li key={i}>
              <Link to={"/pods?ns=" + namespace}>{namespace}</Link>
            </li>
          ))}
        </ul>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
