import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Truck, HardHat, Wrench, MapPin, Activity } from 'lucide-react'
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
      <TrendingUp className="h-3 w-3 text-success" />
    ) : change.type === 'decrease' ? (
      <TrendingDown className="h-3 w-3 text-destructive" />
    ) : null
  }

  const getChangeColor = () => {
    if (!change) return ''
    return change.type === 'increase' 
      ? 'text-success' 
      : change.type === 'decrease' 
      ? 'text-destructive' 
      : 'text-muted-foreground'
  }

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-success bg-success/10'
      case 'warning': return 'text-warning bg-warning/10'
      case 'error': return 'text-destructive bg-destructive/10'
      default: return 'text-primary bg-primary/10'
    }
  }

  const getBorderClass = () => {
    switch (status) {
      case 'success': return 'success-border'
      case 'warning': return 'border-l-4 border-l-warning'
      case 'error': return 'alert-border'
      default: return 'equipment-status'
    }
  }

  return (
    <Card className={`relative overflow-hidden industrial-shadow ${getBorderClass()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground mono uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2 rounded ${getStatusColor()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-3xl font-bold text-foreground mono">{value}</div>
          {change && (
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
              {getChangeIcon()}
              <span className="mono">{change.value}</span>
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 mono">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function SummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Active Job Sites"
        value={8}
        change={{ value: '+2', type: 'increase' }}
        status="success"
        icon={<MapPin className="h-5 w-5" />}
        description="Sites with ongoing operations"
      />
      
      <MetricCard
        title="Equipment Online"
        value="24/28"
        change={{ value: '+3', type: 'increase' }}
        status="warning"
        icon={<Truck className="h-5 w-5" />}
        description="4 units require maintenance"
      />
      
      <MetricCard
        title="Safety Incidents"
        value={3}
        change={{ value: '-2', type: 'decrease' }}
        status="error"
        icon={<AlertTriangle className="h-5 w-5" />}
        description="Requires immediate attention"
      />
      
      <MetricCard
        title="Crew Efficiency"
        value="94%"
        change={{ value: '+5.2%', type: 'increase' }}
        status="success"
        icon={<HardHat className="h-5 w-5" />}
        description="Above target performance"
      />
    </div>
  )
}