class TimeFormat {
    constructor (data, formatter = 'hh:mm:ss') {
        this.formatString = formatter;
        if (data instanceof Date) {
            this.date = data;
        } else if (!isNaN(data)) {
            this.date = new Date(data - 62167248000000);
        }
    }
    get date() {
        return this.data;
    }
    set date(date) {
        if (date instanceof Date) {
            this.data = date;
        } else if (!isNaN(date)) {
            this.data = new Date(date - 62167248000000);
        }
        this.o = {
            'M+': (date instanceof Date) ? (this.data.getMonth() + 1) : this.data.getMonth(), // 月份
            'd+': (date instanceof Date) ? this.data.getDate() : this.data.getDate() - 1, // 日
            'h+': this.data.getHours(), // 小时
            'm+': this.data.getMinutes(), // 分
            's+': this.data.getSeconds(), // 秒
            'S': this.data.getMilliseconds() // 毫秒
        };
    }
    get formatString() {
        return this.fmt;
    }
    set formatString(formatter = 'hh:mm:ss') {
        this.fmt = formatter;
    }

    format(fmt = this.formatString) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                ('000' + this.data.getFullYear() + '')
                        .substr(this.data.getFullYear().toString().length + 3 - RegExp.$1.length));
        }
        for (var k in this.o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1,
                        (RegExp.$1.length === 1) ? (this.o[k]) : (('00' + this.o[k]).substr(('' + this.o[k]).length)));
            }
        }
        return fmt;
    }
}
export default (date) => new TimeFormat(date);
