export interface AcademicCvData {
  personalInfo: {
    name: string
    title: string
    degreeSummary: string
    institution: string
    email: string
    phone?: string
    location: string
    linkedin: string
    portfolioUrl: string
    summary: string
  }
  workExperience: Array<{
    role: string
    organization: string
    location: string
    period: string
    scope: string
    responsibilities: string[]
    tools: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    period: string
    distinction?: string
    metrics?: string
    highlights?: string[]
  }>
  researchAndProjects: {
    researchPreprint: {
      title: string
      status: string
      period: string
      venue: string
      doi: string
      authors: string[]
      summary: string
    }
    projects: Array<{
      title: string
      course: string
      tools: string[]
      description: string
    }>
  }
  certifications: Array<{
    title: string
    issuer: string
    date: string
    credentialId?: string
    detail: string
  }>
  professionalTrainings: {
    cpdSeminars: Array<{
      title: string
      speaker: string
      points: string
      date: string
    }>
    workshops: Array<{
      title: string
      organizer: string
      date: string
    }>
  }
  conferences: Array<{
    title: string
    role: string
    organizer: string
    date: string
    detail: string
  }>
  languages: Array<{
    language: string
    proficiency: string
    note: string
  }>
  extracurricular: {
    fellowships: Array<{
      title: string
      organization: string
      period: string
      detail: string
    }>
    competitions: Array<{
      title: string
      award: string
      event: string
      organizer: string
      date: string
    }>
  }
  volunteer: Array<{
    title: string
    role: string
    organization: string
    period: string
    detail: string
  }>
  honorsAndAwards: Array<{
    title: string
    category: 'Gold Medal' | 'Scholarship' | 'Merit Position' | 'Competition' | 'FYP Award'
    awarder: string
    period: string
    detail: string
  }>
}

export const academicCv: AcademicCvData = {
  personalInfo: {
    name: 'Kashan Shafiq',
    title: 'Civil Engineer · Junior BIM Modeler (Scan-to-BIM Specialist)',
    degreeSummary: 'BS Civil Engineering (Gold Medalist, 1st in Class, CGPA 3.95 / 4.00)',
    institution: 'COMSATS University Islamabad, Wah Campus',
    email: 'kashankashi27@gmail.com',
    location: 'Islamabad / Wah Cantt, Pakistan',
    linkedin: 'https://www.linkedin.com/in/kashan-shafiq-11764229b/',
    portfolioUrl: 'https://kashanshafiq.com',
    summary:
      'Civil engineering graduate with top academic standing (CGPA 3.95 / 4.00, Gold Medalist). Specializing in Building Information Modeling (BIM), Scan-to-BIM point cloud reconstruction, structural analysis and finite element design (ETABS, SAFE, ACI 318), and augmented reality integration for digital construction workflows.',
  },

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
      role: 'Management Trainee / BIM Engineering Intern',
      organization: 'Mount Khalid (45-Storey Residential High-Rise Tower)',
      location: 'Gulberg Greens, Islamabad, Pakistan',
      period: 'July 2025 – August 2025 (8 Weeks)',
      scope: 'High-Rise Residential Tower BIM Modeling & Construction Coordination',
      responsibilities: [
        'Contributed to the multi-discipline BIM modeling workflow for a flagship 45-storey high-rise residential tower.',
        'Directly modeled and managed over 70,000 BIM elements in Autodesk Revit adhering to LOD 300 criteria.',
        'Collaborated with Senior Project Managers and structural teams during design reviews, site verification, and construction schedule tracking.',
      ],
      tools: ['Autodesk Revit', 'AutoCAD', 'Primavera P6', 'BIM Coordination'],
    },
    {
      role: 'Management Trainee Engineer (Site Management & Estimation)',
      organization: 'Shoukat Iqbal Mir & Co. (SIMCO)',
      location: 'Wah Cantt / Rawalpindi, Pakistan',
      period: 'July 2024 (1 Month)',
      scope: 'Field Engineering, Total Station Layout & Quantity Estimation',
      responsibilities: [
        'Interpreted structural engineering working drawings, bar bending schedules, and architectural specifications on-site.',
        'Executed site layout benchmarks, leveling, and total station control point setup.',
        'Conducted material quantity takeoffs, daily progress logs, and field quality assurance inspections during concrete pours.',
      ],
      tools: ['Total Station', 'AutoCAD', 'Quantity Takeoff', 'Site Supervision'],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Science in Civil Engineering (BS Civil Engineering)',
      institution: 'COMSATS University Islamabad, Wah Campus, Pakistan',
      period: 'September 2022 – July 2026',
      distinction: 'University Gold Medalist · 1st Position in Graduating Class across all 8 Semesters',
      metrics: 'CGPA: 3.95 / 4.00 (541.26 Credit Points across 137 Credit Hours, 98% Aggregate)',
      highlights: [
        'Core structural portfolio: Reinforced Concrete Design I & II, Design of Structures, Steel Structures, Matrix Analysis of Structures, Indeterminate Structural Analysis.',
        'Infrastructure & Geotech portfolio: Geotechnical & Foundation Engineering, Soil Mechanics, Engineering Hydrology, Water Supply & Wastewater Engineering, Geometric Highway Design.',
        'Awarded 7 Departmental Semester Merit Position Certificates (1st & 2nd positions) and the competitive Pakistan Ordnance Factory (POF) Merit Scholarship in 5 semesters.',
      ],
    },
    {
      degree: 'Higher Secondary School Certificate (HSSC / Pre-Engineering)',
      institution: 'Federal / Rawalpindi Board Context, Pakistan',
      period: '2020 – 2022',
      metrics: 'Pre-Engineering Science Curriculum (Mathematics, Physics, Chemistry)',
      highlights: [
        'Rigorous secondary STEM foundation; tested twice before ISSB (Army Selection & Recruitment Centre, Rawalpindi / Kohat).',
      ],
    },
    {
      degree: 'Secondary School Certificate (SSC / Science Group)',
      institution: 'Secondary School Education Board, Pakistan',
      period: '2018 – 2020',
      metrics: 'Science Curriculum (Mathematics, Physics, Chemistry, Computer Science)',
    },
  ],

  researchAndProjects: {
    researchPreprint: {
      title: 'BIM to Augmented Reality: A Standardized Multimodal Deployment Framework for Construction Layout Visualization',
      status: 'Preprint Manuscript',
      period: '2025 – 2026',
      venue: 'SSRN Electronic Journal',
      doi: 'https://doi.org/10.2139/ssrn.6884926',
      authors: ['Hassan Ashraf', 'Faizan Manshad', 'Kashan Shafiq', 'Faiz Fareed'],
      summary:
        'Formulated a standardized pipeline transferring Autodesk Revit BIM geometries to mobile augmented-reality engines via FBX and Unity. Evaluated Marker-based, Ground-plane SLAM, and Location-based geospatial AR modalities to verify layout accuracy on-site. Won 3rd Position at CUI Open House & Job Fair 2026.',
    },
    projects: [
      {
        title: 'Seismic Analysis & Structural Design of RC Residential Building',
        course: 'Design of Structures (CEE410)',
        tools: ['ETABS', 'SAFE', 'UBC-97', 'ACI 318'],
        description:
          'Constructed full 3D finite element structural model of a multi-story residential building under dead, live, and UBC-97 seismic lateral loads. Evaluated story drifts, beam-column flexural/shear demands, and designed foundation mat and footings in SAFE.',
      },
      {
        title: 'Structural Design of 3-Story School Building (ACI 318-14)',
        course: 'Reinforced Concrete Design I (CEE308)',
        tools: ['ACI 318-14', 'ASCE 7-10', 'Structural Calculations'],
        description:
          'Executed comprehensive structural engineering calculation package for a 3-story reinforced concrete institutional building on a 120′ × 180′ site. Designed one-way slabs, continuous beams, doubly reinforced members, square columns, and circular spiral columns.',
      },
      {
        title: 'Hydraulic Design of Combined Sewerage System (EPA SWMM)',
        course: 'Wastewater & Sanitary Engineering (CEE422)',
        tools: ['EPA SWMM', 'Dynamic Wave Routing', 'Hydraulics'],
        description:
          'Modeled stormwater and sanitary wastewater networks for a 102-hectare urban catchment in Wah Cantt (3,835 design population). Optimized pipe invert elevations, drop manholes, and Manning velocity controls under 30 mm/hr and 60 mm/hr rainfall.',
      },
      {
        title: 'Complete Multi-Storey Building Quantity Takeoff & Bar Bending Schedule',
        course: 'Quantity Surveying & Cost Estimation (CEE304)',
        tools: ['Microsoft Excel', 'Bar Bending Schedules (BBS)', 'Costing'],
        description:
          'Produced an itemized quantity takeoff and reinforcement Bar Bending Schedule (BBS) for a multi-storey building, computing concrete volumes, dry mortar conversions, wastage allowances, and totaling 111,854 kg (~112 tons) of reinforcing steel.',
      },
      {
        title: 'Taxila GT Road Highway Geometric Design & Safety Investigation',
        course: 'Geometric Design of Highways and Streets (CEE417)',
        tools: ['AutoCAD Civil 3D', 'AASHTO Green Book', 'Google Earth DTM'],
        description:
          'Constructed a digital terrain model (DTM) from geospatial points along a segment of Taxila GT Road, evaluating 11 horizontal curves against AASHTO Green Book design speed, radius, and superelevation criteria.',
      },
      {
        title: 'Project Planning & Scheduling of Residential Villa Construction',
        course: 'Project Planning and Management (MGT462)',
        tools: ['Primavera P6', 'CPM Scheduling', 'Resource Allocation'],
        description:
          'Formulated full Enterprise Project Structure (EPS), WBS, OBS, and RBS for a 1-year residential villa construction contract. Derived critical path method (CPM) networks, resource usage histograms, and baseline S-curves.',
      },
      {
        title: 'Spreadsheet-Based Design of Gravity and Cantilever Retaining Walls',
        course: 'Reinforced Concrete Design II (CEE406)',
        tools: ['Microsoft Excel', 'Rankine Earth Pressure', 'Geotechnical Stability'],
        description:
          'Developed automated design sheets calculating Rankine active earth pressures, stability safety factors against overturning, sliding, and bearing capacity, and sizing stem, heel, and toe flexural and shear reinforcement.',
      },
    ],
  },

  certifications: [
    {
      title: 'Master Structural Design of Buildings (Crash Course)',
      issuer: 'Young Engineers Forum (YEF)',
      date: 'May 10, 2026',
      credentialId: 'YEF-MSD-0937',
      detail: 'Intensive structural analysis and building design course covering concrete framing, load distribution, and structural code detailing.',
    },
    {
      title: 'Revit for Beginners: Architecture, Structures & MEP',
      issuer: 'VIS Management Consulting Inc., Canada & CISD',
      date: 'March 7 – May 4, 2025',
      credentialId: 'OCN: 2315732',
      detail: 'Comprehensive Building Information Modeling workflow course covering architectural framing, structural concrete/steel detailing, and MEP coordination.',
    },
    {
      title: 'BIM Management: Revit Model Maintenance',
      issuer: 'LinkedIn Learning',
      date: 'October 10, 2025',
      credentialId: 'ID: 5d0ab33cc4a43036d165e9f6e8ed0448',
      detail: 'Professional BIM model health audit, file size optimization, worksharing standards, and family library maintenance.',
    },
    {
      title: 'Learning Revit 2023',
      issuer: 'LinkedIn Learning',
      date: 'November 2, 2025',
      credentialId: 'ID: e6a5ba422b1ffb7cf0da5fd91001ef93',
      detail: 'Core parametric modeling, schedule generation, view templates, and architectural documentation workflows.',
    },
    {
      title: 'Excel Essential Training (Microsoft 365)',
      issuer: 'LinkedIn Learning',
      date: 'November 9, 2025',
      credentialId: 'ID: 478842037430d0dff9eb6fd276e7c600',
      detail: 'Advanced spreadsheet formulas, data modeling, dynamic lookups, and engineering calculation automation.',
    },
    {
      title: 'Understanding Augmented and Virtual Reality: An Introduction',
      issuer: 'LinkedIn Learning',
      date: 'November 1, 2025',
      credentialId: 'ID: 1ef8f65861d44c5211ab728cc9ee99bc',
      detail: 'Spatial computing principles, SLAM tracking, immersive user interfaces, and mobile AR deployment paradigms.',
    },
    {
      title: 'MidJourney for Architects: AI Image Generation & Animation',
      issuer: 'Udemy',
      date: 'April 7, 2025',
      credentialId: 'UC-1ed0d7e0-e89b-4d8f-a7ef-bca9b406966b',
      detail: 'AI-assisted architectural conceptualization, rendering prompt engineering, and visual spatial communication.',
    },
  ],

  professionalTrainings: {
    cpdSeminars: [
      {
        title: 'Applications of GIS and Remote Sensing in Civil Engineering',
        speaker: 'Engr. Dr. M. Usman Arshid',
        points: '1.0 CPD Credit Point',
        date: '12 February 2026',
      },
      {
        title: 'Finite Element Method: A Modern Tool for Structural Analysis',
        speaker: 'Dr. Engr. Zahid Shabir',
        points: '1.0 CPD Credit Point',
        date: '15 May 2025',
      },
      {
        title: 'Variation Orders as per FIDIC Conditions of Contract',
        speaker: 'Engr. Sadaqat Hussain',
        points: '1.0 CPD Credit Point',
        date: '8 October 2025',
      },
      {
        title: 'Contemporary Strategies for the Restoration and Preservation of National Heritages',
        speaker: 'Prof. Dr. Anwar Khitab',
        points: '1.0 CPD Credit Point',
        date: '20 February 2025',
      },
      {
        title: 'Sustainable Urban Planning and Design',
        speaker: 'Ms. Fauzia Rizwan',
        points: '1.0 CPD Credit Point',
        date: '24 September 2025',
      },
      {
        title: 'Modeling and Analyzing Rut Depth in Asphalt Mixtures for Sustainable Road Performance',
        speaker: 'Dr. Sabahat Hassan',
        points: '1.0 CPD Credit Point',
        date: '12 December 2024',
      },
      {
        title: 'Non-Destructive Test Methods for Concrete Bridges',
        speaker: 'Dr. Sardar Kashif ur Rehman',
        points: '1.0 CPD Credit Point',
        date: '30 May 2024',
      },
      {
        title: 'Integrating Technologies in Civil Engineering',
        speaker: 'Dr. Naveed Anwar',
        points: '0.5 CPD Credit Point',
        date: '27 September 2023',
      },
      {
        title: 'Impact of Machine Learning in the Field of Civil Engineering',
        speaker: 'Dr. Muhammad Faisal Javed',
        points: '0.5 CPD Credit Point',
        date: '13 October 2022',
      },
    ],
    workshops: [
      {
        title: 'One Day Workshop on "Introduction to R"',
        organizer: 'UNESCO Chair on Knowledge Systems for IWRM, CUI Wah Campus',
        date: '23 November 2023',
      },
      {
        title: 'One Day Webinar on "Application of AI/ML in Civil Engineering"',
        organizer: 'Pakistan Engineers Forum (PEF - KP/GB)',
        date: '12 September 2024',
      },
    ],
  },

  conferences: [
    {
      title: '4th UW-POFs Joint Conference on Academia’s Collaboration with Industrial Organizations (CACIO-2024)',
      role: 'Participant & Delegate',
      organizer: 'University of Wah & Pakistan Ordnance Factories (POF)',
      date: '18 December 2024',
      detail: 'Explored university-industry research translation, precision manufacturing, and infrastructure modernization strategies.',
    },
    {
      title: 'Departmental Open House & Job Fair 2026',
      role: 'Final-Year Project Presenter & Award Winner (3rd Position)',
      organizer: 'Department of Civil Engineering, COMSATS University Islamabad, Wah Campus',
      date: '3 June 2026',
      detail: 'Presented prototype BIM-to-AR construction layout visualization systems to visiting industrial delegates and academic review panels.',
    },
  ],

  languages: [
    {
      language: 'English',
      proficiency: 'Fluent / Professional Working Proficiency',
      note: '400 hours of formal immersion via the U.S. Embassy English Access Scholarship Program; active academic writing and technical presentation proficiency.',
    },
    {
      language: 'Urdu',
      proficiency: 'Native / Bilingual Proficiency',
      note: 'Mother tongue; comprehensive written and verbal communication.',
    },
  ],

  extracurricular: {
    fellowships: [
      {
        title: '2026 Aspire Leaders Program',
        organization: 'Aspire Institute (Founded at Harvard University)',
        period: 'April 2026 (40 Hours)',
        detail: 'Global leadership development program focusing on critical thinking, social impact strategy, cross-cultural collaboration, and ethical leadership.',
      },
      {
        title: 'One Million Leaders Asia (OMLAS) Fellowship',
        organization: 'One Million Leaders Asia & NELIS Global (Next Leaders Initiative for Sustainability)',
        period: 'November – December 2025',
        detail: 'Selected as an OMLAS Fellow / Champion representing Pakistan in regional sustainability, ESG leadership, and climate innovation sessions.',
      },
      {
        title: 'U.S. Embassy English Access Scholarship Program',
        organization: 'Regional English Language Office (RELO), U.S. Embassy Islamabad & CUI Wah',
        period: 'May 2024 – November 2025 (18 Months, 400 Hours)',
        detail: 'Rigorous intensive fellowship covering advanced professional English, diplomatic communication, community advocacy, and leadership development.',
      },
    ],
    competitions: [
      {
        title: 'SFD / BMD Competition — Civil Mania 2024',
        award: '1st Position Winner',
        event: 'Civil Mania 2024',
        organizer: 'ASCE Student Chapter, Wah Engineering College (University of Wah)',
        date: '2024',
      },
      {
        title: 'ICE Truss Bridge Competition',
        award: '2nd Position Winner',
        event: 'Annual Truss Bridge Structural Challenge',
        organizer: 'Institution of Civil Engineers (ICE) Student Chapter, CUI Wah Campus',
        date: '15 December 2022',
      },
      {
        title: 'Annual Survey Camp 2024',
        award: 'Best Survey Group Award (Batch FA22)',
        event: '15-Day Extensive Field Surveying Camp (Abbottabad)',
        organizer: 'Department of Civil Engineering, CUI Wah Campus',
        date: 'August 2024',
      },
      {
        title: 'World Engineering Day Hackathons (2025 & 2026)',
        award: 'Global Participant',
        event: 'UNESCO & World Federation of Engineering Organizations (WFEO) Global Hackathon',
        organizer: 'WFEO / UNESCO',
        date: '2025 & 2026',
      },
      {
        title: 'CONSTRUCTX-3.0',
        award: 'Participant',
        event: 'All-Pakistan Civil Engineering Competition',
        organizer: 'ICE GIK Student Chapter, Ghulam Ishaq Khan Institute (GIKI)',
        date: 'November 2025',
      },
      {
        title: 'CIVIL NEXUS 2025',
        award: 'Participant',
        event: 'Inter-University Engineering Symposium',
        organizer: 'ASCE Student Chapter, University of Wah',
        date: 'April 2025',
      },
    ],
  },

  volunteer: [
    {
      title: 'Professional Volunteer Member',
      role: 'Registered Volunteer (Membership ID: AKF-V-98153)',
      organization: 'Alkhidmat Foundation Pakistan',
      period: 'Active through August 2028',
      detail: 'Contributes to community welfare drives, humanitarian logistics, and emergency relief volunteer initiatives.',
    },
    {
      title: 'Lead Organizer & Keynote Speaker — Mental Well-being Seminar',
      role: 'Lead Organizer & Speaker ("The Happy Brain – Fun Ways to Stay Positive")',
      organization: 'Pehla Qadam School',
      period: '19 February 2025',
      detail: 'Conceived, coordinated, and delivered an interactive mental health and positive thinking workshop for underprivileged primary students.',
    },
    {
      title: 'Community Service for Orphans',
      role: 'Volunteer',
      organization: 'Community Services Committee, Department of Civil Engineering, CUI Wah',
      period: 'Fall 2024',
      detail: 'Participated in community mentorship, educational support activities, and care packages for orphaned children.',
    },
    {
      title: 'Academic Resource Database Initiative',
      role: 'Co-Founder & Contributor (with Faizan Manshad)',
      organization: 'Open-Access Student Academic Database',
      period: 'September 2022 – July 2026',
      detail: 'Curated and published an open-access archive of 4-year Civil Engineering course materials, past solutions, and FYP guides to mentor junior peers.',
    },
    {
      title: 'World Day Against Child Labour Advocacy Campaign',
      role: 'Content Creator & Narrator',
      organization: 'English Access Micro Scholarship Program Advocacy',
      period: 'June 2024',
      detail: 'Authored and produced an educational video raising public awareness regarding child labor exploitation and the right to education.',
    },
    {
      title: 'Eid Mingle Day Cultural Celebration',
      role: 'Event Co-Host & Facilitator',
      organization: 'U.S. Embassy English Access Program at CUI Wah',
      period: 'June 2024',
      detail: 'Co-hosted and coordinated cultural celebration sessions promoting interfaith harmony and student community connection.',
    },
  ],

  honorsAndAwards: [
    {
      title: 'University Gold Medal for 1st Position in Class',
      category: 'Gold Medal',
      awarder: 'COMSATS University Islamabad, Wah Campus',
      period: '6 July 2026',
      detail: 'Awarded for attaining the highest Cumulative Grade Point Average (CGPA 3.95 / 4.00, 98% aggregate) across all 8 semesters in the BS Civil Engineering graduating batch.',
    },
    {
      title: 'Pakistan Ordnance Factories (POF) Merit Scholarship',
      category: 'Scholarship',
      awarder: 'Pakistan Ordnance Factories & CUI Wah',
      period: 'Awarded in 5 Undergraduate Semesters',
      detail: '50% tuition waiver awarded on high merit standing, strictly restricted to the top 20 students across the entire campus per semester.',
    },
    {
      title: '7× Departmental Semester Merit Position Certificates',
      category: 'Merit Position',
      awarder: 'Director & Controller of Examinations, CUI Wah Campus',
      period: '2022 – 2026',
      detail: 'Sem 1 (Fall 22): 2nd Pos (3.83 SGPA) · Sem 2 (Spring 23): 3rd Pos (3.85 SGPA) · Sem 3 (Fall 23): 1st Pos (4.00 SGPA) · Sem 4 (Spring 24): 1st Pos (4.00 SGPA) · Sem 5 (Fall 24): 2nd Pos (4.00 SGPA) · Sem 6 (Spring 25): 2nd Pos (3.94 SGPA) · Sem 7 (Fall 25): 1st Pos (4.00 SGPA).',
    },
    {
      title: 'Final-Year Capstone Project Award (3rd Position)',
      category: 'FYP Award',
      awarder: 'CUI Departmental Open House & Job Fair Spring 2026',
      period: '3 June 2026',
      detail: 'Recognized for pioneering the BIM-to-AR mobile augmented reality deployment framework for on-site construction layout visualization.',
    },
    {
      title: 'Winner (1st Position) — SFD / BMD Competition',
      category: 'Competition',
      awarder: 'Civil Mania 2024 (ASCE Student Chapter, WEC)',
      period: '2024',
      detail: 'Secured 1st place in the inter-university Shear Force & Bending Moment Diagram analytical calculation challenge.',
    },
    {
      title: '2nd Position Winner — ICE Truss Bridge Competition',
      category: 'Competition',
      awarder: 'Institution of Civil Engineers (ICE) Student Chapter, CUI Wah',
      period: '15 December 2022',
      detail: 'Awarded for designing and testing a high strength-to-weight ratio model steel/balsa through-truss bridge.',
    },
    {
      title: 'Best Survey Group Award — Annual Survey Camp Abbottabad',
      category: 'Competition',
      awarder: 'Civil Engineering Department, CUI Wah Campus',
      period: 'August 2024',
      detail: 'Awarded for high-accuracy topographic contouring, traverse calculations, and fieldwork leadership during the 15-day Abbottabad survey camp.',
    },
  ],
}
