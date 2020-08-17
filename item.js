Vue.component('Item', {
  template: document.getElementById('item').innerHTML,

  props: ['data'],
  data() {
    return {
      content: '', //只用于接收初始值，无其他用途
    };
  },
  mounted() {
    this.content = this.data.content;
  },
  computed: {
    indent() {
      return { 'padding-left': this.data.indent * 30 + 'px' };
    },
  },
  methods: {
    changeFinishStatus() {
      this.data.finished = !this.data.finished;
    },
    onInput(e) {
      this.data.content = e.target.innerText;
    },
    //tab事件
    onTabPress(event) {
      let value = 1;
      // shift
      if (event.shiftKey) {
        value = -1;
      }
      this.data.indent += value;
      if (this.data.indent < 0) {
        this.data.indent = 0;
      }
    },
    onBackSpace(e) {
      if (this.data.content.length == 0) {
        e.preventDefault();
        this.$emit('delete', this.data);
      }
    },
    //回车事件
    onEnterPress(e) {
      let spliceContent = '';
      var range = window.getSelection();
      if (range.anchorNode.nodeName === '#text') {
        let content = e.target.innerText;
        this.data.content = content.substring(0, range.anchorOffset);
        spliceContent = content.substring(range.anchorOffset);
      }
      this.$emit('enter', this.data, spliceContent);
      e.target.innerText = this.data.content;
    },
    onKeyDown(e) {
      e.preventDefault();
      this.$emit('down', this.data);
    },
    onKeyUp(e) {
      e.preventDefault();
      this.$emit('up', this.data);
    },
  },
});
