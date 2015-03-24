pa = {
  parse: function(t) {
    var obs = _.compact(_.map(t.split(/\s/), _.trim));

    // combine quoted
    var ptr = 0,
    quot = '"',
    n = [],
    stack = [];
    while (ptr < obs.length) {
        stack.push(obs[ptr]);
        if (stack[0][0] != quot) {
          n.push(stack.pop());
        }
        else {
          var last = stack[stack.length - 1];
          if (last[last.length - 1] == quot) {
            n.push(_.trim(stack.join(' '),quot));
            stack = [];
          }
        }
        ptr++;
    }
    return this.build_recursive(n, 0);
  },

  parse_async: function(t, cb) {
      _.defer(function(){
        cb(this.parse(t));
      }.bind(this));
  },

  build_recursive: function(list, start) {
    var ptr = start,
    depth = 0,
    build = {};
    while (ptr < list.length && depth >= 0) {
        if (list[ptr] == 'END') {
          depth--; ptr++; continue;
        }
        if (list[ptr] == 'BEGIN') {
          if (depth === 0) {
            build[list[ptr + 1]] = this.build_recursive(list, ptr + 2);
          }
          depth++; ptr++; ptr++; continue;
        }
        if (depth === 0) {
          build[list[ptr]] = this.guessType(list[ptr+1]);
          ptr++; ptr++; continue;
        }
        else {
          ptr++;
        }
    }
    return build;
  },

  guessType: function(val) {
    if (val === 'true') { return true; }
    if (val === 'false') { return false; }
    if (/^(\-|\+)?[0-9]+$/.test(val)) { return parseInt(val); }
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(val)) { return parseFloat(val); }
    return val;
  }
};
