// export const studentUploadListener = (event, trackingHistory) => {
//     // window.dataLayer.push(event);
//     console.log(window)
//     console.log(event.data)
//     console.log(trackingHistory)
//     return event
// }

// studentUploadListener.eventType = 'STUDENT_UPLOAD'

// export const studentUploadListener = (event, trackingHistory) => {
//     switch(event.type) {
//         case 'STUDENT_UPLOAD':
//             console.log(event)
//             break;

//             default: 
//     }
// }

export function studentUploadListener(event, trackingHistory) {
    // console.log(event.data)
    window.dataLayer.push(event.data)
    trackingHistory.push(event.data)
    console.log(trackingHistory)
    return event
}

studentUploadListener.eventType = 'STUDENT_UPLOAD'