import { Context } from "~/routes";

export const Terminal = ({ text }: { text: string }) => {
  return (
    <div className="terminal">
      <div className="terminal__line">{text}</div>
    </div>
  );
};

export const TerminalTable = ({
  text,
  setActive,
}: {
  text: Array<Array<string>>;
  setActive: (context: Context) => void;
}) => {
  const header = text[0];
  const body = text.slice(1, text.length);
  const active = body.findIndex((row) => row[0] === "*");

  const trClick = (lineNum: number) => {
    if (active !== lineNum) {
      setActive({
        namespace: body[lineNum][4],
        authInfo: body[lineNum][4],
        cluster: body[lineNum][2],
        name: body[lineNum][1],
      });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {header.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((line, i) => (
          <tr key={i} className="hover" onClick={() => trClick(i)}>
            {line.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
