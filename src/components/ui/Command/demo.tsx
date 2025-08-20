'use client';

import {
  BarChart3,
  Calculator,
  Calendar,
  Command as CommandIcon,
  Copy,
  Download,
  Eye,
  FileText,
  Home,
  Mail,
  Palette,
  Search,
  Settings,
  Share,
  Trash2,
  Upload,
  Users,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

// Sample data for different command types
const navigationCommands = [
  { id: 'home', label: 'Go to Dashboard', icon: Home, shortcut: '⌘H' },
  { id: 'analytics', label: 'View Analytics', icon: BarChart3, shortcut: '⌘A' },
  { id: 'users', label: 'Manage Users', icon: Users, shortcut: '⌘U' },
  { id: 'settings', label: 'Open Settings', icon: Settings, shortcut: '⌘,' },
  { id: 'calendar', label: 'Open Calendar', icon: Calendar, shortcut: '⌘K' },
];

const fileCommands = [
  { id: 'new-file', label: 'Create New File', icon: FileText, shortcut: '⌘N' },
  { id: 'open-file', label: 'Open File', icon: Eye, shortcut: '⌘O' },
  { id: 'save-file', label: 'Save Current File', icon: Download, shortcut: '⌘S' },
  { id: 'copy-file', label: 'Copy File', icon: Copy, shortcut: '⌘C' },
  { id: 'delete-file', label: 'Delete File', icon: Trash2, shortcut: '⌘⌫' },
];

const actionCommands = [
  { id: 'search', label: 'Global Search', icon: Search, shortcut: '⌘⇧F' },
  { id: 'calculator', label: 'Open Calculator', icon: Calculator, shortcut: '⌘=' },
  { id: 'theme', label: 'Change Theme', icon: Palette, shortcut: '⌘T' },
  { id: 'share', label: 'Share Current Page', icon: Share, shortcut: '⌘⇧S' },
  { id: 'upload', label: 'Upload Files', icon: Upload, shortcut: '⌘⇧U' },
];

const contacts = [
  { id: 'john', name: 'John Smith', email: 'john@company.com', role: 'Product Manager' },
  { id: 'sarah', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Designer' },
  { id: 'mike', name: 'Mike Chen', email: 'mike@company.com', role: 'Developer' },
  { id: 'emma', name: 'Emma Davis', email: 'emma@company.com', role: 'Data Analyst' },
];

const recentFiles = [
  { id: 'project-plan', name: 'Q4 Project Plan.pdf', modified: '2 hours ago' },
  { id: 'design-specs', name: 'Design Specifications.figma', modified: '1 day ago' },
  { id: 'budget', name: 'Budget 2024.xlsx', modified: '3 days ago' },
  { id: 'meeting-notes', name: 'Team Meeting Notes.md', modified: '1 week ago' },
];

export default function CommandDemo() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [commandValue, setCommandValue] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<string>('');

  // Simulate keyboard shortcut for opening command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setAdvancedOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSelect = (commandId: string) => {
    setSelectedCommand(commandId);
    setAdvancedOpen(false);
  };

  const getCommandById = (id: string) => {
    const allCommands = [...navigationCommands, ...fileCommands, ...actionCommands];
    return allCommands.find(cmd => cmd.id === id);
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Command Component</h1>
        <p className="text-muted-foreground">
          Powerful command palette interface for keyboard-driven workflows
        </p>
      </div>

      {/* Keyboard Shortcut Hint */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 text-sm">
          <CommandIcon className="h-4 w-4" />
          <span>Try pressing</span>
          <Badge variant="outline" className="font-mono">
            ⌘K
          </Badge>
          <span>to open the advanced command palette</span>
        </div>
      </Card>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple command interface with search and selection
          </p>

          <div className="w-full flex items-center justify-start gap-2 p-3 border rounded-lg bg-muted/50">
            <Search className="h-4 w-4" />
            <span>Basic Command Interface (Always Visible)</span>
          </div>

          <Command className="border rounded-lg">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                {navigationCommands.slice(0, 3).map(command => (
                  <CommandItem key={command.id} onSelect={() => handleCommandSelect(command.id)}>
                    <command.icon className="h-4 w-4" />
                    <span>{command.label}</span>
                    <CommandShortcut>{command.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          {selectedCommand && (
            <div className="p-3 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Last executed command:</p>
              <p className="font-medium">{getCommandById(selectedCommand)?.label}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Advanced Command Palette */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Enterprise Command Palette</h3>
            <p className="text-sm text-muted-foreground">
              Full-featured command interface with grouped actions and shortcuts
            </p>
          </div>

          <Button
            onClick={() => setAdvancedOpen(true)}
            className="w-full justify-start"
            variant="outline"
          >
            <CommandIcon className="h-4 w-4 mr-2" />
            Open Command Palette
            <CommandShortcut>⌘K</CommandShortcut>
          </Button>

          <CommandDialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                  {navigationCommands.map(command => (
                    <CommandItem
                      key={command.id}
                      onSelect={() => handleCommandSelect(command.id)}
                      value={command.label}
                    >
                      <command.icon className="h-4 w-4" />
                      <span>{command.label}</span>
                      <CommandShortcut>{command.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="File Operations">
                  {fileCommands.map(command => (
                    <CommandItem
                      key={command.id}
                      onSelect={() => handleCommandSelect(command.id)}
                      value={command.label}
                    >
                      <command.icon className="h-4 w-4" />
                      <span>{command.label}</span>
                      <CommandShortcut>{command.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Actions">
                  {actionCommands.map(command => (
                    <CommandItem
                      key={command.id}
                      onSelect={() => handleCommandSelect(command.id)}
                      value={command.label}
                    >
                      <command.icon className="h-4 w-4" />
                      <span>{command.label}</span>
                      <CommandShortcut>{command.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Recent Files">
                  {recentFiles.map(file => (
                    <CommandItem
                      key={file.id}
                      onSelect={() => handleCommandSelect(file.id)}
                      value={file.name}
                    >
                      <FileText className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Modified {file.modified}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Team Members">
                  {contacts.map(contact => (
                    <CommandItem
                      key={contact.id}
                      onSelect={() => handleCommandSelect(contact.id)}
                      value={`${contact.name} ${contact.email} ${contact.role}`}
                    >
                      <Users className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{contact.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {contact.role} • {contact.email}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
      </Card>

      {/* Smart Search Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Smart Search Interface</h3>
            <p className="text-sm text-muted-foreground">
              Context-aware search with real-time filtering and suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Search Everything</h4>
              <Command className="border rounded-lg">
                <CommandInput
                  placeholder="Search files, people, commands..."
                  value={commandValue}
                  onValueChange={setCommandValue}
                />
                <CommandList>
                  <CommandEmpty>
                    <div className="py-6 text-center">
                      <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No results found for &ldquo;{commandValue}&rdquo;
                      </p>
                    </div>
                  </CommandEmpty>

                  {commandValue === '' && (
                    <>
                      <CommandGroup heading="Quick Actions">
                        <CommandItem>
                          <Zap className="h-4 w-4" />
                          <span>Create new project</span>
                        </CommandItem>
                        <CommandItem>
                          <Mail className="h-4 w-4" />
                          <span>Send team update</span>
                        </CommandItem>
                        <CommandItem>
                          <Calendar className="h-4 w-4" />
                          <span>Schedule meeting</span>
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}

                  {commandValue.length > 0 && (
                    <>
                      <CommandGroup heading="Commands">
                        {navigationCommands
                          .filter(cmd =>
                            cmd.label.toLowerCase().includes(commandValue.toLowerCase())
                          )
                          .map(command => (
                            <CommandItem key={command.id}>
                              <command.icon className="h-4 w-4" />
                              <span>{command.label}</span>
                            </CommandItem>
                          ))}
                      </CommandGroup>

                      <CommandGroup heading="Files">
                        {recentFiles
                          .filter(file =>
                            file.name.toLowerCase().includes(commandValue.toLowerCase())
                          )
                          .map(file => (
                            <CommandItem key={file.id}>
                              <FileText className="h-4 w-4" />
                              <span>{file.name}</span>
                            </CommandItem>
                          ))}
                      </CommandGroup>

                      <CommandGroup heading="People">
                        {contacts
                          .filter(
                            contact =>
                              contact.name.toLowerCase().includes(commandValue.toLowerCase()) ||
                              contact.role.toLowerCase().includes(commandValue.toLowerCase())
                          )
                          .map(contact => (
                            <CommandItem key={contact.id}>
                              <Users className="h-4 w-4" />
                              <div className="flex flex-col">
                                <span>{contact.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {contact.role}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Search Tips</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    @john
                  </Badge>
                  <span className="text-muted-foreground">Search for people</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    #project
                  </Badge>
                  <span className="text-muted-foreground">Search by tags</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    file:
                  </Badge>
                  <span className="text-muted-foreground">Search files only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    cmd:
                  </Badge>
                  <span className="text-muted-foreground">Search commands</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h5 className="font-medium mb-2">Keyboard Shortcuts</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Open Command Palette</span>
                    <Badge variant="outline" className="font-mono">
                      ⌘K
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Quick Search</span>
                    <Badge variant="outline" className="font-mono">
                      ⌘⇧F
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Navigate Results</span>
                    <Badge variant="outline" className="font-mono">
                      ↑↓
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Select Item</span>
                    <Badge variant="outline" className="font-mono">
                      ↵
                    </Badge>
                  </div>
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
                <CommandIcon className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Developer Tools</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• VS Code-style command palette</p>
                <p>• Git operations shortcuts</p>
                <p>• Build and deployment commands</p>
                <p>• Quick file navigation</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Content Management</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Document search and access</p>
                <p>• User and permission management</p>
                <p>• Workflow automation triggers</p>
                <p>• Integration shortcuts</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <h4 className="font-medium">Productivity Suites</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Cross-application actions</p>
                <p>• Meeting and calendar shortcuts</p>
                <p>• Team communication tools</p>
                <p>• Project management commands</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Key Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Fuzzy string matching</div>
              <div>• Keyboard navigation</div>
              <div>• Custom shortcuts</div>
              <div>• Grouped results</div>
              <div>• Real-time filtering</div>
              <div>• Accessibility support</div>
              <div>• Extensible architecture</div>
              <div>• Context awareness</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
