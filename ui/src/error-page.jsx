import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex text-slate-100 flex-col justify-center items-center h-screen bg-red-400">
      <h1 className="text-6xl">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}