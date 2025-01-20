 import { getTrace } from "../utils/traces";

export default defineTracedEventHandler(event => {
    setResponseHeader(event, 'x-trace', getTrace())
    return new Error('error message')
})