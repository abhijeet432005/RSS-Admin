import { useCallback } from 'react';
import { fetchDonations } from '../api/peopleApi';
import useApiData from '../hooks/useApiData';
import DataTable from '../components/DataTable';
import { TableSkeleton } from '../components/Skeletons';
import ErrorState from '../components/ErrorState';

export default function Donations() {
  const fetcher = useCallback((signal) => fetchDonations(signal), []);
  const { data, loading, error, refetch } = useApiData(fetcher, 'donations');

  if (loading && !data) return <TableSkeleton />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <DataTable
      data={data || []}
      title="Donation"
      addLabel="Add Donation"
      variant="donations"
    />
  );
}
