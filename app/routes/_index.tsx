import type { MetaFunction } from "@remix-run/node";
import HomeSearch from "../components/home-search";

export const meta: MetaFunction = () => {
  return [
    { title: "TicketTrackr" },
    { name: "description", content: "Welcome to TicketTrackr!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <HomeSearch />
      </div>
    </div>
  );
}
