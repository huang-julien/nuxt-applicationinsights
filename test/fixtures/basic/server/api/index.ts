import { getTrace } from "../utils/traces";

export default defineTracedEventHandler(() => {
    return {
        trace: getTrace(),
    }
})