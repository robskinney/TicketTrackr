import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Calendar, CircleDollarSign, MapPin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "TicketTrackr" },
    { name: "description", content: "Welcome to TicketTrackr!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const query = new URL(request.url).searchParams.get("search");

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&countryCode=US&apikey=${process.env.TICKETMASTER_API_KEY}`
  );

  const data = await res.json();

  return { events: data._embedded?.events || [], query };
}

export default function Invoices() {
  const { events, query } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center">
        <Card className="w-5/6 mt-5">
          <CardHeader>
            <CardTitle>Search TicketTrackr</CardTitle>
          </CardHeader>
          <CardContent>
            <Form
              className="flex flex-col md:flex-row gap-2"
              action="/events"
              method="get"
            >
              <Input
                type="text"
                placeholder="Events near me..."
                name="search"
                defaultValue={query ? query : ""}
              />
              <Button>Search</Button>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-11/12 p-5 transition-all">
          {events.map((event: any, index: number) => (
            <Link
              key={index}
              to={`/events/${event.id}`}
              className="hover:scale-105 transition-all"
            >
              <Card key={index} className="h-full pt-3 px-3 pb-1">
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
                <div className="flex flex-col overflow-hidden my-1">
                  <p className="font-semibold">{event.name}</p>
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
                </div>
              </Card>
            </Link>
          ))}
        </Card>
      </div>
    </div>
  );
}
