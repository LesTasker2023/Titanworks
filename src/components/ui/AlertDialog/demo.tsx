'use client';

import { AlertTriangle, Database, Download, LogOut, Settings, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '.';
import { Button } from '../Button';

export default function AlertDialogDemo() {
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [logoutAttempted, setLogoutAttempted] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = (itemName: string) => {
    setDeletedItems(prev => [...prev, itemName]);
  };

  const handleLogout = () => {
    setLogoutAttempted(true);
    // Simulate logout process
    setTimeout(() => {
      setLogoutAttempted(false);
      alert('Logged out successfully');
    }, 1000);
  };

  const handleDataExport = async () => {
    setIsProcessing(true);
    setDownloadStarted(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    alert('Data export completed!');
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">AlertDialog Component</h1>
        <p className="text-muted-foreground">
          Modal dialogs for critical actions and confirmations
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple confirmation dialogs for destructive actions
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="flex gap-2 flex-wrap">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete File
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete file?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The file will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete('document.pdf')}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will need to sign in again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Stay signed in</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Sign out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {deletedItems.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Deleted items: {deletedItems.join(', ')}
              </div>
            )}

            {logoutAttempted && <div className="text-sm text-blue-600">Logging out...</div>}
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex confirmation scenarios with detailed content and async operations
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Data Export with Progress */}
            <div>
              <h4 className="font-medium mb-3">Data Export with Loading State</h4>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" disabled={isProcessing}>
                    <Download className="mr-2 h-4 w-4" />
                    {isProcessing ? 'Exporting...' : 'Export All Data'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Export Your Data
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <p>This will create a complete backup of your account data including:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Profile information and settings</li>
                        <li>All projects and files (up to 500MB)</li>
                        <li>Activity history and analytics</li>
                        <li>Collaboration data and comments</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        This process may take several minutes for large accounts.
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDataExport}
                      disabled={isProcessing}
                      className="min-w-24"
                    >
                      {isProcessing ? 'Exporting...' : 'Start Export'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {downloadStarted && (
                <div className="text-sm text-green-600 mt-2">✓ Export process initiated</div>
              )}
            </div>

            {/* Security Warning Dialog */}
            <div>
              <h4 className="font-medium mb-3">Security Warning Dialog</h4>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Change Security Settings
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="h-5 w-5" />
                      Security Warning
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                      <p>You are about to modify critical security settings:</p>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>Two-factor authentication will be disabled</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span>Login notifications will be turned off</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Account recovery options will be limited</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        These changes will take effect immediately and may make your account less
                        secure.
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Current Settings</AlertDialogCancel>
                    <AlertDialogAction className="bg-orange-600 hover:bg-orange-700">
                      I Understand, Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Account Deletion Dialog */}
            <div>
              <h4 className="font-medium mb-3">Account Deletion (High Stakes)</h4>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account Permanently
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                      <Shield className="h-5 w-5" />
                      Permanently Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="font-medium text-red-800 mb-2">
                          ⚠️ This action is irreversible
                        </p>
                        <p className="text-sm text-red-700">
                          Once deleted, your account and all associated data will be permanently
                          removed from our servers.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">What will be deleted:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Your profile and personal information</li>
                          <li>• All projects, files, and documents</li>
                          <li>• Collaboration history and shared content</li>
                          <li>• Subscription and billing information</li>
                          <li>• Account recovery options</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Alternative:</strong> Consider deactivating your account instead.
                          You can reactivate it later if needed.
                        </p>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Deactivate Instead
                    </Button>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Yes, Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
