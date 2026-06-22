import { useCallback } from 'react';
import { fetchMembers } from '../api/peopleApi';
import useApiData from '../hooks/useApiData';
import DataTable from '../components/DataTable';
import { TableSkeleton } from '../components/Skeletons';
import ErrorState from '../components/ErrorState';

export default function Members() {
  const fetcher = useCallback((signal) => fetchMembers(signal), []);
  const { data, loading, error, refetch } = useApiData(fetcher, 'members');

  if (loading && !data) return <TableSkeleton />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;

  return (
    <DataTable
      data={data || []}
      title="Member"
      addLabel="Add Member"
      detailRoute="/members"
    />
  );
}
