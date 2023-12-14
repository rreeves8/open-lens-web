import { Await } from '@remix-run/react';
import { Suspense } from 'react';

export const StreamResult = <T,>({
  defererd,
  View,
  Loader
}: {
  defererd: Promise<T>;
  View: ({ data }: { data: T }) => React.ReactNode;
  Loader: () => React.ReactNode;
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={defererd}>{(result) => <View data={result} />}</Await>
    </Suspense>
  );
};
