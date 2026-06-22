import { useMemo } from 'react';
import { Users, HeartHandshake, HandCoins, TrendingUp } from 'lucide-react';
import { MEMBERS, VOLUNTEERS, DONATIONS } from '../data/mockData';
import './dashboard.css';

function useStats() {
  // Derived once per data-set reference (mock data never changes at runtime),
  // so this never recomputes after the first render.
  return useMemo(() => {
    const totalDonations = DONATIONS.reduce((sum, d) => sum + d.amount, 0);
    const activeMembers = MEMBERS.filter((m) => m.status === 'Complete').length;
    const activeVolunteers = VOLUNTEERS.filter((v) => v.status === 'Complete').length;

    return [
      {
        label: 'Total Members',
        value: MEMBERS.length,
        sub: `${activeMembers} active`,
        icon: Users,
      },
      {
        label: 'Total Volunteers',
        value: VOLUNTEERS.length,
        sub: `${activeVolunteers} active`,
        icon: HeartHandshake,
      },
      {
        label: 'Donations Raised',
        value: `₹${totalDonations.toLocaleString('en-IN')}`,
        sub: `${DONATIONS.length} contributions`,
        icon: HandCoins,
      },
      {
        label: 'Growth (MoM)',
        value: '+12.4%',
        sub: 'vs last month',
        icon: TrendingUp,
      },
    ];
  }, []);
}

export default function Dashboard() {
  const stats = useStats();

  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <div className="kpi-card" key={label}>
            <span className="kpi-card__icon">
              <Icon size={18} />
            </span>
            <div className="kpi-card__meta">
              <span className="kpi-card__value">{value}</span>
              <span className="kpi-card__label">{label}</span>
              <span className="kpi-card__sub">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__placeholder">
        <p>Charts and activity feed go here next.</p>
      </div>
    </div>
  );
}
