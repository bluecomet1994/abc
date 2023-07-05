import { INPUT_TYPE, STATUS_COLOR, STATUS_TEXT } from "./enums";

export interface ChecklistType {
  id: number;
  title: string;
  link: string;
  status: any;
  detail: any;
}

const checklist: ChecklistType[] = [
  {
    id: 1,
    title: "ABC Assessment & Interview Schedule",
    link: '/pre-employ/interview-schedule',
    status: {
      text: STATUS_TEXT.READY,
      color: STATUS_COLOR.READY
    },
    detail: [
      {
        id: 1,
        title: "Name & Surname",
        type: INPUT_TYPE.TEXT
      },
      {
        id: 2,
        title: "Contact Number",
        type: INPUT_TYPE.TEXT
      },
      {
        id: 3,
        title: "ID Number",
        type: INPUT_TYPE.TEXT
      },
      {
        id: 4,
        title: "Area applied for",
        type: INPUT_TYPE.TEXT
      },
      {
        id: 5,
        title: "Interviewer",
        type: INPUT_TYPE.TEXT
      },
      {
        id: 6,
        title: "Date",
        type: INPUT_TYPE.DATE
      },
    ]
  },
  {
    id: 2,
    title: "ABC Selection Assessment",
    link: '/pre-employ/selection',
    status: {
      text: STATUS_TEXT.SUCCESS,
      color: STATUS_COLOR.SUCCESS
    },
    detail: {}
  },
  {
    id: 3,
    title: "Debarment Check",
    link: '/pre-employ/debarment',
    status: {
      text: STATUS_TEXT.FAILED,
      color: STATUS_COLOR.FAILED
    },
    detail: {}
  }
]

export default checklist;