import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, MessageSquare, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    type: 'increase' | 'decrease' | 'neutral'
  }
  status?: 'success' | 'warning' | 'error' | 'info'
  icon: React.ReactNode
  description?: string
}

function MetricCard({ title, value, change, status, icon, description }: MetricCardProps) {
  const getChangeIcon = () => {
    if (!change) return null
    return change.type === 'increase' ? (
      <TrendingUp className="h-3 w-3 text-green-600" />
    ) : change.type === 'decrease' ? (
      <TrendingDown className="h-3 w-3 text-red-600" />
    ) : null
  }

  const getChangeColor = () => {
    if (!change) return ''
    return change.type === 'increase' 
      ? 'text-green-600' 
      : change.type === 'decrease' 
      ? 'text-red-600' 
      : 'text-slate-600'
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-amber-600'
      case 'error': return 'text-red-600'
      default: return 'text-blue-600'
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-slate-50 ${getStatusColor()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold text-slate-900">{value}</div>
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
              {getChangeIcon()}
              <span>{change.value}</span>
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Workflows"
        value={24}
        change={{ value: '+12%', type: 'increase' }}
        status="success"
        icon={<Zap className="h-4 w-4" />}
        description="Currently running processes"
      />
      
      <MetricCard
        title="Messages Processed Today"
        value="1,247"
        change={{ value: '+8.2%', type: 'increase' }}
        status="info"
        icon={<MessageSquare className="h-4 w-4" />}
        description="Automated communications sent"
      />
      
      <MetricCard
        title="Connected Services"
        value="4/6"
        status="warning"
        icon={<CheckCircle className="h-4 w-4" />}
        description="2 services need attention"
      />
      
      <MetricCard
        title="Recent Errors"
        value={3}
        change={{ value: '-2', type: 'decrease' }}
        status="error"
        icon={<AlertTriangle className="h-4 w-4" />}
        description="Down from 5 yesterday"
      />
    </div>
  )
}