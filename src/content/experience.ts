import type { Experience } from '../types/content'

export const experience: Experience[] = [
  {
    slug: 'archnetix-bim-modeler',
    organization: 'Archnetix',
    role: 'Junior BIM Modeler',
    period: 'Current role',
    location: 'Islamabad, Pakistan',
    domain: 'Scan-to-BIM & Digital Documentation',
    summary: 'Scan-to-BIM modelling of existing buildings in Islamabad.',
    context: 'Archnetix specializes in digital construction, high-precision laser scanning, and BIM implementations. In this current professional position, the primary focus is processing terrestrial LiDAR and laser-scanned point clouds to construct coordinated, high-fidelity Autodesk Revit models for existing facilities, structural renovations, and as-built verification.',
    details: [
      'Convert raw laser-scanned 3D point-cloud data into coordinated Revit models for existing facilities and renovations.',
      'Model architectural, structural, and MEP components to LOD 300 and LOD 350 specifications with precise spatial registration.',
      'Perform multi-disciplinary clash detection and eliminate spatial routing conflicts between services and load-bearing framing.',
      'Maintain rigorous compliance with client BIM Execution Plans (BEP), parameter standards, and LOD definitions.',
      'Produce comprehensive 2D as-built documentation, detail drawings, and schedules directly extracted from federated BIM models.'
    ],
    tools: ['Autodesk Revit', 'Point Cloud Processing', 'AutoCAD', 'LOD 300 / LOD 350', 'BIM Coordination'],
    achievements: [
      'Successfully delivered coordinated Scan-to-BIM models for complex existing commercial and institutional structures.',
      'Achieved strict geometric tolerances matching real-world point-cloud data down to millimeter accuracy.',
      'Standardized Revit family parameters across MEP and structural categories, improving team coordination speed.'
    ],
    learnings: [
      'Advanced methodologies for point-cloud noise reduction, spatial alignment, and feature segmentation in Revit.',
      'Rigorous application of BIM Forum LOD specifications between design intent and physical as-built conditions.',
      'Resolving structural deviations and non-orthogonal geometries found in older existing structures.'
    ]
  },
  {
    slug: 'mount-khalid-bim-intern',
    organization: 'Mount Khalid',
    role: 'BIM Engineering Intern',
    period: 'Jul–Aug 2025',
    location: 'Gulberg Greens, Islamabad, Pakistan',
    domain: 'High-Rise Residential BIM & Site Coordination',
    summary: 'BIM and site exposure on a high-rise residential project.',
    context: 'Mount Khalid is a landmark 45-storey high-rise residential development located in Gulberg Greens, Islamabad. During this 8-week intensive engineering internship, I worked within the project management and architectural engineering teams to develop, maintain, and audit large-scale federated BIM models while observing actual site execution.',
    details: [
      'Contributed directly to structural and architectural BIM workflows adhering to LOD 300 documentation standards.',
      'Modeled and coordinated over 70,000 individual BIM elements across tower floor plans, core walls, and structural slabs.',
      'Participated in weekly multidisciplinary design coordination reviews with the General Manager, Senior Project Manager, and Project Architect.',
      'Conducted field inspections to compare physical floor progress and rebar layouts against 3D Revit models, flagging construction deviations.',
      'Assisted in extracting material takeoffs, schedule sheets, and architectural detail packages directly from Revit.'
    ],
    tools: ['Autodesk Revit', 'AutoCAD', 'LOD 300 Standards', 'MS Project / Primavera', 'Site Verification'],
    achievements: [
      'Independently developed and verified 70,000+ BIM elements in Autodesk Revit across complex residential floor plates.',
      'Awarded an official commendation letter from General Manager Imran Mumtaz and project leadership for technical diligence.',
      'Identified and resolved multiple spatial conflicts between structural beams and architectural openings prior to site execution.',
    ],
    learnings: [
      'Collaborative worksharing with centralized Revit project files (.rvt) in a demanding high-rise commercial setting.',
      'Deepened comprehension of high-rise structural behavior: shear core walls, load distribution, and vertical service shafts.',
      'The critical interface between digital BIM design representations and ground-level site reality.'
    ]
  },
  {
    slug: 'simco-trainee-engineer',
    organization: 'SIMCO',
    role: 'Management Trainee Engineer',
    period: 'Jul 2024',
    location: 'Taxila / Rawalpindi Region, Pakistan',
    domain: 'Site Management, Surveying & Cost Estimation',
    summary: 'Site management, drawing interpretation and estimation.',
    context: 'Shoukat Iqbal Mir & Co. (SIMCO, License No. CB/372) is a licensed construction and civil engineering contracting firm. This month-long field traineeship provided first-hand exposure to live construction supervision, site surveying controls, engineering drawing interpretation, and material cost estimation.',
    details: [
      'Interpreted structural engineering working drawings, foundation details, column schedules, and bar bending details.',
      'Assisted in establishing site benchmarks, leveling surveys, and grid line transfers for structural footings and plinth beams.',
      'Prepared detailed quantity takeoffs and material cost estimates for concrete volume, steel reinforcement, cement, and aggregates.',
      'Supervised on-site concrete mixing and casting, conducting slump tests and verifying formwork alignment and clear cover.',
      'Supported site foremen in organizing workforce allocations, daily labor logs, and site safety protocols.'
    ],
    tools: ['AutoCAD', 'Optical Level / Surveying Tools', 'MS Excel Quantity Takeoff', 'Quality Control (QC)', 'Construction Supervision'],
    achievements: [
      'Ensured accurate foundation bench leveling and column alignment matching structural blueprint tolerances.',
      'Produced comprehensive itemized bill of quantities (BOQ) estimates, minimizing material wastage on foundation pours.',
      'Successfully earned official completion certification signed by SIMCO administration.'
    ],
    learnings: [
      'Hands-on expertise translating 2D civil engineering blueprints into physical, accurately positioned field structures.',
      'Essential quality assurance principles: concrete slump limits, rebar spacing integrity, and proper curing methods.',
      'Managing fast-paced on-site communication between consulting engineers, sub-contractors, and trade labor.'
    ]
  }
]
