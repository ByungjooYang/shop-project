import axios from "axios";

export default {
    methods: {
        async $api(url, data) {
            return (await axios({
                method: 'post',
                url,
                data
            }).catch(e => {
                console.log(e);
            })).data;
        },
        $base64(file){
            return new Promise(resolve => {
                let a = new FileReader();
                a.onload = e => resolve(e.target.result);
                a.readAsDataURL(file);
            });
        },
        $currencyFormat(value, format = '#,###'){
            if(value == 0 || value == null) return 0;

            let currency = format.substring(0, 1);

            if(currency === '$' || currency === "\\"){
                format = format.substring(1, format.length);

            }else {
                currency = '';
            }

            let groupingSeparator = ",";
            let maxFractionDigit = 0;
            let decimalSeparator = ".";

            if(format.indexOf(".") === -1){
                groupingSeparator = ",";

            }else{
                if(format.indexOf(",") < format.indexOf(".")){
                    groupingSeparator = ",";
                    decimalSeparator = ".";
                    maxFractionDigit = format.length - format.indexOf(".") - 1;

                } else {
                    groupingSeparator = ".";
                    decimalSeparator = ",";
                    maxFractionDigit = format.length - format.indexOf(",") - 1;

                }
            }

            let prefix = "";
            let d = "";
            let dec = 1;

            for(let i=0;i<maxFractionDigit;i++){
                dec = dec * 10;
            }

            let v = String(Math.round(parseFloat(value) * dec) / dec);

            if(v.indexOf("-") > -1) {
                prefix = "-";
                v = v.substring(1);
            }
        }
    }
}