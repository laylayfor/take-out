/** 适配table宽度 */
export default {
    data() {
        return {
            tableWidth: 0,
        }
    },
    methods: {
        calcTableWidth() {
            this.tableWidth = document.body.clientWidth - 280;
        }
    },
    monted() {
        this.calcTableWidth();
        window.addEventListener('resize', this.calcTableWidth);
    },
    beforeDestory() {
        window.removeEventListener('resize', this.calcTableWidth);
    }
}