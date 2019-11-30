import {Tracker} from 'react-tracker'

// export const getStudentUploadEvent = (uploadId, userId) => ({
//         type: 'STUDENT_UPLOAD',
//         data: {
//             uploadId: uploadId,
//             userId: userId
//         }
//     })

export function getStudentUploadEvent(NewUploadBy, uploadName) {
    return { 
        type: 'STUDENT_UPLOAD',
        data: {
            NewUploadBy,
            uploadName
        }
    }
}