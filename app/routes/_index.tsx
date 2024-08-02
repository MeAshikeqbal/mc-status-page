import type { MetaFunction } from "@remix-run/node";
import { Tabs, Tab } from "@nextui-org/tabs";
import Bedrock from "~/components/bedrock";
import Java from "~/components/java";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="relative">
        <img
          src="/mcgameplay.png"
          alt="Minecraft Gameplay"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-t-lg"
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
      <Tabs
      variant="light"
      className="w-full mt-4"
      >
        <Tab title="Java">
          <Java />
        </Tab>
        <Tab title="Bedrock">
          <Bedrock />
        </Tab>
      </Tabs>
    </>
  );
}
