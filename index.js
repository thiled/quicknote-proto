new Vue({
  el: '#app',
  data: {
    items: [
      {
        indent: 0,
        finished: false,
        content: '1',
        id: +new Date(),
      },
    ],
    focusItem: null,
  },
  methods: {
    setFocus() {
      this.$nextTick(() => {
        let element = this.$refs['focusItem'][0].$el.children[1];
        // 光标移至最后
        var range = window.getSelection();
        range.selectAllChildren(element);
        range.collapseToEnd();
      });
    },
    insertItem(item, content) {
      let newItem = {
        indent: item.indent,
        finished: false,
        content,
        id: +new Date(),
      };
      this.items.splice(this.items.indexOf(item) + 1, 0, newItem);
      this.focusItem = newItem;
      this.setFocus();
    },
    deleteItem(item) {
      // 只有一个元素时不允许删除
      if (this.items.length > 1) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1);
        //移动光标到上一个，如果当前是第一个移动到第一个
        if (index > 0) {
          index--;
        } else {
          index = 0;
        }
        this.focusItem = this.items[index];
        this.setFocus();
      }
    },
    moveUp(item) {
      let index = this.items.indexOf(item);
      if (index > 0) {
        index--;
        this.focusItem = this.items[index];
        this.setFocus();
      }
    },
    moveDown(item) {
      let index = this.items.indexOf(item);
      if (index < this.items.length - 1) {
        index++;
        this.focusItem = this.items[index];
        this.setFocus();
      }
    },
  },
});
