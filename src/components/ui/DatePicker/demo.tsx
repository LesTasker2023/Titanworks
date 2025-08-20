'use client';

import {
  AlertTriangle,
  Briefcase,
  Building,
  Calendar,
  CalendarDays,
  Car,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  Heart,
  Hotel,
  Plane,
  Target,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from '.';
import { Badge } from '../Badge';
import { Card } from '../Card';

export default function DatePickerDemo() {
  // Basic usage states
  const [basicDate, setBasicDate] = useState<Date | undefined>(new Date());
  const [noDefaultDate, setNoDefaultDate] = useState<Date | undefined>();

  // Business scheduling states
  const [meetingDate, setMeetingDate] = useState<Date | undefined>();
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>();
  const [launchDate, setLaunchDate] = useState<Date | undefined>();

  // Event planning states
  const [eventStartDate, setEventStartDate] = useState<Date | undefined>();
  const [eventEndDate, setEventEndDate] = useState<Date | undefined>();
  const [rsvpDeadline, setRSVPDeadline] = useState<Date | undefined>();

  // Personal planning states
  const [birthdayDate, setBirthdayDate] = useState<Date | undefined>();
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();

  // Travel planning states
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  // Financial planning states
  const [paymentDue, setPaymentDue] = useState<Date | undefined>();
  const [contractStart, setContractStart] = useState<Date | undefined>();
  const [contractEnd, setContractEnd] = useState<Date | undefined>();

  // Educational planning states
  const [examDate, setExamDate] = useState<Date | undefined>();
  const [graduationDate, setGraduationDate] = useState<Date | undefined>();

  const [feedback, setFeedback] = useState<string>('');

  const handleDateSelection = (purpose: string, date?: Date) => {
    if (date) {
      setFeedback(`${purpose} scheduled for ${date.toLocaleDateString()}`);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const formatDateRange = (start?: Date, end?: Date) => {
    if (!start && !end) return 'Not selected';
    if (start && !end) return `From ${start.toLocaleDateString()}`;
    if (!start && end) return `Until ${end.toLocaleDateString()}`;
    return `${start!.toLocaleDateString()} - ${end!.toLocaleDateString()}`;
  };

  const getDaysFromNow = (date?: Date) => {
    if (!date) return null;
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyBadge = (date?: Date) => {
    const days = getDaysFromNow(date);
    if (days === null) return null;

    if (days < 0) return <Badge variant="destructive">Overdue</Badge>;
    if (days === 0) return <Badge variant="destructive">Today</Badge>;
    if (days === 1) return <Badge variant="outline">Tomorrow</Badge>;
    if (days <= 7) return <Badge variant="outline">This week</Badge>;
    if (days <= 30) return <Badge variant="secondary">This month</Badge>;
    return <Badge variant="default">Future</Badge>;
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">DatePicker Component</h1>
        <p className="text-muted-foreground">
          Comprehensive date selection for business, personal, and event planning
        </p>
      </div>

      {/* Feedback */}
      {feedback && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              Date selected: <strong>{feedback}</strong>
            </span>
          </div>
        </Card>
      )}

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple date selection with different configurations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">With Default Date</h4>
              <DatePicker
                date={basicDate}
                onDateChange={setBasicDate}
                placeholder="Select date..."
              />
              <p className="text-xs text-muted-foreground">
                Selected: {basicDate?.toLocaleDateString() || 'None'}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">No Default Date</h4>
              <DatePicker
                date={noDefaultDate}
                onDateChange={setNoDefaultDate}
                placeholder="Pick a date"
              />
              <p className="text-xs text-muted-foreground">
                Selected: {noDefaultDate?.toLocaleDateString() || 'None'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Planning */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">Business Planning</h3>
              <p className="text-sm text-muted-foreground">
                Schedule meetings, deadlines, and product launches
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Team Meeting</h4>
                {getUrgencyBadge(meetingDate)}
              </div>
              <DatePicker
                date={meetingDate}
                onDateChange={date => {
                  setMeetingDate(date);
                  handleDateSelection('Team meeting', date);
                }}
                placeholder="Schedule meeting..."
              />
              <p className="text-xs text-muted-foreground">
                {meetingDate ? `In ${getDaysFromNow(meetingDate)} days` : 'Not scheduled'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Project Deadline</h4>
                {getUrgencyBadge(deadlineDate)}
              </div>
              <DatePicker
                date={deadlineDate}
                onDateChange={date => {
                  setDeadlineDate(date);
                  handleDateSelection('Project deadline', date);
                }}
                placeholder="Set deadline..."
              />
              <p className="text-xs text-muted-foreground">
                {deadlineDate ? `In ${getDaysFromNow(deadlineDate)} days` : 'Not set'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Product Launch</h4>
                {getUrgencyBadge(launchDate)}
              </div>
              <DatePicker
                date={launchDate}
                onDateChange={date => {
                  setLaunchDate(date);
                  handleDateSelection('Product launch', date);
                }}
                placeholder="Launch date..."
              />
              <p className="text-xs text-muted-foreground">
                {launchDate ? `In ${getDaysFromNow(launchDate)} days` : 'Not planned'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Event Planning */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Event Planning</h3>
              <p className="text-sm text-muted-foreground">
                Organize conferences, workshops, and corporate events
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Event Start</h4>
              </div>
              <DatePicker
                date={eventStartDate}
                onDateChange={date => {
                  setEventStartDate(date);
                  handleDateSelection('Event start', date);
                }}
                placeholder="Event start date..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Event End</h4>
              </div>
              <DatePicker
                date={eventEndDate}
                onDateChange={date => {
                  setEventEndDate(date);
                  handleDateSelection('Event end', date);
                }}
                placeholder="Event end date..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">RSVP Deadline</h4>
                {getUrgencyBadge(rsvpDeadline)}
              </div>
              <DatePicker
                date={rsvpDeadline}
                onDateChange={date => {
                  setRSVPDeadline(date);
                  handleDateSelection('RSVP deadline', date);
                }}
                placeholder="RSVP deadline..."
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Event Timeline</h4>
            <p className="text-sm text-muted-foreground">
              Duration: {formatDateRange(eventStartDate, eventEndDate)}
            </p>
          </div>
        </div>
      </Card>

      {/* Travel Planning */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Plane className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Travel Planning</h3>
              <p className="text-sm text-muted-foreground">
                Plan business trips, vacations, and accommodations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Car className="h-4 w-4" />
                Flight Booking
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Departure</label>
                  <DatePicker
                    date={departureDate}
                    onDateChange={setDepartureDate}
                    placeholder="Departure date..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Return</label>
                  <DatePicker
                    date={returnDate}
                    onDateChange={setReturnDate}
                    placeholder="Return date..."
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Trip duration: {formatDateRange(departureDate, returnDate)}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Hotel className="h-4 w-4" />
                Hotel Booking
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Check-in</label>
                  <DatePicker
                    date={checkInDate}
                    onDateChange={setCheckInDate}
                    placeholder="Check-in date..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Check-out</label>
                  <DatePicker
                    date={checkOutDate}
                    onDateChange={setCheckOutDate}
                    placeholder="Check-out date..."
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Stay duration: {formatDateRange(checkInDate, checkOutDate)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Planning */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold">Financial Planning</h3>
              <p className="text-sm text-muted-foreground">
                Track payments, contracts, and financial deadlines
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Payment Due</h4>
                {getUrgencyBadge(paymentDue)}
              </div>
              <DatePicker
                date={paymentDue}
                onDateChange={setPaymentDue}
                placeholder="Payment due..."
              />
              <p className="text-xs text-muted-foreground">
                {paymentDue ? `Due in ${getDaysFromNow(paymentDue)} days` : 'Not set'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Contract Start</h4>
              </div>
              <DatePicker
                date={contractStart}
                onDateChange={setContractStart}
                placeholder="Contract start..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">Contract End</h4>
              </div>
              <DatePicker
                date={contractEnd}
                onDateChange={setContractEnd}
                placeholder="Contract end..."
              />
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Contract Period</h4>
            <p className="text-sm text-muted-foreground">
              Duration: {formatDateRange(contractStart, contractEnd)}
            </p>
          </div>
        </div>
      </Card>

      {/* Personal & Educational */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="text-xl font-semibold">Personal & Educational</h3>
              <p className="text-sm text-muted-foreground">
                Track personal events, education, and important dates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Personal Events
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm">Birthday</label>
                  </div>
                  <DatePicker
                    date={birthdayDate}
                    onDateChange={setBirthdayDate}
                    placeholder="Birthday date..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm">Appointment</label>
                    {getUrgencyBadge(appointmentDate)}
                  </div>
                  <DatePicker
                    date={appointmentDate}
                    onDateChange={setAppointmentDate}
                    placeholder="Appointment date..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm">Exam Date</label>
                    {getUrgencyBadge(examDate)}
                  </div>
                  <DatePicker
                    date={examDate}
                    onDateChange={setExamDate}
                    placeholder="Exam date..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm">Graduation</label>
                  </div>
                  <DatePicker
                    date={graduationDate}
                    onDateChange={setGraduationDate}
                    placeholder="Graduation date..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Project Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Sprint planning and milestones</p>
                <p>• Resource allocation deadlines</p>
                <p>• Client deliverable schedules</p>
                <p>• Team availability tracking</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Sales & Marketing</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Campaign launch dates</p>
                <p>• Lead follow-up scheduling</p>
                <p>• Quarter-end targets</p>
                <p>• Trade show planning</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Operations</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Maintenance schedules</p>
                <p>• Inventory reorder dates</p>
                <p>• Compliance deadlines</p>
                <p>• Performance reviews</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Date range selection</div>
              <div>• Urgency indicators</div>
              <div>• Timeline visualization</div>
              <div>• Conflict detection</div>
              <div>• Recurring events</div>
              <div>• Time zone support</div>
              <div>• Custom date formats</div>
              <div>• Accessibility compliant</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
