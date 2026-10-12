export interface AcademicCvData {
  personalInfo: {
    name: string
    title: string
    keywords: string
    degreeSummary: string
    institution: string
    email: string
    phone: string
    whatsapp: string
    location: string
    nationality: string
    linkedin: string
    portfolioUrl: string
    summary: string
  }
  education: Array<{
    degree: string
    institution: string
    period: string
    location: string
    fieldOfStudy: string
    grade: string
    eqfLevel: string
    distinction?: string
    thesis?: string
    courses?: string[]
  }>
  researchExperience: Array<{
    title: string
    period: string
    role: string
    organization: string
    summary: string
    highlights: string[]
    link?: string
    doi?: string
    venue?: string
  }>
  workExperience: Array<{
    role: string
    organization: string
    location: string
    period: string
    scope: string
    responsibilities: string[]
    tools: string[]
  }>
  projects: Array<{
    title: string
    description: string
    tools: string[]
  }>
  certifications: Array<{
    title: string
    issuer: string
    date?: string
    credentialId?: string
    detail: string
    link?: string
  }>
  professionalTrainings: {
    cpdSeminars: Array<{
      title: string
      speaker: string
      points: string
      date: string
      detail: string
      link?: string
    }>
    workshops: Array<{
      title: string
      organizer: string
      date: string
      detail: string
      link?: string
    }>
    conferences: Array<{
      title: string
      role: string
      organizer: string
      date: string
      detail: string
      link?: string
    }>
  }
  skills: {
    coreCompetencies: string[]
    softwareAndTools: string[]
    softSkills: string[]
  }
  honorsAndAwards: Array<{
    title: string
    category: 'Gold Medal' | 'Scholarship' | 'Merit Position' | 'Competition' | 'FYP Award'
    awarder: string
    period: string
    detail: string
    link?: string
  }>
  volunteering: Array<{
    title: string
    organization?: string
    location?: string
    period: string
    detail: string
    link?: string
  }>
  extracurricular: Array<{
    title: string
    period?: string
    detail: string
    link?: string
  }>
  languages: Array<{
    language: string
    level: string
    detail: string
    isMotherTongue?: boolean
  }>
}

export const academicCv: AcademicCvData = {
  personalInfo: {
    name: 'Kashan Shafiq',
    title: 'Civil Engineer',
    keywords: 'Gold Medalist · Civil Engineer',
    degreeSummary: 'BS in Civil Engineering · CGPA 3.95/4.00 (98%) · Gold Medalist',
    institution: 'COMSATS University Islamabad, Wah Campus',
    email: 'kashankashi27@gmail.com',
    phone: '(+92) 3155915676',
    whatsapp: '+923155915676',
    location: '47040, Wah Cantt / Islamabad, Pakistan',
    nationality: 'Pakistani',
    linkedin: 'https://www.linkedin.com/in/kashan-shafiq-11764229b/',
    portfolioUrl: 'https://kashanshafiq.com',
    summary:
      'Civil Engineer with strong fundamentals in structural analysis and RC design, backed by hands-on ETABS/SAFE modeling experience. My Final Year Project integrated BIM with AR to enable constructability checks during design and clearer stakeholder communication, reducing rework and supporting sustainable design practice. Complemented by a proactive, leadership-driven approach, this grounds my pursuit of graduate research in structural dynamics, finite element methods, advanced materials, and sustainable design.',
  },

  education: [
    {
      degree: 'BS IN CIVIL ENGINEERING',
      institution: 'Comsats University Islamabad, Wah Campus',
      period: '2022/09/12 – 2026/07/06',
      location: 'Wah Cantt, Pakistan',
      fieldOfStudy: 'Building and civil engineering',
      grade: 'Final grade 3.95/4 (98%)',
      eqfLevel: 'EQF level 6',
      distinction: 'Gold Medalist · 1st in Graduating Class across all 8 Semesters',
      thesis: 'BIM-to-AR Integration for Construction Layout Visualization',
      courses: [
        'Reinforced Concrete Design I & II',
        'Design of structures',
        'Structural Analysis (Determinate & Indeterminate)',
        'Matrix Analysis of Structures',
        'Steel Structures',
        'Geotechnical & Foundation Engineering',
        'Properties of Concrete',
        'Engineering Materials',
        'Project Planning & Management',
      ],
    },
  ],

  researchExperience: [
    {
      title: 'BIM-to-AR Integration for Construction Layout Visualization — Final Year Project',
      period: '2025/09/01 – 2026/05/29',
      role: 'Lead Researcher & Developer',
      organization: 'Department of Civil Engineering, COMSATS University Islamabad, Wah Campus',
      summary:
        'Standardized BIM-to-AR mobile deployment framework converting Autodesk Revit geometries into real-time Android AR applications for on-site layout verification and clash detection.',
      highlights: [
        'Built a standardized BIM-to-AR pipeline converting Revit models into Android AR apps for real-time on-site layout verification.',
        'Developed and field-validated three Unity-based AR deployment modes — marker-based, ground-plane, GPS-anchored — within acceptable construction tolerances.',
        'Integrated model scaling, transparency control, and component-level visibility toggling for structural/architectural/MEP inspection without specialist hardware.',
      ],
      link: '/research/bim-to-ar',
      doi: 'https://doi.org/10.2139/ssrn.6884926',
      venue: 'SSRN Electronic Journal & 3rd Position at CUI Open House & Job Fair 2026',
    },
  ],

  workExperience: [
    {
      role: 'Junior BIM Modeler (Scan-to-BIM Specialist)',
      organization: 'Archnetix',
      location: 'Islamabad, Pakistan',
      period: '2026 – Present',
      scope: 'Laser Scan Point Cloud to High-Precision Autodesk Revit Models',
      responsibilities: [
        'Converts 3D terrestrial laser scan point cloud datasets into coordinated Autodesk Revit building models.',
        'Develops structural, architectural, and MEP components to LOD 300 and LOD 350 specifications for retrofit, renovation, and as-built documentation.',
        'Executes multi-discipline clash detection, quality assurance checks, and strict conformance with client BIM execution plans.',
      ],
      tools: ['Autodesk Revit', 'Point Cloud Data', 'AutoCAD', 'LOD 300/350'],
    },
    {
      role: 'ENGINEERING INTERNEE',
      organization: 'MOUNT KHALID',
      location: 'ISLAMABAD, PAKISTAN',
      period: '2025/07/07 – 2025/08/25',
      scope: '45-Storey High-Rise Residential Tower Construction & BIM Coordination',
      responsibilities: [
        'Supported field and technical teams on a 45-storey high-rise residential tower, coordinating BIM information with site execution requirements.',
        'Modeled 70,000+ structural and architectural elements to LOD 300 in Autodesk Revit, including RC columns, beams, posttensioned slabs, and facades.',
        'Gained hands-on exposure to post-tensioned slab construction, including coordination of PT slab elements with structural and architectural requirements.',
        'Reviewed clash-detection outputs and supported Structural–Architectural coordination for a post-tensioned, high-strength concrete building using concrete strengths of approximately 5,000–10,600 psi.',
      ],
      tools: ['Autodesk Revit', 'PT Slab Coordination', 'LOD 300', 'Clash Detection', 'High-Rise Construction'],
    },
    {
      role: 'ENGINEERING INTERNEE',
      organization: 'SIMCO',
      location: 'ISLAMABAD, PAKISTAN',
      period: '2024/07/01 – 2024/07/31',
      scope: 'Site Management, Field Execution, QA/QC Inspection & Quantity Take-offs',
      responsibilities: [
        'Interpreted and cross-checked structural, architectural, and site-layout drawings against live construction activities, identifying discrepancies for engineer review.',
        'Supported field execution and inspection activities, including slab-related construction exposure, reinforcement, formwork, and concrete works.',
        'Performed QA/QC checks on concrete curing, formwork, and rebar cover and reported observations to improve compliance with construction requirements.',
        'Calculated full-floor steel reinforcement weights and performed quantity take-offs for bricks, steel, and concrete, supporting material requisition and BOQ reconciliation.',
      ],
      tools: ['Drawing Interpretation', 'Site QA/QC', 'Reinforcement Inspection', 'Quantity Take-offs', 'BOQ Reconciliation'],
    },
  ],

  projects: [
    {
      title: 'Structural Analysis & Design of Commercial Building',
      description:
        'Modeled and designed a moment-resisting RC frame with shear walls, slabs, and footings for gravity and seismic loads (BCP-2021), per ACI 318-19 provisions; performed manual footing sizing with one-way/two-way shear checks and verified foundation design in SAFE.',
      tools: ['ETABS', 'SAFE', 'ACI 318-19', 'BCP-2021', 'Shear Walls'],
    },
    {
      title: 'Three-Story RC School Building Design',
      description:
        'Performed manual RC design per ACI 318-14/ASCE 7 for one-way slabs, singly/doubly reinforced beams, and columns; verified via AutoCAD/Revit structural drafts.',
      tools: ['ACI 318-14', 'ASCE 7', 'AutoCAD', 'Autodesk Revit', 'RC Design'],
    },
    {
      title: 'Design of Gravity and Cantilever Retaining Walls',
      description:
        'Built parametric Excel sheets for stability analysis (overturning, sliding, bearing capacity) with shear key and reinforcement detailing per code.',
      tools: ['Parametric Excel', 'Stability Analysis', 'Rankine Earth Pressure', 'Retaining Walls'],
    },
    {
      title: 'Quantity Surveying and Material Estimation',
      description:
        'Executed CAD-based material takeoffs and formulated BOQs (Bill of Quantities) for architectural and structural members of the building, including reinforcement, to support cost estimation.',
      tools: ['CAD Takeoffs', 'BOQ Formulation', 'Reinforcement Estimation', 'Costing'],
    },
    {
      title: 'Haroon Residence — BIM Design & Modeling',
      description:
        'Designed a CDA-compliant double-storey residence in Revit, producing full 2D/3D documentation and material take-offs while optimizing space utilization.',
      tools: ['Autodesk Revit', 'CDA Guidelines', '2D/3D Documentation', 'Space Optimization'],
    },
    {
      title: 'Primavera P6 Construction Scheduling — Tricon Villa',
      description:
        'Built a 12-month construction schedule using WBS/OBS frameworks, applying Earned Value Analysis to track budget and timeline performance.',
      tools: ['Primavera P6', 'WBS/OBS', 'Earned Value Analysis', 'CPM Scheduling'],
    },
    {
      title: 'Evaluation of Recycled Aggregate Concrete',
      description:
        'Investigated mechanical properties of concrete with 50% recycled aggregates, evaluating compressive strength, dry density, and workability for sustainable mix design.',
      tools: ['Recycled Aggregates', 'Compressive Strength', 'Workability Tests', 'Sustainable Mix Design'],
    },
    {
      title: 'Indeterminate Structural Analysis (RISA2D vs. Manual)',
      description:
        'Validated support reactions, deflections, and shear/bending moment diagrams by comparing manual calculations against RISA2D output.',
      tools: ['RISA-2D', 'Manual Calculations', 'SFD & BMD', 'Deflection Analysis'],
    },
    {
      title: 'Soil Bearing Capacity Analysis',
      description:
        'Conducted direct shear tests (ASTM D3080) and applied Terzaghi\'s theories to determine safe bearing capacity for footing design.',
      tools: ['ASTM D3080', 'Terzaghi Theory', 'Direct Shear Test', 'Bearing Capacity'],
    },
    {
      title: 'Water Treatment Sedimentation-cum-Coagulation Tank',
      description:
        'Ran jar tests for optimum alum dosage and designed a scalable sedimentation-cum-coagulation tank per WASA guidelines.',
      tools: ['Jar Testing', 'Alum Dosage', 'Sedimentation Design', 'WASA Guidelines'],
    },
    {
      title: 'Hydrological Analysis of Colorado River Catchment',
      description:
        'Analyzed a 600 sq-km catchment using the SCS-CN method, deriving unit/S-curve/synthetic hydrographs and estimating stream discharge.',
      tools: ['SCS-CN Method', 'Hydrographs', 'Discharge Estimation', 'Hydrology'],
    },
    {
      title: 'Combined Sewerage System Hydraulic Design',
      description:
        'Designed a code-compliant sewerage system for a 102-hectare catchment using EPA-SWMM, incorporating drop manholes to manage steep-terrain flow.',
      tools: ['EPA-SWMM', 'Hydraulic Modeling', 'Drop Manholes', 'Sewerage Networks'],
    },
  ],

  certifications: [
    {
      title: 'Master Structural Design of Buildings',
      issuer: 'Young Engineers Forum / E-Learning',
      detail:
        'Learned structural modeling in ETABS, including load application, analysis, and member design, through to detailing and foundation design in SAFE.',
      link: 'https://drive.google.com/file/d/1j9RUpx5MMwkCiRClTR1IqOeb9s6hflsr/view?usp=sharing',
    },
    {
      title: 'BIM Management: Revit Model Maintenance',
      issuer: 'LinkedIn Learning',
      detail:
        'Learned techniques for managing worksets, linked models, and file health to maintain large-scale Revit projects.',
      link: 'https://www.linkedin.com/learning/certificates/5d0ab33cc4a43036d165e9f6e8ed04483b65f8cf1d473311f33721b0e422a6b9?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B69nE82f7TIu0OCkyapEPFg%3D%3D',
    },
    {
      title: 'Revit For Beginners: Architecture, Structure and MEP',
      issuer: 'VIS Management Consulting Inc., Canada & CISD',
      detail:
        'Learned foundational modeling workflows across architectural, structural, and MEP disciplines, including families, views, and coordination basics.',
      link: 'https://drive.google.com/file/d/1Fb6-7TqBEhUImUxV9cBBm0OnMCvPKBSF/view?usp=sharing',
    },
    {
      title: 'Learning Revit 2023',
      issuer: 'LinkedIn Learning',
      detail:
        'Learned core Revit tools and workflows, including modeling, documentation, and annotation for building design.',
      link: 'https://www.linkedin.com/learning/certificates/e6a5ba422b1ffb7cf0da5fd91001ef9336326185b0a3e1fa4b3aabc22eef1cc1?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B69nE82f7TIu0OCkyapEPFg%3D%3D',
    },
    {
      title: 'Excel Essential Training (Microsoft 365)',
      issuer: 'LinkedIn Learning',
      detail:
        'Learned essential Excel functions, formulas, and data management techniques for engineering calculations and reporting.',
      link: 'https://www.linkedin.com/learning/certificates/478842037430d0dff9eb6fd276e7c600d985d5fe1779f9fe0eef92ccdd0bd0ed?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B69nE82f7TIu0OCkyapEPFg%3D%3D',
    },
    {
      title: 'English for Career Development MOOC — U.S. Dept. of State (OPEN/FHI 360)',
      issuer: 'U.S. Department of State / FHI 360',
      detail:
        'Completed professional English course covering resume and cover letter writing, job interview preparation, and professional networking communication description.',
      link: 'https://badges.parchment.com/public/assertions/BeVOZH94RU-G_z9Nm9WIgw',
    },
    {
      title: 'Understanding Augmented and Virtual Reality: An Introduction',
      issuer: 'LinkedIn Learning',
      detail:
        'Learned foundational AR/VR concepts and applications, complementing BIM-to-AR development work.',
      link: 'https://www.linkedin.com/learning/certificates/1ef8f65861d44c5211ab728cc9ee99bc7eeaab7591b59f17d0b98010cfa9ecba?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3Bx3RBNdQ2S2uaT6W%2BgzFMYQ%3D%3D',
    },
  ],

  professionalTrainings: {
    cpdSeminars: [
      {
        title: 'Finite Element Method: A Modern Tool for Structural Analysis in Civil Engineering',
        speaker: 'Dr. Engr. Zahid Shabir',
        points: '1.0 CPD Credit Point',
        date: '15 May 2025',
        detail:
          'Explored FEM applications for structural analysis and modeling, covering conceptual and practical use in civil engineering design.',
        link: 'https://drive.google.com/file/d/1LNap1LuGvWt-hezr-q3R4-YNzVEC2G7k/view?usp=sharing',
      },
      {
        title: 'Impact of Machine Learning in the Field of Civil Engineering',
        speaker: 'Dr. Muhammad Faisal Javed',
        points: '0.5 CPD Credit Point',
        date: '13 October 2022',
        detail:
          'Explored how ML techniques are transforming design, analysis, and decision-making processes in civil engineering.',
        link: 'https://drive.google.com/file/d/1K2QLNO9ofBrE-9ePgWVLkK-pKHoMjmD9/view?usp=sharing',
      },
      {
        title: 'Integrating Technologies in Civil Engineering',
        speaker: 'Dr. Naveed Anwar',
        points: '0.5 CPD Credit Point',
        date: '27 September 2023',
        detail:
          'Explored emerging digital tools and technology integration strategies across civil engineering practice and project delivery.',
        link: 'https://drive.google.com/file/d/1_BuWOnIMk3DTXkhCPAZAhcSuBluB00Zr/view?usp=sharing',
      },
      {
        title: 'Contemporary Strategies for the Restoration and Preservation of National Heritages',
        speaker: 'Prof. Dr. Anwar Khitab',
        points: '1.0 CPD Credit Point',
        date: '20 February 2025',
        detail:
          'Learned modern restoration and preservation strategies and techniques for heritage structures.',
        link: 'https://drive.google.com/file/d/1MUAemqSaowgMKSIV7xFlarj4PZNP-U2D/view?usp=sharing',
      },
      {
        title: 'Non-Destructive Test Methods for Concrete Bridge',
        speaker: 'Dr. Sardar Kashif ur Rehman',
        points: '1.0 CPD Credit Point',
        date: '30 May 2024',
        detail:
          'Learned NDT techniques and methods for assessing structural condition and integrity of concrete bridges.',
        link: 'https://drive.google.com/file/d/1_jv4n32isZyCARbVg_eJ7QQiFS2GsOS2/view?usp=sharing',
      },
      {
        title: 'Modeling and Analyzing Rut Depth in Asphalt Mixtures for Sustainable Road Performance',
        speaker: 'Dr. Sabahat Hassan',
        points: '1.0 CPD Credit Point',
        date: '12 December 2024',
        detail:
          'Learned rut depth modeling and analysis techniques for evaluating asphalt mixture performance sustainably.',
        link: 'https://drive.google.com/file/d/1kz4RBRwWZuscXXqaSLyNtTrfSr4aKkqx/view?usp=sharing',
      },
      {
        title: 'Sustainable Urban Planning and Design',
        speaker: 'Ms. Fauzia Rizwan',
        points: '1.0 CPD Credit Point',
        date: '24 September 2025',
        detail:
          'Explored sustainable planning principles and design strategies for liveable, resilient urban development.',
        link: 'https://drive.google.com/file/d/12EN9hVUo4pIIEXHoD42JODfV4SnJweIa/view?usp=sharing',
      },
      {
        title: 'Application of GIS and Remote Sensing in Civil Engineering',
        speaker: 'Engr. Dr. M. Usman Arshid',
        points: '1.0 CPD Credit Point',
        date: '12 February 2026',
        detail:
          'Explored GIS and remote sensing applications for spatial analysis and data-driven decision-making in civil engineering.',
        link: 'https://drive.google.com/file/d/1RoCqKQ3vyjRd73AMPWbMT_N29kiMX-81/view?usp=sharing',
      },
      {
        title: 'Variation Order as per FIDIC Conditions of Contract',
        speaker: 'Engr. Sadaqat Hussain',
        points: '1.0 CPD Credit Point',
        date: '8 October 2025',
        detail:
          'Learned procedures and provisions for managing variation orders under FIDIC contract frameworks in construction projects.',
        link: 'https://drive.google.com/file/d/1e0KIXDgLJ5XrxpWqdjG0VwkgX0OlTsSL/view?usp=sharing',
      },
    ],
    workshops: [
      {
        title: 'One Day Workshop on Introduction to R',
        organizer: 'UNESCO Chair on Knowledge Systems for IWRM, CUI Wah Campus',
        date: '23 November 2023',
        detail:
          'Learned R programming basics for statistical analysis and data handling relevant to engineering applications.',
        link: 'https://drive.google.com/file/d/1_ZmipWgwsPNcgC6HoDpWtbLZnLk4t9_Z/view?usp=sharing',
      },
      {
        title: 'Application of AI/ML in Civil Engineering',
        organizer: 'Pakistan Engineers Forum (PEF - KP/GB)',
        date: '12 September 2024',
        detail:
          'Explored real-world AI/ML use cases and emerging applications transforming civil engineering practice.',
        link: 'https://drive.google.com/file/d/1kUDX_QuVzu1-hVRCnTFdDtrB_kQ2r_Ze/view?usp=sharing',
      },
    ],
    conferences: [
      {
        title: '4th UW-POFS Joint Conference (CACIO-2024)',
        role: 'Participant & Delegate',
        organizer: 'University of Wah & Pakistan Ordnance Factories (POF)',
        date: '18 December 2024',
        detail:
          'Participated in discussions on strengthening academia-industry collaboration and knowledge transfer.',
        link: 'https://drive.google.com/file/d/1gx7JpF5WSFIM3Tus0QckErt1_dqvQqnL/view?usp=sharing',
      },
    ],
  },

  skills: {
    coreCompetencies: [
      'Structural Analysis & Design',
      'Reinforced Concrete Design (ACI 318-19)',
      'Steel Structure Design (AISC)',
      'Seismic & Gravity Load Analysis (ASCE 7-16, UBC 97)',
      'Reinforcement Detailing & Foundation Design',
      'Post-Tensioned Slab Coordination',
      'Manual & Software-Based Structural Verification',
      'BIM-Integrated Structural Coordination',
      'Quantity Takeoff & Cost Estimation',
      'Site QA/QC Inspection',
    ],
    softwareAndTools: [
      'ETABS',
      'SAFE',
      'RISA 2D',
      'Autodesk Revit (Structure & Architecture, LOD 200–400)',
      'AutoCAD 2D',
      'Microsoft Office',
      'Microsoft Excel (Parametric Design Sheets)',
    ],
    softSkills: [
      'Leadership & Team Coordination',
      'Critical Thinking & Problem-Solving',
      'Cross-Disciplinary Collaboration',
      'Sustainability-Driven Design Thinking',
      'Public Speaking & Technical Communication',
      'Independent Research & Self-Directed Learning',
    ],
  },

  honorsAndAwards: [
    {
      title: 'Gold Medalist – Comsats University Islamabad, Wah Campus',
      category: 'Gold Medal',
      awarder: 'COMSATS University Islamabad, Wah Campus',
      period: '2026/07/06',
      detail: 'Graduated top of class (CGPA 3.95/4.0) from COMSATS University Islamabad, Wah Campus.',
    },
    {
      title: 'Pakistan Ordnance Factory (POF) Scholarship – Comsats University Islamabad, Wah Campus',
      category: 'Scholarship',
      awarder: 'COMSATS University Islamabad & POF',
      period: 'Received for 5 of 8 Semesters',
      detail:
        'Merit-based 50% tuition waiver awarded by the university to POF employees\' children, received for 5 of 8 semesters.',
    },
    {
      title: 'English Access Micro Scholarship Program – United States Embassy, Islamabad Pakistan',
      category: 'Scholarship',
      awarder: 'United States Embassy, Islamabad Pakistan',
      period: '2024/05/20',
      detail: '18-month part-time U.S. Embassy-sponsored English language and leadership program (400 hours).',
      link: 'https://drive.google.com/file/d/1vUxU9ipBcn6r4T50_VGCD2Ru37p2OaUp/view?usp=sharing',
    },
    {
      title: '3rd Position — Open House & Job Fair, Spring 2026 – Comsats University Islamabad, Wah Campus',
      category: 'FYP Award',
      awarder: 'Civil Engineering Department, CUI Wah Campus',
      period: '2026/06/03',
      detail: 'Secured 3rd position for Final Year Project at the departmental Open House and Job Fair.',
      link: 'https://drive.google.com/file/d/1IfROBA17znbjOd4-LIZgQRv7wAfdpcRZ/view?usp=sharing',
    },
    {
      title: 'SFD & BMD Winner, Civil Mania 2024 – Wah Engineering College',
      category: 'Competition',
      awarder: 'Wah Engineering College',
      period: '2024/05/08',
      detail: '1st place in Shear Force/Bending Moment Diagram competition.',
      link: 'https://drive.google.com/file/d/1Nlf261tWPgVkfPmRv4pa7DREMI_eQC8U/view?usp=sharing',
    },
    {
      title: 'Truss Bridge Competition - 2nd Position – Civil Engineering Department, Comsats Wah',
      category: 'Competition',
      awarder: 'Civil Engineering Department, Comsats Wah',
      period: '2022/12/15',
      detail: 'Placed 2nd in a truss bridge design and load-testing competition.',
      link: 'https://drive.google.com/file/d/1YSc_dfILWlMVDncIfImqUKjtUyWsLynq/view?usp=sharing',
    },
    {
      title: 'Best Surveyor Group – Civil Engineering Department, Comsats Wah',
      category: 'Competition',
      awarder: 'Civil Engineering Department, Comsats Wah',
      period: '2024/08/19',
      detail: 'Best Survey Group, Batch FA22 — COMSATS Survey Camp, Harnoi, Abbottabad (Aug 2024).',
      link: 'https://drive.google.com/file/d/17Z-3u3O4zOifxd9r-lTW7rVQBgtm4B5n/view?usp=sharing',
    },
  ],

  volunteering: [
    {
      title: 'Awareness Video on Child Labour',
      location: 'Pakistan',
      period: '2024/06/10 – 2024/06/12',
      detail:
        'Created and shared a video against child labor with English Access Micro Scholarship Program participants to mark World Day Against Child Labour (June 12- 2024).',
      link: 'https://drive.google.com/file/d/1UXkgB-BKh876kN4kptHxmziqxTD3z24L/view?usp=sharing',
    },
    {
      title: 'Community Service — Al-Ummat Sweet Home',
      location: 'Al Ummat Sweet Home, Wah Cantt',
      period: '2024/10/01 – 2024/12/01',
      detail:
        'Collected donations and purchased school supplies, books, bags, and stationery for orphans, organized through the Civil Engineering Department\'s Community Service Society, COMSATS University Islamabad, Wah Campus.',
      link: 'https://drive.google.com/file/d/153hOE4Df-wKZvEyAm_ZI3dkcWFztTDr_/view?usp=sharing',
    },
    {
      title: 'Academic Resource Database',
      organization: 'Civil Engineering Department, Comsats Wah',
      location: 'Wah Cantt',
      period: '2022/09/12 – 2026/07/06',
      detail:
        'Compiled 4-year Civil Engineering course materials (syllabi, notes, thesis guidelines), shared with juniors; co-contributed with Faizan Manshad.',
      link: 'https://drive.google.com/drive/folders/1m2kdWPX0X7Dn5LIPxeV_mcUl_yowBMoo?usp=sharing',
    },
    {
      title: 'Professional Volunteer — Alkhidmat Foundation',
      organization: 'Alkhidmat Foundation',
      period: '2026/08/07 – Current',
      detail: 'Registered professional volunteer with Alkhidmat Foundation, a national welfare organization.',
      link: 'https://drive.google.com/file/d/11htjFQJT6GLwZ6oEzoBCmusKkc129WRu/view?usp=sharing',
    },
  ],

  extracurricular: [
    {
      title: 'Seminar — Lead Organizer & Speaker',
      period: '2025/02/19',
      detail:
        'Organized and led "The Happy Brain – Fun Ways to Stay Positive," an interactive mental well-being session for students at Pehla Qadam School.',
      link: 'https://www.facebook.com/share/v/1GDLYfzHTW/',
    },
    {
      title: 'Co-Host — Eid Mingle Day (June 2024)',
      period: '2024/06/29',
      detail:
        'Co-hosted a cultural celebration for English Access CUI Wah students, featuring skits, storytelling, and games to mark Eid traditions.',
      link: 'https://www.facebook.com/share/v/1EXxwLwiMq/',
    },
    {
      title: '2026 Aspire Leaders Program',
      period: '2026/02/16 – 2026/04/27',
      detail:
        'Completed 40 hours of coursework in the Aspire Institute\'s global leadership program, strengthening self-confidence, critical thinking, and communication skills.',
      link: 'https://engage.aspireleaders.org/profile/certificates',
    },
    {
      title: 'World Engineering Day 2026',
      period: '2026/02/02',
      detail:
        'Presented BIM-to-AR research as a sustainable solution for Challenge 2 (urban stress, energy demand, and infrastructure inefficiency), addressing SDG 12: Responsible Consumption and Production by reducing rework, material waste, and construction time.',
      link: 'https://www.youtube.com/watch?v=z70xaKYh1ps',
    },
    {
      title: 'World Engineering Day 2025',
      period: '2025/03/03',
      detail:
        '"Shelter For All" — Proposed an energy-efficient informal-housing solution with solar power and rainwater harvesting, via public-private partnerships for scalable, sustainable communities.',
      link: 'https://youtu.be/nDrsA6qMuOY?si=L8VNC9_oocDwSA2w',
    },
    {
      title: 'OMLAS (One Million Leaders Asia) Fellowship',
      period: '2025/11/03 – 2025/12/26',
      detail:
        'Selected Fellow in a cross-border Asia-Pacific leadership program, gaining training in sustainability, ethical leadership, and social innovation through a hands-on Leadership Challenge.',
      link: 'https://asia.omlglobal.org/Certificates/Validate/kashankashi27@gmail.com',
    },
    {
      title: 'World Water Day 2025 — Video Competition (UNESCO/COMSATS)',
      period: '2025/03/22',
      detail:
        'Co-created a group awareness video on glacier preservation and water conservation, presenting policy and legal solutions (international cooperation, anti-pollution regulation) to protect glacier regions; organized by UNESCO Chair on IWRM, COMSATS University Islamabad.',
      link: 'https://drive.google.com/file/d/1FhGL5GjQOtfxDr2127F2Rca69Hn9kfAZ/view?usp=sharing',
    },
    {
      title: 'Panel Discussion with OMLAS Champions and Fellows',
      period: '2025/11/29',
      detail: 'Engaged with OMLAS alumni in discussion on leadership, social impact, and community-driven change.',
      link: 'https://drive.google.com/file/d/1GmNmxcFWTbMpbFelIVyxEeByvsLweTig/view?usp=sharing',
    },
    {
      title: 'Construct X 3.0 — GIK Institute, ICE Civil Engineering Society',
      period: '2025/11/21 – 2025/11/23',
      detail:
        '3-day competition; contributed to lightweight concrete, load-bridging, and flume sink modules, plus a technical workshop, gaining hands-on experience in innovative construction techniques and teamwork.',
      link: 'https://drive.google.com/file/d/10fVRUCY1fct-Y7zASTGMGHf6e2GC0DzE/view?usp=sharing',
    },
    {
      title: 'Civil Nexus 2025',
      period: '2025/04/10',
      detail:
        'Participated in a multi-society collaborative civil engineering event organized by ASCE with five societies of University of Wah.',
      link: 'https://drive.google.com/file/d/18zENPzmPJSIYG5UHTtEiPuSJVMeX1bEY/view?usp=sharing',
    },
    {
      title: 'Speech Competition',
      period: '2010/11/02',
      detail: 'Participated in a school-level speech competition series ("Taqareer-e-Silsila Sir Syed").',
      link: 'https://drive.google.com/file/d/1F1FidzbkugyrkO2oig6FMURn8BWDtUsM/view?usp=sharing',
    },
  ],

  languages: [
    {
      language: 'Urdu',
      level: 'Native',
      detail: 'Mother tongue; comprehensive listening, reading, speaking, and writing proficiency.',
      isMotherTongue: true,
    },
    {
      language: 'English',
      level: 'CEFR B2 (Independent User)',
      detail:
        'B2 across Listening, Reading, Spoken Production, Spoken Interaction, and Writing. Enhanced through 400 hours in the U.S. Embassy English Access Micro Scholarship Program.',
      isMotherTongue: false,
    },
  ],
}
