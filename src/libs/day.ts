import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// locale
import 'dayjs/locale/vi'

dayjs.locale('vi')
dayjs.extend(relativeTime)

export default dayjs
