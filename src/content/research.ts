import type { ResearchItem } from '../types/content'

export const researchProjects: ResearchItem[] = [
  {
    slug: 'bim-to-ar',
    title: 'BIM to Augmented Reality: A Standardized Multimodal Deployment Framework for Construction Layout Visualization',
    shortTitle: 'BIM to Augmented Reality Framework',
    status: 'Preprint',
    period: '2025 – 2026',
    venue: 'Preprint · SSRN',
    authors: ['Hassan Ashraf', 'Faizan Manshad', 'Kashan Shafiq', 'Faiz Fareed'],
    doi: 'https://doi.org/10.2139/ssrn.6884926',
    summary: 'A multimodal framework for construction layout visualization, developed from the final-year capstone project at COMSATS University Islamabad, Wah Campus. Exploring how interactive 3D digital models bridge the gap between design drawings and physical on-site construction conditions.',
    context: 'The project formulated and implemented an end-to-end translation pipeline transferring BIM geometries (Autodesk Revit) into mobile augmented-reality engines via FBX and Unity. Prototype mobile applications were constructed and field-tested across three spatial deployment modalities to support layout verification and member positioning.',
    overviewText: [
      'The project developed an interoperable workflow transferring Revit models into mobile augmented-reality environments through FBX and Unity.',
      'The team implemented and physically tested prototype applications supporting three deployment approaches. Kashan contributed as a co-author and final-year project team member.',
    ],
    methods: [
      {
        title: 'Marker-based',
        detail: 'Uses planar fiducial image markers to anchor and orient full-scale BIM components directly onto physical benchmarks on-site.',
      },
      {
        title: 'Ground-plane',
        detail: 'Detects real-time horizontal plane surfaces (slabs, floors, grade) via SLAM point clouds for rapid tabletop and walkthrough exploration.',
      },
      {
        title: 'Location-based',
        detail: 'Leverages geospatial GPS coordinates and geospatial SDKs (Cesium for Unity) for large-scale infrastructure and site alignment.',
      },
    ],
    tools: ['Revit', 'FBX', 'Unity', 'Vuforia', 'ARCore', 'Cesium for Unity', 'C#'],
    citation: 'Ashraf, H., Manshad, F., Shafiq, K., & Fareed, F. (2026). BIM to Augmented Reality: A Standardized Multimodal Deployment Framework for Construction Layout Visualization [Preprint]. SSRN. https://doi.org/10.2139/ssrn.6884926',
  },
]

export const research = researchProjects[0]!
