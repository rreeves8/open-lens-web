import { type Context } from "~/routes";
import { TerminalTable } from "./elements/TerminalView";

export default function Contexts({
  contexts,
  setActive,
}: {
  contexts: Array<Array<string>>;
  setActive: (context: Context) => void;
}) {
  return (
    <div className="pl-10">
      <article className="prose mb-8">
        <h2>Contexts</h2>
      </article>
      <TerminalTable text={contexts} setActive={setActive} />
    </div>
  );
}
