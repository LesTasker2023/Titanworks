import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from '../button';

const meta = {
  title: 'TriggerKings/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component built with shadcn/ui API and pure SCSS styling. Perfect for displaying content in a contained, elevated surface.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card Example
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework">Framework</label>
              <select>
                <option value="">Select</option>
                <option value="next">Next.js</option>
                <option value="sveltekit">SvelteKit</option>
                <option value="astro">Astro</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple Card with just content
export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content. This is where the main content of the card goes.</p>
      </CardContent>
    </Card>
  ),
};

// Card with footer actions
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  ),
};

// Interactive Card (with hover effects)
export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] card--interactive">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has hover effects and is clickable.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Hover over this card to see the interaction effects.</p>
      </CardContent>
    </Card>
  ),
};

// Elevated Card variant
export const Elevated: Story = {
  render: () => (
    <Card className="w-[350px] card--elevated">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has more prominent shadow elevation.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card stands out more with elevated styling.</p>
      </CardContent>
    </Card>
  ),
};

// Flat Card variant (no shadow)
export const Flat: Story = {
  render: () => (
    <Card className="w-[350px] card--flat">
      <CardHeader>
        <CardTitle>Flat Card</CardTitle>
        <CardDescription>This card has no shadow for a flatter appearance.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Simple, flat styling without elevation.</p>
      </CardContent>
    </Card>
  ),
};

// Card Showcase - Multiple cards
export const Showcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardDescription>Invite your team members to collaborate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Invite Team</Button>
        </CardContent>
      </Card>

      <Card className="card--interactive">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>View your project analytics and insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24,567</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="card--elevated">
        <CardHeader>
          <CardTitle>Premium</CardTitle>
          <CardDescription>Upgrade to unlock premium features.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="default" className="w-full">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
