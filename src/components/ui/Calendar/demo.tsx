'use client';

import { Bell, CalendarDays, Clock, MapPin, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

export default function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [showEvents, setShowEvents] = useState(true);

  // Sample events for demonstration
  const events = [
    { date: new Date(2025, 7, 22), title: 'Team Meeting', type: 'work' },
    { date: new Date(2025, 7, 24), title: 'Project Deadline', type: 'deadline' },
    { date: new Date(2025, 7, 26), title: 'Birthday Party', type: 'personal' },
    { date: new Date(2025, 7, 28), title: 'Conference Call', type: 'work' },
    { date: new Date(2025, 7, 30), title: 'Vacation Starts', type: 'vacation' },
  ];

  const getEventForDate = (date: Date) => {
    return events.find(
      event =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case 'work':
        return 'default';
      case 'deadline':
        return 'destructive';
      case 'personal':
        return 'secondary';
      case 'vacation':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'None';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysBetween = (from: Date | undefined, to: Date | undefined) => {
    if (!from || !to) return 0;
    const timeDiff = to.getTime() - from.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Calendar Component</h1>
        <p className="text-muted-foreground">Date selection interfaces for various use cases</p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Standard calendar layouts for simple date selection
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Single Date Selection</h4>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Selected: {formatDate(selectedDate)}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Default Calendar</h4>
                <div className="flex justify-center">
                  <Calendar className="rounded-md border" />
                </div>
                <p className="text-sm text-muted-foreground text-center">Read-only calendar view</p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex calendar scenarios with ranges, multiple dates, and event integration
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Date Range Selection */}
            <div>
              <h4 className="font-medium mb-3">Date Range Selection</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Calendar
                    mode="range"
                    selected={selectedRange}
                    onSelect={range =>
                      setSelectedRange(range || { from: undefined, to: undefined })
                    }
                    className="rounded-md border"
                    numberOfMonths={1}
                  />
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Range Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Start Date:</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(selectedRange.from)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">End Date:</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(selectedRange.to)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration:</p>
                        <p className="text-sm text-muted-foreground">
                          {getDaysBetween(selectedRange.from, selectedRange.to)} days
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRange({ from: undefined, to: undefined })}
                        className="w-full"
                      >
                        Clear Range
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Multiple Date Selection */}
            <div>
              <h4 className="font-medium mb-3">Multiple Date Selection</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Calendar
                    mode="multiple"
                    selected={multipleDates}
                    onSelect={dates => setMultipleDates(dates || [])}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Selected Dates ({multipleDates.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {multipleDates.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No dates selected</p>
                      ) : (
                        <div className="space-y-2">
                          <div className="max-h-40 overflow-y-auto space-y-1">
                            {multipleDates
                              .sort((a, b) => a.getTime() - b.getTime())
                              .map((date, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                                >
                                  <span>{date.toLocaleDateString()}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      setMultipleDates(prev => prev.filter(d => d !== date))
                                    }
                                    className="h-5 w-5 p-0"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setMultipleDates([])}
                            className="w-full"
                          >
                            Clear All
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Calendar with Events */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Calendar with Events</h4>
                <Button size="sm" variant="outline" onClick={() => setShowEvents(!showEvents)}>
                  {showEvents ? 'Hide Events' : 'Show Events'}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={
                      showEvents
                        ? {
                            event: events.map(e => e.date),
                          }
                        : {}
                    }
                    modifiersClassNames={{
                      event: 'bg-blue-100 text-blue-900 font-semibold',
                    }}
                  />

                  {showEvents && (
                    <div className="text-center text-xs text-muted-foreground">
                      Blue highlighted dates have events
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {events.map((event, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-center">
                                <div className="text-sm font-medium">{event.date.getDate()}</div>
                                <div className="text-xs text-muted-foreground">
                                  {event.date.toLocaleDateString('en-US', { month: 'short' })}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{event.title}</p>
                                <Badge
                                  variant={getEventBadgeVariant(event.type)}
                                  className="text-xs"
                                >
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedDate && getEventForDate(selectedDate) && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Bell className="h-5 w-5 text-blue-600" />
                          Event Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">{getEventForDate(selectedDate)?.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {formatDate(selectedDate)}
                            </div>
                            <Badge
                              variant={getEventBadgeVariant(
                                getEventForDate(selectedDate)?.type || ''
                              )}
                            >
                              {getEventForDate(selectedDate)?.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Real-world Use Cases */}
            <div>
              <h4 className="font-medium mb-3">Real-world Applications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Meeting Scheduler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-2">
                      Use range selection to book meeting rooms or schedule multi-day events.
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>Conference Room A</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Vacation Planner
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="text-muted-foreground mb-2">
                      Select multiple non-consecutive days for flexible vacation planning.
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>Flexible dates</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
