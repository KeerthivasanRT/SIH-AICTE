import React, { useState, useMemo } from 'react';
import {
  FolderCheck,
  UploadCloud,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  X,
  FileCode,
  ShieldCheck
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import FileUpload from '../../components/institution/FileUpload';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';
import { useInstitution } from './context/InstitutionContext';

const CATEGORIES = [
  'All Categories',
  'Land Documents',
  'Building Documents',
  'Lease Documents',
  'Faculty Documents',
  'Infrastructure Documents',
  'Financial Documents',
  'Affidavits and Undertakings',
  'Other Supporting Documents',
];

export default function DocumentRepository() {
  const { documents, addDocument, deleteDocument } = useInstitution();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  // Form state for new upload
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Land Documents',
    subCategory: 'Regulatory Compliance',
    expiryDate: '2028-12-31',
    fileSize: '3.4 MB',
    fileType: 'PDF',
    remarks: 'Self-attested institutional statutory document.',
    mandatory: true,
  });

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchCat =
        selectedCategory === 'All Categories' || doc.category === selectedCategory;

      const matchSearch =
        !search ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase()) ||
        doc.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'verified' && doc.verificationStatus === 'Verified') ||
        (statusFilter === 'expiring' && doc.verificationStatus === 'Expiring Soon') ||
        (statusFilter === 'expired' && doc.verificationStatus === 'Expired') ||
        (statusFilter === 'scrutiny' && doc.verificationStatus === 'Under Scrutiny');

      return matchCat && matchSearch && matchStatus;
    });
  }, [documents, search, selectedCategory, statusFilter]);

  const handleCreateDocument = (e) => {
    e.preventDefault();
    if (!uploadForm.name) return;

    addDocument(uploadForm);
    setUploadModalOpen(false);
    setUploadForm({
      name: '',
      category: 'Land Documents',
      subCategory: 'Regulatory Compliance',
      expiryDate: '2028-12-31',
      fileSize: '3.4 MB',
      fileType: 'PDF',
      remarks: 'Self-attested institutional statutory document.',
      mandatory: true,
    });
  };

  const handleDownload = (doc) => {
    setDownloadToast(`Simulated download: "${doc.name}" downloaded to local storage.`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const columns = [
    {
      header: 'Document Name & ID',
      accessor: 'name',
      render: (item) => (
        <div className="flex items-start gap-3 max-w-sm">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mt-0.5">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate" title={item.name}>
              {item.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
              <span>{item.id}</span>
              <span>•</span>
              <span className="font-bold text-slate-600">{item.version}</span>
              <span>•</span>
              <span>{item.fileSize}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (item) => (
        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {item.category}
        </span>
      ),
    },
    {
      header: 'Upload Date',
      accessor: 'uploadedDate',
      render: (item) => (
        <span className="text-xs text-slate-600 font-mono">
          {item.uploadedDate}
        </span>
      ),
    },
    {
      header: 'Validity / Expiry',
      accessor: 'expiryDate',
      render: (item) => (
        <span
          className={`text-xs font-mono font-medium ${
            item.verificationStatus === 'Expired'
              ? 'text-rose-600 font-bold'
              : item.verificationStatus === 'Expiring Soon'
              ? 'text-amber-700 font-bold'
              : 'text-slate-600'
          }`}
        >
          {item.expiryDate || 'Perpetual / N/A'}
        </span>
      ),
    },
    {
      header: 'Verification Status',
      accessor: 'verificationStatus',
      render: (item) => <StatusBadge status={item.verificationStatus} size="sm" />,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewDoc(item);
            }}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 shadow-xs"
            title="Preview Document"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(item);
            }}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 shadow-xs"
            title="Download Copy"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteDocument(item.id);
            }}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 shadow-xs"
            title="Remove File"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Regulatory Document Repository"
        subtitle="Secure encrypted institutional repository covering land, building, faculty, and financial affidavits."
        breadcrumb={['Home', 'Documents', 'Repository']}
        actions={
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Upload New Document</span>
          </button>
        }
      />

      {/* Download Alert Toast */}
      {downloadToast && (
        <div className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs font-semibold text-blue-900 animate-fade-in-up">
          <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-xs ${
              selectedCategory === cat
                ? 'bg-[#123B70] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search document vault by title, category, or document ID..."
        />
        <FilterDropdown
          label="Verification"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Verification Statuses' },
            { value: 'verified', label: 'Verified by Council' },
            { value: 'expiring', label: 'Expiring Soon (< 180 Days)' },
            { value: 'expired', label: 'Expired' },
            { value: 'scrutiny', label: 'Under Scrutiny' },
          ]}
          className="w-full sm:w-64"
        />
      </div>

      {/* Document Table */}
      <DataTable
        columns={columns}
        data={filteredDocs}
        onRowClick={(item) => setPreviewDoc(item)}
        emptyTitle="No documents in this category"
        emptyDescription="Upload your institutional statutory documents or select another category."
      />

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setUploadModalOpen(false)}
          />

          <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Upload Statutory Document to Vault
                </h3>
                <p className="text-xs text-slate-500">
                  Document will be hashed and submitted for automated regulatory verification.
                </p>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.name}
                  onChange={e => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g. Master Plan Approval & Structural Stability Certificate"
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#2563EB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={uploadForm.category}
                  onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#2563EB] focus:outline-none"
                >
                  {CATEGORIES.filter(c => c !== 'All Categories').map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Expiry Date (if applicable)
                  </label>
                  <input
                    type="date"
                    value={uploadForm.expiryDate}
                    onChange={e => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Estimated File Size
                  </label>
                  <input
                    type="text"
                    value={uploadForm.fileSize}
                    onChange={e => setUploadForm({ ...uploadForm, fileSize: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <FileUpload
                label="Select File"
                hint="Attach PDF or scanned certified document."
                onFileSelect={(f) => {
                  setUploadForm(prev => ({
                    ...prev,
                    name: prev.name || f.name,
                    fileSize: f.size,
                  }));
                }}
              />

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>Upload Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          />

          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#123B70] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {previewDoc.id} • {previewDoc.version}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewDoc.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Category: {previewDoc.category} • Uploaded: {previewDoc.uploadedDate}
                </p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Simulated PDF Viewer */}
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm mb-3">
                <FileText className="h-8 w-8" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                AICTE Sentinel Cryptographic Digital Document Viewer
              </p>
              <p className="mt-1 text-[11px] text-slate-500 max-w-md">
                Certified digital hash verified against AICTE central repository ledger. Sub-registrar stamp and e-Signatures are intact.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <StatusBadge status={previewDoc.verificationStatus} size="sm" />
                <span className="text-[11px] font-mono text-slate-400">
                  Expiry: {previewDoc.expiryDate}
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              <strong>Statutory Note: </strong>
              {previewDoc.remarks || 'Verified by regional scrutiny desk.'}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-400">
                File Size: {previewDoc.fileSize}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
