import { useNavigation } from "@remix-run/react";
import { Loader } from "./elements/Loading";

export default function Header() {
  const nav = useNavigation();
  return (
    <div className="w-full flex flex-row justify-between">
      <article className="prose">
        <h1 className="ml-3">Kubernetes viewer</h1>
      </article>
      <Loader
        isLoading={nav.state === "loading" || nav.state === "submitting"}
      />
    </div>
  );
}
