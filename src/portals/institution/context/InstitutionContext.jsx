import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  initialInstitutionProfile,
  initialApplications,
  initialDeficiencies,
  initialDocuments,
  initialUndertakings,
  initialLeaseDocuments,
  initialEvcInspectionData,
  initialNotifications,
  initialAuditLogs,
  mockSupportTickets
} from '../../../data/institutionMockData';

const InstitutionContext = createContext(null);

export function InstitutionProvider({ children }) {
  const [profile, setProfile] = useState(initialInstitutionProfile);
  const [applications, setApplications] = useState(initialApplications);
  const [deficiencies, setDeficiencies] = useState(initialDeficiencies);
  const [documents, setDocuments] = useState(initialDocuments);
  const [undertakings, setUndertakings] = useState(initialUndertakings);
  const [leaseDocuments, setLeaseDocuments] = useState(initialLeaseDocuments);
  const [evcData, setEvcData] = useState(initialEvcInspectionData);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [supportTickets, setSupportTickets] = useState(mockSupportTickets);

  // Helper to add audit entry
  const logAuditAction = (action, details) => {
    const newEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      action,
      details,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: true,
      }) + ' IST',
      user: `${profile.principal.name} (Director)`,
      ip: '14.139.183.12 (Campus Gateway)',
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Add new application
  const addApplication = (appData) => {
    const newId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id: newId,
      title: appData.programName ? `${appData.applicationType} - ${appData.programName}` : appData.applicationType,
      type: appData.applicationType || 'New Program Approval',
      academicYear: appData.academicYear || '2025-26',
      submissionDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Application Submitted',
      statusCode: 'submitted',
      currentStage: 1,
      totalStages: 6,
      assignedOfficer: 'Pending Regional Allocation',
      priority: appData.priority || 'Normal',
      programName: appData.programName || 'New Technical Programme',
      programLevel: appData.level || 'UG',
      discipline: appData.discipline || 'Engineering & Technology',
      intake: appData.intake ? parseInt(appData.intake) : 60,
      duration: appData.duration ? `${appData.duration} Years` : '4 Years',
      fees: appData.tuitionFee ? `₹${parseInt(appData.tuitionFee).toLocaleString()} / year` : 'Government Approved Scales',
      category: appData.level ? `${appData.level} Programme` : 'Technical',
      deficiencyCount: 0,
      stages: [
        { id: 1, name: 'Application Submitted', status: 'in_progress', date: new Date().toISOString().split('T')[0], authority: 'Central Portal Automated Gateway', remarks: 'Application successfully queued for scrutiny.', slaDays: '3 Days SLA' },
        { id: 2, name: 'Initial Scrutiny', status: 'pending', date: null, authority: 'Regional Scrutiny Cell', remarks: null, slaDays: '7 Days' },
        { id: 3, name: 'Deficiency Review', status: 'pending', date: null, authority: null, remarks: null, slaDays: '15 Days' },
        { id: 4, name: 'EVC / Inspection', status: 'pending', date: null, authority: null, remarks: null, slaDays: '21 Days' },
        { id: 5, name: 'Committee Review', status: 'pending', date: null, authority: null, remarks: null, slaDays: '10 Days' },
        { id: 6, name: 'Final Decision', status: 'pending', date: null, authority: null, remarks: null, slaDays: '7 Days' },
      ],
      ...appData,
    };

    setApplications(prev => [newApp, ...prev]);

    // Also notify
    const newNotification = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      type: 'application',
      title: `Application Registered: ${newApp.id}`,
      message: `Your application for ${newApp.programName} has been submitted and queued for scrutiny review.`,
      date: new Date().toISOString(),
      read: false,
      priority: 'medium',
      relatedPath: '/institution/applications',
      applicationId: newId,
    };
    setNotifications(prev => [newNotification, ...prev]);

    logAuditAction('New Application Submitted', `Submitted application ${newId} (${newApp.title})`);
    return newId;
  };

  // Submit response for a deficiency
  const submitDeficiencyResponse = (deficiencyId, responseText, uploadedFiles = []) => {
    setDeficiencies(prev => prev.map(def => {
      if (def.id === deficiencyId) {
        return {
          ...def,
          status: 'Submitted / Under Review',
          statusCode: 'in_review',
          response: responseText,
          submittedFiles: uploadedFiles.map(f => f.name || f),
          respondedDate: new Date().toISOString().split('T')[0],
        };
      }
      return def;
    }));

    // Update related application if found
    const targetDef = deficiencies.find(d => d.id === deficiencyId);
    if (targetDef) {
      logAuditAction('Deficiency Response Submitted', `Submitted clarification for ${deficiencyId} on application ${targetDef.applicationId}`);

      const notif = {
        id: `NOTIF-${Date.now().toString().slice(-4)}`,
        type: 'deficiency',
        title: `Response Received for ${deficiencyId}`,
        message: `Your response with ${uploadedFiles.length} supporting attachment(s) has been forwarded to ${targetDef.officerName}.`,
        date: new Date().toISOString(),
        read: false,
        priority: 'high',
        relatedPath: '/institution/deficiencies',
        applicationId: targetDef.applicationId,
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Upload/add document
  const addDocument = (docData) => {
    const newDoc = {
      id: `DOC-2026-${Math.floor(200 + Math.random() * 800)}`,
      name: docData.name || 'Uploaded Institutional Document',
      category: docData.category || 'Other Supporting Documents',
      subCategory: docData.subCategory || 'General',
      uploadedDate: new Date().toISOString().split('T')[0],
      expiryDate: docData.expiryDate || '2028-12-31',
      fileSize: docData.fileSize || '2.5 MB',
      fileType: docData.fileType || 'PDF',
      version: 'v1.0',
      verificationStatus: 'Under Scrutiny',
      statusCode: 'in_review',
      relatedApplicationId: docData.relatedApplicationId || null,
      mandatory: Boolean(docData.mandatory),
      remarks: docData.remarks || 'Freshly uploaded document pending verification.',
    };

    setDocuments(prev => [newDoc, ...prev]);
    logAuditAction('Document Uploaded', `Uploaded ${newDoc.name} under ${newDoc.category}`);
    return newDoc;
  };

  // Delete document
  const deleteDocument = (docId) => {
    const doc = documents.find(d => d.id === docId);
    setDocuments(prev => prev.filter(d => d.id !== docId));
    if (doc) {
      logAuditAction('Document Removed', `Removed document ${doc.name} (${docId})`);
    }
  };

  // Submit undertaking evidence
  const submitUndertakingEvidence = (undertakingId, fileInfo) => {
    setUndertakings(prev => prev.map(u => {
      if (u.id === undertakingId) {
        return {
          ...u,
          complianceStatus: 'Submitted',
          evidenceStatus: `Submitted: ${fileInfo.name || 'Evidence Document'}`,
          submissionDate: new Date().toISOString().split('T')[0],
          officerRemark: 'Evidence received. Awaiting officer verification.',
        };
      }
      return u;
    }));

    const targetUnd = undertakings.find(u => u.id === undertakingId);
    if (targetUnd) {
      logAuditAction('Undertaking Evidence Submitted', `Submitted compliance evidence for ${targetUnd.title}`);
    }
  };

  // Renew lease document
  const renewLeaseDocument = (leaseId, renewalYears = 30) => {
    setLeaseDocuments(prev => prev.map(l => {
      if (l.id === leaseId) {
        const newExpiry = new Date();
        newExpiry.setFullYear(newExpiry.getFullYear() + renewalYears);
        return {
          ...l,
          expiryDate: newExpiry.toISOString().split('T')[0],
          remainingDays: renewalYears * 365,
          validityStatus: 'Valid',
          statusCode: 'valid',
          actionRequired: 'Renewal Supplemental Deed Registered with Sub-Registrar.',
        };
      }
      return l;
    }));

    logAuditAction('Lease Renewal Action', `Initiated & registered renewal for lease record ${leaseId}`);
  };

  // Toggle EVC checklist item
  const toggleEvcChecklistItem = (itemId) => {
    setEvcData(prev => ({
      ...prev,
      preparationChecklist: prev.preparationChecklist.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  // Notifications management
  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  // Profile update
  const updateInstitutionProfile = (updatedFields) => {
    setProfile(prev => ({
      ...prev,
      ...updatedFields,
      principal: {
        ...prev.principal,
        ...(updatedFields.principal || {}),
      },
      authorizedRepresentative: {
        ...prev.authorizedRepresentative,
        ...(updatedFields.authorizedRepresentative || {}),
      },
    }));
    logAuditAction('Profile Updated', 'Institution profile details updated by authorized executive');
  };

  // Add support ticket
  const addSupportTicket = (ticketData) => {
    const newTicket = {
      id: `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketData.subject,
      category: ticketData.category || 'General Inquiry',
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      priority: ticketData.priority || 'Medium',
      lastReply: 'Ticket received and queued for Sentinel Helpdesk Support Officer.',
      description: ticketData.description,
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    logAuditAction('Support Ticket Raised', `Raised ticket ${newTicket.id}: ${newTicket.subject}`);
    return newTicket.id;
  };

  // Calculated statistics
  const stats = useMemo(() => {
    const pendingApps = applications.filter(a => a.status !== 'Approved' && a.status !== 'Rejected').length;
    const approvedApps = applications.filter(a => a.status === 'Approved').length;
    const activeDeficiencies = deficiencies.filter(d => d.status === 'Pending Response').length;
    const unreadNotifs = notifications.filter(n => !n.read).length;

    // Upcoming obligations: active deficiencies + expiring leases (< 180 days) + pending undertakings
    const expiringLeases = leaseDocuments.filter(l => l.remainingDays <= 180).length;
    const pendingUndertakings = undertakings.filter(u => u.complianceStatus === 'Pending' || u.complianceStatus === 'Overdue').length;
    const totalObligations = activeDeficiencies + expiringLeases + pendingUndertakings;

    return {
      totalApplications: applications.length,
      pendingReview: pendingApps,
      approvedApplications: approvedApps,
      upcomingObligations: totalObligations,
      complianceScore: 89,
      activeDeficiencies,
      expiringDocuments: expiringLeases,
      unreadNotifications: unreadNotifs,
    };
  }, [applications, deficiencies, leaseDocuments, undertakings, notifications]);

  const value = {
    profile,
    applications,
    deficiencies,
    documents,
    undertakings,
    leaseDocuments,
    evcData,
    notifications,
    auditLogs,
    supportTickets,
    stats,
    addApplication,
    submitDeficiencyResponse,
    addDocument,
    deleteDocument,
    submitUndertakingEvidence,
    renewLeaseDocument,
    toggleEvcChecklistItem,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    updateInstitutionProfile,
    addSupportTicket,
    logAuditAction,
  };

  return (
    <InstitutionContext.Provider value={value}>
      {children}
    </InstitutionContext.Provider>
  );
}

export function useInstitution() {
  const context = useContext(InstitutionContext);
  if (!context) {
    throw new Error('useInstitution must be used within an InstitutionProvider');
  }
  return context;
}
