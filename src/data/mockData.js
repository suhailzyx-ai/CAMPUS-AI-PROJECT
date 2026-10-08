export const MOCK_STUDENT_DASHBOARD = {
  studentName: "Suhail S",
  institution: "Example College of Engineering",
  department: "B.Sc Computer Science",
  academicYear: "2nd Year",
  semester: "Semester IV",
  status: "Active",
  totalSubjects: 6,
  totalDocumentsAvailable: 24,
  recentDocuments: [
    {
      id: "doc-101",
      title: "Data Structures – Unit 1",
      subjectCode: "CS-204",
      subjectName: "Data Structures & Algorithms",
      facultyName: "Prof. Dr. Nandhini R",
      department: "BSc CS",
      year: "2nd Year",
      description: "Arrays, linked lists, stacks and queues with algorithm complexity.",
      fileType: "PDF",
      fileSize: "3.4 MB",
      uploadedTime: "2d ago",
      isBookmarked: true
    },
    {
      id: "doc-102",
      title: "Database Management Systems",
      subjectCode: "CS-205",
      subjectName: "Database Systems",
      facultyName: "Prof. Vasanth Kumar",
      department: "BSc CS",
      year: "2nd Year",
      description: "Relational algebra, normal forms (1NF to BCNF), and SQL transaction indexing notes.",
      fileType: "PDF",
      fileSize: "4.8 MB",
      uploadedTime: "3d ago",
      isBookmarked: false
    },
    {
      id: "doc-103",
      title: "Object Oriented Programming",
      subjectCode: "CS-206",
      subjectName: "OOP in Java",
      facultyName: "Dr. Renuga",
      department: "BSc CS",
      year: "2nd Year",
      description: "Polymorphism, abstraction, virtual methods and Java memory hierarchy diagrams.",
      fileType: "DOCX",
      fileSize: "2.1 MB",
      uploadedTime: "5d ago",
      isBookmarked: false
    },
    {
      id: "doc-104",
      title: "Computer Organization & Architecture",
      subjectCode: "CS-207",
      subjectName: "Computer Architecture",
      facultyName: "Prof. S. R. Karthikayan",
      department: "BSc CS",
      year: "2nd Year",
      description: "Instruction cycle, ALU design, pipeline hazards, and cache mapping.",
      fileType: "PDF",
      fileSize: "5.2 MB",
      uploadedTime: "1w ago",
      isBookmarked: true
    },
    {
      id: "doc-105",
      title: "Operating Systems – Unit 1 & 2",
      subjectCode: "CS-208",
      subjectName: "Operating Systems",
      facultyName: "Dr. N. Karthick",
      department: "BSc CS",
      year: "2nd Year",
      description: "Process synchronization, semaphores, deadlock handling algorithms, and virtual memory.",
      fileType: "PDF",
      fileSize: "3.9 MB",
      uploadedTime: "1w ago",
      isBookmarked: false
    },
    {
      id: "doc-106",
      title: "Computer Networks Fundamentals",
      subjectCode: "CS-209",
      subjectName: "Networks",
      facultyName: "Prof. Sindhiya",
      department: "BSc CS",
      year: "2nd Year",
      description: "OSI 7-layer reference model, TCP/IP protocol suite, subnetting, and routing protocols.",
      fileType: "PPTX",
      fileSize: "6.5 MB",
      uploadedTime: "2w ago",
      isBookmarked: false
    }
  ]
};

export const MOCK_FACULTY_DASHBOARD = {
  facultyName: "Dr. Arvind Sharma",
  department: "B.Sc Computer Science",
  designation: "Associate Professor",
  stats: {
    publishedDocuments: 24,
    publishedThisMonth: "+3 this month",
    departmentsCount: 4,
    departmentsList: "BSc CS, BCA, AIDS, B.Com",
    activeSubjectsCount: 12,
    subjectsDetail: "Across all semesters",
    studentViews: "1,284",
    readRate: "98% read rate"
  },
  documents: [
    {
      id: "doc-101",
      title: "Data Structures – Unit 1",
      department: "BSc CS",
      year: "2nd Year",
      subject: "Data Structures (CS201)",
      fileType: "PDF",
      fileSize: "4.2 MB",
      pages: 42,
      publishedDate: "Sep 24, 2026",
      status: "Published",
      views: 432
    },
    {
      id: "doc-102",
      title: "Database Management Systems – Unit 3",
      department: "BCA",
      year: "2nd Year",
      subject: "DBMS (BCA204)",
      fileType: "PDF",
      fileSize: "5.8 MB",
      pages: 56,
      publishedDate: "Sep 20, 2026",
      status: "Published",
      views: 318
    },
    {
      id: "doc-103",
      title: "Artificial Intelligence & Neural Networks",
      department: "AIDS",
      year: "3rd Year",
      subject: "Artificial Intelligence (AI301)",
      fileType: "DOCX",
      fileSize: "2.1 MB",
      pages: 38,
      publishedDate: "Sep 18, 2026",
      status: "Published",
      views: 290
    },
    {
      id: "doc-107",
      title: "Computer Networks – Unit 2 Protocol Architectures",
      department: "BSc CS",
      year: "2nd Year",
      subject: "Computer Networks (CS205)",
      fileType: "PDF",
      fileSize: "6.4 MB",
      pages: 64,
      publishedDate: "Sep 12, 2026",
      status: "Published",
      views: 144
    },
    {
      id: "doc-108",
      title: "Operating Systems Concepts – Memory Management",
      department: "BSc CS",
      year: "2nd Year",
      subject: "Operating Systems (CS203)",
      fileType: "PDF",
      fileSize: "3.7 MB",
      pages: 35,
      publishedDate: "Sep 05, 2026",
      status: "Published",
      views: 100
    }
  ]
};

export const MOCK_ADMIN_DASHBOARD = {
  adminName: "Suhail (Admin)",
  adminRole: "Super Admin",
  stats: {
    totalUsers: 1250,
    pendingApprovals: 28,
    activeStudents: 1080,
    activeFaculty: 142,
    publishedDocuments: 356,
    departments: 4
  }
};

export const MOCK_PENDING_REGISTRATIONS = [
  {
    id: "app-1",
    name: "Priya Sharma",
    email: "priya.s@example.edu",
    college: "Example College",
    department: "BCA",
    requestedRole: "Student",
    targetYear: "1st Year (Sem I)",
    submissionTime: "Today, 10:24 AM",
    timeAgo: "39m ago",
    initials: "PS"
  },
  {
    id: "app-2",
    name: "Dr. K. Ramanathan",
    email: "ramanathan@example.edu",
    college: "Example College",
    department: "BSc CS",
    requestedRole: "Faculty",
    targetYear: "Not Applicable",
    submissionTime: "Today, 09:15 AM",
    timeAgo: "1h 48m ago",
    initials: "KR"
  },
  {
    id: "app-3",
    name: "Ananya Iyer",
    email: "ananya.i@example.edu",
    college: "Example College",
    department: "AIDS",
    requestedRole: "Student",
    targetYear: "3rd Year (Sem V)",
    submissionTime: "Yesterday, 04:30 PM",
    timeAgo: "18h ago",
    initials: "AI"
  },
  {
    id: "app-4",
    name: "T. N. Narayanan",
    email: "narayanan@example.edu",
    college: "Example College",
    department: "BSc CS",
    requestedRole: "Student",
    targetYear: "1st Year (Sem I)",
    submissionTime: "Yesterday, 08:50 AM",
    timeAgo: "1d ago",
    initials: "TN"
  },
  {
    id: "app-5",
    name: "Rajesh V.",
    email: "rajesh.v@example.edu",
    college: "Example College",
    department: "BCA",
    requestedRole: "Student",
    targetYear: "2nd Year (Sem III)",
    submissionTime: "Yesterday, 02:10 PM",
    timeAgo: "20h ago",
    initials: "RV"
  },
  {
    id: "app-6",
    name: "Prof. S. Meenakshi",
    email: "meenakshi@example.edu",
    college: "Example College",
    department: "BCA",
    requestedRole: "Faculty",
    targetYear: "Not Applicable",
    submissionTime: "2 days ago",
    timeAgo: "Oct 24, 11:00 AM",
    initials: "SM"
  },
  {
    id: "app-7",
    name: "Lavanya K.",
    email: "lavanya.k@example.edu",
    college: "Example College",
    department: "BSc CS",
    requestedRole: "Student",
    targetYear: "1st Year (Sem I)",
    submissionTime: "2 days ago",
    timeAgo: "Oct 23, 04:25 PM",
    initials: "LK"
  },
  {
    id: "app-8",
    name: "Divya Priya",
    email: "divya.p@example.edu",
    college: "Example College",
    department: "AIDS",
    requestedRole: "Student",
    targetYear: "2nd Year (Sem III)",
    submissionTime: "3 days ago",
    timeAgo: "Oct 22, 11:12 AM",
    initials: "DP"
  }
];

export const MOCK_DOCUMENT_CONTENT = {
  id: "doc-101",
  title: "Data Structures – Unit 1",
  department: "Department of Computer Science",
  faculty: "Prof. S. Ranganathan",
  subjectCode: "CS-204",
  subjectName: "Data Structures & Algorithms",
  academicYear: "2nd Year",
  departmentTag: "BSc CS",
  categoryTag: "Academic Notes",
  alignedStatus: "Syllabus-Aligned",
  lastUpdated: "Oct 2024",
  totalPages: 12,
  currentPage: 1,
  selectedTextSnippet: "Data structures are methods of organizing and storing data so that operations can be performed efficiently. They provide a systematic way to manage large amounts of information in computer programs.",
  contentSections: [
    {
      title: "UNIT 1: INTRODUCTION TO DATA STRUCTURES & ALGORITHMS",
      subtitle: "Foundation of program memory allocation, computational abstraction, and asymptotic efficiency.",
      heading1: "1.1 Concept of Data Structures",
      body1: "In software engineering and algorithmic analysis, raw values require deliberate topological arrangement. A program can perform effectively only when memory registers correspond logically to computational access patterns.\nData structures are methods of organizing and storing data so that operations can be performed efficiently. They provide a systematic way to manage large amounts of information in computer programs. Without standardized formats, managing relational records like student registries or transactional ledgers yields asymptotic decay.",
      body2: "An algorithm operates upon data structures to produce targeted computational results. The performance profile of an entire enterprise system depends almost entirely on this underlying architectural decision.",
      heading2: "1.2 Linear vs Non-Linear Structures",
      body3: "Elements may be structured sequentially where every entity has a defined predecessor and successor, or arranged hierarchically across multiple branch levels.",
      tableData: [
        { classification: "Linear Structures", memoryModel: "Contiguous or pointer-linked sequentially", primaryExamples: "Arrays, Linked Lists, Stacks, Queues", useCase: "Execution undo buffers, job priority queues" },
        { classification: "Non-Linear Structures", memoryModel: "Hierarchical or interconnected graph mesh", primaryExamples: "Trees, Binary Search Trees, Graphs", useCase: "Database indexing (B+ Trees), network routing" }
      ],
      codeSnippetName: "node_definition.cpp",
      codeSnippet: `// C++ Linked Node Primitive Declaration
#include <iostream>
template <typename T>
struct Node {
    T data;
    Node* next;
    Node(T value) : data(value), next(nullptr) {}
};`
    }
  ]
};

export const DEPARTMENTS_LIST = ["BSc Computer Science", "BCA", "AIDS", "B.Com", "Information Technology"];
export const ACADEMIC_YEARS_LIST = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
