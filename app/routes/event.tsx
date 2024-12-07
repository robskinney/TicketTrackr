import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";

import { Calendar, CircleDollarSign, MapPin } from "lucide-react";
import { Card, CardTitle } from "~/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "TicketTrackr" },
    { name: "description", content: "Welcome to TicketTrackr!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const ticketProvider = new URL(request.url).searchParams.get(
    "ticketProvider"
  );
  const ticketID = new URL(request.url).searchParams.get("id");

  if (ticketProvider === "ticketmaster") {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${ticketID}?apikey=${process.env.TICKETMASTER_API_KEY}`
    );

    const data = await res.json();

    return { event: data };
  } else {
    return { event: [] };
  }
}

export default function Invoices() {
  const { event } = useLoaderData<typeof loader>();

  console.log(event);

  if (!event) {
    redirect("/");
  }

  return (
    <div className="flex flex-col space-y-5">
      <Breadcrumb className="mt-5 mx-6">
        <BreadcrumbList className="mx-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-center">
        <Card className="flex flex-col space-y-2 w-11/12 p-5 transition-all">
          <Card className="h-full pt-3 px-3 pb-1">
            <img
              src={event.images[0].url}
              alt={event.name}
              className="rounded-md"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "150px",
              }}
            />
          </Card>

          <CardTitle>{event.name}</CardTitle>
          <div className="flex flex-row items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <p>{event._embedded.venues[0].name}</p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <p>{new Date(event.dates.start.dateTime).toDateString()}</p>
          </div>
          {event.priceRanges && (
            <div className="flex flex-row items-center space-x-2">
              <CircleDollarSign className="h-5 w-5" />
              <p>{`$${event.priceRanges[0].min} - $${event.priceRanges[0].max}`}</p>
            </div>
          )}

          <Link to={event.url} target="_blank" rel="noreferrer">
            <Button className="mt-5">Buy Tickets</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
