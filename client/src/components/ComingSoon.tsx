import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Sparkles, Rocket, Star, Upload, FileText, Zap } from 'lucide-react';

interface ComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoon({ isOpen, onClose }: ComingSoonProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Coming Soon!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-2">
          {/* Main Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Resume Import Feature
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We're working hard to bring you an amazing resume import experience! 
              This feature will allow you to upload your existing resume and automatically 
              extract all the content.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-sm">
            <CardContent className="p-3 space-y-2">
              <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-500" />
                What's Coming:
              </h4>
              <div className="space-y-1 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-blue-500 flex-shrink-0" />
                  <span>Support for PDF, DOCX, and TXT files</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-purple-500 flex-shrink-0" />
                  <span>AI-powered content extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>Instant template formatting</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-sm font-medium">Expected Launch</span>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Coming Soon
            </div>
            <p className="text-xs text-gray-500">
              Stay tuned for updates!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="flex-1 text-sm py-2"
              size="sm"
            >
              Got it!
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 text-sm py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="sm"
            >
              Continue Building
            </Button>
          </div>

          {/* Small footer text */}
          <p className="text-xs text-center text-gray-500 leading-tight">
            In the meantime, you can start creating your resume from scratch using our beautiful templates.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}