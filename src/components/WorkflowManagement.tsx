import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { WorkflowCard } from './WorkflowCard'
import { CreateWorkflowDialog } from './CreateWorkflowDialog'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'

// Mock workflow data
const mockWorkflows = [
  {
    id: '1',
    name: 'Daily Photos',
    status: 'active' as const,
    triggerType: 'WhatsApp Intent',
    lastExecuted: '2 hours ago',
    executionCount: 147,
    successRate: 98.5,
    description: 'Automatically process daily site photos from WhatsApp'
  },
  {
    id: '2',
    name: 'Variation Requests',
    status: 'active' as const,
    triggerType: 'Keyword Match',
    lastExecuted: '15 minutes ago',
    executionCount: 89,
    successRate: 94.2,
    description: 'Handle variation requests and route to appropriate teams'
  },
  {
    id: '3',
    name: 'Safety Incidents',
    status: 'paused' as const,
    triggerType: 'Email Trigger',
    lastExecuted: '3 days ago',
    executionCount: 23,
    successRate: 100,
    description: 'Process safety incident reports and notifications'
  },
  {
    id: '4',
    name: 'Material Orders',
    status: 'active' as const,
    triggerType: 'Schedule',
    lastExecuted: '1 hour ago',
    executionCount: 312,
    successRate: 96.8,
    description: 'Automated material ordering and inventory management'
  },
  {
    id: '5',
    name: 'Progress Reports',
    status: 'active' as const,
    triggerType: 'Weekly Schedule',
    lastExecuted: '6 hours ago',
    executionCount: 45,
    successRate: 91.1,
    description: 'Generate and distribute weekly progress reports'
  },
  {
    id: '6',
    name: 'Quality Inspections',
    status: 'paused' as const,
    triggerType: 'Manual Trigger',
    lastExecuted: '1 day ago',
    executionCount: 67,
    successRate: 88.9,
    description: 'Quality inspection workflow and documentation'
  },
  {
    id: '7',
    name: 'Subcontractor Coordination',
    status: 'active' as const,
    triggerType: 'WhatsApp Intent',
    lastExecuted: '30 minutes ago',
    executionCount: 203,
    successRate: 92.6,
    description: 'Coordinate schedules and communications with subcontractors'
  },
  {
    id: '8',
    name: 'Equipment Maintenance',
    status: 'active' as const,
    triggerType: 'Schedule',
    lastExecuted: '4 hours ago',
    executionCount: 156,
    successRate: 97.4,
    description: 'Track equipment maintenance schedules and alerts'
  }
]

export type Workflow = typeof mockWorkflows[0]

export function WorkflowManagement() {
  const [workflows, setWorkflows] = useState(mockWorkflows)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [deleteWorkflow, setDeleteWorkflow] = useState<Workflow | null>(null)
  const [loadingWorkflows, setLoadingWorkflows] = useState<Set<string>>(new Set())

  const handleToggleWorkflow = async (workflowId: string) => {
    setLoadingWorkflows(prev => new Set(prev).add(workflowId))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' as const : 'active' as const }
        : workflow
    ))
    
    setLoadingWorkflows(prev => {
      const newSet = new Set(prev)
      newSet.delete(workflowId)
      return newSet
    })
  }

  const handleDeleteWorkflow = (workflow: Workflow) => {
    setDeleteWorkflow(workflow)
  }

  const confirmDeleteWorkflow = () => {
    if (deleteWorkflow) {
      setWorkflows(prev => prev.filter(w => w.id !== deleteWorkflow.id))
      setDeleteWorkflow(null)
    }
  }

  const handleDuplicateWorkflow = (workflow: Workflow) => {
    const newWorkflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      status: 'paused' as const,
      executionCount: 0,
      lastExecuted: 'Never'
    }
    setWorkflows(prev => [newWorkflow, ...prev])
  }

  const activeWorkflows = workflows.filter(w => w.status === 'active').length
  const totalExecutions = workflows.reduce((sum, w) => sum + w.executionCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workflows</h1>
          <p className="text-slate-600 mt-1">
            Manage your construction automation workflows
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Workflow
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Workflows</p>
              <p className="text-2xl font-bold text-slate-900">{activeWorkflows}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Workflows</p>
              <p className="text-2xl font-bold text-slate-900">{workflows.length}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Executions</p>
              <p className="text-2xl font-bold text-slate-900">{totalExecutions.toLocaleString()}</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
          </div>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            isLoading={loadingWorkflows.has(workflow.id)}
            onToggle={() => handleToggleWorkflow(workflow.id)}
            onDelete={() => handleDeleteWorkflow(workflow)}
            onDuplicate={() => handleDuplicateWorkflow(workflow)}
          />
        ))}
      </div>

      {/* Create Workflow Dialog */}
      <CreateWorkflowDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateWorkflow={(newWorkflow) => {
          setWorkflows(prev => [newWorkflow, ...prev])
          setIsCreateDialogOpen(false)
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={!!deleteWorkflow}
        onOpenChange={() => setDeleteWorkflow(null)}
        workflowName={deleteWorkflow?.name || ''}
        onConfirm={confirmDeleteWorkflow}
      />
    </div>
  )
}