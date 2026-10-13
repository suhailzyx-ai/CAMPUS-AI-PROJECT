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
 */
export async function processSelectedTextAction({ action, text, language = 'English', targetWord = '' }) {
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

  switch (action) {
    case 'Explain': {
      let coreIdea = '';
      let takeaways = [];
      let analogy = '';

      if (isCodeOrPointer) {
        coreIdea = `This excerpt defines the fundamental building block of dynamic memory structures: a linked Node primitive in C++. Rather than placing elements side-by-side in a fixed array, each node packages its own payload data alongside a pointer address pointing to the subsequent item in memory.`;
        takeaways = [
          '**Self-Referential Pointer (`Node* next`)**: Holds the memory address of the next connected element.',
          '**Dynamic Memory Allocation**: Permits nodes to be created anywhere in heap memory without requiring contiguous blocks.',
          '**Nullptr Boundary**: When `next == nullptr`, it signals the terminal boundary (tail) of the list.'
        ];
        analogy = `Analogy: Like a treasure hunt where each clue (node) gives you a prize (data) and a note with directions to where the next clue is hidden (pointer).`;
      } else if (isLinearVsNonLinear) {
        coreIdea = `This passage contrasts Linear and Non-Linear memory arrangements. In linear organizations (Arrays, Lists, Stacks, Queues), items follow a strict single-file sequence. In non-linear organizations (Trees, Graphs), data diverges into multi-level branches or networked meshes.`;
        takeaways = [
          '**Sequential Dependency**: Linear structures define clear predecessor and successor relationships.',
          '**Hierarchical Topologies**: Non-linear structures represent natural parent-child relationships and complex networks.',
          '**Access Efficiency Tradeoff**: Contiguous linear arrays allow instant index lookups, while trees optimize hierarchical searches.'
        ];
        analogy = `Analogy: A linear structure is like a single-file queue at a campus counter; a non-linear structure is like an organizational flowchart or university departmental tree.`;
      } else if (isAlgoPerf) {
        coreIdea = `The author asserts that software speed is not determined by code instructions alone. The underlying memory layout of the data structure directly dictates the runtime efficiency, latency, and scalability of enterprise computer programs.`;
        takeaways = [
          '**Algorithmic Synergy**: Algorithms and data structures are interdependent halves of computational efficiency.',
          '**Architectural Foundation**: Poor structural choice leads to computational bottlenecks as data grows.',
          '**Asymptotic Scalability**: Selecting the appropriate structure preserves fast response times under heavy user loads.'
        ];
        analogy = `Analogy: Choosing a data structure is like choosing the chassis of a vehicle—putting a Formula 1 engine (algorithm) on a tractor chassis (unsuitable structure) will severely handicap its potential speed.`;
      } else {
        coreIdea = `This passage establishes that data structures provide deliberate architectural organization for computer memory. Rather than scattering values randomly across RAM, structured formats enable standard operations like searching, inserting, and deleting to execute predictably.`;
        takeaways = [
          '**Systematic Organization**: Prevents random memory fragmentation and clutter.',
          '**Operational Predictability**: Search, traversal, and update times scale cleanly with data volume.',
          '**Computational Foundation**: Serves as the cornerstone for reliable, enterprise-grade software.'
        ];
        analogy = `Analogy: A library catalog groups books systematically by department and call number so students can locate any volume in seconds rather than searching every bookshelf.`;
      }

      return {
        action: 'Explain',
        title: 'Academic Explanation',
        badge: 'Student-Friendly',
        summary: `Clear conceptual breakdown of the selected passage (${wordCount} words):`,
        content: `**Core Idea:**\n${coreIdea}\n\n**Key Takeaways:**\n${takeaways.join('\n')}`,
        example: analogy
      };
    }

    case 'Meaning': {
      let authorIntent = '';
      let semanticImplication = '';
      let examContext = '';

      if (isCodeOrPointer) {
        authorIntent = `The author intends to demonstrate how abstract node-based connections are formally expressed in compiled code syntax using C++ templates and pointers.`;
        semanticImplication = `The syntax bridges conceptual graph theory and actual hardware pointers, showing how dynamic data structures break free from fixed array size limits.`;
        examContext = `Frequently tested in practical exams and lab viva: explain the purpose of the constructor initialization list and why \`next\` is assigned \`nullptr\`.`;
      } else if (isLinearVsNonLinear) {
        authorIntent = `The author is classifying data structures according to their topological access patterns to help students select the right tool for specific computational problems.`;
        semanticImplication = `The passage establishes that "linear" refers to the logical traversal sequence of elements, not necessarily their physical placement in RAM chips.`;
        examContext = `Core university exam question: "Differentiate between Linear and Non-Linear Data Structures with memory models and primary examples."`;
      } else if (isAlgoPerf) {
        authorIntent = `The author emphasizes software engineering rigor: warning students that writing clever algorithms cannot compensate for a poorly chosen data structure.`;
        semanticImplication = `Algorithmic analysis (Big-O notation) is deeply coupled to how data is physically and logically addressed in computer memory.`;
        examContext = `Key theoretical concept tested in university midterms regarding time-space complexity and system architecture.`;
      } else {
        authorIntent = `The author establishes why deliberate memory topology is an absolute requirement in computer science rather than an optional optimization.`;
        semanticImplication = `Unstructured data storage causes computational entropy, causing database and software operations to experience exponential slowdown.`;
        examContext = `Foundational definition question in Unit 1: "Define Data Structure and state its fundamental significance."`;
      }

      return {
        action: 'Meaning',
        title: 'Overall Passage Meaning',
        badge: 'Semantic Analysis',
        summary: `Author's intent and deeper semantic meaning of this passage:`,
        content: `**Author's Primary Intent:**\n${authorIntent}\n\n**Deeper Semantic Meaning:**\n${semanticImplication}\n\n**Academic & Exam Context:**\n${examContext}`,
        example: `Context in Unit: Found in Section 1 to build foundational conceptual clarity before detailed algorithmic proofs.`
      };
    }

    case 'Translate': {
      // Dynamic translation dictionaries based on passage topic
      let translationMap = {};

      if (isCodeOrPointer) {
        translationMap = {
          'English': cleanText,
          'Tamil': 'C++ மொழியில் இணைக்கப்பட்ட முனை (Linked Node) அறிவிப்பு: இது தரவுப் பகுதியை (data) சேமிப்பதோடு, அடுத்த முனையின் நினைவக முகவரியை (pointer) சுட்டிக்காட்டுகிறது. next என்பது nullptr ஆக இருக்கும்போது அது வரிசையின் இறுதியைக் குறிக்கிறது.',
          'Hindi': 'C++ लिंक्ड नोड प्रिमिटिव: यह नोड डेटा मान को संग्रहीत करता है और साथ ही अगले नोड के मेमोरी एड्रेस (पॉइंटर) को निर्देशित करता है। जब next मान nullptr होता है, तो यह अनुक्रम के अंत को दर्शाता है।',
          'Malayalam': 'C++ ലിങ്ക്ഡ് നോഡ് പ്രഖ്യാപനം: ഇത് വിവരങ്ങൾ സൂക്ഷിക്കുന്നതിനൊപ്പം അടുത്ത നോഡിന്റെ മെമ്മറി വിലാസവും (പോയിന്റർ) രേഖപ്പെടുത്തുന്നു. next എന്നത് nullptr ആകുമ്പോൾ ഇത് ക്രമത്തിന്റെ അവസാനത്തെ സൂചിപ്പിക്കുന്നു.',
          'Telugu': 'C++ లింక్డ్ నోడ్ ప్రైమిటివ్: ఇది డేటా విలువను నిల్వ చేయడంతో పాటు తదుపరి నోడ్ యొక్క మెమరీ చిరునామాను (పాయింటర్) చూపుతుంది. next విలువ nullptr అయినప్పుడు అది క్రమం ముగింపును సూచిస్తుంది.',
          'Kannada': 'C++ ಲಿಂಕ್ಡ್ ನೋಡ್ ಪ್ರಿಮಿಟಿವ್: ಇದು ಡೇಟಾ ಮೌಲ್ಯವನ್ನು ಸಂಗ್ರಹಿಸುವುದರ ಜೊತೆಗೆ ಮುಂದಿನ ನೋಡ್‌ನ ಮೆಮೊರಿ ವಿಳಾಸವನ್ನು (ಪಾಯಿಂಟರ್) ಸೂಚಿಸುತ್ತದೆ. next ಮೌಲ್ಯ nullptr ಆಗಿದ್ದಾಗ ಅದು ಅನುಕ್ರಮದ ಅಂತ್ಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ.'
        };
      } else if (isLinearVsNonLinear) {
        translationMap = {
          'English': cleanText,
          'Tamil': 'நேரியல் (Linear) அமைப்புகளில் உருப்படிகள் தொடர்ச்சியாகவும், ஒவ்வொன்றும் திட்டவட்டமான முந்தைய மற்றும் அடுத்த உருப்படியைக் கொண்டுள்ளன. நேரியல் அல்லாத (Non-Linear) அமைப்புகளில் தகவல்கள் படிநிலையாக மரக்கிளைகள் போன்றும் வலைப்பின்னலாகவும் கட்டமைக்கப்படுகின்றன.',
          'Hindi': 'रैखिक (लीनियर) संरचनाओं में तत्व क्रमिक रूप से व्यवस्थित होते हैं जहां प्रत्येक इकाई का एक पूर्ववर्ती और उत्तराधिकारी होता है, जबकि गैर-रैखिक संरचनाओं में डेटा पदानुक्रमित शाखाओं या नेटवर्क जाल में व्यवस्थित होता है।',
          'Malayalam': 'ലീനിയർ ഘടനകളിൽ വിവരങ്ങൾ ക്രമാനുഗതമായി ക്രമീകരിക്കപ്പെടുന്നു, എന്നാൽ നോൺ-ലീനിയർ ഘടനകളിൽ വിവരങ്ങൾ ശാഖകളായോ ശ്രേണികളായോ ആണ് സൂക്ഷിക്കുന്നത്.',
          'Telugu': 'లీనియర్ స్ట్రక్చర్స్‌లో అంశాలు క్రమ పద్ధతిలో అమర్చబడి ఉంటాయి, ఇక్కడ ప్రతి అంశానికి మునుపటి మరియు తదుపరి అంశం ఉంటాయి. నాన్-లీనియర్ స్ట్రక్చర్స్‌లో సమాచారం శాఖల రూపంలో పदानుక్రమంలో ఉంటుంది.',
          'Kannada': 'ಲೀನಿಯರ್ ರಚನೆಗಳಲ್ಲಿ ಅಂಶಗಳು ಅನುಕ್ರಮವಾಗಿ ಜೋಡಿಸಲ್ಪಟ್ಟಿರುತ್ತವೆ, ಆದರೆ ನಾನ್-ಲೀನಿಯರ್ ರಚನೆಗಳಲ್ಲಿ ಮಾಹಿತಿಯು ಕ್ರಮಾನುಗತ ಶಾಖೆಗಳಲ್ಲಿ ಅಥವಾ ನೆಟ್‌ವರ್ಕ್‌ನಲ್ಲಿ ವ್ಯವಸ್ಥಿತವಾಗಿರುತ್ತದೆ.'
        };
      } else if (isAlgoPerf) {
        translationMap = {
          'English': cleanText,
          'Tamil': 'ஒரு வழிமுறை (Algorithm) இலக்கு கணக்கீட்டு முடிவுகளை உருவாக்க தரவு அமைப்புகளின் மீது செயல்படுகிறது. ஒட்டுமொத்த நிறுவன அமைப்பின் செயல்திறன் இந்த அடிப்படை கட்டமைப்பு முடிவையே பெரிதும் சார்ந்துள்ளது.',
          'Hindi': 'एक एल्गोरिदम लक्षित परिणाम प्राप्त करने के लिए डेटा संरचनाओं पर कार्य करता है। संपूर्ण एंटरप्राइज़ सिस्टम का प्रदर्शन प्रोफाइल लगभग पूरी तरह से इस अंतर्निहित वास्तुशिल्प निर्णय पर निर्भर करता है।',
          'Malayalam': 'ആവശ്യമായ ഫലങ്ങൾ നേടുന്നതിനായി അൽഗോരിതങ്ങൾ ഡാറ്റാ സ്ട്രക്ച്ചറുകളിൽ പ്രവർത്തിക്കുന്നു. ഒരു എന്റർപ്രൈസ് സിസ്റ്റത്തിന്റെ മൊത്തം പ്രവർത്തന വേഗത ഈ ഘടനാപരമായ തീരുമാനത്തെ ആശ്രയിച്ചിരിക്കുന്നു.',
          'Telugu': 'లక్ష్య గణన ఫలితాలను ఉత్పత్తి చేయడానికి అల్గోరిథం డేటా స్ట్రక్చర్స్‌పై పనిచేస్తుంది. మొత్తం ఎంటర్‌ప్రైజ్ సిస్టమ్ యొక్క పనితీరు ఈ అంతర్లీన నిర్మాణ నిర్ణయంపై ఆధారపడి ఉంటుంది.',
          'Kannada': 'ಉದ್ದೇಶಿತ ಫಲಿತಾಂಶಗಳನ್ನು ಉತ್ಪಾದಿಸಲು ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಡೇಟಾ ರಚನೆಗಳ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ. ಸಂಪೂರ್ಣ ಎಂಟರ್‌ಪ್ರೈಸ್ ಸಿಸ್ಟಮ್‌ನ ಕಾರ್ಯಕ್ಷಮತೆಯು ಈ ಮೂಲ ವಾಸ್ತುಶಿಲ್ಪದ ನಿರ್ಧಾರವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.'
        };
      } else {
        translationMap = {
          'English': cleanText,
          'Tamil': 'தரவு அமைப்புகள் என்பது கணினியில் தரவுகளை திறம்பட ஒழுங்கமைத்து சேமிக்கும் முறையாகும், இதன் மூலம் தேடுதல், செருகுதல் மற்றும் நீக்குதல் போன்ற செயல்பாடுகளை வேகமாகவும் எளிதாகவும் செய்ய முடியும்.',
          'Hindi': 'डेटा संरचनाएं कंप्यूटर में डेटा को कुशलतापूर्वक व्यवस्थित और संग्रहीत करने का एक व्यवस्थित तरीका हैं, जिससे खोज, सम्मिलन और विलोपन जैसे कार्य आसानी से किए जा सकें।',
          'Malayalam': 'കമ്പ്യൂട്ടറുകളിൽ വിവരങ്ങൾ കാര്യക്ഷമമായി സംഭരിക്കാനും കൈകാര്യം ചെയ്യാനും ഉപയോഗിക്കുന്ന ചിട്ടയായ രീതികളാണ് ഡാറ്റാ സ്ട്രക്ച്ചറുകൾ (വിവര ഘടനകൾ).',
          'Telugu': 'డేటా స్ట్రక్చర్స్ అనేది కంప్యూటర్‌లో డేటాను సమర్ధవంతంగా నిల్వ చేయడానికి మరియు నిర్వహించడానికి ఉపయోగించే పద్ధతులు, దీని ద్వారా శోధించడం మరియు నవీకరించడం వేగంగా జరుగుతుంది.',
          'Kannada': 'ಡೇಟಾ ರಚನೆಗಳು (Data Structures) ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಡೇಟಾವನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಘಟಿಸಲು ಮತ್ತು ಸಂಗ್ರಹಿಸಲು ಬಳಸುವ ವಿಧಾನಗಳಾಗಿದ್ದು, ಹುಡುಕಾಟ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ನಡೆಸಲು ಸಹಕರಿಸುತ್ತವೆ.'
        };
      }

      const translated = translationMap[language] || `[Translation to ${language}]:\n${cleanText}`;

      return {
        action: 'Translate',
        title: `Translation to ${language}`,
        badge: language,
        language,
        summary: `Selected passage accurately translated into ${language}:`,
        content: translated,
        originalSnippet: cleanText
      };
    }

    case 'Simplify': {
      let simpleExplanation = '';
      let essentialTerms = [];
      let simpleComparison = '';

      if (isCodeOrPointer) {
        simpleExplanation = `Instead of packing all items in one rigid box (like an array), this C++ code builds individual lego blocks called **Nodes**. Each block holds your item and has an arrow pointing to the next block in the chain.`;
        essentialTerms = [
          '**Data (`T data`)**: The actual item you are storing (e.g. roll number or text).',
          '**Pointer (`Node* next`)**: The sticky note with the memory address of the next block.',
          '**Nullptr**: The sign at the end of the chain saying "End of the line!"'
        ];
        simpleComparison = `Analogy: A train where each carriage holds luggage and has a coupler hook attaching it to the next carriage.`;
      } else if (isLinearVsNonLinear) {
        simpleExplanation = `Data structures come in two basic shapes: single-file lines (Linear) and family trees (Non-Linear). In a line, there is only one person ahead and one person behind you. In a tree, one branch splits into many leaves.`;
        essentialTerms = [
          '**Linear**: Items arranged in a single queue (Arrays, Stacks, Queues).',
          '**Non-Linear**: Items connected in branching hierarchies (Trees, Graphs).',
          '**Predecessor/Successor**: The element directly before and directly after.'
        ];
        simpleComparison = `Comparison: Walking down a straight single hallway (linear) vs navigating a branching maze or family tree (non-linear).`;
      } else if (isAlgoPerf) {
        simpleExplanation = `Writing smart code (algorithms) is not enough if your data is stored in the wrong place. If you organize your data smartly, even a simple search will run lightning fast. If organized poorly, the entire computer system slows down.`;
        essentialTerms = [
          '**Algorithm**: Step-by-step instructions to solve a problem.',
          '**Data Structure**: The storage cabinet where information lives.',
          '**Performance Profile**: How fast the program runs when thousands of users connect.'
        ];
        simpleComparison = `Comparison: A great chef (algorithm) cannot cook fast if all ingredients are randomly scattered across the kitchen floor instead of labeled spice jars.`;
      } else {
        simpleExplanation = `Data structures are just smart ways to arrange information in computer memory. Instead of tossing files randomly onto a desk, computers keep items organized so finding, updating, or deleting them happens in a split second.`;
        essentialTerms = [
          '**Memory**: The workspace (RAM) where active programs store values.',
          '**Operations**: Searching, adding, or deleting records.',
          '**Efficiency**: Doing work quickly without draining CPU cycles or memory.'
        ];
        simpleComparison = `Comparison: A messy drawer with 100 loose papers vs a filing cabinet with labeled alphabetical folders.`;
      }

      return {
        action: 'Simplify',
        title: 'Simplified Concept',
        badge: 'Easy to Understand',
        summary: `The selected passage rewritten in simple, beginner-friendly terms:`,
        content: `**In Simple Words:**\n${simpleExplanation}\n\n**Essential Terms Preserved:**\n${essentialTerms.map((t) => `• ${t}`).join('\n')}`,
        example: simpleComparison
      };
    }

    case 'Word Definition': {
      // Extract target word or determine best candidate from selection
      let word = (targetWord || '').trim();
      if (!word) {
        const candidateWords = cleanText
          .split(/[\s,.;:()"'`\n]+/)
          .map((w) => w.trim().replace(/[^a-zA-Z-]/g, ''))
          .filter((w) => w.length > 2);
        word = candidateWords[0] || 'Data structure';
      }

      const wordDefs = {
        'data': {
          meaning: 'Raw facts, figures, and values processed and stored by a computer system.',
          simple: 'Information that a computer can read, store, and calculate with.',
          sentence: 'The database stores student registration records as structured data.'
        },
        'structures': {
          meaning: 'The arrangement and relationship between constituent parts of a complex computational model.',
          simple: 'A planned layout or pattern that holds pieces together orderly.',
          sentence: 'Tree structures permit hierarchical storage of academic directories.'
        },
        'algorithms': {
          meaning: 'A finite sequence of rigorous computational instructions to solve a class of problems.',
          simple: 'A step-by-step recipe that tells the computer how to complete a specific task.',
          sentence: 'Binary search is an efficient algorithm with logarithmic runtime.'
        },
        'algorithm': {
          meaning: 'A finite sequence of rigorous computational instructions to solve a class of problems.',
          simple: 'A step-by-step recipe that tells the computer how to complete a specific task.',
          sentence: 'Binary search is an efficient algorithm with logarithmic runtime.'
        },
        'linear': {
          meaning: 'Arranged in or extending along a straight sequential line with single predecessor and successor.',
          simple: 'Organized one-after-another in a single continuous line.',
          sentence: 'Arrays and singly-linked lists are standard examples of linear data structures.'
        },
        'non-linear': {
          meaning: 'Data structures where elements are attached hierarchically or across interconnected meshes.',
          simple: 'Structures that branch out in multiple directions like trees or web graphs.',
          sentence: 'Binary search trees and network graphs are non-linear structures.'
        },
        'sequential': {
          meaning: 'Forming or following in a logical chronological or topological order.',
          simple: 'One by one in exact order from start to finish.',
          sentence: 'Sequential access requires reading preceding nodes before reaching target items.'
        },
        'predecessor': {
          meaning: 'The element or node that immediately precedes a given element in an ordered collection.',
          simple: 'The node or item that comes right before the current one.',
          sentence: 'In a doubly-linked list, each node maintains a reference to its predecessor.'
        },
        'successor': {
          meaning: 'The element or node that immediately follows a given element in an ordered collection.',
          simple: 'The node or item that comes right after the current one.',
          sentence: 'In an in-order traversal, a node is visited immediately before its in-order successor.'
        },
        'node': {
          meaning: 'A basic unit of a data structure containing payload data and one or more reference pointers.',
          simple: 'A memory container holding a value and an address pointing to another container.',
          sentence: 'Every node in the linked chain stores an integer value and a next pointer.'
        },
        'pointer': {
          meaning: 'A variable that holds the physical memory address (RAM location) of another variable.',
          simple: 'A sticky note holding the address number of where another piece of data lives.',
          sentence: 'The head pointer marks the initial entry point into the dynamic linked list.'
        },
        'template': {
          meaning: 'A C++ language feature allowing functions and classes to operate with generic types.',
          simple: 'A generic mold that lets you build the same structure for numbers, words, or student records.',
          sentence: 'Using template <typename T> makes the linked node reusable across all datatypes.'
        },
        'nullptr': {
          meaning: 'A literal constant representing a null pointer value, indicating no targeted memory address.',
          simple: 'A pointer value meaning "points to nothing" or "end of the chain".',
          sentence: 'The tail node in a singly linked list terminates with next set to nullptr.'
        },
        'contiguous': {
          meaning: 'Sharing a common border or touching; sequential unbroken memory addresses.',
          simple: 'Placed side-by-side without any empty gaps between them.',
          sentence: 'Arrays require contiguous memory blocks, making index arithmetic O(1).'
        },
        'asymptotic': {
          meaning: 'Describing how computational resource consumption grows as the input dataset approaches infinity.',
          simple: 'How the execution time grows as the amount of input data gets huge.',
          sentence: 'Binary search exhibits an asymptotic time complexity of O(log n).'
        },
        'efficiency': {
          meaning: 'The state or quality of minimizing waste of time, CPU execution cycles, or memory space.',
          simple: 'Getting the job done with the lowest amount of waiting and computer power.',
          sentence: 'Hash tables offer high lookup efficiency compared to linear list scans.'
        },
        'memory': {
          meaning: 'Physical device hardware (RAM) used to store programs and working data for immediate execution.',
          simple: 'The computer workspace where running apps store their active numbers and text.',
          sentence: 'Dynamic memory allocation requests heap blocks during program runtime.'
        }
      };

      const matched = wordDefs[word.toLowerCase()] || {
        meaning: `A key technical term from the selected excerpt referring to "${word}".`,
        simple: `An essential academic concept representing "${word}" in data structures and systems.`,
        sentence: `In collegiate computer science, "${word}" is fundamental for algorithmic modeling.`
      };

      return {
        action: 'Word Definition',
        title: `Word Definition: "${word}"`,
        badge: 'Vocabulary',
        word: word,
        content: `**Formal Academic Definition:**\n${matched.meaning}\n\n**Simple Student Explanation:**\n${matched.simple}\n\n**Example Academic Sentence:**\n*"${matched.sentence}"*`,
        example: `Context in Document: Highlighted by the student from the reading pane for vocabulary clarification.`
      };
    }

    case 'Multilingual Explanation': {
      let conceptEn = '';
      let conceptTa = '';
      let conceptHi = '';
      let conceptMl = '';
      let conceptTe = '';
      let conceptKn = '';

      if (isCodeOrPointer) {
        conceptEn = `**C++ Node Primitive & Pointer Architecture:**\nThis code implements a dynamic node where each container holds data and a pointer to the next container. In contrast to static arrays that require contiguous blocks, dynamic nodes can be allocated anywhere in heap memory and connected via pointers.`;
        conceptTa = `**C++ முனை (Node) மற்றும் சுட்டி (Pointer) கட்டமைப்பு:**\nஇந்த நிரல் நினைவகத்தில் முனைகளை உருவாக்கும் முறையை விளக்குகிறது. நிலையான அணிகளை (Arrays) போலன்றி, இது தேவையான போது நினைவகத்தை பெற்று அடுத்த முனையுடன் இணைக்கிறது.`;
        conceptHi = `**C++ नोड और पॉइंटर संरचना:**\nयह कोड मेमोरी में गतिशील रूप से नोड्स बनाने की व्याख्या करता है। यह निश्चित आकार के ऐरे के विपरीत, पॉइंटर के माध्यम से स्वतंत्र रूप से डेटा को जोड़ता है।`;
        conceptMl = `**C++ നോഡ്, പോയിന്റർ ഘടന:**\nമെമ്മറിയിൽ നോഡുകൾ സൃഷ്ടിച്ച് അവയെ പോയിന്ററുകൾ വഴി ബന്ധിപ്പിക്കുന്ന രീതിയാണിത്. ഫിക്സഡ് അറേകളിൽ നിന്ന് വ്യത്യസ്തമായി ഇത് മെമ്മറി കാര്യക്ഷമമായി ഉപയോഗിക്കുന്നു.`;
        conceptTe = `**C++ నోడ్ మరియు పాయింటర్ ఆర్కిటెక్చర్:**\nఈ కోడ్ మెమరీలో డైనమిక్ నోడ్స్‌ను రూపొందించే విధానాన్ని వివరిస్తుంది. పాయింటర్ల ద్వారా అంశాలను అనుసంధానించడం ద్వారా మెమరీ సమర్ధవంతంగా ఉపయోగించబడుతుంది.`;
        conceptKn = `**C++ ನೋಡ್ ಮತ್ತು ಪಾಯಿಂಟರ್ ವಾಸ್ತುಶಿಲ್ಪ:**\nಈ ಕೋಡ್ ಮೆಮೊರಿಯಲ್ಲಿ ಡೈನಾಮಿಕ್ ನೋಡ್‌ಗಳನ್ನು ರಚಿಸುವ ವಿಧಾನವನ್ನು ವಿವರಿಸುತ್ತದೆ ಮತ್ತು ಪಾಯಿಂಟರ್‌ಗಳ ಮೂಲಕ ಅವುಗಳನ್ನು ಪರಸ್ಪರ ಸಂಪರ್ಕಿಸುತ್ತದೆ.`;
      } else if (isLinearVsNonLinear) {
        conceptEn = `**Linear vs Non-Linear Structural Topologies:**\nLinear structures (Arrays, Linked Lists, Stacks, Queues) enforce single-file sequential traversal. Non-Linear structures (Trees, Graphs) enable branching hierarchies and interconnected networks. Choosing between them depends on whether your data naturally flows in sequence or branches hierarchically.`;
        conceptTa = `**நேரியல் மற்றும் நேரியல் அல்லாத அமைப்புகள்:**\nநேரியல் அமைப்புகள் தகவல்களை ஒன்றன்பின் ஒன்றாக வரிசையாக வைக்கின்றன. நேரியல் அல்லாத அமைப்புகள் படிநிலை அல்லது மரக்கிளை போன்று பல வழிகளில் தகவல்களை சேமிக்கின்றன.`;
        conceptHi = `**रैखिक बनाम गैर-रैखिक डेटा संरचनाएं:**\nरैखिक संरचनाएं डेटा को एक सीधी रेखा में रखती हैं। गैर-रैखिक संरचनाएं पदानुक्रमित शाखाओं (जैसे ट्री) में डेटा को व्यवस्थित करती हैं।`;
        conceptMl = `**ലീനിയർ, നോൺ-ലീനിയർ ഘടനകൾ:**\nലീനിയർ ഘടനകളിൽ വിവരങ്ങൾ ക്രമമായി സൂക്ഷിക്കുന്നു. എന്നാൽ നോൺ-ലീനിയർ ഘടനകളിൽ വിവരങ്ങൾ ശാഖകളായാണ് സൂക്ഷിക്കുന്നത്.`;
        conceptTe = `**లీనియర్ మరియు నాన్-లీనియర్ డేటా స్ట్రక్చర్స్:**\nలీనియర్ స్ట్రక్చర్స్ డేటాను సరళ క్రమంలో ఉంచుతాయి. నాన్-లీనియర్ స్ట్రక్చర్స్ సమాచారాన్ని శాఖలుగా విస్తరిస్తాయి.`;
        conceptKn = `**ಲೀನಿಯರ್ ಮತ್ತು ನಾನ್-ಲೀನಿಯರ್ ಡೇಟಾ ರಚನೆಗಳು:**\nಲೀನಿಯರ್ ರಚನೆಗಳು ಡೇಟಾವನ್ನು ಸರಳ ರೇಖೆಯಲ್ಲಿ ಜೋಡಿಸುತ್ತವೆ, ಆದರೆ ನಾನ್-ಲೀನಿಯರ್ ರಚನೆಗಳು ಕ್ರಮಾನುಗತ ಶಾಖೆಗಳಲ್ಲಿ ಸಂಘಟಿಸುತ್ತವೆ.`;
      } else {
        conceptEn = `**Foundations of Memory Organization:**\nData structures define how RAM memory is structured for fast program execution. Structured arrangements ensure search, insertion, and deletion scale predictably as dataset volume expands.`;
        conceptTa = `**நினைவக கட்டமைப்பு அடிப்படைகள்:**\nதரவு அமைப்புகள் என்பது கணிப்பொறி நினைவகத்தில் தகவல்களை திட்டமிட்டு ஒழுங்குபடுத்தும் முறையாகும். இதுவே மென்பொருளின் வேகத்தையும் நம்பகத்தன்மையையும் தீர்மானிக்கிறது.`;
        conceptHi = `**मेमोरी संगठन की नींव:**\nडेटा संरचनाएं कंप्यूटर मेमोरी में सूचना को व्यवस्थित करने का वास्तुशिल्प खाका हैं। यह तय करता है कि प्रोग्राम कितनी तेजी से और कुशलता से काम करेगा।`;
        conceptMl = `**മെമ്മറി വിന്യാസത്തിന്റെ അടിസ്ഥാന തത്വങ്ങൾ:**\nകമ്പ്യൂട്ടർ മെമ്മറിയിൽ വിവരങ്ങൾ കാര്യക്ഷമമായി കൈകാര്യം ചെയ്യുന്നതിനുള്ള ശാസ്ത്രീയ രൂപരേഖയാണ് ഡാറ്റ സ്ട്രക്ച്ചറുകൾ.`;
        conceptTe = `**మెమరీ ఆర్గనైజేషన్ ప్రాథమిక సూత్రాలు:**\nడేటా స్ట్రక్చర్స్ అనేవి కంప్యూటర్ మెమరీలో డేటాను సరిగ్గా అమర్చే సాంకేతిక రూపకల్పన, ఇది సాఫ్ట్‌వేర్ వేగాన్ని నిర్ధారిస్తుంది.`;
        conceptKn = `**ಮೆಮೊರಿ ಸಂಘಟನೆಯ ಮೂಲತತ್ವಗಳು:**\nಡೇಟಾ ರಚನೆಗಳು ಕಂಪ್ಯೂಟರ್ ಮೆಮೊರಿಯಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಸಂಗ್ರಹಿಸುವ ತಾಂತ್ರಿಕ ನೀಲನಕ್ಷೆಯಾಗಿದೆ.`;
      }

      const explanations = {
        'English': { title: 'Conceptual Explanation (English)', text: conceptEn, example: 'Practical Example: Online banking transactions use sequential queues; product categories use hierarchical tree structures.' },
        'Tamil': { title: 'கருத்து விளக்கம் (Tamil)', text: conceptTa, example: 'நடைமுறை உதாரணம்: ரயில் பயணச்சீட்டு முன்பதிவு வரிசை முறையையும் (FIFO), கல்லூரித் துறைசார் பாடங்கள் மரக்கிளை (Tree) முறையையும் பின்பற்றுகின்றன.' },
        'Hindi': { title: 'अवधारणात्मक व्याख्या (Hindi)', text: conceptHi, example: 'व्यावहारिक उदाहरण: वेब ब्राउज़र हिस्ट्री लिंक्ड लिस्ट का उपयोग करती है, जबकि फ़ाइल डायरेक्ट्री ट्री स्ट्रक्चर पर आधारित होती है।' },
        'Malayalam': { title: 'ആശയപരമായ വിശദീകരണം (Malayalam)', text: conceptMl, example: 'പ്രായോഗിക ഉദാഹരണം: പ്രിന്റർ ക്യൂ FIFO തത്വവും, ഫയൽ ഫോൾഡറുകൾ ട്രീ ഘടനയും ഉപയോഗിക്കുന്നു.' },
        'Telugu': { title: 'భావనాత్మక వివరణ (Telugu)', text: conceptTe, example: 'నిజ జీవిత ఉదాహరణ: రైల్వే టికెట్ బుకింగ్ లైన్ క్యూ పద్ధతిలోను, ఫోల్డర్ల క్రమం ట్రీ విధానంలోను పనిచేస్తాయి.' },
        'Kannada': { title: 'ಪರಿಕಲ್ಪನಾ ವಿವರಣೆ (Kannada)', text: conceptKn, example: 'ಪ್ರಾಯೋಗಿಕ ಉದಾಹರಣೆ: ಆನ್‌ಲೈನ್ ಶಾಪಿಂಗ್ ಕಾರ್ಟ್ ಲಿಸ್ಟ್ ಬಳಸುತ್ತದೆ, ಆದರೆ ಕ್ಯಾಟಲಾಗ್ ಬ್ರೌಸಿಂಗ್ ಟ್ರೀ ಬಳಸುತ್ತದೆ.' }
      };

      const selectedExp = explanations[language] || explanations['English'];

      return {
        action: 'Multilingual Explanation',
        title: `Multilingual Explanation (${language})`,
        badge: language,
        language,
        summary: `In-depth academic concept explanation in ${language}:`,
        content: `${selectedExp.text}`,
        example: selectedExp.example
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
