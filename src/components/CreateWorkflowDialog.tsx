import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import type { Workflow } from './WorkflowManagement'

interface CreateWorkflowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateWorkflow: (workflow: Workflow) => void
}

const triggerTypes = [
  'WhatsApp Intent',
  'Keyword Match',
  'Email Trigger',
  'Schedule',
  'Weekly Schedule',
  'Manual Trigger'
]

export function CreateWorkflowDialog({ 
  open, 
  onOpenChange, 
  onCreateWorkflow 
}: CreateWorkflowDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    triggerType: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.triggerType) return

    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: formData.name,
      status: 'paused',
      triggerType: formData.triggerType,
      lastExecuted: 'Never',
      executionCount: 0,
      successRate: 0,
      description: formData.description || `New workflow: ${formData.name}`
    }

    onCreateWorkflow(newWorkflow)
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      triggerType: ''
    })
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      triggerType: ''
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Set up a new automation workflow for your construction project.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Workflow Name</Label>
            <Input
              id="name"
              placeholder="e.g., Daily Photos, Safety Reports"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="triggerType">Trigger Type</Label>
            <Select 
              value={formData.triggerType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, triggerType: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a trigger type" />
              </SelectTrigger>
              <SelectContent>
                {triggerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this workflow does..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.name || !formData.triggerType}
            >
              Create Workflow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}