 import { getTrace } from "../utils/traces";


export default defineTracedEventHandler(async (event) => {
    return {
        trace: getTrace(),
    }
})