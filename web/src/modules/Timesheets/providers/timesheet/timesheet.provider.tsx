import { createContext, useContext, useEffect, useReducer } from "react";
import type {
  TimesheetContextMethods,
  TimesheetContextState,
  TimesheetLinesPayload,
  TimesheetProviderContext,
  TimesheetProviderProps,
  TimesheetReducerAction,
} from "./types";
import type { Pretty } from "#core/types/utility";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import type {
  TimesheetLineRecord,
  TimesheetLineUpdate,
} from "#core/types/models/timesheet-line.model-types";
import { setLines } from "./reduce/set-lines";
import { addLines } from "./reduce/add-lines";
import { removeLines } from "./reduce/remove-lines";
import { updateLine } from "./reduce/update-line";

const TimesheetContext = createContext<null | TimesheetProviderContext>(null);

function getTimesheetReducer(
  timesheet?: Pretty<
    TimesheetRecord & {
      lines: TimesheetLineRecord[];
    }
  >
) {
  function reset(state: TimesheetContextState) {
    if (!timesheet) {
      return state;
    }

    return {
      timesheetId: timesheet.id,
      name: timesheet.name,
      date: timesheet.date,
      lines: timesheet.lines.map((line, idx) => ({ ...line, lineNo: idx + 1 })),
      deleteLines: [],
    };
  }

  return function timesheetReducer(
    state: TimesheetContextState,
    action: TimesheetReducerAction
  ): TimesheetContextState {
    switch (action.name) {
      case "reset":
        return reset(state);
      case "set-state":
        return {
          ...action.payload,
          lines: action.payload.lines.map((line, idx) => ({
            ...line,
            lineNo: idx + 1,
          })),
        };
      case "add-lines":
        return addLines(state, action);
      case "set-lines":
        return setLines(state, action);
      case "remove-lines":
        return removeLines(state, action);
      case "update-line":
        return updateLine(state, action);
      case "change-name":
        return {
          ...state,
          name: action.payload,
        };
      default:
        return state;
    }
  };
}

export const TimesheetProvider = ({
  children,
  timesheet,
}: TimesheetProviderProps) => {
  const [state, dispatch] = useReducer(
    getTimesheetReducer(timesheet),
    timesheet
      ? {
          timesheetId: timesheet.id,
          name: timesheet.name,
          date: timesheet.date,
          lines: timesheet.lines,
          deleteLines: [],
        }
      : {
          timesheetId: -1,
          name: "",
          date: new Date(),
          lines: [],
          deleteLines: [],
        }
  );

  useEffect(() => {
    if (timesheet) {
      dispatch({
        name: "set-state",
        payload: {
          timesheetId: timesheet.id,
          name: timesheet.name,
          date: timesheet.date,
          lines: timesheet.lines,
          deleteLines: state?.deleteLines ?? [],
        },
      });
    }
  }, [timesheet]);

  const methods = {
    reset: () => dispatch({ name: "reset", payload: null }),
    setState: (newState) => dispatch({ name: "set-state", payload: newState }),
    changeName: (name: string) =>
      dispatch({ name: "change-name", payload: name }),
    updateLine: (line: TimesheetLineUpdate | TimesheetLineRecord) =>
      dispatch({ name: "update-line", payload: line }),
    setLines: (lines: TimesheetLinesPayload["lines"]) =>
      dispatch({ name: "set-lines", payload: { lines } }),
    addLines: (...lines: TimesheetLinesPayload["lines"]) => {
      dispatch({ name: "add-lines", payload: { lines } });
    },
    removeLines: (...lineNos: number[]) => {
      dispatch({ name: "remove-lines", payload: { lineNos } });
    },
  } satisfies TimesheetContextMethods;

  return (
    <TimesheetContext.Provider value={[state, methods]}>
      {children}
    </TimesheetContext.Provider>
  );
};

export const useTimesheetContext = () => {
  if (!TimesheetContext) {
    throw new Error(`No context provided`);
  }

  return useContext(TimesheetContext!)!;
};
