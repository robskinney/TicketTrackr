import { Form } from "@remix-run/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function HomeSearch() {
  return (
    <Card className="w-4/5 mt-5">
      <CardHeader>
        <CardTitle>Welcome to TicketTrackr!</CardTitle>
        <CardDescription>
          Start a search for an upcoming event to get started.
        </CardDescription>
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
            required
          />
          <Button>Search</Button>
        </Form>
      </CardContent>
    </Card>
  );
}
