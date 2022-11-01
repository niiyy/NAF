import { MenuEventsE } from '../../../types/events'
import { NuiAPPS } from '../../../types/main'
import { TimelineUpdateActions } from '../../../types/timeline'
import { injectMockData } from '../utils/mock.data'

// injectMockData([
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'SUCCES',
//       duration: 500,
//       body: {
//         content: 'SUCCES',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'WARN',
//       duration: 500,
//       body: {
//         content: 'WARN',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'ERROR',
//       duration: 500,
//       body: {
//         content: 'ERROR qzdzqdqzd 0qzdqzdqzd qzdqzdg qzdqzdzdqzdqzdqzdqzd',
//       },
//     },
//   },
//   {
//     app: 'NX::notification',
//     method: 'NX::createNotification',
//     data: {
//       type: 'NORMAL',
//       duration: 500,
//       body: {
//         content: 'normal qzdqzdqzqzdz qzd qd qzd qzd qd qd qd ',
//       },
//     },
//   },
// ])

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::input',
//       method: 'NX::createInput',
//       data: {
//         title: 'CACA',
//         rows: [
//           {
//             label: 'Name',
//             id: 'name',
//             type: 'text',
//             required: true,
//           },
//           {
//             label: 'Amount',
//             id: 'amount',
//             type: 'text',
//           },
//           {
//             label: 'Color',
//             id: 'color',
//             type: 'color',
//           },
//         ],
//       },
//     },
//   ])
// }, 5000)

// injectMockData([
//   {
//     app: 'NX::loadingBar',
//     method: 'NX::createLoadingBar',
//     data: {
//       duration: 2,
//       type: 'circle',
//       style: {
//         label: {
//           color: 'cyan',
//         },
//         container: {
//           backgroundColor: 'green',
//         },
//         bar: {
//           backgroundColor: 'red',
//         },
//       },
//     },
//   },
// ])

// injectMockData([
//   {
//     app: 'NX::timeline',
//     method: 'NX::createTimeline',
//     data: {
//       rows: [
//         {
//           label: 'Etape 1',
//           id: '1',
//           type: 'OUTLINE',
//         },
//         {
//           label: 'Etape 2',
//           id: '2',
//           type: 'OUTLINE',
//         },
//         {
//           label: 'Etape 3',
//           id: '3',
//         },
//         {
//           label: 'Etape 4',
//           id: '4',
//         },
//       ],
//     },
//   },
// ])

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '1',
//       },
//     },
//   ])
// }, 1000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '2',
//       },
//     },
//   ])
// }, 2000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '3',
//       },
//     },
//   ])
// }, 3000)

// setTimeout(() => {
//   injectMockData([
//     {
//       app: 'NX::timeline',
//       method: 'NX::updateTimeline',
//       data: {
//         type: TimelineUpdateActions.SET_COMPLETED,
//         id: '4',
//       },
//     },
//   ])
// }, 4000)

/*
  - BUTTON
  - SLIDER
  - SPACE
  - CATEGORY BUTTON
  - LIST
  - CHECKBOX
  
*/

setTimeout(() => {
  injectMockData([
    {
      app: 'NX::menu',
      method: 'NX::createMenu',
      data: {
        options: {
          title: 'Custom',
          banner:
            'https://img.freepik.com/free-vector/yellow-background-with-halftone-lines-design_1017-30148.jpg?w=2000',
          width: 400,
          // color: ''
        },
        items: [
          {
            type: 'BUTTON',
            label: 'Button',
          },
          {
            type: 'SLIDER',
            label: 'Slider',
            max: 15,
            min: 5,
          },
          {
            type: 'SEPARATOR',
            label: 'SEPARATOR',
          },
          {
            type: 'CHECKBOX',
            label: 'Chckbox',
          },
          {
            type: 'LIST',
            label: 'List',
            choices: [
              {
                id: '1',
                label: 'Un',
              },
              {
                id: '2',
                label: 'Deux',
              },
              {
                id: '3',
                label: 'Trois',
              },
            ],
          },
        ],
      },
    },
  ])
}, 100)
