import { Imaging } from './types';

// Mock bounding box coordinates for different tumor types
const gliomaBoundingBox = [
    { x: 120, y: 145 },
    { x: 180, y: 145 },
    { x: 180, y: 210 },
    { x: 120, y: 210 }
];

const meningiomaBoundingBox = [
    { x: 150, y: 100 },
    { x: 210, y: 100 },
    { x: 210, y: 160 },
    { x: 150, y: 160 }
];

const pituitaryBoundingBox = [
    { x: 180, y: 180 },
    { x: 220, y: 180 },
    { x: 220, y: 220 },
    { x: 180, y: 220 }
];

// Sample brain MRI images (placeholder URLs)
const brainMriImages = [
    {
        thumbnail: 'https://www.researchgate.net/profile/Mohd-Saad/publication/329403546/figure/fig2/AS:700300716363777@1544002638428/Brain-tumor-MRI-image.png',
        fullSize: 'https://www.researchgate.net/profile/Mohd-Saad/publication/329403546/figure/fig2/AS:700300716363777@1544002638428/Brain-tumor-MRI-image.png',
    },
    {
        thumbnail: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41598-019-55972-4/MediaObjects/41598_2019_55972_Fig1_HTML.png',
        fullSize: 'https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41598-019-55972-4/MediaObjects/41598_2019_55972_Fig1_HTML.png',
    },
    {
        thumbnail: 'https://www.mdpi.com/applsci/applsci-11-08117/article_deploy/html/images/applsci-11-08117-g001.png',
        fullSize: 'https://www.mdpi.com/applsci/applsci-11-08117/article_deploy/html/images/applsci-11-08117-g001.png',
    }
];

// Sample chest X-ray images
const chestXrayImages = [
    {
        thumbnail: 'https://prod-images-static.radiopaedia.org/images/53456248/e168e0c67a3d00edcd4e0d2c64c59e_big_gallery.jpg',
        fullSize: 'https://prod-images-static.radiopaedia.org/images/53456248/e168e0c67a3d00edcd4e0d2c64c59e_big_gallery.jpg',
    }
];

// Sample CT scan images
const ctScanImages = [
    {
        thumbnail: 'https://prod-images-static.radiopaedia.org/images/5684549/c6c15d7b5e4d9f8c882e9ec5d1b9e5_gallery.jpg',
        fullSize: 'https://prod-images-static.radiopaedia.org/images/5684549/c6c15d7b5e4d9f8c882e9ec5d1b9e5_gallery.jpg',
    }
];

export const imagingStudies: Imaging[] = [
    {
        id: '1',
        name: 'Brain MRI - Glioma Detection',
        modality: 'MRI',
        bodyPart: 'Brain',
        date: '2023-10-15',
        physician: 'Dr. Sarah Johnson',
        facility: 'Memorial Hospital',
        status: 'Completed',
        findings: 'High-grade glioma detected in the left temporal lobe. The tumor measures approximately 3.2 x 2.8 cm with surrounding edema.',
        impression: 'Findings consistent with high-grade glioma. Recommend neurosurgical consultation for biopsy and treatment planning.',
        images: brainMriImages,
        urgency: 'Urgent',
        followUpRequired: true,
        followUpDate: '2023-10-22',
        tumorDetected: true,
        tumorType: 'glioma',
        confidence: 0.97,
        tumorBoundingBox: gliomaBoundingBox,
        fhirObservationId: '1252',
        fhirDiagnosticReportId: '1253',
        detectedAt: '2023-10-15T14:30:00.000Z',
        notes: 'Patient presented with headaches and vision changes. This scan confirms the presence of a glioma that requires immediate attention.'
    },
    {
        id: '2',
        name: 'Brain MRI - Meningioma Follow-up',
        modality: 'MRI',
        bodyPart: 'Brain',
        date: '2023-09-05',
        physician: 'Dr. Michael Chen',
        facility: 'University Medical Center',
        status: 'Completed',
        findings: 'Stable meningioma in the right frontal lobe. No significant change in size compared to previous imaging from 3 months ago.',
        impression: 'Stable meningioma. Continue monitoring with follow-up MRI in 6 months.',
        images: [brainMriImages[1]],
        urgency: 'Routine',
        followUpRequired: true,
        followUpDate: '2024-03-05',
        tumorDetected: true,
        tumorType: 'meningioma',
        confidence: 0.89,
        tumorBoundingBox: meningiomaBoundingBox,
        fhirObservationId: '1142',
        fhirDiagnosticReportId: '1143',
        detectedAt: '2023-09-05T10:15:00.000Z',
        notes: 'This is a follow-up scan for a previously diagnosed meningioma. The tumor appears stable with no significant growth.'
    },
    {
        id: '3',
        name: 'Brain MRI - Pituitary Adenoma',
        modality: 'MRI',
        bodyPart: 'Brain',
        date: '2023-07-22',
        physician: 'Dr. Emily Rodriguez',
        facility: 'Neurology Specialists',
        status: 'Completed',
        findings: 'Small pituitary adenoma measuring 0.8 cm in diameter. No compression of the optic chiasm observed.',
        impression: 'Pituitary microadenoma. Recommend endocrinological evaluation and follow-up MRI in 12 months.',
        images: [brainMriImages[2]],
        urgency: 'Routine',
        followUpRequired: true,
        followUpDate: '2024-07-22',
        tumorDetected: true,
        tumorType: 'pituitary',
        confidence: 0.82,
        tumorBoundingBox: pituitaryBoundingBox,
        fhirObservationId: '1098',
        fhirDiagnosticReportId: '1099',
        detectedAt: '2023-07-22T16:45:00.000Z',
        notes: 'Incidental finding during workup for persistent headaches. Patient referred to endocrinology for hormonal evaluation.'
    },
    {
        id: '4',
        name: 'Brain MRI - Normal Study',
        modality: 'MRI',
        bodyPart: 'Brain',
        date: '2023-06-10',
        physician: 'Dr. Robert Williams',
        facility: 'Community Hospital',
        status: 'Completed',
        findings: 'No evidence of intracranial mass, hemorrhage, or infarct. Normal brain parenchyma and ventricles.',
        impression: 'Normal brain MRI. No abnormalities detected.',
        images: [brainMriImages[0]],
        urgency: 'Routine',
        followUpRequired: false,
        tumorDetected: false,
        tumorType: 'no_tumor',
        confidence: 0.95,
        tumorBoundingBox: [],
        fhirObservationId: '1045',
        fhirDiagnosticReportId: '1046',
        detectedAt: '2023-06-10T09:30:00.000Z',
        notes: 'Study performed for chronic headaches. No structural abnormalities identified.'
    },
    {
        id: '5',
        name: 'Chest X-Ray',
        modality: 'X-Ray',
        bodyPart: 'Chest',
        date: '2023-08-15',
        physician: 'Dr. James Wilson',
        facility: 'Urgent Care Center',
        status: 'Completed',
        findings: 'Clear lung fields. No evidence of pneumonia, effusion, or pneumothorax. Normal cardiac silhouette.',
        impression: 'Normal chest X-ray.',
        images: chestXrayImages,
        urgency: 'Routine',
        followUpRequired: false
    },
    {
        id: '6',
        name: 'Abdominal CT Scan',
        modality: 'CT',
        bodyPart: 'Abdomen',
        date: '2023-05-20',
        physician: 'Dr. Lisa Thompson',
        facility: 'Memorial Hospital',
        status: 'Completed',
        findings: 'Normal liver, spleen, pancreas, and kidneys. No evidence of mass, inflammation, or obstruction.',
        impression: 'Normal abdominal CT scan.',
        images: ctScanImages,
        urgency: 'Routine',
        followUpRequired: false
    },
    {
        id: '7',
        name: 'Brain MRI - Scheduled',
        modality: 'MRI',
        bodyPart: 'Brain',
        date: '2023-11-30',
        physician: 'Dr. Sarah Johnson',
        facility: 'Memorial Hospital',
        status: 'Scheduled',
        images: [],
        urgency: 'Routine',
        followUpRequired: false
    }
];

export default imagingStudies; 