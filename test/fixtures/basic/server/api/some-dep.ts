import { getTrace } from "../utils/traces";

export default defineTracedEventHandler(async () => {
    return {
        trace: getTrace(),
    }
})