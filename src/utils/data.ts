import { STATUS_COLOR, STATUS_TEXT } from "./enums";

export interface ChecklistType {
  id: number;
  title: string;
  link: string;
  status: any;
}

const checklist: ChecklistType[] = [
  {
    id: 1,
    title: "ABC Assessment & Interview Schedule",
    link: '/forms/interview-schedule',
    status: {
      text: STATUS_TEXT.READY,
      color: STATUS_COLOR.READY
    }
  },
  {
    id: 2,
    title: "ABC Selection Assessment",
    link: '/forms/selection',
    status: {
      text: STATUS_TEXT.SUCCESS,
      color: STATUS_COLOR.SUCCESS
    }
  },
  {
    id: 3,
    title: "Debarment Check",
    link: '/forms/debarment',
    status: {
      text: STATUS_TEXT.FAILED,
      color: STATUS_COLOR.FAILED
    }
  }
]

export default checklist;