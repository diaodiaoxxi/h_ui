import {findInx} from '../../util/tools'

export default {
  methods: {
    alignCls(column, row = {},fixed,isSum) {
      if(fixed=='left'){
        fixed = this.isRightFixed?'right':fixed
      }
      let cellClassName = ''
      if (row.cellClassName && column.key && row.cellClassName[column.key]) {
        cellClassName = row.cellClassName[column.key]
      }
      return [
        `h-ui-${column.key}`,
        {
          [`${cellClassName}`]: cellClassName,    // cell className
          [`${column.className}`]: column.className,    // column className
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-head-column-${this.headAlgin}`]: this.headAlgin,
          [`${this.prefixCls}-body-column-${this.bodyAlgin}`]: this.bodyAlgin,
          [`${this.prefixCls}-split-index`]: this.splitIndex && column.type=='index',
          // [`${this.prefixCls}-hidden`]: !this.isSummation&&((fixed === 'left' && column.fixed !== 'left') || (fixed === 'right' && column.fixed !== 'right') || (!fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')))
          [`${this.prefixCls}-hidden`]: !isSum&&((fixed === 'left' && column.fixed !== 'left') || (fixed === 'right' && column.fixed !== 'right') || (!fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')))
        }
      ]
    },
    setCellWidth(column, index, top) {
      const { width, _width } = column;
      let columnWidth = "",
        lastInx = this.cloneColumns.length - 1;

      while (this.cloneColumns[lastInx] && this.cloneColumns[lastInx].fixed === "right") {
        lastInx--;
      }

      if (width) {
        columnWidth = width;
      } else if (_width) {
        columnWidth = _width;
      }

      // when browser has scrollBar,set a width to resolve scroll position bug
      if (lastInx === index && this.bodyHeight !== 0 && width != "") {
        if (this.data.length > 0 && !top && this.isScrollY) {
          columnWidth -= this.scrollBarWidth;
        }
      }

      if (columnWidth === "0") {
        columnWidth = "";
      }

      return columnWidth;
    }
  }
}
