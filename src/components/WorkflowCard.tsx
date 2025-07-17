import { useState } from 'react'
import { 
  MoreVertical, 
  Play, 
  Pause, 
  Copy, 
  Edit, 
  Trash2, 
  FileText,
  Clock,
  TrendingUp,
  Loader2
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { cn } from '../lib/utils'
import type { Workflow } from './WorkflowManagement'

interface WorkflowCardProps {
  workflow: Workflow
  isLoading?: boolean
  onToggle: () => void
  onDelete: () => void
  onDuplicate: () => void
}

export function WorkflowCard({ 
  workflow, 
  isLoading = false, 
  onToggle, 
  onDelete, 
  onDuplicate 
}: WorkflowCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'WhatsApp Intent':
        return '💬'
      case 'Keyword Match':
        return '🔍'
      case 'Email Trigger':
        return '📧'
      case 'Schedule':
        return '⏰'
      case 'Weekly Schedule':
        return '📅'
      case 'Manual Trigger':
        return '👆'
      default:
        return '⚡'
    }
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600'
    if (rate >= 90) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-slate-200 p-6 transition-all duration-200 cursor-pointer",
        isHovered && "shadow-lg border-slate-300 transform -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {workflow.name}
            </h3>
            <Badge 
              variant="outline" 
              className={cn("text-xs", getStatusColor(workflow.status))}
            >
              {workflow.status === 'active' ? (
                <Play className="h-3 w-3 mr-1" />
              ) : (
                <Pause className="h-3 w-3 mr-1" />
              )}
              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">
            {workflow.description}
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Workflow
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="h-4 w-4 mr-2" />
              View Logs
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Trigger Type */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-lg">{getTriggerIcon(workflow.triggerType)}</span>
        <span className="text-sm text-slate-600">{workflow.triggerType}</span>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">Last run</span>
          </div>
          <span className="text-sm font-medium text-slate-900">
            {workflow.lastExecuted}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">Executions</span>
          </div>
          <span className="text-sm font-medium text-slate-900">
            {workflow.executionCount.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Success rate</span>
          <span className={cn("text-sm font-medium", getSuccessRateColor(workflow.successRate))}>
            {workflow.successRate}%
          </span>
        </div>
      </div>

      {/* Success Rate Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              workflow.successRate >= 95 ? "bg-green-500" :
              workflow.successRate >= 90 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${workflow.successRate}%` }}
          />
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-sm font-medium text-slate-700">
          {workflow.status === 'active' ? 'Active' : 'Paused'}
        </span>
        <div className="flex items-center space-x-2">
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          )}
          <Switch
            checked={workflow.status === 'active'}
            onCheckedChange={onToggle}
            disabled={isLoading}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </div>
    </div>
  )
}