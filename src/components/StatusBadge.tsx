interface StatusBadgeProps {
  status: string
}

const classMap: Record<string, string> = {
  Pending: 'badge badge-pending',
  Approved: 'badge badge-approved',
  Declined: 'badge badge-declined',
  Registered: 'badge badge-registered',
  'Not Registered': 'badge badge-not-registered',
  'Office Day': 'badge badge-office',
  'WFH Approved': 'badge badge-wfh',
  lateness: 'badge badge-pending',
  absence: 'badge badge-declined',
}

const labelMap: Record<string, string> = {
  lateness: 'Lateness',
  absence: 'Absence',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={classMap[status] ?? 'badge badge-not-registered'}>
      {labelMap[status] ?? status}
    </span>
  )
}
