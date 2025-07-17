import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workflowName: string
  onConfirm: () => void
}

export function DeleteConfirmDialog({ 
  open, 
  onOpenChange, 
  workflowName, 
  onConfirm 
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to delete the workflow "{workflowName}"? 
            This action cannot be undone and will permanently remove all 
            associated data and execution history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete Workflow
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}