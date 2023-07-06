import { STATUS_COLOR, STATUS_TEXT } from "@/utils/enums";
import * as Action from '../actions/application.action';

const initialState = {
  checklist: [
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
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 3,
      title: "Financial Services Assessment",
      link: '/forms/financial-service',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 4,
      title: "Clientèle Funeral Plans Assessment",
      link: '/forms/clientele-plans',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 5,
      title: "Clientèle Legal Plans Assessment",
      link: '/forms/clientele-legal',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 6,
      title: "Fixed Term Contract",
      link: '/forms/fixed-term-contract',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 7,
      title: "Personal Details",
      link: '/forms/personal-details',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 8,
      title: "Honesty, integrity and good standing - Declaration Questions",
      link: '/forms/declaration',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 9,
      title: "Acknowledge of Debt",
      link: '/forms/acknowledge',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 10,
      title: "Specific Business Contravention Policy",
      link: '/forms/policy',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    },
    {
      id: 11,
      title: "Letter of Consent",
      link: '/forms/consent',
      status: {
        text: STATUS_TEXT.READY,
        color: STATUS_COLOR.READY
      }
    }
  ]
};

const application = (state = initialState, action: any) => {
  let checklist = state.checklist;

  switch(action.type) {
    case Action.GET_STATUS: {
      action.payload.map((doc:any) => {
        let status: any = {};

        if(doc.data().status === STATUS_TEXT.PENDING) {
          status = {
            text: STATUS_TEXT.PENDING,
            color: STATUS_COLOR.PENDING
          }
        } else if(doc.data().status === STATUS_TEXT.SUCCESS) {
          status = {
            text: STATUS_TEXT.SUCCESS,
            color: STATUS_COLOR.SUCCESS
          }
        } else if(doc.data().status === STATUS_TEXT.FAILED) {
          status = {
            text: STATUS_TEXT.FAILED,
            color: STATUS_COLOR.FAILED
          }
        } else {
          status = {
            text: STATUS_TEXT.READY,
            color: STATUS_COLOR.READY
          }
        }

        checklist.map((list, index) => {
          if(index + 1 === doc.data().type) {
            checklist[index].status = status;
          }
        });
      });

      return {
        ...state,
        checklist
      }
    }

    default: {
      return state;
    }
  }
}

export default application;