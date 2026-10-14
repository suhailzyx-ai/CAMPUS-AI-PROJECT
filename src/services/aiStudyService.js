// AI Study Assistant Service for OUR CAMPUS AI
// Provides contextual processing for Chat, Selected Text actions, and Document-wide Insights

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
];

// Helper to delay for simulated realistic AI generation
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Handle Conversational Chat queries about the document
 */
export async function sendChatMessage({ question, conversationHistory = [], documentContext }) {
  await delay(600);

  const qLower = question.trim().toLowerCase();
  const docTitle = documentContext?.title || 'Data Structures – Unit 1';

  // Smart contextual responses based on prompt and document
  if (qLower.includes('main concept') || qLower.includes('overview') || qLower.includes('what is this unit')) {
    return {
      text: `In **${docTitle}**, the central concept is how data is structured, aligned, and manipulated in computer memory to achieve computational efficiency.\n\nKey takeaways:\n• **Data Structure Concept**: Systematic organization of memory records for fast search, insertion, and retrieval.\n• **Linear vs Non-Linear**: Linear structures (Arrays, Linked Lists, Stacks, Queues) follow sequential traversal, while Non-Linear structures (Trees, Graphs) model hierarchical and interconnected relationships.\n• **Asymptotic Performance**: Choosing the right structure prevents system slowdown as dataset volume grows.`,
      suggestions: [
        'What is the difference between Linear and Non-Linear structures?',
        'Give me a practical example of a Queue vs Stack',
        'Explain the C++ node code snippet'
      ]
    };
  }

  if (qLower.includes('practical example') || qLower.includes('real world') || qLower.includes('real-world')) {
    return {
      text: `Here are realistic practical examples for the data structures in this unit:\n\n1. **Undo / Redo Buffer (Stack - LIFO)**:\nWhen you press Ctrl+Z in a text editor or IDE, the most recent edit action is popped off the top of the stack first.\n\n2. **Print Job Spooler (Queue - FIFO)**:\nDocuments sent to a shared campus network printer are queued in first-come, first-served order.\n\n3. **Web Browser History (Linked List)**:\nForward and backward web navigation operates like a doubly-linked list where each visited URL points to its previous and next link.\n\n4. **Database Indexing (B+ Trees - Non-Linear)**:\nSearching a student's register number among 50,000 collegiate records uses hierarchical tree indexing for sub-millisecond lookups.`,
      suggestions: [
        'How does memory allocation differ between Arrays and Linked Lists?',
        'What are the primary exam points for Unit 1?',
        'Explain time complexity simply'
      ]
    };
  }

  if (qLower.includes('important topics') || qLower.includes('exam') || qLower.includes('topics')) {
    return {
      text: `Based on **${docTitle}**, here are the most critical academic and exam topics:\n\n• **1. Classification of Data Structures**: Clear distinction between primitive vs non-primitive, and linear vs non-linear structures.\n• **2. Memory Models**: Contiguous sequential memory (Arrays) vs pointer-linked dynamic memory (Linked Lists).\n• **3. The Node Primitive**: Structuring node pointers in C++/Java (\`Node* next\` and payload data).\n• **4. Complexity Tradeoffs**: Space overhead of pointer links vs contiguous index lookup speed.`,
      suggestions: [
        'Explain the Node struct in simple words',
        'Compare contiguous vs pointer-linked memory',
        'Generate revision questions for this unit'
      ]
    };
  }

  if (qLower.includes('simple language') || qLower.includes('simply') || qLower.includes('layman')) {
    return {
      text: `Think of a **Data Structure** like organizing your study desk:\n\n• If you stack your textbooks on top of each other, the last one you put on top is the first one you can easily take off — that is a **Stack (LIFO)**.\n• If you stand in a canteen token line, whoever arrives first gets served first — that is a **Queue (FIFO)**.\n• If you write items in numbered boxes in a drawer, you can jump straight to box #4 without checking 1, 2, or 3 — that is an **Array**.\n• If each clue in a treasure hunt gives you a slip of paper telling you where the next clue is hidden — that is a **Linked List**!\n\nWithout these organizing rules, computer programs would waste precious time searching randomly through millions of records.`,
      suggestions: [
        'How does C++ represent a linked node?',
        'What are the advantages of non-linear trees?',
        'Give me an exam tip for this unit'
      ]
    };
  }

  if (qLower.includes('c++') || qLower.includes('node') || qLower.includes('code') || qLower.includes('pointer')) {
    return {
      text: `The code snippet in this unit demonstrates the **C++ Linked Node Primitive**:\n\n\`\`\`cpp\ntemplate <typename T>\nstruct Node {\n    T data;        // The payload (e.g., student ID or integer)\n    Node* next;    // Memory address pointing to the subsequent node\n    Node(T value) : data(value), next(nullptr) {}\n};\n\`\`\`\n\n• **Self-Referential Pointer**: \`Node* next\` points to an instance of the exact same type.\n• **Nullptr Termination**: When \`next == nullptr\`, it marks the terminal (tail) boundary of the sequence.\n• **Generic Template**: \`template <typename T>\` allows this same node to store numbers, strings, or complex student records.`,
      suggestions: [
        'What happens if next is not initialized?',
        'How is dynamic memory allocated for nodes?',
        'Explain time complexity of insertion'
      ]
    };
  }

  // General contextual fallback
  return {
    text: `Based on **${docTitle}**:\n\n"${question}"\n\nData structures define the topological memory model for software execution. In this unit, linear formats (Arrays, Stacks, Queues, Linked Lists) arrange elements sequentially, whereas non-linear formats (Trees, Graphs) organize data hierarchically. Memory models directly dictate algorithmic complexity: contiguous arrays give O(1) indexed lookups, while pointer chains provide flexible O(1) insertions without reallocating contiguous memory blocks.\n\nWould you like me to elaborate on the implementation code, memory differences, or exam preparation tips?`,
    suggestions: [
      'Give me a practical example',
      'What are the important topics for Unit 1?',
      'Explain this topic in simple language'
    ]
  };
}

/**
 * Handle Selected Text contextual actions:
 * Explain, Meaning, Translate, Simplify, Word Definition, Multilingual Explanation
 * Supports Personalized Learning Level (Beginner, Intermediate, Advanced)
 * and Technical Term Preservation (English).
 */
export async function processSelectedTextAction({
  action,
  text,
  language = 'English',
  targetWord = '',
  learningLevel = 'Beginner', // 'Beginner' | 'Intermediate' | 'Advanced'
  preserveTechnicalTerms = true
}) {
  await delay(350);

  const cleanText = (text || '').trim();
  if (!cleanText) {
    throw new Error('No text passage provided for analysis.');
  }

  const lower = cleanText.toLowerCase();
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

  // Determine topical context from the passage
  const isCodeOrPointer = lower.includes('node') || lower.includes('pointer') || lower.includes('template') || lower.includes('nullptr') || lower.includes('struct');
  const isLinearVsNonLinear = lower.includes('linear') || lower.includes('sequential') || lower.includes('predecessor') || lower.includes('successor') || lower.includes('branch') || lower.includes('hierarchy') || lower.includes('table');
  const isAlgoPerf = lower.includes('algorithm') || lower.includes('performance') || lower.includes('enterprise') || lower.includes('architectural') || lower.includes('asymptotic');
  const isOOP = lower.includes('inheritance') || lower.includes('polymorphism') || lower.includes('encapsulation') || lower.includes('compiler') || lower.includes('class') || lower.includes('object') || lower.includes('virtual');

  // Realistic backend AI prompt synthesis
  const backendAiPrompt = `[OUR CAMPUS AI BACKEND REQUEST]
Task: Generate contextual ${action} for selected text passage.
Target Learning Level: ${learningLevel} (${
    learningLevel === 'Beginner' ? 'simple words and basic examples' :
    learningLevel === 'Intermediate' ? 'clear explanations with technical details and examples' :
    'in-depth explanations, technical accuracy, and complex examples'
  })
Language: ${language}
Preserve Technical Terms in English: ${preserveTechnicalTerms ? 'ENABLED (Retain terms such as Inheritance, Polymorphism, Compiler, Encapsulation, Node, Pointer, etc. in English)' : 'DISABLED (Translate terms to native language or colloquial phrasing)'}
Passage: "${cleanText}"`;

  console.info('[Campus AI] Dispatched Prompt to AI Engine:', {
    action,
    learningLevel,
    preserveTechnicalTerms,
    language,
    wordCount
  });

  switch (action) {
    case 'Explain': {
      let coreIdea = '';
      let takeaways = [];
      let analogy = '';
      let termsSection = '';

      // 1. BEGINNER LEVEL: Simple words and basic examples
      if (learningLevel === 'Beginner') {
        if (isCodeOrPointer) {
          coreIdea = `This code builds a single Lego-like building block called a **Node**. Instead of keeping all items in one giant box, each block holds your piece of information (data) and has a little arrow (pointer) pointing to where the next block is in memory.`;
          takeaways = [
            '**Building Block**: Each node holds one value, like a number or student name.',
            '**Next Arrow (`Node* next`)**: Tells the computer where to find the next item in line.',
            '**End Sign (`nullptr`)**: Signals that there are no more items left in the chain.'
          ];
          analogy = `Basic Example: Like a treasure hunt game where each clue card gives you a hint and the address of the next clue card.`;
        } else if (isLinearVsNonLinear) {
          coreIdea = `Data structures are just different ways to organize items. In a **Linear** setup, items stand in a straight line one after another. In a **Non-Linear** setup, items branch out in multiple directions like a family tree or roadmap.`;
          takeaways = [
            '**Single Line (Linear)**: You can only go forwards or backwards, one step at a time (like Arrays or Lists).',
            '**Branching (Non-Linear)**: One point can connect to many points (like Trees and Graphs).',
            '**Choice**: Use a line for simple lists; use a tree when items have parent-child categories.'
          ];
          analogy = `Basic Example: Standing in a single cafeteria queue is linear; a family tree with grandparents, parents, and children is non-linear.`;
        } else if (isAlgoPerf) {
          coreIdea = `Just having good instructions (algorithms) is not enough if your information is stored messily. Organizing your data cleanly makes computer programs run super fast and prevents freezes when thousands of people use an app.`;
          takeaways = [
            '**Good Storage = Fast Programs**: Finding items in an organized drawer takes seconds instead of hours.',
            '**Teamwork**: Algorithms and data structures work hand-in-hand to solve problems.',
            '**Growth**: Good organization keeps the app fast even as more students join.'
          ];
          analogy = `Basic Example: A chef can cook a meal in 5 minutes if spices are in labeled jars, but takes an hour if ingredients are scattered randomly on the floor.`;
        } else if (isOOP) {
          coreIdea = `This excerpt relates to **Object-Oriented Programming (OOP)**. It allows programs to group related facts and actions together into reusable building blocks, making code easier to write, share, and protect.`;
          takeaways = [
            '**Classes & Objects**: Blueprints and the real items built from them.',
            '**Inheritance**: Children automatically receive features from their parents without rewriting them.',
            '**Encapsulation**: Keeping private data safely locked inside a box so outside code cannot accidentally damage it.'
          ];
          analogy = `Basic Example: A smartphone blueprint (Class) defines buttons and screen; every actual phone made in the factory is an Object that inherits those features.`;
        } else {
          coreIdea = `Data structures are simple, neat ways for computers to store and organize information. Instead of tossing files randomly into computer memory, they keep items in order so finding, adding, or deleting anything is easy and fast.`;
          takeaways = [
            '**Clean Organization**: Stops computer memory from getting cluttered and messy.',
            '**Quick Access**: Helps the computer find what you want without searching every single slot.',
            '**Foundation**: Every computer game, website, and phone app relies on this to work smoothly.'
          ];
          analogy = `Basic Example: A school library groups books alphabetically by subject so students find books in seconds instead of checking every shelf.`;
        }

        if (preserveTechnicalTerms) {
          termsSection = `\n\n**Preserved Technical Terms (English):**\n• **Data Structure**: Systematic layout for computer records.\n• **Memory (RAM)**: The computer's active working space.\n• **Pointer**: Memory address pointing to another item.`;
        }
      }

      // 2. INTERMEDIATE LEVEL: Clear explanations with technical details and examples
      else if (learningLevel === 'Intermediate') {
        if (isCodeOrPointer) {
          coreIdea = `This excerpt defines the core building block of dynamic memory chains: the self-referential C++ \`Node\` primitive. Unlike fixed-size contiguous arrays, linked nodes decouple memory capacity from contiguous address space by linking each heap-allocated record with a forward pointer.`;
          takeaways = [
            '**Self-Referential Pointer (`Node* next`)**: Encapsulates the 64-bit virtual memory address of the succeeding node.',
            '**Generic Payload (`template <typename T>`)**: Decouples the structural linking logic from specific primitive datatypes.',
            '**Nullptr Sentinel**: Enforces safe sequence termination to protect against segmentation faults during traversal.'
          ];
          analogy = `Practical Example: An Undo/Redo buffer in an IDE where each user keystroke creates a node pointing back to the preceding document state.`;
        } else if (isLinearVsNonLinear) {
          coreIdea = `This passage establishes the topological classification between Linear and Non-Linear memory arrangements. Linear topologies enforce strict 1-to-1 sequential traversal, whereas Non-Linear topologies support 1-to-many hierarchical branching or many-to-many networked graph connections.`;
          takeaways = [
            '**Sequential Predecessor/Successor**: Linear structures (Arrays, Linked Lists, Stacks, Queues) enforce single-path traversal.',
            '**Branching Topologies**: Non-linear structures (Trees, Graphs) represent hierarchical and relational data efficiently.',
            '**Access Latency Tradeoff**: Contiguous arrays provide O(1) indexed reads, while balanced trees provide O(log n) dynamic search and insertion.'
          ];
          analogy = `Practical Example: A print job spooler uses a FIFO linear Queue; an operating system directory tree uses a hierarchical Non-Linear Tree.`;
        } else if (isAlgoPerf) {
          coreIdea = `The author highlights that computational efficiency is an architectural synergy between algorithmic procedures and underlying memory topologies. An optimal algorithm will still suffer latency degradation if the selected data structure incurs heavy traversal overhead.`;
          takeaways = [
            '**Architectural Co-dependency**: Algorithms dictate execution logic; data structures dictate memory access cost.',
            '**Asymptotic Scalability**: Selecting the proper structure maintains low latency as dataset size N grows exponentially.',
            '**System Throughput**: Proper data layout minimizes CPU cache misses and heap reallocation overhead.'
          ];
          analogy = `Practical Example: Searching a student registry with 100,000 records takes 100,000 operations in an unsorted list (O(n)), but only ~17 comparisons in a balanced binary tree (O(log n)).`;
        } else if (isOOP) {
          coreIdea = `This excerpt discusses fundamental Object-Oriented paradigms: structuring systems around modular class contracts with encapsulation, inheritance hierarchies, and polymorphic dispatch for extensible software architecture.`;
          takeaways = [
            '**Encapsulation**: Restricts direct access to internal state, enforcing operations through validated member methods.',
            '**Inheritance & Polymorphism**: Enables subtype polymorphism and code reuse through virtual dispatch tables (vtable).',
            '**Compiler Role**: The compiler enforces type safety, translates abstract class contracts, and resolves method signatures.'
          ];
          analogy = `Practical Example: A Payment Gateway system with a base \`PaymentMethod\` class and derived polymorphic classes like \`UPIPayment\`, \`CreditCardPayment\`, and \`NetBanking\`.`;
        } else {
          coreIdea = `This passage establishes that data structures form the architectural foundation for system software. By mapping information into deliberate topologies, programs guarantee predictable algorithmic behavior for search, insertion, deletion, and update operations.`;
          takeaways = [
            '**Topological Organization**: Replaces unstructured memory with predictable mathematical models.',
            '**Complexity Guarantees**: Formal bounds on time and space resources across operational workloads.',
            '**Modular Abstraction**: Exposes clean interface boundaries (APIs) while hiding internal memory representations.'
          ];
          analogy = `Practical Example: Database indexes (like B+ Trees) that allow high-traffic websites to look up customer records in milliseconds rather than scanning entire tables.`;
        }

        if (preserveTechnicalTerms) {
          termsSection = `\n\n**Preserved Technical Terms (English):**\n• **Inheritance & Polymorphism**: Object-oriented subtype hierarchies and dynamic dispatch.\n• **Compiler & Encapsulation**: Source code compilation and state protection.\n• **Contiguous Memory & Pointer Dereference**: Memory layout and hardware addressing.`;
        }
      }

      // 3. ADVANCED LEVEL: In-depth explanations, technical accuracy, and complex examples
      else {
        if (isCodeOrPointer) {
          coreIdea = `This excerpt specifies the memory layout of a self-referential template struct in C++. Beyond abstract link semantics, it establishes dynamic heap allocation where each node incurs 8 bytes of pointer overhead (on x86-64) plus struct memory alignment padding according to the compiler's ABI rules.`;
          takeaways = [
            '**Pointer Indirection & Cache Misses**: Following `Node* next` breaks sequential spatial locality, causing L1/L2 CPU data cache misses compared to contiguous arrays.',
            '**Heap Allocation & Free-Store Fragmentation**: Dynamic instantiation via `new`/`malloc` incurs heap management latency and potential external memory fragmentation.',
            '**ABI Alignment & Padding**: Compiler aligns struct members to 8-byte boundaries, requiring careful variable ordering to minimize per-node space overhead.'
          ];
          analogy = `Complex Systems Example: Linux kernel slab allocators and lock-free concurrent ring buffers that mitigate cache-line invalidation across multi-core CPU architectures.`;
        } else if (isLinearVsNonLinear) {
          coreIdea = `This passage contrasts topological memory spaces: 1D linear manifolds versus multi-dimensional acyclic/cyclic graphs. It analyzes the mathematical duality between strict sequential orderings and generalized adjacency relations under asymptotic complexity constraints.`;
          takeaways = [
            '**Memory Locality vs Structural Flexibility**: Contiguous linear vectors maximize prefetcher hardware efficiency, whereas non-linear trees trade cache locality for logarithmic insertion dynamics.',
            '**Topological Invariants**: Binary Search Trees enforce the invariant $\\forall x \\in Left, x < Root < \\forall y \\in Right$, ensuring $O(h)$ bounded operations where height $h = O(\\log n)$ in balanced AVL/Red-Black variants.',
            '**Graph Adjacency Matrices vs Lists**: Dense graphs benefit from $O(1)$ matrix edge verification, while sparse graphs require adjacency lists to maintain $O(V + E)$ space efficiency.'
          ];
          analogy = `Complex Systems Example: Relational database B+ Tree storage engines (e.g. InnoDB) utilizing 16KB page nodes aligned with disk block sectors for minimal I/O stalls.`;
        } else if (isAlgoPerf) {
          coreIdea = `The passage formulates the fundamental theorem of computational systems: asymptotic efficiency is an intrinsic property of the composite tuple $(\\mathcal{A}, \\mathcal{D})$ of algorithm $\\mathcal{A}$ mapped over data structure $\\mathcal{D}$. Structural choices directly determine asymptotic upper bounds ($O$), lower bounds ($\\Omega$), and tight bounds ($\\Theta$).`;
          takeaways = [
            '**Asymptotic Dominance**: At scale ($N \\to \\infty$), structural complexity class dominates constant-factor micro-optimizations by several orders of magnitude.',
            '**Amortized Complexity Analysis**: Accounting for worst-case bursts (e.g. dynamic vector doubling) via aggregate or banker\'s methods yields true operational cost models.',
            '**Hardware Memory Hierarchy**: Algorithmic complexity must account for memory wall latency (Registers: ~1ns, L1: ~1ns, L3: ~10ns, DRAM: ~60ns, NVMe: ~10,000ns).'
          ];
          analogy = `Complex Systems Example: Distributed log-structured merge trees (LSM-trees) in Apache Cassandra and RocksDB optimizing write amplification against read latency.`;
        } else if (isOOP) {
          coreIdea = `The author details object-oriented architectural paradigms, focusing on vtable memory overhead, dynamic dispatch latency, type variance, and the strict adherence to SOLID design principles in enterprise-grade software engineering.`;
          takeaways = [
            '**Virtual Method Tables (vtables)**: Dynamic polymorphism incurs pointer indirection overhead and prevents aggressive compiler inlining optimizations.',
            '**Liskov Substitution Principle**: Subtypes must preserve class invariants and behavioral contracts without breaking client assumptions.',
            '**Encapsulation & Memory Layout**: Class inheritance memory models (single vs multiple inheritance) determine object offset calculations and pointer adjustments.'
          ];
          analogy = `Complex Systems Example: High-frequency trading execution engines replacing dynamic polymorphic vtables with C++ CRTP (Curiously Recurring Template Pattern) for static compile-time polymorphism.`;
        } else {
          coreIdea = `This passage establishes the formal computer science foundation for memory topology. It articulates how computational models represent discrete abstract data types (ADTs) as physical byte sequences in volatile memory registers with deterministic state invariants.`;
          takeaways = [
            '**Formal State Invariants**: ADTs preserve rigorous pre-conditions, post-conditions, and structural invariants across all mutating state transitions.',
            '**Asymptotic Resource Guarantees**: Enforces predictable bounds on algorithmic time, working auxiliary memory, and pointer overhead.',
            '**Systemic Fault Tolerance**: Structured memory allocation prevents buffer overruns, pointer aliasing conflicts, and memory leaks.'
          ];
          analogy = `Complex Systems Example: Distributed consensus state machine replication (Raft/Paxos) where log entry structures preserve strict sequential commit invariants across partitioned network nodes.`;
        }

        if (preserveTechnicalTerms) {
          termsSection = `\n\n**Preserved Technical Terms (English):**\n• **Inheritance & Polymorphism**: Vtable dynamic dispatch, subtyping, and compile-time CRTP.\n• **Compiler Optimization**: Dead code elimination, struct padding, and inline expansion.\n• **Encapsulation & ABI Layout**: Memory alignment, access specifier boundaries, and ABI contracts.\n• **Asymptotic Complexity**: $O(1)$, $O(\\log n)$, and $O(n)$ time-space upper bounds.`;
        }
      }

      return {
        action: 'Explain',
        title: `Academic Explanation (${learningLevel})`,
        badge: `${learningLevel} Level`,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: `${learningLevel} breakdown of the selected passage (${wordCount} words):`,
        content: `**Core Idea:**\n${coreIdea}\n\n**Key Takeaways:**\n${takeaways.join('\n')}${termsSection}`,
        example: analogy
      };
    }

    case 'Meaning': {
      let authorIntent = '';
      let semanticImplication = '';
      let examContext = '';

      if (learningLevel === 'Beginner') {
        authorIntent = `The author wants a new student to realize that computer data must be arranged neatly before writing any code. Without a plan, the computer gets confused and slow.`;
        semanticImplication = `Just like organizing your school backpack so you can grab a pen instantly, data structures make finding and saving items effortless for the computer.`;
        examContext = `Introductory exam question: "What is a data structure and why is it important?"`;
      } else if (learningLevel === 'Intermediate') {
        authorIntent = `The author intends to demonstrate how data structures define the topological memory foundation for algorithmic computation in compiled systems.`;
        semanticImplication = `The passage establishes that algorithms and data structures are interdependent halves; writing clever instructions cannot overcome a poorly chosen memory layout.`;
        examContext = `Core university exam question: "Explain the relationship between Data Structures and Algorithms with runtime complexity tradeoffs."`;
      } else {
        authorIntent = `The author establishes theoretical computability principles: proving that structural memory topology dictates asymptotic upper bounds and memory hierarchy efficiency.`;
        semanticImplication = `Memory access latency dominates modern CPU execution; therefore, topological data layout is the primary bottleneck in enterprise computing scalability.`;
        examContext = `Advanced graduate exam question: "Analyze the asymptotic memory tradeoffs and cache invalidation characteristics of linear vs hierarchical topologies."`;
      }

      let preservedNote = preserveTechnicalTerms
        ? `\n\n**Preserved Technical Terms:** Inheritance, Polymorphism, Compiler, Encapsulation, Memory Topology, Asymptotic Complexity.`
        : '';

      return {
        action: 'Meaning',
        title: `Passage Meaning (${learningLevel})`,
        badge: `${learningLevel}`,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: `Author intent and deeper semantic meaning (${learningLevel}):`,
        content: `**Author's Intent:**\n${authorIntent}\n\n**Semantic Implication:**\n${semanticImplication}\n\n**Academic Context:**\n${examContext}${preservedNote}`,
        example: `Curriculum Placement: Unit 1 foundational lecture notes.`
      };
    }

    case 'Translate': {
      // Dynamic translation dictionaries based on passage topic, language, and preserveTechnicalTerms
      let translated = '';

      if (language === 'Tamil') {
        if (preserveTechnicalTerms) {
          translated = isCodeOrPointer
            ? 'C++ மொழியில் Linked Node அறிவிப்பு: இந்த Node-இல் data சேமிக்கப்பட்டு, அடுத்த Node-இன் memory address-ஐ pointer சுட்டிக்காட்டுகிறது. next என்பது nullptr ஆக இருக்கும்போது அது sequence-இன் இறுதியைக் குறிக்கிறது.'
            : isLinearVsNonLinear
            ? 'Linear structures-இல் items தொடர்ச்சியாக இருக்கும்; ஒவ்வொன்றும் predecessor மற்றும் successor கொண்டிருக்கும். Non-Linear structures-இல் தரவுகள் Trees மற்றும் Graphs போன்று branch-களாக இருக்கும்.'
            : isOOP
            ? 'இந்த பகுதி Inheritance, Polymorphism, மற்றும் Encapsulation போன்ற OOP கருத்துக்களை விளக்குகிறது. Compiler ஆனது code-ஐ machine language-ஆக மாற்றி நினைவகத்தில் சரியாக ஒழுங்கமைக்கிறது.'
            : 'Data Structures என்பது கணிப்பொறி நினைவகத்தில் (Memory) தகவல்களை ஒழுங்கமைத்து சேமிக்கும் முறையாகும். இதன் மூலம் Search, Insertion மற்றும் Deletion போன்ற Operations-களை வேகமாகச் செய்ய முடியும்.';
        } else {
          translated = isCodeOrPointer
            ? 'C++ மொழியில் இணைக்கப்பட்ட முனை அறிவிப்பு: இது தரவுப் பகுதியை சேமிப்பதோடு, அடுத்த முனையின் நினைவக முகவரியை சுட்டிக்காட்டுகிறது. next என்பது வெறுமையாக இருக்கும்போது அது வரிசையின் இறுதியைக் குறிக்கிறது.'
            : isLinearVsNonLinear
            ? 'நேரியல் அமைப்புகளில் உருப்படிகள் தொடர்ச்சியாகவும், ஒவ்வொன்றும் முந்தைய மற்றும் அடுத்த உருப்படியைக் கொண்டுள்ளன. நேரியல் அல்லாத அமைப்புகளில் தகவல்கள் படிநிலையாக மரக்கிளைகள் போன்று கட்டமைக்கப்படுகின்றன.'
            : isOOP
            ? 'இந்த பகுதி மரபுரிமை, பலவுருவாக்கம், மற்றும் உறைபொதியாக்கம் ஆகியவற்றை விளக்குகிறது. தொகுப்பான் ஆனது நிரலை இயந்திர மொழியாக மாற்றுகிறது.'
            : 'தரவு அமைப்புகள் என்பது கணிப்பொறி நினைவகத்தில் தகவல்களை திட்டமிட்டு ஒழுங்குபடுத்தும் முறையாகும், இதன் மூலம் தேடுதல் மற்றும் சேர்த்தல் பணிகளை எளிதாகச் செய்ய முடியும்.';
        }
      } else if (language === 'Hindi') {
        if (preserveTechnicalTerms) {
          translated = isOOP
            ? 'यह भाग Inheritance, Polymorphism, और Encapsulation जैसी OOP अवधारणाओं की व्याख्या करता है। Compiler कोड को प्रोसेस करके मेमोरी में सुरक्षित रूप से निष्पादित करता है।'
            : isCodeOrPointer
            ? 'C++ में Linked Node संरचना: यह नोड data स्टोर करता है और pointer के माध्यम से अगले नोड के memory address को निर्देशित करता है। जब next मान nullptr होता है, तो यह sequence का अंत दर्शाता है।'
            : 'Data Structures कंप्यूटर Memory में डेटा को कुशलतापूर्वक व्यवस्थित और स्टोर करने का तरीका हैं, जिससे Search, Insertion और Deletion जैसे Operations तेजी से किए जा सकें।';
        } else {
          translated = isOOP
            ? 'यह भाग वंशानुक्रम, बहुरूपता, और संपुटीकरण जैसी अवधारणाओं की व्याख्या करता है। कंपाइलर कोड को मशीनी भाषा में बदलता है।'
            : 'डेटा संरचनाएं कंप्यूटर में डेटा को कुशलतापूर्वक व्यवस्थित और संग्रहीत करने का एक व्यवस्थित तरीका हैं।';
        }
      } else if (language === 'Malayalam') {
        if (preserveTechnicalTerms) {
          translated = isOOP
            ? 'ഈ ഭാഗം Inheritance, Polymorphism, Encapsulation എന്നിവയെക്കുറിച്ച് വിശദീകരിക്കുന്നു. Compiler കോഡിനെ കാര്യക്ഷമമായി മെഷീൻ ലെവലിലേക്ക് മാറ്റുന്നു.'
            : 'Data Structures കമ്പ്യൂട്ടർ Memory-യിൽ ഡാറ്റ കാര്യക്ഷമമായി സംഭരിക്കാനും കൈകാര്യം ചെയ്യാനും ഉപയോഗിക്കുന്നു. Search, Insertion തുടങ്ങിയ Operations ഇതിലൂടെ വേഗത്തിൽ നടക്കുന്നു.';
        } else {
          translated = 'കമ്പ്യൂട്ടറുകളിൽ വിവരങ്ങൾ കാര്യക്ഷമമായി സംഭരിക്കാനും കൈകാര്യം ചെയ്യാനും ഉപയോഗിക്കുന്ന ചിട്ടയായ രീതികളാണ് ഡാറ്റാ സ്ട്രക്ച്ചറുകൾ.';
        }
      } else if (language === 'Telugu') {
        if (preserveTechnicalTerms) {
          translated = isOOP
            ? 'ఈ భాగం Inheritance, Polymorphism మరియు Encapsulation వంటి OOP భావనలను వివరిస్తుంది. Compiler కోడ్‌ను మెషీన్ లెవెల్‌లో ఎగ్జిక్యూట్ చేస్తుంది.'
            : 'Data Structures అనేవి కంప్యూటర్ Memory-లో డేటాను సమర్ధవంతంగా నిల్వ చేయడానికి మరియు Search, Insertion వంటి Operations వేగంగా నిర్వహించడానికి ఉపయోగపడతాయి.';
        } else {
          translated = 'డేటా స్ట్రక్చర్స్ అనేది కంప్యూటర్‌లో డేటాను సమర్ధవంతంగా నిల్వ చేయడానికి మరియు నిర్వహించడానికి ఉపయోగించే పద్ధతులు.';
        }
      } else if (language === 'Kannada') {
        if (preserveTechnicalTerms) {
          translated = isOOP
            ? 'ಈ ಭಾಗವು Inheritance, Polymorphism ಮತ್ತು Encapsulation ನಂತಹ OOP ಪರಿಕಲ್ಪನೆಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ. Compiler ಕೋಡ್ ಅನ್ನು ಯಂತ್ರ ಮಟ್ಟಕ್ಕೆ ಅನುವಾದಿಸುತ್ತದೆ.'
            : 'Data Structures ಕಂಪ್ಯೂಟರ್ Memory-ಯಲ್ಲಿ ಡೇಟಾವನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲು ಮತ್ತು Search, Insertion ಮುಂತಾದ Operations ಸುಲಭಗೊಳಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.';
        } else {
          translated = 'ಡೇಟಾ ರಚನೆಗಳು ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಡೇಟಾವನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಘಟಿಸಲು ಮತ್ತು ಸಂಗ್ರಹಿಸಲು ಬಳಸುವ ವಿಧಾನಗಳಾಗಿವೆ.';
        }
      } else {
        translated = cleanText;
      }

      const preservedTermsList = preserveTechnicalTerms
        ? `\n\n**Preserved Technical Terms (English):**\n• Inheritance, Polymorphism, Compiler, Encapsulation, Data Structures, Pointer, Node, Memory Address.`
        : '';

      return {
        action: 'Translate',
        title: `Translation to ${language} (${learningLevel})`,
        badge: `${language} • ${learningLevel}`,
        language,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: `Passage translated into ${language} with ${preserveTechnicalTerms ? 'English technical terms preserved' : 'native terms'}:`,
        content: `${translated}${preservedTermsList}`,
        originalSnippet: cleanText
      };
    }

    case 'Simplify': {
      let simpleExplanation = '';
      let essentialTerms = [];
      let comparison = '';

      if (learningLevel === 'Beginner') {
        simpleExplanation = `Imagine your computer's memory is a giant toy chest. Instead of throwing all toys in a messy pile, **Data Structures** are labeled organizers that keep everything in its exact spot so you can find any toy in one second.`;
        essentialTerms = [
          '**Memory**: The desk space where the computer keeps active numbers and text.',
          '**Order**: Keeping items sorted so nothing gets lost or slow.',
          '**Speed**: Making apps respond instantly without freezing.'
        ];
        comparison = `Analogy: A messy drawer with 100 loose crayons vs an organized box where every color has its own slot.`;
      } else if (learningLevel === 'Intermediate') {
        simpleExplanation = `Data structures provide systematic memory layouts that optimize runtime performance. Rather than scanning memory randomly, programs leverage linear arrangements (Arrays, Lists) or hierarchical trees to achieve fast insertions and lookups.`;
        essentialTerms = [
          '**Contiguous Memory**: Storing elements sequentially side-by-side for O(1) indexed reads.',
          '**Dynamic Pointer Links**: Connecting records anywhere in RAM without fixed size boundaries.',
          '**Operational Contracts**: Enforcing predictable time costs for Insert, Delete, and Search.'
        ];
        comparison = `Practical Comparison: Searching a paper phonebook alphabetically (O(log n)) vs asking every person on the street one by one (O(n)).`;
      } else {
        simpleExplanation = `Data structures define abstract data types (ADTs) mapped to physical hardware memory topologies. They minimize asymptotic operational bounds and leverage spatial/temporal CPU cache locality to avoid memory bus saturation.`;
        essentialTerms = [
          '**Asymptotic Invariants**: Bounded worst-case $O(f(n))$ operational guarantees across scaling datasets.',
          '**Cache Locality**: Maximizing L1/L2 cache line hits to overcome the von Neumann memory wall.',
          '**ABI Padding & Alignment**: Minimizing hardware unaligned memory access penalties.'
        ];
        comparison = `Systems Comparison: High-throughput memory-mapped files vs disk-bound sequential scans under multi-threaded contention.`;
      }

      if (preserveTechnicalTerms) {
        essentialTerms.push('**Inheritance & Polymorphism**: Object-oriented behavioral reuse and dynamic contract binding.');
      }

      return {
        action: 'Simplify',
        title: `Simplified Concept (${learningLevel})`,
        badge: `${learningLevel}`,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: `The passage distilled for ${learningLevel} comprehension:`,
        content: `**Core Simplification:**\n${simpleExplanation}\n\n**Essential Terms Preserved:**\n${essentialTerms.map((t) => `• ${t}`).join('\n')}`,
        example: comparison
      };
    }

    case 'Word Definition': {
      let word = (targetWord || '').trim();
      if (!word) {
        const candidateWords = cleanText
          .split(/[\s,.;:()"'`\n]+/)
          .map((w) => w.trim().replace(/[^a-zA-Z-]/g, ''))
          .filter((w) => w.length > 2);
        word = candidateWords[0] || 'Data structure';
      }

      const wordMap = {
        'inheritance': {
          beginner: 'When a new program class automatically gets features from an older class, like a child inheriting eye color from parents.',
          intermediate: 'An OOP mechanism where a derived class acquires fields and methods of a base class, fostering modular code reuse.',
          advanced: 'Subtype polymorphism and class derivation establishing an "is-a" relationship, governing vtable layout and object slicing semantics.'
        },
        'polymorphism': {
          beginner: 'The ability of a single button or command to do different things depending on what object is using it.',
          intermediate: 'The capability of different classes to respond to the same interface or method call, resolved dynamically at runtime.',
          advanced: 'Dynamic dispatch via virtual method tables (vtables) permitting subtype variance and late-binding function invocation.'
        },
        'compiler': {
          beginner: 'A smart software translator that converts human-written computer code into 0s and 1s that the computer hardware understands.',
          intermediate: 'A system software tool that parses source code, performs syntax verification, and synthesizes target machine code or bytecode.',
          advanced: 'A multi-phase toolchain performing lexical analysis, AST generation, optimization passes (e.g. loop unrolling), and code emission.'
        },
        'encapsulation': {
          beginner: 'Putting private data inside a protective capsule so outsiders cannot mess with it directly.',
          intermediate: 'Bundling data attributes and manipulating methods within a single class while restricting direct external access.',
          advanced: 'Information hiding enforcing invariant preservation through access specifiers (private/protected) and ABI contract boundaries.'
        },
        'node': {
          beginner: 'A single storage container holding your piece of information and a sign pointing to the next container.',
          intermediate: 'A composite data structure element holding payload data and one or more memory pointers to neighboring nodes.',
          advanced: 'A discrete heap-allocated memory structure with spatial indirection, incurring pointer overhead and potential cache misses.'
        },
        'pointer': {
          beginner: 'A sticky note that holds the address of where another item lives in computer memory.',
          intermediate: 'A variable storing the physical or virtual RAM memory address of another variable or object.',
          advanced: 'A 64-bit hardware memory register reference subject to dereferencing latency, memory segmentation, and alignment rules.'
        }
      };

      const matchedKey = Object.keys(wordMap).find((k) => k.toLowerCase() === word.toLowerCase());
      const defObj = matchedKey ? wordMap[matchedKey] : null;

      let meaning = '';
      if (defObj) {
        meaning = learningLevel === 'Beginner' ? defObj.beginner : learningLevel === 'Intermediate' ? defObj.intermediate : defObj.advanced;
      } else {
        meaning = learningLevel === 'Beginner'
          ? `An essential computer concept representing "${word}" explained in simple terms for beginners.`
          : learningLevel === 'Intermediate'
          ? `A foundational academic and software engineering concept representing "${word}" in data systems.`
          : `A rigorous systems-level computer science primitive governing "${word}" with asymptotic and memory layout implications.`;
      }

      return {
        action: 'Word Definition',
        title: `Word Definition: "${word}" (${learningLevel})`,
        badge: `${learningLevel} • Vocabulary`,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        word,
        content: `**${learningLevel} Definition for "${word}":**\n${meaning}\n\n**Academic Context:**\nHighlighted from student reading passage.\n\n**Preserved Term:** "${word}" (English Technical Nomenclature)`,
        example: `Usage Sentence: The software architecture utilizes ${word} to maintain system integrity and algorithmic speed.`
      };
    }

    case 'Multilingual Explanation': {
      // Concept explanations in mother tongue while maintaining English technical terms when preserveTechnicalTerms is true
      let expText = '';
      let exampleText = '';

      if (language === 'Tamil') {
        if (learningLevel === 'Beginner') {
          expText = preserveTechnicalTerms
            ? `**எளிய கருத்து விளக்கம் (Beginner Level):**\nகணிப்பொறியில் தகவல்களை ஒழுங்காக சேமிக்க **Data Structures** பயன்படுகின்றன. ஒரு அலமாரியில் புத்தகங்களை அடுக்குவது போல, நினைவகத்தில் (**Memory / RAM**) தகவல்களை முறைப்படி வைக்கிறோம். இதன் மூலம் நமக்கு தேவையான தகவலை விரைவாகத் தேட முடியும்.\n\n**Preserved Technical Terms (English):**\n• **Inheritance**: பெற்றோர் பண்புகளை குழந்தைகள் பெறுவது போல, base class பண்புகளை derived class பெறுதல்.\n• **Polymorphism**: ஒரே செயல் வெவ்வேறு சூழ்நிலைகளில் பல வடிவங்களில் இயங்குதல்.\n• **Compiler**: மனிதர்கள் எழுதும் code-ஐ கணினிக்கு புரியும் machine code-ஆக மாற்றும் மென்பொருள்.\n• **Encapsulation**: தகவல்களை பாதுகாப்பாக ஒரு class-க்குள் மூடிவைக்கும் முறை.\n• **Data Structure & Pointer**: தரவு அமைப்பு மற்றும் நினைவக முகவரி.`
            : `**எளிய கருத்து விளக்கம் (Beginner Level):**\nகணிப்பொறியில் தகவல்களை ஒழுங்காக சேமிக்க தரவு அமைப்புகள் பயன்படுகின்றன. ஒரு அலமாரியில் புத்தகங்களை அடுக்குவது போல, நினைவகத்தில் தகவல்களை முறைப்படி வைக்கிறோம். இதன் மூலம் நமக்கு தேவையான தகவலை விரைவாகத் தேட முடியும்.`;
          exampleText = `நடைமுறை உதாரணம்: ரயிலின் பெட்டிகள் போல ஒவ்வொன்றும் அடுத்த பெட்டியுடன் இணைக்கப்பட்டுள்ளது.`;
        } else if (learningLevel === 'Intermediate') {
          expText = preserveTechnicalTerms
            ? `**தொழில்நுட்ப கருத்து விளக்கம் (Intermediate Level):**\n**Data Structures** என்பது கணிப்பொறி நினைவகத்தில் (RAM) தகவல்களை திட்டமிட்டு கட்டமைக்கும் முறையாகும். **Linear Data Structures** (Arrays, Linked Lists, Stacks, Queues) ஆகியவை தகவல்களை வரிசையாகவும், **Non-Linear Data Structures** (Trees, Graphs) ஆகியவை படிநிலை கிளைகளாகவும் கையாள்கின்றன.\n\n**Preserved Technical Terms (English):**\n• **Inheritance & Polymorphism**: மென்பொருள் மறுபயன்பாடு மற்றும் பல வடிவ dynamic dispatch.\n• **Compiler & Encapsulation**: நிரல் தொகுப்பு மற்றும் தரவு பாதுகாப்பு boundaries.\n• **Contiguous Memory vs Pointer Linking**: தொடர்ச்சியான RAM ஒதுக்கீடு vs pointer முகவரி இணைப்பு.\n• **Asymptotic Performance**: தகவல்கள் அதிகரிக்கும் போது வேகம் குறையாமல் காக்கும் O(log n) மற்றும் O(1) அமைப்புகள்.`
            : `**தொழில்நுட்ப கருத்து விளக்கம் (Intermediate Level):**\nதரவு அமைப்புகள் என்பது நினைவகத்தில் தகவல்களை திட்டமிட்டு கட்டமைக்கும் முறையாகும். நேரியல் அமைப்புகள் தகவல்களை தொடர்ச்சியாகவும், நேரியல் அல்லாத அமைப்புகள் மரக்கிளை போலவும் கையாள்கின்றன.`;
          exampleText = `நடைமுறை உதாரணம்: ரயில் பயணச்சீட்டு முன்பதிவு வரிசை முறை (FIFO Queue) மற்றும் வலைதள வரலாறு (Linked List).`;
        } else {
          expText = preserveTechnicalTerms
            ? `**ஆழ்ந்த கணிப்பொறி கட்டமைப்பு விளக்கம் (Advanced Level):**\nகணிப்பொறி அமைப்புகளில் **Memory Topology** மற்றும் **Asymptotic Efficiency** ஆகியவை மென்பொருளின் வேகத்தை தீர்மானிக்கின்றன. **Contiguous Array Allocation** ஆனது **L1/L2 Cache Locality** நன்மைகளைத் தருகிறது. அதேசமயம் **Dynamic Linked Nodes** ஆனது **Pointer Indirection Overhead** மற்றும் **Heap Fragmentation** சவால்களை உருவாக்குகின்றன.\n\n**Preserved Technical Terms (English):**\n• **Inheritance, Polymorphism & vtables**: விர்ச்சுவல் மெத்தட் டேபிள் மூலம் டைனமிக் பாலிமார்பிசம்.\n• **Compiler Optimization & Memory Alignment**: பைனரி கம்பைலர் மற்றும் நினைவக ஒதுக்கீடு சீரமைப்பு.\n• **Encapsulation & ABI Layout**: கிளாஸ் எல்லைகள் மற்றும் சிஸ்டம் ஏபிஐ லேஅவுட்.\n• **Asymptotic Bounds**: O(1), O(log n), O(n) கணிப்பீட்டு எல்லைகள்.`
            : `**ஆழ்ந்த கணிப்பொறி கட்டமைப்பு விளக்கம் (Advanced Level):**\nகணிப்பொறி அமைப்புகளில் நினைவக கட்டமைப்பு மற்றும் கணிப்பீட்டு செயல்திறன் ஆகியவை மென்பொருளின் வேகத்தை தீர்மானிக்கின்றன.`;
          exampleText = `உயர்நிலை உதாரணம்: B+ Tree அடிப்படையிலான டேட்டாபேஸ் இன்டெக்ஸிங் மற்றும் லினக்ஸ் கெர்னல் மெமரி மேலாண்மை.`;
        }
      } else if (language === 'Hindi') {
        if (learningLevel === 'Beginner') {
          expText = preserveTechnicalTerms
            ? `**सरल अवधारणा व्याख्या (Beginner Level):**\nकंप्यूटर में डेटा को सही ढंग से व्यवस्थित करने के लिए **Data Structures** का उपयोग किया जाता है। जैसे अलमारी में किताबें सलीके से रखी जाती हैं, वैसे ही कंप्यूटर Memory में रिकॉर्ड्स रखे जाते हैं।\n\n**Preserved Technical Terms (English):**\n• **Inheritance**: एक क्लास के फीचर्स दूसरी क्लास में मिलना।\n• **Polymorphism**: एक ही नाम से विभिन्न कार्य करना।\n• **Compiler**: कोड को कंप्यूटर मशीन भाषा में बदलने वाला टूल।\n• **Encapsulation**: डेटा को सुरक्षित क्लास में समेटना।`
            : `कंप्यूटर में डेटा को सही ढंग से व्यवस्थित करने के लिए डेटा संरचनाओं का उपयोग किया जाता है।`;
          exampleText = `उदाहरण: स्कूल बैग में कॉपी-किताबें व्यवस्थित रखना।`;
        } else if (learningLevel === 'Intermediate') {
          expText = preserveTechnicalTerms
            ? `**तकनीकी अवधारणा व्याख्या (Intermediate Level):**\n**Data Structures** मेमोरी आर्किटेक्चर को परिभाषित करते हैं। **Linear Structures** (Arrays, Lists, Stacks, Queues) डेटा को एक क्रम में रखते हैं, जबकि **Non-Linear Structures** (Trees, Graphs) शाखाओं में डेटा स्टोर करते हैं।\n\n**Preserved Technical Terms (English):**\n• **Inheritance & Polymorphism**: कोड पुनः प्रयोज्यता और गतिशील विधि प्रेषण।\n• **Compiler & Encapsulation**: प्रकार सुरक्षा और डेटा छिपाव।\n• **Contiguous Memory vs Pointers**: अनुक्रमिक मेमोरी बनाम पॉइंटर संदर्भ।`
            : `डेटा संरचनाएं मेमोरी आर्किटेक्चर को परिभाषित करती हैं।`;
          exampleText = `उदाहरण: वेब ब्राउज़र इतिहास (Linked List) और प्रिंटर कतार (FIFO Queue)।`;
        } else {
          expText = preserveTechnicalTerms
            ? `**गहन तकनीकी विश्लेषण (Advanced Level):**\nसिस्टम सॉफ्टवेयर में **Memory Topology** और **Asymptotic Complexity** सिस्टम थ्रूपुट निर्धारित करते हैं। **Contiguous Vectors** से **CPU Cache Locality** बेहतर होती है, जबकि **Linked Nodes** में **Pointer Indirection** का ओवरहेड होता है।\n\n**Preserved Technical Terms (English):**\n• **Inheritance, Polymorphism & Vtables**: डायनामिक डिस्पैच और मेमोरी लेआउट।\n• **Compiler Optimizations & Alignment**: मशीन कोड अनुकूलन।\n• **Asymptotic Complexity Bounds**: O(log n) और O(1) प्रदर्शन प्रोफाइल।`
            : `सिस्टम सॉफ्टवेयर में मेमोरी टोपोलॉजी और कम्प्यूटेशनल जटिलता सिस्टम थ्रूपुट निर्धारित करते हैं।`;
          exampleText = `उन्नत उदाहरण: रिलेशनल डेटाबेस में B+ Tree इंडेक्सिंग।`;
        }
      } else if (language === 'Malayalam') {
        expText = preserveTechnicalTerms
          ? `**ആശയപരമായ വിശദീകരണം (${learningLevel}):**\nകമ്പ്യൂട്ടർ മെമ്മറിയിൽ വിവരങ്ങൾ കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യുന്നതിനുള്ള ശാസ്ത്രീയ രൂപരേഖയാണ് **Data Structures**.\n\n**Preserved Technical Terms (English):**\n• **Inheritance**: അടിസ്ഥാന ക്ലാസിലെ സവിശേഷതകൾ പുതിയ ക്ലാസിലേക്ക് പകർത്തൽ.\n• **Polymorphism**: ഒരേ ഇന്റർഫേസ് പല രൂപങ്ങളിൽ പ്രവർത്തിക്കൽ.\n• **Compiler**: പ്രോഗ്രാം കോഡ് മെഷീൻ ഭാഷയിലേക്ക് മാറ്റുന്ന സോഫ്റ്റ്‌വെയർ.\n• **Encapsulation**: ഡാറ്റയും മെത്തേഡുകളും ക്ലാസിനുള്ളിൽ സുരക്ഷിതമാക്കൽ.`
          : `കമ്പ്യൂട്ടർ മെമ്മറിയിൽ വിവരങ്ങൾ കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യുന്നതിനുള്ള ശാസ്ത്രീയ രൂപരേഖയാണ് വിവര ഘടനകൾ.`;
        exampleText = `പ്രായോഗിക ഉദാഹരണം: പ്രിന്റർ ക്യൂ FIFO തത്വവും, ഫയൽ ഫോൾഡറുകൾ ട്രീ ഘടനയും ഉപയോഗിക്കുന്നു.`;
      } else if (language === 'Telugu') {
        expText = preserveTechnicalTerms
          ? `**భావనాత్మక వివరణ (${learningLevel}):**\nడేటా స్ట్రక్చర్స్ అనేవి కంప్యూటర్ మెమరీలో డేటాను సరిగ్గా అమర్చే సాంకేతిక రూపకల్పన.\n\n**Preserved Technical Terms (English):**\n• **Inheritance**: పేరెంట్ క్లాస్ లక్షణాలు చైల్డ్ క్లాస్ పొందడం.\n• **Polymorphism**: ఒకే మెథడ్ వివిధ రూపాల్లో పనిచేయడం.\n• **Compiler**: కోడ్‌ను మెషీన్ లెవెల్‌కి మార్చే వ్యవస్థ.\n• **Encapsulation**: డేటాను క్లాస్ లోపల భద్రపరచడం.`
          : `డేటా స్ట్రక్చర్స్ అనేవి కంప్యూటర్ మెమరీలో డేటాను సరిగ్గా అమర్చే సాంకేతిక రూపకల్పన.`;
        exampleText = `నిజ జీవిత ఉదాహరణ: రైల్వే టికెట్ బుకింగ్ లైన్ క్యూ పద్ధతి.`;
      } else if (language === 'Kannada') {
        expText = preserveTechnicalTerms
          ? `**ಪರಿಕಲ್ಪನಾ ವಿವರಣೆ (${learningLevel}):**\nಡೇಟಾ ರಚನೆಗಳು ಕಂಪ್ಯೂಟರ್ ಮೆಮೊರಿಯಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಗ್ರಹಿಸುವ ತಾಂತ್ರಿಕ ನೀಲನಕ್ಷೆಯಾಗಿದೆ.\n\n**Preserved Technical Terms (English):**\n• **Inheritance**: ಮೂಲ ವರ್ಗದ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹೊಸ ವರ್ಗಕ್ಕೆ ಅಳವಡಿಸುವುದು.\n• **Polymorphism**: ಒಂದೇ ವಿಧಾನವು ವಿಭಿನ್ನ ಸಂದರ್ಭಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದು.\n• **Compiler**: ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಕೋಡ್ ಅನ್ನು ಮೆಷಿನ್ ಭಾಷೆಗೆ ಪರಿವರ್ತಿಸುವುದು.\n• **Encapsulation**: ಡೇಟಾವನ್ನು ಕ್ಲಾಸ್ ಒಳಗೆ ಸುರಕ್ಷಿತವಾಗಿರಿಸುವುದು.`
          : `ಡೇಟಾ ರಚನೆಗಳು ಕಂಪ್ಯೂಟರ್ ಮೆಮೊರಿಯಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಗ್ರಹಿಸುವ ತಾಂತ್ರಿಕ ನೀಲನಕ್ಷೆಯಾಗಿದೆ.`;
        exampleText = `ಪ್ರಾಯೋಗಿಕ ಉದಾಹರಣೆ: ಆನ್‌ಲೈನ್ ಶಾಪಿಂಗ್ ಕಾರ್ಟ್ ಮತ್ತು ಬ್ರೌಸರ್ ಹಿಸ್ಟರಿ.`;
      } else {
        expText = `**Conceptual Explanation (${learningLevel}):**\nData structures define the topological memory model for computational software execution. In ${learningLevel} terms, structured memory enables standard operations (search, insert, delete) to scale predictably.\n\n**Preserved Technical Terms:**\n• **Inheritance**: Reusable class hierarchies.\n• **Polymorphism**: Dynamic method dispatch and flexible interfaces.\n• **Compiler**: Translating source code with type-safety checks.\n• **Encapsulation**: State isolation within class boundaries.`;
        exampleText = `Practical Example: Browser history uses linked nodes; database indexes use hierarchical B+ Trees.`;
      }

      return {
        action: 'Multilingual Explanation',
        title: `Multilingual Explanation (${language} • ${learningLevel})`,
        badge: `${language} • ${learningLevel}`,
        language,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: `In-depth academic concept explanation in ${language} at ${learningLevel} level (${preserveTechnicalTerms ? 'Technical terms preserved in English' : 'Native terms'}):`,
        content: `${expText}`,
        example: exampleText
      };
    }

    case 'Technical Term Preservation': {
      let coreExp = '';
      let preservedList = '';
      let exampleNote = '';

      if (preserveTechnicalTerms) {
        if (language === 'Tamil') {
          coreExp = `**ஆங்கில தொழில்நுட்ப சொற்கள் பாதுகாக்கப்பட்ட விளக்கம் (${learningLevel}):**\nஇந்த பகுதியில் **Inheritance**, **Polymorphism**, **Compiler**, மற்றும் **Encapsulation** போன்ற அடிப்படை கணினி அறிவியல் சொற்கள் ஆங்கிலத்தில் பாதுகாக்கப்பட்டு விளக்கப்பட்டுள்ளன.\n\nகணிப்பொறி அமைப்புகளில் **Data Structures** மற்றும் **Memory Allocation** ஆகியவை மென்பொருளின் வேகத்தை தீர்மானிக்கின்றன. ஒரு **Linked Node** ஆனது **Data** மற்றும் அடுத்த உறுப்பின் **Pointer** ஆகியவற்றை நினைவகத்தில் இணைக்கிறது.`;
          preservedList = `• **Inheritance**: Base class-இன் பண்புகளை derived class பெற்று மறுபயன்பாடு செய்தல்.\n• **Polymorphism**: ஒரே interface மூலம் பல விதமான dynamic method dispatch செயலாக்குதல்.\n• **Compiler**: நிரலை இயந்திர மொழியாக மாற்றி type safety சரிபார்த்தல்.\n• **Encapsulation**: Class-க்குள் தரவுகளையும் member methods-களையும் பாதுகாப்பாக அடைத்தல்.\n• **Data Structures & Pointers**: நினைவக கட்டமைப்பு மற்றும் நேரடி hardware memory addressing.`;
          exampleNote = `நடைமுறை உதாரணம்: OOP-இல் Base class-ஆன Vehicle-ஐப் பயன்படுத்தி Car, Truck என Polymorphic வகுப்புகளை உருவாக்குதல்.`;
        } else if (language === 'Hindi') {
          coreExp = `**तकनीकी शब्दावली संरक्षित व्याख्या (${learningLevel}):**\nइस विश्लेषण में **Inheritance**, **Polymorphism**, **Compiler**, और **Encapsulation** जैसे महत्वपूर्ण तकनीकी शब्दों को अंग्रेजी में सुरक्षित रखा गया है ताकि तकनीकी सटीकता बनी रहे।\n\n**Data Structures** मेमोरी आर्किटेक्चर को परिभाषित करते हैं। **Node** और **Pointer** के माध्यम से डेटा को डायनामिक रूप से लिंक किया जाता है।`;
          preservedList = `• **Inheritance**: बेस क्लास के गुणों का चाइल्ड क्लास में पुन: उपयोग।\n• **Polymorphism**: एक ही इंटरफ़ेस से विभिन्न रूपों में कार्य करना।\n• **Compiler**: उच्च स्तरीय कोड को सुरक्षित मशीन कोड में अनुवाद करना।\n• **Encapsulation**: डेटा और विधियों को एक क्लास में सुरक्षित रखना।\n• **Data Structures & Pointers**: सिस्टम मेमोरी संगठन और पॉइंटर संदर्भ।`;
          exampleNote = `व्यावहारिक उदाहरण: सॉफ्टवेयर आर्किटेक्चर में Polymorphism का उपयोग करके विभिन्न पेमेंट गेटवे को सपोर्ट करना।`;
        } else if (language === 'Malayalam') {
          coreExp = `**സാങ്കേതിക പദങ്ങൾ നിലനിർത്തിയുള്ള വിശദീകരണം (${learningLevel}):**\n**Inheritance**, **Polymorphism**, **Compiler**, **Encapsulation** തുടങ്ങിയ സുപ്രധാന ഇംഗ്ലീഷ് സാങ്കേതിക പദങ്ങൾ നിലനിർത്തിക്കൊണ്ടാണ് ഈ ആശയം വിശദീകരിച്ചിരിക്കുന്നത്. **Data Structures** കമ്പ്യൂട്ടർ മെമ്മറി കാര്യക്ഷമമായി വിനിയോഗിക്കാൻ സഹായിക്കുന്നു.`;
          preservedList = `• **Inheritance**: അടിസ്ഥാന ക്ലാസിലെ കോഡ് പുനരുപയോഗം.\n• **Polymorphism**: ഒരേ ഇന്റർഫേസിന്റെ പലവിധത്തിലുള്ള പ്രവർത്തനം.\n• **Compiler**: കോഡ് മെഷീൻ ലെവലിലേക്ക് മാറ്റുന്ന സംവിധാനം.\n• **Encapsulation**: ഡാറ്റാ പരിരക്ഷയും ക്ലാസ് അതിരുകളും.`;
          exampleNote = `പ്രായോഗിക ഉദാഹരണം: ഒബ്ജക്റ്റ് ഓറിയന്റഡ് ആർക്കിടെക്ചറിൽ ഇൻഹെറിറ്റൻസ് വഴിയുള്ള കോഡ് റീയൂസ്.`;
        } else if (language === 'Telugu') {
          coreExp = `**సాంకేతిక పదాల పరిరక్షణతో వివరణ (${learningLevel}):**\n**Inheritance**, **Polymorphism**, **Compiler**, **Encapsulation** వంటి ముఖ్యమైన సాంకేతిక పదాలను ఇంగ్లీష్ లోనే ఉంచి, మిగతా వివరణను సులభమైన శైలిలో అందించడం జరిగింది. **Data Structures** మెమరీ నిర్వహణను మెరుగుపరుస్తాయి.`;
          preservedList = `• **Inheritance**: బేస్ క్లాస్ నుండి లక్షణాలు పొందడం.\n• **Polymorphism**: డైనమిక్ మెథడ్ డిస్పాచ్.\n• **Compiler**: కోడ్ అనువాదం మరియు ధ్రువీకరణ.\n• **Encapsulation**: క్లాస్ పరిధిలో డేటాను భద్రపరచడం.`;
          exampleNote = `నిజ జీవిత ఉదాహరణ: సాఫ్ట్‌వేర్ డిజైన్‌లో పాలీమార్ఫిజం అమలు.`;
        } else if (language === 'Kannada') {
          coreExp = `**ತಾಂತ್ರಿಕ ಪದಗಳ ಸಂರಕ್ಷಣೆಯೊಂದಿಗೆ ವಿವರಣೆ (${learningLevel}):**\n**Inheritance**, **Polymorphism**, **Compiler**, ಮತ್ತು **Encapsulation** ನಂತಹ ಪ್ರಮುಖ ಇಂಗ್ಲಿಷ್ ತಾಂತ್ರಿಕ ಪದಗಳನ್ನು ಹಾಗೆಯೇ ಉಳಿಸಿಕೊಂಡು ವಿಷಯವನ್ನು ವಿವರಿಸಲಾಗಿದೆ. **Data Structures** ಕಂಪ್ಯೂಟರ್ ಮೆಮೊರಿಯನ್ನು ಸಮರ್ಥವಾಗಿ ನಿರ್ವಹಿಸುತ್ತವೆ.`;
          preservedList = `• **Inheritance**: ಮೂಲ ವರ್ಗದ ಮರುಬಳಕೆ.\n• **Polymorphism**: ಬಹುರೂಪತೆ ಮತ್ತು ಡೈನಾಮಿಕ್ ಡಿಸ್ಪ್ಯಾಚ್.\n• **Compiler**: ಯಂತ್ರ ಭಾಷೆಗೆ ಕೋಡ್ ಪರಿವರ್ತನೆ.\n• **Encapsulation**: ವರ್ಗದೊಳಗೆ ಡೇಟಾ ಸಂರಕ್ಷಣೆ.`;
          exampleNote = `ಪ್ರಾಯೋಗಿಕ ಉದಾಹರಣೆ: ಪ್ರೋಗ್ರಾಮಿಂಗ್‌ನಲ್ಲಿ ಇನ್‌ಹೆರಿಟೆನ್ಸ್ ಬಳಕೆ.`;
        } else {
          coreExp = `**Technical Term Preservation Explanation (${learningLevel}):**\nThis analysis maintains strict engineering nomenclature for the selected passage, explicitly preserving foundational computer science terms including **Inheritance**, **Polymorphism**, **Compiler**, **Encapsulation**, **Data Structures**, and **Pointer** referencing without dumbing down the technical precision.`;
          preservedList = `• **Inheritance**: Subtype derivation and behavioral contract propagation across class hierarchies.\n• **Polymorphism**: Dynamic virtual method dispatch (vtables) and flexible interface variance.\n• **Compiler**: Multi-pass translation toolchain performing lexical analysis, AST construction, and machine code synthesis.\n• **Encapsulation**: Information hiding and class invariant enforcement via private/protected access specifiers.\n• **Data Structures & Pointer Addressing**: Topological memory allocation and direct 64-bit hardware RAM dereferencing.`;
          exampleNote = `Enterprise Software Pattern: Clean architecture layering where domain models enforce strict Encapsulation while Polymorphism enables extensible plugin drivers.`;
        }
      } else {
        coreExp = `**Technical Term Preservation is currently Disabled (Off):**\nThe selected passage is explained using colloquial and native vocabulary without forcing English technical terms.\n\n*Note: To retain terms like Inheritance, Polymorphism, Compiler, and Encapsulation in English, click the **Technical Term Preservation** action button again to turn it ON.*`;
        preservedList = `• Terms are currently translated into everyday language.\n• Click "Technical Term Preservation" to reactivate English technical term preservation.`;
        exampleNote = `Tip: Keeping technical terms in English helps prepare for university exams and industry software interviews.`;
      }

      return {
        action: 'Technical Term Preservation',
        title: `Technical Term Preservation (${preserveTechnicalTerms ? 'Enabled' : 'Disabled'})`,
        badge: preserveTechnicalTerms ? `Terms Preserved (EN)` : `Terms Preserved (OFF)`,
        language,
        learningLevel,
        preserveTechnicalTerms,
        prompt: backendAiPrompt,
        summary: preserveTechnicalTerms
          ? `Selected passage explained in ${language} at ${learningLevel} level with English technical terms preserved:`
          : `Selected passage explained with technical term preservation disabled:`,
        content: `${coreExp}\n\n**Preserved Technical Terms:**\n${preservedList}`,
        example: exampleNote
      };
    }

    default:
      throw new Error(`Unsupported action type: "${action}"`);
  }
}


/**
 * Generate Whole-Document Insights based on the opened document
 */
export async function generateDocumentInsights(doc, language = 'English') {
  await delay(750);

  if (!doc) {
    throw new Error('Document content could not be found or loaded.');
  }

  // Multilingual summaries
  const summariesByLang = {
    'English': 'This unit introduces foundational memory models and algorithmic paradigms. It establishes how data structures provide organized memory layouts for efficient search, insertion, and traversal, categorizing techniques into linear (Arrays, Linked Lists, Stacks, Queues) and non-linear (Trees, Graphs) topologies with C++ node representations.',
    'Tamil': 'இந்த பாடம் கணிப்பொறி நினைவக மாதிரிகள் மற்றும் அல்காரிதங்களின் அடிப்படைகளை அறிமுகப்படுத்துகிறது. இது வரிசை மற்றும் கிளை தரவு அமைப்புகளின் வேறுபாடுகள் மற்றும் C++ நோட் அமைப்புகளை தெளிவாக விளக்குகிறது.',
    'Hindi': 'यह इकाई कंप्यूटर मेमोरी मॉडल और एल्गोरिथम के बुनियादी सिद्धांतों का परिचय देती है। यह लीनियर और नॉन-लीनियर डेटा संरचनाओं के बीच अंतर और C++ में नोड कार्यान्वयन को समझाती है।'
  };

  const summary = summariesByLang[language] || summariesByLang['English'];

  return {
    documentId: doc.id,
    generatedAt: new Date().toLocaleTimeString(),
    language,
    // Section A: Document Summary
    summary,
    // Section B: Key Concepts
    keyConcepts: [
      {
        concept: 'Arrays',
        explanation: 'Contiguous sequential memory allocation providing O(1) instantaneous indexed lookups, but fixed size.'
      },
      {
        concept: 'Linked Lists',
        explanation: 'Dynamic node structures connected via pointer references; permits flexible memory allocation without contiguous blocks.'
      },
      {
        concept: 'Stacks',
        explanation: 'LIFO (Last In, First Out) linear model used for function call stacks, recursive execution, and undo buffers.'
      },
      {
        concept: 'Queues',
        explanation: 'FIFO (First In, First Out) linear model used for operating system task schedulers and network packet buffering.'
      },
      {
        concept: 'Non-Linear Structures (Trees & Graphs)',
        explanation: 'Hierarchical and interconnected node networks used for B+ Tree database indexing and network routing graphs.'
      }
    ],
    // Section C: Chapter / Topic Breakdown (Reflecting actual headings from doc)
    topicBreakdown: [
      {
        module: 'Module 01',
        title: 'Introduction to Data Structures & Algorithms',
        sections: [
          '1.1 Concept of Data Structures and Memory Topology',
          '1.2 Linear vs Non-Linear Structures Classification',
          'Linear Memory Models: Arrays, Linked Lists, Stacks, Queues',
          'Non-Linear Hierarchies: Trees, Binary Search Trees, Graphs',
          'C++ Linked Node Primitive Declaration (node_definition.cpp)'
        ]
      }
    ],
    // Section D: Important Exam Points (Carefully labeled as study suggestions)
    examPoints: [
      {
        tag: 'High Weightage',
        point: 'Differentiate between Contiguous vs Pointer-linked memory models in Arrays and Linked Lists.'
      },
      {
        tag: 'Code Implementation',
        point: 'Practice writing the self-referential C++ Node struct declaration and pointer initialization.'
      },
      {
        tag: 'Operational Principle',
        point: 'Compare Stack (LIFO) and Queue (FIFO) mechanics with one real-world software use case each.'
      },
      {
        tag: 'Complexity Analysis',
        point: 'Understand why unorganized data leads to asymptotic decay in search and update latency.'
      }
    ],
    // Section E: Learning Support Actions
    learningSupport: [
      { id: 'explain_topic', title: 'Explain a difficult topic', query: 'Explain the difference between contiguous and linked memory in simple words' },
      { id: 'practical_example', title: 'Give a practical example', query: 'Give me a real-world software architecture example for Trees and Stacks' },
      { id: 'revision_questions', title: 'Generate revision questions', query: 'Generate 4 academic revision questions with answers for Unit 1' }
    ]
  };
}
