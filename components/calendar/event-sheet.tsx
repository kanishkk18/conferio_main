import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCalendarStore } from '../../store/calendar-store';
import { format, parseISO } from 'date-fns';
import { CalendarEvent } from 'types/calendar';
import { Trash2, Save, X } from 'lucide-react';

export const EventSheet = () => {
  const { 
    isEventSheetOpen, 
    selectedEvent, 
    selectedDate, 
    closeEventSheet, 
    addEvent, 
    updateEvent, 
    deleteEvent 
  } = useCalendarStore();

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: '',
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        description: selectedEvent.description || '',
        startTime: selectedEvent.startTime,
        endTime: selectedEvent.endTime,
        category: selectedEvent.category || '',
      });
    } else if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const now = new Date();
      const startTime = format(now, 'yyyy-MM-dd\'T\'HH:mm');
      const endTime = format(new Date(now.getTime() + 60 * 60 * 1000), 'yyyy-MM-dd\'T\'HH:mm');
      
      setFormData({
        title: '',
        description: '',
        startTime,
        endTime,
        category: '',
      });
    }
  }, [selectedEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startTime || !formData.endTime) {
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description || '',
      startTime: formData.startTime,
      endTime: formData.endTime,
      date: format(parseISO(formData.startTime), 'yyyy-MM-dd'),
      category: formData.category || '',
      color: '#3b82f6',
    };

    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    closeEventSheet();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      closeEventSheet();
    }
  };

  const isEditMode = !!selectedEvent;

  return (
    <Sheet open={isEventSheetOpen} onOpenChange={closeEventSheet}>
      <SheetContent className="w-full sm:max-w-2xl bg-background/95 backdrop-blur-md border-l border-border/60">
        <SheetHeader className="pb-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary shadow-soft">
              <Save className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-xl font-bold text-foreground">
                {isEditMode ? 'Edit Event' : 'Create New Event'}
              </SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {isEditMode ? 'Update your event details' : 'Add a new event to your calendar'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeEventSheet}
              className="h-9 w-9 rounded-full hover:bg-muted/60 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground flex items-center gap-2">
              Event Title
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's this event about?"
              className="h-12 text-base bg-background/60 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add event details, notes, or agenda..."
              rows={4}
              className="text-base bg-background/60 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="startTime" className="text-sm font-semibold text-foreground flex items-center gap-2">
                Start Time
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="h-12 text-base bg-background/60 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="endTime" className="text-sm font-semibold text-foreground flex items-center gap-2">
                End Time
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="h-12 text-base bg-background/60 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-sm font-semibold text-foreground">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Meeting, Personal, Work, etc."
              className="h-12 text-base bg-background/60 border-border/60 focus:border-primary/60 focus:ring-primary/20 transition-all duration-200"
            />
          </div>

          {/* Guest information for existing events */}
          {selectedEvent?.guestName && (
            <div className="space-y-4 p-6 bg-gradient-subtle rounded-xl border border-border/30 shadow-soft">
              <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Guest Information
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Guest Name</Label>
                  <p className="text-base font-medium text-foreground p-3 bg-background/60 rounded-lg border border-border/30">
                    {selectedEvent.guestName}
                  </p>
                </div>
                {selectedEvent.guestEmail && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Guest Email</Label>
                    <p className="text-base text-foreground p-3 bg-background/60 rounded-lg border border-border/30 font-mono">
                      {selectedEvent.guestEmail}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border/20">
            {isEditMode ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2 h-12 px-6 font-medium"
              >
                <Trash2 className="h-4 w-4" />
                Delete Event
              </Button>
            ) : (
              <div />
            )}

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={closeEventSheet}
                className="h-12 px-6 font-medium border-border/60 hover:bg-muted/60 transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-elegant transition-all duration-200 h-12 px-8 font-medium"
              >
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? 'Update' : 'Create'} Event
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};