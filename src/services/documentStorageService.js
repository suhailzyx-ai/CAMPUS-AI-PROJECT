// Document Storage & Management Service for OUR CAMPUS AI
// Handles persistence, retrieval, validation, metadata edits, file replacement, and publication workflows

import { MOCK_FACULTY_DASHBOARD, MOCK_DOCUMENT_CONTENT } from '../data/mockData';

const STORAGE_KEY = 'campus_faculty_documents';
const CURRENT_FACULTY_USER = {
  id: 'fac-1',
  name: 'Ms. Nandhini R',
  email: 'nandhini.r@example.edu',
  department: 'BSc CS',
  role: 'faculty'
};

// Realistic async network simulation delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Initialize default documents if not already in storage
 */
function getStoredDocuments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Automatically migrate any previous mock records with Dr. Arvind Sharma
        let modified = false;
        parsed.forEach((doc) => {
          if (doc.facultyName === 'Dr. Arvind Sharma') {
            doc.facultyName = 'Ms. Nandhini R';
            modified = true;
          }
        });
        if (modified) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading documents from storage:', err);
  }

  // Initial seed from mock data with normalized fields
  const initialDocs = (MOCK_FACULTY_DASHBOARD.documents || []).map((doc, idx) => ({
    id: doc.id || `doc-${101 + idx}`,
    title: doc.title,
    department: doc.department || 'BSc CS',
    year: doc.year || '2nd Year',
    subject: doc.subject || 'Data Structures (CS201)',
    subjectName: doc.subject ? doc.subject.split('(')[0].trim() : 'Data Structures & Algorithms',
    subjectCode: doc.subject && doc.subject.includes('(') ? doc.subject.split('(')[1].replace(')', '').trim() : 'CS201',
    description: doc.description || `Official collegiate academic study notes and syllabus modules for ${doc.title}.`,
    fileType: doc.fileType || 'PDF',
    fileName: `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${(doc.fileType || 'PDF').toLowerCase()}`,
    fileSize: doc.fileSize || '4.2 MB',
    pages: doc.pages || 42,
    publishedDate: doc.publishedDate || 'Sep 24, 2026',
    status: doc.status || 'Published',
    views: doc.views || 100,
    facultyId: CURRENT_FACULTY_USER.id,
    facultyName: CURRENT_FACULTY_USER.name,
    lastUpdated: doc.publishedDate || 'Sep 24, 2026',
    isBookmarked: idx === 0
  }));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDocs));
  } catch (e) {
    console.warn('Unable to persist seed documents:', e);
  }

  return initialDocs;
}

function persistDocuments(documents) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    // Dispatch custom event for same-window reactive updates
    window.dispatchEvent(new CustomEvent('campus_documents_updated', { detail: documents }));
  } catch (e) {
    console.error('Failed to persist documents to localStorage:', e);
  }
}

/**
 * Get the currently authenticated faculty user
 */
export function getCurrentFacultyUser() {
  return CURRENT_FACULTY_USER;
}

/**
 * Verify user has permission to modify or delete the document
 */
export function checkDocumentPermission(doc, user = CURRENT_FACULTY_USER) {
  if (!doc) return false;
  // Admin role or document owner can modify
  if (user.role === 'admin') return true;
  if (user.role === 'faculty') {
    // Check ownership by ID or name
    return (
      !doc.facultyId ||
      doc.facultyId === user.id ||
      doc.facultyName === user.name ||
      doc.facultyName === 'Ms. Nandhini R' ||
      doc.facultyName === 'Dr. Arvind Sharma'
    );
  }
  return false;
}

/**
 * Retrieve all documents for the faculty workspace
 */
export async function getDocuments(filters = {}) {
  await delay(150);
  let docs = getStoredDocuments();

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase().trim();
    docs = docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q) ||
        (d.subjectCode && d.subjectCode.toLowerCase().includes(q)) ||
        d.department.toLowerCase().includes(q)
    );
  }

  if (filters.department && filters.department !== 'All' && filters.department !== 'All Departments') {
    docs = docs.filter((d) => d.department.toLowerCase() === filters.department.toLowerCase());
  }

  if (filters.year && filters.year !== 'All' && filters.year !== 'All Years') {
    docs = docs.filter((d) => d.year.toLowerCase() === filters.year.toLowerCase());
  }

  return docs;
}

/**
 * Retrieve a single document by ID with fallback support
 */
export async function getDocumentById(id) {
  await delay(100);
  const docs = getStoredDocuments();
  const found = docs.find((d) => d.id === id);
  if (found) return found;

  // If document is doc-101 and not in list, synthesize from MOCK_DOCUMENT_CONTENT
  if (id === 'doc-101') {
    return {
      id: 'doc-101',
      title: MOCK_DOCUMENT_CONTENT.title,
      department: MOCK_DOCUMENT_CONTENT.departmentTag,
      year: MOCK_DOCUMENT_CONTENT.academicYear,
      subject: `${MOCK_DOCUMENT_CONTENT.subjectName} (${MOCK_DOCUMENT_CONTENT.subjectCode})`,
      subjectName: MOCK_DOCUMENT_CONTENT.subjectName,
      subjectCode: MOCK_DOCUMENT_CONTENT.subjectCode,
      description: 'Comprehensive lecture modules on linear and non-linear memory structures.',
      fileType: 'PDF',
      fileName: 'Data_Structures_Unit_1.pdf',
      fileSize: '4.2 MB',
      pages: 42,
      publishedDate: 'Sep 24, 2026',
      status: 'Published',
      views: 432,
      facultyId: CURRENT_FACULTY_USER.id,
      facultyName: CURRENT_FACULTY_USER.name,
      lastUpdated: 'Oct 2026'
    };
  }

  return null;
}

/**
 * Update document metadata (Title, Department, Year, Subject, Description)
 */
export async function updateDocument(id, updates, user = CURRENT_FACULTY_USER) {
  await delay(350);

  const docs = getStoredDocuments();
  const index = docs.findIndex((d) => d.id === id);

  if (index === -1) {
    throw new Error(`Document with ID "${id}" was not found.`);
  }

  const existing = docs[index];

  // Authorization check
  if (!checkDocumentPermission(existing, user)) {
    throw new Error('Unauthorized: You do not have permission to modify this document.');
  }

  // Validate required fields
  if (!updates.title || !updates.title.trim()) {
    throw new Error('Validation Error: Document Title is required.');
  }
  if (!updates.department || !updates.department.trim()) {
    throw new Error('Validation Error: Department is required.');
  }
  if (!updates.year || !updates.year.trim()) {
    throw new Error('Validation Error: Academic Year is required.');
  }
  if (!updates.subjectName && !updates.subject) {
    throw new Error('Validation Error: Subject Name is required.');
  }

  const formattedSubject = updates.subjectCode
    ? `${updates.subjectName || updates.subject} (${updates.subjectCode})`
    : updates.subject || updates.subjectName;

  const updatedDoc = {
    ...existing,
    title: updates.title.trim(),
    department: updates.department.trim(),
    year: updates.year.trim(),
    subject: formattedSubject,
    subjectName: (updates.subjectName || updates.subject || '').trim(),
    subjectCode: (updates.subjectCode || '').trim(),
    description: updates.description !== undefined ? updates.description.trim() : existing.description,
    status: updates.status || existing.status,
    lastUpdated: 'Just now'
  };

  // If replacement file was provided during metadata edit
  if (updates.replacementFile) {
    updatedDoc.fileName = updates.replacementFile.name;
    updatedDoc.fileSize = updates.replacementFile.size;
    updatedDoc.fileType = updates.replacementFile.type || existing.fileType;
    if (updates.replacementFile.pages) {
      updatedDoc.pages = updates.replacementFile.pages;
    }
  }

  docs[index] = updatedDoc;
  persistDocuments(docs);

  return updatedDoc;
}

/**
 * Replace the physical file while strictly preserving metadata & ID
 */
export async function replaceDocumentFile(id, fileData, user = CURRENT_FACULTY_USER) {
  await delay(400);

  const docs = getStoredDocuments();
  const index = docs.findIndex((d) => d.id === id);

  if (index === -1) {
    throw new Error(`Document with ID "${id}" was not found.`);
  }

  const existing = docs[index];

  if (!checkDocumentPermission(existing, user)) {
    throw new Error('Unauthorized: You do not have permission to modify this document.');
  }

  if (!fileData || !fileData.name) {
    throw new Error('Invalid File: Please select a valid document file to upload.');
  }

  // Determine file extension and type
  const extension = fileData.name.split('.').pop().toUpperCase();
  const allowedExtensions = ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX'];
  if (!allowedExtensions.includes(extension)) {
    throw new Error(`Unsupported File: Only ${allowedExtensions.join(', ')} formats are supported.`);
  }

  const updatedDoc = {
    ...existing,
    fileName: fileData.name,
    fileSize: fileData.size || '3.8 MB',
    fileType: extension,
    pages: fileData.pages || Math.floor(Math.random() * 30) + 15,
    lastUpdated: 'Just now (File replaced)'
  };

  docs[index] = updatedDoc;
  persistDocuments(docs);

  return updatedDoc;
}

/**
 * Toggle publication status (Published <-> Draft/Unpublished)
 */
export async function togglePublishDocument(id, newStatus = null, user = CURRENT_FACULTY_USER) {
  await delay(250);

  const docs = getStoredDocuments();
  const index = docs.findIndex((d) => d.id === id);

  if (index === -1) {
    throw new Error(`Document with ID "${id}" was not found.`);
  }

  const existing = docs[index];

  if (!checkDocumentPermission(existing, user)) {
    throw new Error('Unauthorized: You do not have permission to change publication status.');
  }

  // Determine target status
  let targetStatus = newStatus;
  if (!targetStatus) {
    targetStatus = existing.status === 'Published' ? 'Draft' : 'Published';
  }

  const updatedDoc = {
    ...existing,
    status: targetStatus,
    lastUpdated: 'Just now'
  };

  docs[index] = updatedDoc;
  persistDocuments(docs);

  return updatedDoc;
}

/**
 * Permanently delete a document record
 */
export async function deleteDocument(id, user = CURRENT_FACULTY_USER) {
  await delay(350);

  const docs = getStoredDocuments();
  const index = docs.findIndex((d) => d.id === id);

  if (index === -1) {
    throw new Error(`Document with ID "${id}" was not found.`);
  }

  const existing = docs[index];

  if (!checkDocumentPermission(existing, user)) {
    throw new Error('Unauthorized: You do not have permission to delete this document.');
  }

  const filtered = docs.filter((d) => d.id !== id);
  persistDocuments(filtered);

  return { success: true, id, title: existing.title };
}

/**
 * Create a new document (used by UploadModal)
 */
export async function createDocument(docData, user = CURRENT_FACULTY_USER) {
  await delay(400);

  if (!docData.title || !docData.title.trim()) {
    throw new Error('Validation Error: Title is required.');
  }

  const docs = getStoredDocuments();
  const newId = `doc-${Date.now().toString().slice(-4)}`;

  const formattedSubject = docData.subjectCode
    ? `${docData.subjectName} (${docData.subjectCode})`
    : docData.subjectName || docData.subject || 'General Study';

  const newDoc = {
    id: newId,
    title: docData.title.trim(),
    department: docData.department || user.department,
    year: docData.year || '2nd Year',
    subject: formattedSubject,
    subjectName: docData.subjectName || '',
    subjectCode: docData.subjectCode || '',
    description: docData.description || 'Newly uploaded collegiate document.',
    fileType: docData.fileType || 'PDF',
    fileName: docData.fileName || `${docData.title.replace(/\s+/g, '_')}.pdf`,
    fileSize: docData.fileSize || '3.4 MB',
    pages: docData.pages || 24,
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    status: 'Published',
    views: 0,
    facultyId: user.id,
    facultyName: user.name,
    lastUpdated: 'Just now'
  };

  const updatedDocs = [newDoc, ...docs];
  persistDocuments(updatedDocs);

  return newDoc;
}
