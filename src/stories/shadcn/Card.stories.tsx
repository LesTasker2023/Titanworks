import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "shadcn/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
};

// Card with footer
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>TriggerKings Event</CardTitle>
        <CardDescription>
          Mobile paintball experience in Liverpool
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          We bring the action to your location with professional equipment,
          real-time scoring, and expert staff.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Learn More</Button>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  ),
};

// Service card example
export const ServiceCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 Mobile Service
        </CardTitle>
        <CardDescription>We come to you</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Our mobile paintball service brings all the equipment and excitement
          directly to your chosen location anywhere in Liverpool and surrounding
          areas.
        </p>
      </CardContent>
    </Card>
  ),
};

// Feature grid
export const FeatureGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Real-Time Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Advanced scoring system to track performance and crown the champion.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Professional Equipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            All equipment included: gear, safety equipment, and expert staff.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚗 Mobile Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            We bring the action to your location anywhere in Liverpool.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Pricing card
export const PricingCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="text-center">
        <CardTitle>Standard Package</CardTitle>
        <CardDescription>Perfect for birthday parties</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl font-bold text-primary">£299</div>
        <p className="text-sm text-muted-foreground">Up to 8 players</p>
        <ul className="mt-4 text-sm space-y-2">
          <li>✓ All equipment included</li>
          <li>✓ 2 hours of gameplay</li>
          <li>✓ Professional staff</li>
          <li>✓ Real-time scoring</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book This Package</Button>
      </CardFooter>
    </Card>
  ),
};
