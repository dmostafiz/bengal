import moment from 'moment'
import 'moment/locale/bn-bd'
moment.locale('bn-bd')

const formatDate = (date, format = 'LLL', calendar = false) => {

    if(calendar){

        return moment(date).calendar()

    }else{
        
        return moment(date).format(format)
    }

}

export default formatDate