export const diagramTypes = [
  "Flowchart",
  "Sequence Diagram",
  "Mindmap",
  "Class Diagram",
  "State Diagram",
  "ER Diagram",
  "C4 Diagram",
  "User Journey",
  "Gantt Diagram",
  "Pie Chart",
  "Quadrant Chart",
  "Requirement Diagram",
  "Git Graph",
  "Timeline",
  "Sankey Diagram",
  "XY Chart",
  "Block Diagram",
];

export const templates = {
  Flowchart: [
    {
      name: "General",
      code: `
graph TD
    A --> B
    A --> C
    B --> D
    C --> D
`,
    },
    {
      name: "With Subgraph Lane",
      code: `
graph TD
    subgraph Cluster1
        A1 --> B1
        A1 --> C1
    end
    subgraph Cluster2
        B1 --> D1
        C1 --> D1
    end
    D1 --> E1

`,
    },
    {
      name: "Layered Diagram",
      code: `
graph TB
  subgraph top
      subgraph SA[Planning and Analysis]
          pa1("
          Data Collection
          Requirement Analysis
          ")
          pa2("
          Feasibility Study
          Risk Assessment
          ")
          pa3("
          Resource Planning
          Project Scheduling
          ")
      end

      subgraph SB[Design and Development]
          subgraph SB1[Design]
              direction RL
              d1("
              UI/UX Design
              Wireframing
              ")
              d2("
              Prototyping
              Design Review
              ")
          end

          subgraph SB2[Development]
              direction RL
              dv1("
              Frontend Development
              Backend Development
              ")
              dv2("
              Database Design
              Integration
              ")
          end
      end

      subgraph SC[Testing and Deployment]
          subgraph SC1[Testing]
              direction RL
              t1("
              Test Planning
              Test Execution
              ")
              t2("
              Bug Reporting
              User Acceptance Testing
              ")
          end

          subgraph SC2[Deployment]
              direction RL
              de1("
              DevOps
              Continuous Integration
              ")
              de2("
              Release Management
              Deployment Automation
              ")
          end
      end
  end
`,
    },
    {
      name: "Tree Map",
      code: `
graph TD
    A --> B
    A --> C
    B --> D
    B --> E
    C --> F
    C --> G

`,
    },
    {
      name: "Colored",
      code: `
graph TD
    A[Main] --> B[Process 1]
    A --> C[Process 2]
    B --> D[Process 3]
    C --> D
    style A fill:#8fbc8f
    style B fill:#87ceeb
    style C fill:#ffb6c1
    style D fill:#afeeee
`,
    },
    {
      name: "Colored With Subgraph",
      code: `
graph TD
    subgraph Cluster1
        A1 --> B1
        B1 --> C1
        style Cluster1 fill:#ffffe0
    end
    subgraph Cluster2
        D1 --> E1
        E1 --> F1
        style Cluster2 fill:#f0e68c
    end
    C1 --> G1
    G1 --> F1
    style A1 fill:#ffb6c1
    style B1 fill:#87ceeb
    style C1 fill:#98fb98
    style D1 fill:#dda0dd
    style E1 fill:#fa8072
    style F1 fill:#afeeee
    style G1 fill:#dda0dd
`,
    },
    {
      name: "Directory Structure",
      code: `
graph LR
    A[Root] --> B[Folder 1]
    A --> C[Folder 2]
    B --> D[Subfolder 1.1]
    B --> E[Subfolder 1.2]
    C --> F[Subfolder 2.1]
    C --> G[Subfolder 2.2]
    E --> H[File 1.2.1]
    E --> I[File 1.2.2]
`,
    },
    {
      name: "SWOT Analysis",
      code: `
graph TD
    subgraph SWOT
        A[Strengths] 
        B[Weaknesses]
        C[Opportunities]
        D[Threats]
    end
`,
    },
    {
      name: "Use Case",
      code: `
graph TD
    actor(User) --> |Uses| A[Feature 1]
    actor(User) --> |Uses| B[Feature 2]
    A --> C[Sub-feature 1.1]
    A --> D[Sub-feature 1.2]
    B --> E[Sub-feature 2.1]
    B --> F[Sub-feature 2.2]
`,
    },
    {
      name: "Network",
      code: `
graph LR
  wan1[Connection 1 Item1_IP1]---router{Router Router_IP}
  ip("ISP")-.-router
  dns("DNS")-.-router
  wan2[Connection 2 Item2_IP2]---router
  router---|Speed1|switch1[Main Switch Switch1_IP]
  router---|Speed2|firewall[Firewall Firewall_IP]
  subgraph Office
  switch1-.-server1[Server 1 Server1_IP]
  switch1-.-workstation1[Workstation 1 WS1_IP]
  switch1-.-workstation2[Workstation 2 WS2_IP]
  switch1-.-printer1[Office Printer Printer1_IP]
  firewall---|Speed3|guestwifi[Guest WiFi Router GuestWiFi_IP]
  end
`,
    },
    {
      name: "Planning / Processing",
      code: `
graph TD
    A[Step 1] --> B[Step 2]
    B --> C[Step 3]
    C --> D[Step 4]
`,
    },
    {
      name: "Decision Tree",
      code: `
graph TD
    A[Decision] --> B{Option 1}
    A --> C{Option 2}
    B --> D[Outcome 1.1]
    B --> E[Outcome 1.2]
    C --> F[Outcome 2.1]
    C --> G[Outcome 2.2]
`,
    },
    {
      name: "Mind Map",
      code: `
graph LR
    A[Central Idea] --> B[Main Topic 1]
    A --> C[Main Topic 2]
    A --> D[Main Topic 3]
    A --> E[Main Topic 4]
    B --> F[Subtopic 1.1]
    B --> G[Subtopic 1.2]
    C --> H[Subtopic 2.1]
    C --> I[Subtopic 2.2]
    D --> J[Subtopic 3.1]
    D --> K[Subtopic 3.2]
    E --> L[Subtopic 4.1]
    E --> M[Subtopic 4.2]
`,
    },
    {
      name: "Organizational Chart",
      code: `
graph TD
    A[CEO] --> B[CTO]
    A --> C[CFO]
    A --> D[COO]
    B --> E[Engineering Manager]
    B --> F[Product Manager]
    C --> G[Accounting Manager]
    C --> H[Finance Manager]
    D --> I[Operations Manager]
    D --> J[Logistics Manager]
`,
    },
    {
      name: "Dataflow using database",
      code: `
flowchart TD
  A[Actor]
  B[Service 1]
  C[(Database 1)]
  D[(Database 2)]
  E[(Database 3)]
  F[Process 1]
  G[(Database 4)]
  H[(Storage)]
  I[(Warehouse)]
  J[Service 2]

  A -- action 1 --> B -- action 2 --> D
  A -- action 3 --> B -- action 4 --> C
  C -- action 5 --> E
  E -- action 6 --> D
  C -- action 7 --> F -- action 8 --> G
  B -- action 9 --> H
  H -- action 10 --> F -- action 11 --> I
  G -- action 12 --> J
  I -- action 13 --> J
`,
    },
  ],
  "Sequence Diagram": [
    { name: "Basic Sequence", code: "sequenceDiagram; A->>B: Hello;" },
    {
      name: "Advanced Sequence",
      code: "sequenceDiagram; participant A; participant B; A->>B: Message;",
    },
  ],
};
