import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Eye,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Calendar,
  User,
  X
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';
import { useInstitution } from './context/InstitutionContext';

export default function MyApplications() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { applications } = useInstitution();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'approved', label: 'Approved (LOA Issued)' },
    { value: 'in_review', label: 'In Scrutiny / Review' },
    { value: 'deficiency', label: 'Deficiencies Active' },
    { value: 'submitted', label: 'Newly Submitted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Application Types' },
    { value: 'New Course Approval', label: 'New Course Approval' },
    { value: 'Intake Increase', label: 'Intake Increase' },
    { value: 'Extension of Approval', label: 'Extension of Approval' },
    { value: 'Supernumerary Quota', label: 'Supernumerary Quota' },
    { value: 'Course Closure', label: 'Course Closure' },
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        !search ||
        app.id.toLowerCase().includes(search.toLowerCase()) ||
        app.title.toLowerCase().includes(search.toLowerCase()) ||
        (app.programName && app.programName.toLowerCase().includes(search.toLowerCase()));

      let matchStatus = true;
      if (statusFilter !== 'all') {
        if (statusFilter === 'approved') matchStatus = app.status === 'Approved';
        else if (statusFilter === 'in_review')
          matchStatus =
            app.status === 'Initial Scrutiny' ||
            app.status === 'Application Submitted' ||
            app.status === 'Under Review';
        else if (statusFilter === 'deficiency') matchStatus = app.status === 'Deficiency Review';
        else if (statusFilter === 'submitted') matchStatus = app.status === 'Application Submitted';
        else if (statusFilter === 'rejected') matchStatus = app.status === 'Rejected';
      }

      const matchType = typeFilter === 'all' || app.type === typeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [applications, search, statusFilter, typeFilter]);

  const columns = [
    {
      header: 'Application ID',
      accessor: 'id',
      render: (item) => (
        <div>
          <span className="font-mono font-bold text-[#123B70] block">
            {item.id}
          </span>
          <span className="text-[11px] text-slate-400">
            {item.category || item.level}
          </span>
        </div>
      ),
    },
    {
      header: 'Program / Application Title',
      accessor: 'title',
      render: (item) => (
        <div className="max-w-xs sm:max-w-sm">
          <p className="font-semibold text-slate-900 truncate" title={item.title}>
            {item.title}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>{item.type}</span>
            <span>•</span>
            <span>Intake: {item.intake || 60}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Academic Year',
      accessor: 'academicYear',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {item.academicYear}
        </span>
      ),
    },
    {
      header: 'Submission Date',
      accessor: 'submissionDate',
      render: (item) => (
        <span className="text-xs text-slate-600 font-mono">
          {item.submissionDate}
        </span>
      ),
    },
    {
      header: 'Current Stage',
      accessor: 'currentStage',
      render: (item) => (
        <div className="flex flex-col gap-1 min-w-[120px]">
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>Stage {item.currentStage} of {item.totalStages}</span>
            <span>{Math.round((item.currentStage / item.totalStages) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#2563EB]"
              style={{ width: `${(item.currentStage / item.totalStages) * 100}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Assigned Officer',
      accessor: 'assignedOfficer',
      render: (item) => (
        <div className="text-xs text-slate-700 max-w-[140px] truncate" title={item.assignedOfficer}>
          {item.assignedOfficer || 'Regional Allocation Queue'}
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApp(item);
            }}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-xs"
            title="View Details Modal"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/institution/application-tracking?id=${item.id}`);
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-[#2563EB] px-2.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Track <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications Registry"
        subtitle="Comprehensive register of institutional applications, approval status, and stage progress."
        breadcrumb={['Home', 'Applications', 'My Applications']}
        actions={
          <button
            type="button"
            onClick={() => navigate('/institution/new-application')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Application</span>
          </button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by ID, program title, discipline, or keyword..."
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
          className="w-full md:w-56"
        />
        <FilterDropdown
          label="Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={typeOptions}
          className="w-full md:w-56"
        />
      </div>

      {/* Applications Data Table */}
      <DataTable
        columns={columns}
        data={filteredApplications}
        onRowClick={(item) => setSelectedApp(item)}
        emptyTitle="No applications matching your criteria"
        emptyDescription="Try clearing your search filters or submit a new regulatory application."
      />

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedApp(null)}
          />

          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#123B70] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedApp.id}
                  </span>
                  <StatusBadge status={selectedApp.status} size="sm" />
                  <span className="text-xs text-slate-400 font-mono">
                    AY {selectedApp.academicYear}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedApp.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Grid Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50 p-4 border border-slate-200/70 text-xs mb-5">
              <div>
                <span className="text-slate-400 block">Category:</span>
                <strong className="text-slate-800">{selectedApp.type}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Assigned Officer:</span>
                <strong className="text-slate-800">{selectedApp.assignedOfficer || 'Queue'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Submission Date:</span>
                <strong className="text-slate-800 font-mono">{selectedApp.submissionDate}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Proposed Intake:</span>
                <strong className="text-slate-800">{selectedApp.intake || 60} Seats</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Duration:</span>
                <strong className="text-slate-800">{selectedApp.duration || '4 Years'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Current Stage:</span>
                <strong className="text-[#2563EB]">
                  Stage {selectedApp.currentStage} of {selectedApp.totalStages}
                </strong>
              </div>
            </div>

            {/* Stage Timeline Snippet */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Current Approval Progression:
              </h4>
              <div className="space-y-2">
                {selectedApp.stages &&
                  selectedApp.stages.map((stg) => (
                    <div
                      key={stg.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                        stg.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50/50'
                          : stg.status === 'in_progress'
                          ? 'border-blue-200 bg-blue-50/50 font-bold'
                          : 'border-slate-200 bg-white opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {stg.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : stg.status === 'in_progress' ? (
                          <Clock className="h-4 w-4 text-blue-600 animate-pulse" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                            {stg.id}
                          </span>
                        )}
                        <span>{stg.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {stg.date || (stg.slaDays ? `Target: ${stg.slaDays}` : 'Pending')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`/institution/application-tracking?id=${selectedApp.id}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
              >
                <span>Full Stage Tracking</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
