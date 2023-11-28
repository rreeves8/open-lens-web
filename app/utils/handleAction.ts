import { json } from "@remix-run/node";

export default function handleAction(promise: Promise<unknown>) {
  return new Promise((resolve) =>
    promise
      .then((data) => resolve(json({ error: null, data: data })))
      .catch((error) => resolve(json({ error, data: null })))
  );
}
