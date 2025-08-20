'use client';

import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  Clock,
  Code,
  Copy,
  Edit,
  Eye,
  EyeOff,
  FileText,
  Mail,
  MessageSquare,
  RotateCcw,
  Save,
  Send,
  Wand2,
} from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';

interface FormData {
  message: string;
  feedback: string;
  description: string;
  notes: string;
  review: string;
  summary: string;
}

interface TextareaStats {
  characters: number;
  words: number;
  lines: number;
  paragraphs: number;
}

export default function TextareaDemo() {
  const [formData, setFormData] = useState<FormData>({
    message: '',
    feedback: '',
    description: '',
    notes: '',
    review: '',
    summary: '',
  });

  const [autoSave, setAutoSave] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedStates, setSavedStates] = useState<{ [key: string]: string }>({});

  const calculateStats = (text: string): TextareaStats => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;

    return { characters, words, lines, paragraphs };
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (autoSave) {
      // Simulate auto-save
      setTimeout(() => {
        setSavedStates(prev => ({
          ...prev,
          [field]: value,
        }));
      }, 1000);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = (field: keyof FormData) => {
    setSavedStates(prev => ({
      ...prev,
      [field]: formData[field],
    }));
  };

  const handleReset = (field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: '',
    }));
  };

  const generateSample = (field: keyof FormData) => {
    const samples = {
      message:
        'Hello! I hope this message finds you well. I wanted to reach out regarding our upcoming project collaboration...',
      feedback:
        'The presentation was excellent! The content was well-structured and engaging. Some suggestions for improvement: consider adding more visual elements and interactive components to enhance audience engagement.',
      description:
        'This innovative solution addresses key market challenges by providing a comprehensive platform that streamlines workflow processes, enhances team collaboration, and delivers measurable results through advanced analytics and reporting capabilities.',
      notes:
        'Key points to remember:\n• Review quarterly metrics\n• Schedule team meeting\n• Update project timeline\n• Prepare presentation materials\n\nAction items:\n- Contact stakeholders\n- Finalize budget proposal',
      review:
        'Overall Rating: ⭐⭐⭐⭐⭐\n\nPros:\n- Excellent user interface\n- Fast performance\n- Great customer support\n\nCons:\n- Could use more customization options\n- Pricing could be more competitive\n\nWould definitely recommend to others!',
      summary:
        'Executive Summary: The Q4 analysis reveals significant growth opportunities across multiple business segments. Key findings indicate 25% revenue increase, improved customer satisfaction scores, and successful market expansion initiatives.',
    };

    setFormData(prev => ({
      ...prev,
      [field]: samples[field],
    }));
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Textarea Component</h1>
        <p className="text-muted-foreground text-lg">
          Multi-line text input for longer content and detailed information
        </p>
      </div>

      {/* Basic Textarea */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Textarea</h2>
          <p className="text-muted-foreground">Simple multi-line text input</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="basic-message">Message</Label>
            <Textarea
              id="basic-message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={e => handleInputChange('message', e.target.value)}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">{formData.message.length} characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="basic-feedback">Feedback</Label>
            <Textarea
              id="basic-feedback"
              placeholder="Share your thoughts and feedback..."
              value={formData.feedback}
              onChange={e => handleInputChange('feedback', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="basic-description">Description</Label>
            <Textarea
              id="basic-description"
              placeholder="Provide a detailed description..."
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              rows={5}
              disabled={!isEditing}
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <Eye className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? 'View Mode' : 'Edit Mode'}
              </Button>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={() => handleSave('description')}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Textarea Features */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Advanced Features</h2>
              <p className="text-muted-foreground">
                Enhanced textarea with additional functionality
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setAutoSave(!autoSave)}>
                <Clock className="h-4 w-4 mr-2" />
                Auto-save: {autoSave ? 'On' : 'Off'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Stats: {showStats ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="project-notes">Project Notes</Label>
              <div className="flex gap-2">
                {savedStates.notes && (
                  <Badge variant="outline" className="text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Saved
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={() => generateSample('notes')}>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Sample
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(formData.notes)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleSave('notes')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleReset('notes')}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              id="project-notes"
              placeholder="Write your project notes, ideas, and action items..."
              value={formData.notes}
              onChange={e => handleInputChange('notes', e.target.value)}
              rows={6}
              className="font-mono text-sm"
              style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}
            />
            {showStats && (
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Characters: {calculateStats(formData.notes).characters}</span>
                <span>Words: {calculateStats(formData.notes).words}</span>
                <span>Lines: {calculateStats(formData.notes).lines}</span>
                <span>Paragraphs: {calculateStats(formData.notes).paragraphs}</span>
              </div>
            )}
          </div>

          {/* Product Review */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="product-review">Product Review</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => generateSample('review')}>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Sample
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(formData.review)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              id="product-review"
              placeholder="Share your detailed product review..."
              value={formData.review}
              onChange={e => handleInputChange('review', e.target.value)}
              rows={5}
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{formData.review.length}/1000 characters</span>
              <div className="flex items-center gap-2">
                {formData.review.length > 800 && (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span>{Math.ceil(calculateStats(formData.review).words / 200)} min read</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="executive-summary">Executive Summary</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setWordWrap(!wordWrap)}>
                  {wordWrap ? (
                    <EyeOff className="h-4 w-4 mr-1" />
                  ) : (
                    <Eye className="h-4 w-4 mr-1" />
                  )}
                  Word Wrap
                </Button>
                <Button variant="ghost" size="sm" onClick={() => generateSample('summary')}>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Sample
                </Button>
              </div>
            </div>
            <Textarea
              id="executive-summary"
              placeholder="Write a comprehensive executive summary..."
              value={formData.summary}
              onChange={e => handleInputChange('summary', e.target.value)}
              rows={4}
              className="resize-none"
            />
            {showStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {calculateStats(formData.summary).characters}
                  </div>
                  <div className="text-xs text-muted-foreground">Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {calculateStats(formData.summary).words}
                  </div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {calculateStats(formData.summary).lines}
                  </div>
                  <div className="text-xs text-muted-foreground">Lines</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {calculateStats(formData.summary).paragraphs}
                  </div>
                  <div className="text-xs text-muted-foreground">Paragraphs</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Textarea Variations */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Textarea Variations</h2>
          <p className="text-muted-foreground">Different styles and use cases</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Small Textarea */}
            <div className="space-y-2">
              <Label>Quick Note</Label>
              <Textarea placeholder="Quick note..." rows={2} className="text-sm" />
              <p className="text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3 inline mr-1" />
                For brief comments and notes
              </p>
            </div>

            {/* Large Textarea */}
            <div className="space-y-2">
              <Label>Detailed Report</Label>
              <Textarea
                placeholder="Write your detailed report..."
                rows={8}
                className="text-sm leading-relaxed"
              />
              <p className="text-xs text-muted-foreground">
                <FileText className="h-3 w-3 inline mr-1" />
                For comprehensive documentation
              </p>
            </div>

            {/* Code Textarea */}
            <div className="space-y-2">
              <Label>Code Snippet</Label>
              <Textarea
                placeholder="// Enter your code here..."
                rows={6}
                className="font-mono text-sm bg-slate-50 dark:bg-slate-900"
                spellCheck={false}
              />
              <p className="text-xs text-muted-foreground">
                <Code className="h-3 w-3 inline mr-1" />
                Monospace font for code input
              </p>
            </div>

            {/* Email Draft */}
            <div className="space-y-2">
              <Label>Email Draft</Label>
              <Textarea placeholder="Compose your email..." rows={6} className="text-sm" />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  <Mail className="h-3 w-3 inline mr-1" />
                  Email composition
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Save Draft
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Provide clear placeholder text and labels</li>
              <li>• Show character/word count for limited inputs</li>
              <li>• Use appropriate sizing for the expected content</li>
              <li>• Consider auto-resize or fixed height based on use case</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Functionality</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Implement auto-save for important content</li>
              <li>• Provide copy, save, and reset functionality</li>
              <li>• Use monospace fonts for code input</li>
              <li>• Add validation for required fields</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
