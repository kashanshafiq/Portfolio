export const profile = {
  name: 'Kashan Shafiq',
  field: 'Civil engineering & digital construction',
  introduction: 'I work across structural design, BIM, and the tools that connect engineering ideas to practice.',
  biography: 'I am a civil engineering graduate from COMSATS University Islamabad, Wah Campus. My work connects structural analysis with digital modelling, from reinforced-concrete design and calculation spreadsheets to Scan-to-BIM and augmented reality.',
  education: { degree: 'BS Civil Engineering', institution: 'COMSATS University Islamabad, Wah Campus', period: '2022–2026', cgpa: '3.95 / 4.00', distinction: 'Gold Medalist · First in graduating class' },
  interests: ['Structural analysis and design', 'Building information modelling', 'Digital construction', 'Augmented reality for engineering'],
  // Add confirmed public details only. Empty fields are not rendered as links.
  contact: { email: 'kashankashi27@gmail.com', linkedin: 'https://www.linkedin.com/in/kashan-shafiq-11764229b/', github: '' },
  // Place an approved public PDF in public/downloads/ and set its relative path.
  cvPath: '',
}

export const approach = [
  { title: 'Observe.', text: 'Understand the context.' },
  { title: 'Model.', text: 'Make assumptions visible.' },
  { title: 'Check.', text: 'Test the behaviour.' },
  { title: 'Explain.', text: 'Share the reasoning.' },
]

export const skills = [
  { title: 'Structures', items: ['ETABS', 'SAFE', 'RISA-2D', 'Reinforced concrete design'] },
  { title: 'Digital construction', items: ['Autodesk Revit', 'AutoCAD', 'Scan-to-BIM', 'LOD 300 / 350'] },
  { title: 'Research & visualisation', items: ['Unity', 'Vuforia', 'ARCore', 'Cesium for Unity'] },
  { title: 'Analysis & planning', items: ['Microsoft Excel', 'EPA SWMM', 'Primavera P6', 'AutoCAD Civil 3D'] },
]
