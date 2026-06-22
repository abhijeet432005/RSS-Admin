import { useCallback } from 'react';
import { fetchVolunteers } from '../api/peopleApi';
import useApiData from '../hooks/useApiData';
import DataTable from '../components/DataTable';
import { TableSkeleton } from '../components/Skeletons';
import ErrorState from '../components/ErrorState';

export default function Volunteers() {
  const fetcher = useCallback((signal) => fetchVolunteers(signal), []);
  const { data, loading, error, refetch } = useApiData(fetcher, 'volunteers');

  if (loading && !data) return <TableSkeleton />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <DataTable
      data={data || []}
      title="Volunteer"
      addLabel="Add Volunteer"
      detailRoute="/volunteers"
    />
  );
}
