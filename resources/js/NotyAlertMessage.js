export default class NotyAlertMessage {
    static get ERROR() {return 'error';}
    static get SUCCESS() {return 'success';}
    static get WARNING() {return 'warning';}
    static get INFO() {return 'info';}

    constructor (type, msg) {
        this.type = type;
        this.msg = msg;
    }
    show () {
        new Noty({
            type: this.type,
            theme: 'nest',
            layout: 'topRight',
            text: this.msg,
            timeout: '2000',
            progressBar: true,
            closeWith: ['click'],
            animation: {
                open: 'animated flipInY', // Animate.css class names
                close: 'animated flipOutY' // Animate.css class names
            }
        }).show();
    }
}
