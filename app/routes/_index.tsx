import type { MetaFunction } from "@remix-run/node";
import Bedrock from "~/components/bedrock";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="mx-auto max-w-7xl mt-2 p-2">
      <div className="relative">
        <img
          src="/mcgameplay.png"
          alt="Minecraft Gameplay"
          className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-50 blur-sm"
        />
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 p-3 bg-black bg-opacity-25 rounded">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-300">
            Welcome to The Boys Minecraft Server
          </h1>
          <p className="text-sm sm:text-md md:text-lg text-blue-300">
            This website contains information about the server and its players.
          </p>
        </div>
      </div>
        <Bedrock />
    </main>
  );
}
