/**
 * Showcase Reorganization Implementation
 *
 * This file contains the reorganized first 8 components in alphabetical order
 * to demonstrate the pattern for the full reorganization.
 */

// ALPHABETICAL ORDER (First 8):
// 1. Accordion ✅ (was #21)
// 2. Alert ✅ (was #12)
// 3. AlertDialog (was #22)
// 4. AspectRatio (was #14)
// 5. Avatar (was #31)
// 6. Badge (was #4)
// 7. Breadcrumb (was #46)
// 8. Button (was #1)

export const ALPHABETICAL_FIRST_8 = `
              {/* 1. Accordion */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">1</span>
                    Accordion
                  </CardTitle>
                  <CardDescription>Collapsible content sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Accordion items={accordionData} defaultOpenIndex={0} />
                  <div className="text-xs text-muted-foreground text-center">
                    Interactive collapsible sections
                  </div>
                </CardContent>
              </Card>

              {/* 2. Alert */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">2</span>
                    Alert
                  </CardTitle>
                  <CardDescription>Notification messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <div>
                      <h5 className="font-medium text-sm">Info</h5>
                      <p className="text-xs text-muted-foreground">Information alert message</p>
                    </div>
                  </Alert>
                  <Alert variant="destructive">
                    <div>
                      <h5 className="font-medium text-sm">Error</h5>
                      <p className="text-xs text-muted-foreground">Error alert message</p>
                    </div>
                  </Alert>
                </CardContent>
              </Card>

              {/* 3. AlertDialog */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">3</span>
                    AlertDialog
                  </CardTitle>
                  <CardDescription>Confirmation and alert dialogs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>

              {/* 4. AspectRatio */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">4</span>
                    AspectRatio
                  </CardTitle>
                  <CardDescription>Maintain consistent aspect ratios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded">
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      16:9 Aspect Ratio
                    </div>
                  </AspectRatio>
                  <AspectRatio ratio={1} className="bg-muted rounded">
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      1:1 Square
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>

              {/* 5. Avatar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">5</span>
                    Avatar
                  </CardTitle>
                  <CardDescription>User profile images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-full w-full flex items-center justify-center text-white font-bold text-lg">
                        JD
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-red-500 h-full w-full flex items-center justify-center text-white text-xs">
                        A
                      </div>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <div className="bg-green-500 h-full w-full flex items-center justify-center text-white text-xs">
                        B
                      </div>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white text-xs">
                        C
                      </div>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>

              {/* 6. Badge */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">6</span>
                    Badge
                  </CardTitle>
                  <CardDescription>Status and category indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-green-500">Success</Badge>
                    <Badge className="bg-yellow-500">Warning</Badge>
                    <Badge className="bg-blue-500">Info</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 7. Breadcrumb */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">7</span>
                    Breadcrumb
                  </CardTitle>
                  <CardDescription>Navigation breadcrumb trails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              {/* 8. Button */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">8</span>
                    Button
                  </CardTitle>
                  <CardDescription>Interactive buttons with variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Destructive
                  </Button>
                </CardContent>
              </Card>
`;

export const COMPONENT_MAPPING = {
  // What needs to move where
  1: { name: 'Accordion', from: 21, to: 1 },
  2: { name: 'Alert', from: 12, to: 2 },
  3: { name: 'AlertDialog', from: 22, to: 3 },
  4: { name: 'AspectRatio', from: 14, to: 4 },
  5: { name: 'Avatar', from: 31, to: 5 },
  6: { name: 'Badge', from: 4, to: 6 },
  7: { name: 'Breadcrumb', from: 46, to: 7 },
  8: { name: 'Button', from: 1, to: 8 },
  // Continue for all 38 components...
};
