import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export default function CardTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Card Titan Component</h1>
        <p className="text-lg text-muted-foreground">
          Flexible card component with compositional structure
        </p>
      </div>

      {/* Basic Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>Basic card with title and description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Card</CardTitle>
              <CardDescription>Card with action button</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content with interactive elements.</p>
            </CardContent>
            <CardFooter>
              <Button>Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent>
              <p>Minimal card with just content.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Complex Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complex Example</h2>
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>TriggerKings Mobile Range</CardTitle>
              <CardDescription>Paintball experience at your event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Features:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Mobile paintball range</li>
                  <li>High score tracking</li>
                  <li>Party entertainment</li>
                  <li>Event booking</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="default">Book Now</Button>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
