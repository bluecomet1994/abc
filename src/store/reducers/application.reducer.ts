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
  switch(action.type) {
    case Action.GET_STATUS: {
      let newChecklist = null;
      action.payload.map((doc:any) => {
        let status = {};

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

        newChecklist = state.checklist.map((item, index) => {
          if(index === doc.data().type - 1) {
            return {
              ...item,
              status
            }
          }

          return item;
        });
      });

      return {
        ...state,
        checklist: newChecklist
      };
    }
    default: {
      return state;
    }
  }
}

export default application;